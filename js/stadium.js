if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function stadium() {
    var diagram_url = 'https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/sections/{0}{1}.png',
        photo_url = 'https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/photos/comp/{0}{1}{2}{3}.jpg',
        fb_url = 'https://www.facebook.com/dialog/feed?link={0}&app_id=316254480466&redirect_uri={1}&caption={2}',
        twitter_url = 'https://twitter.com/share?text={0}&url={1}',
        mailto_url = 'mailto:?subject={0}&body={1}',
        hash_re = new RegExp('^#(\\d{3})-(\\d{0,2})-(\\d{0,2})-([ulx]?)$'),
        sections = [],
        lower_upper_cutoff = 14, // Basically, number of rows in lower section
        section_sizes = {
            101: [18, 15],102: [22, 11],103: [25, 32],104: [18, 32],
            105: [18, 32],106: [18, 32],107: [25, 32],108: [22, 14],
            109: [18, 15],110: [15, 15],111: [22, 14],112: [25, 32],
            113: [18, 32],114: [18, 32],115: [18, 32],116: [25, 32],
            117: [22, 11],118: [15, 15]
        },
        section_matricies = {
            // Defines the arrangement of photos taken in each section
            // [lower_sec, upper_sec]
            101: [[3,3,3]],
            102: [[1,2,3], [3]],
            103: [[1,1,2], [2,3,3]],
            104: [[3,3,3], [3,3,3]],
            105: [[3,3,3], [3,3,3]],
            106: [[3,3,3], [3,3,3]],
            107: [[1,1,2], [2,3,3]],
            108: [[1,2,3]],
            109: [[3,3,3]],
            110: [[3,3,3]],
            111: [[1,2,3]],
            112: [[1,1,2], [2,3,3]],
            113: [[3,3,3], [2,3,3]],
            114: [[3,3,3], [3,3,3]],
            115: [[3,3,3], [2,3,3]],
            116: [[1,1,2], [2,3,3]],
            117: [[1,2,3], [3]],
            118: [[3,3,3]]},
        view_x_options = ['l', 'c', 'r'],
        view_y_options = ['b', 'm', 't'],
        error_state = false;

    function my(selection) {

        function draw_ui(){
            content_group = svg.append('g')
                .attr('class', 'content');
            content_group.append('rect')
                .attr('class', 'content-background')
                .attr('width', '100%')
                .attr('height', '100%');

            content = content_group.append('g');

            container.select('#seat-selector').on('submit', function(){
                var e = d3.event;
                e.preventDefault();
                view_section(e.target[0].value, e.target[1].value, e.target[2].value);
            })
            section_view_panel.select('.close-button').on('click', close_section);
            section_view_panel.selectAll('.viewSelector > div > div > div').on('click', function(){
                var e = d3.event;
                e.preventDefault();
                activate_view(d3.select(e.target).attr('class'));
            });
            read_url_hash();
        }

        function load_image(data){
            var svgNode = data.getElementsByTagName("svg")[0];
            content.node().appendChild(svgNode);
            $.each(d3.selectAll('#sections > g').nodes(), function(index, val) {
                var section = d3.select(val),
                    poly_id = section.attr('id'),
                    subsection = poly_id.length > 4 ? poly_id[4] : '',
                    section_number = poly_id.substring(1, 4);
                if (sections.indexOf(section_number) < 0) {
                    sections.push(section_number);
                }
                section.datum({
                    'number': section_number,
                    'subsection': subsection
                });
                section.on('mouseover', function(d){
                    var self = d3.select(this),
                        child = self.select('rect,polygon');
                    child.attr(
                        'orig-fill',
                        child.attr('fill'));
                    child.attr('fill', 'red');
                }).on('mouseout', function(d){
                    var self = d3.select(this),
                        child = self.select('rect,polygon');
                    child.attr(
                        'fill',
                        child.attr('orig-fill'));
                }).on('click', function(d){
                    container.select('#seat-selector #section').node().value = parseInt(section_number);
                    view_section(section_number, '', '', subsection);
                });
            });
            sections.sort();
            container.select('#seat-selector #section')
                .selectAll('option')
                .data(sections)
                .enter()
                .append('option')
                .attr('value', function(d){return d})
                .text(function(d){return d});
        }

        function translate_seat_to_photo(section, row, seat, subsection){
            // console.log("TRANSLATE: ", section, row, seat, subsection);
            var section_size = section_sizes[section],
                section_matrix = section_matricies[section],
                subsection_matrix,
                x_size = section_size[0],
                y_size = section_size[1],
                y_ratio;

            //HACK
            switch(subsection) {
                case 'l':
                    row = 7;
                    seat = x_size / 2;
                    subsection_matrix = section_matrix[0];
                    y_ratio = 0.5;
                    break;
                case 'u':
                    row = (y_size - lower_upper_cutoff) / 2;
                    seat = x_size / 2;
                    subsection_matrix = section_matrix[1];
                    y_ratio = 0.5;
                    break;
                case 'x':
                    row = lower_upper_cutoff + 1;
                    seat = x_size / 2;
                    subsection_matrix = section_matrix[1];
                    y_ratio = 1;
                    break;
            }
            //ENDHACK

            var seat = !isNaN(parseInt(seat)) ? +seat : (x_size / 2),
                row = !isNaN(parseInt(row)) ? +row : Math.floor(y_size / 2),
                x_ratio = (seat / x_size),
                // subsection,
                photo_x,
                photo_y, photo_y_index;

            if (!subsection){
                // Full section of two subsections
                if(section_matrix.length > 1) {
                    if (row <= lower_upper_cutoff) {
                        subsection = 'l';
                        y_ratio = row / lower_upper_cutoff;
                    } else {
                        if (section_matrix[1].length > 1){
                            subsection = 'u';
                            y_ratio = (row - lower_upper_cutoff) / (y_size - lower_upper_cutoff);
                        } else {
                            subsection = 'x';
                            y_ratio = 1;
                        }
                    }
                    subsection_matrix = section_matrix[subsection == 'l' ? 0 : 1];

                // Only a lower section
                } else {
                    y_ratio = row / y_size;
                    subsection = ''
                    subsection_matrix = section_matrix[0];
                }
            }

            // Test to see if selected row/seat are out of bounds
            if (x_ratio > 1 || y_ratio > 1) {
                // console.log('ERR: ', x_ratio, y_ratio);
                return null
            };

            // Calculate photo-y
            if (subsection === 'x') {
                photo_y_index = 0;
                photo_y = ''; // Box
            } else {
                photo_y_index = Math.min(Math.floor(y_ratio * 3), 2);
                photo_y = view_y_options[photo_y_index];
            }
            // console.log(subsection_matrix)

            // Calculate photo-x
            switch (subsection_matrix[photo_y_index]) {
                case 1:
                    photo_x = '';
                    break;
                case 2:
                    photo_x = ['l', 'r'][Math.min(Math.floor(x_ratio * 2), 2)];
                    break;
                case 3:
                    photo_x = ['l', 'c', 'r'][Math.min(Math.floor(x_ratio * 3), 2)];
                    break;
            }
            // console.log("photo_x", photo_x);
            // console.log("photo_y", photo_y);
            // console.log("subsection", subsection);


            if (x_ratio > 1 || y_ratio > 1) {
                return null;
            };
            return [
                section,
                subsection,
                photo_y,
                photo_x
            ];
        }

        function activate_photo(section, row, seat, subsection) {
            section_photoview = translate_seat_to_photo(section, row, seat, subsection);
            if (section_photoview == null) {
                return false;
            };
            // console.log(section_photoview)
            do_activate_photo(section_photoview);
            write_url_hash(section, row, seat, subsection);
            return true, section_photoview;
        }

        function do_activate_photo(photo_params){
            // console.log('PHOTO PARAMS', photo_params)
            section_view_panel.select('.photo').attr(
                'src', photo_url.format(
                    photo_params[0],   // Section
                    photo_params[1],   // Subsection
                    photo_params[2],   // Photo Y
                    photo_params[3])); // Photo X
            // section_view_panel.selectAll('.viewSelector > div > .active').classed('active', false);
            // section_view_panel.selectAll('.viewSelector > div > .' + view).classed('active', true);
        }

        function activate_view(view){
            var url_parts = container.select('.diagram img')
                    .attr('src').split('/'),
                diagram_filename = url_parts[url_parts.length - 1],
                subsection,
                section = diagram_filename.slice(0, 3);
            switch(diagram_filename[3]){
                case 'u':
                case 'x':
                case 'l':
                    subsection = diagram_filename[3];
                    break;
                default:
                    subsection = '';
            }
            // console.log('---->', section, subsection, view)
            do_activate_photo([
                section,
                subsection,
                view[0].trim(),
                view[1].trim()
            ])
            update_share_urls();
        }

        function read_url_hash(){
            var hash = window.location.hash;
            // console.log(hash)
            regex_parts = hash_re.exec(hash);

            if (regex_parts) {
                var section = parseInt(regex_parts[1]),
                    row = regex_parts[2],
                    seat = regex_parts[3],
                    subsection = regex_parts[4];
                container.select('#seat-selector #section').node().value = section;
                view_section(section, row, seat, subsection);
                // activate_photo(section, row, seat);
            } else if (parseInt(hash.slice(1)) > 0) {
                var section = parseInt(hash.slice(1));
                container.select('#seat-selector #section').node().value = section;
                view_section(section, '', '');
                // activate_photo(section, '', '');
            };
        }
        function write_url_hash(section, row, seat, subsection){
            var hash = '#' + (
                (section || '') + '-' +
                (row || '') + '-' +
                (seat || '') + '-' +
                (subsection || ''));
            if(history.pushState) {
                history.replaceState(null, null, hash);
            } else {
                window.location.hash = hash;
            }
        }

        function view_section(section, row, seat, subsection){
            // console.log("view section", section, row, seat, subsection);
            var section = parseInt(section),
                result = activate_photo(section, row, seat, subsection);
            if (!result) {
                show_error("Please select a valid seat");
                return
            };
            // console.log(diagram_url.format(result[0], result[1]))
            section_view_panel.select('.diagram img').attr(
                'src',
                diagram_url.format(result[0], result[1]));
            section_view_panel.select('.title').text('Section ' + section);
            section_view_panel.selectAll('.viewSelector > div').classed('active', false);

            var selector_overlay_class;
            switch(result[1]){
                case 'u':
                case 'x':
                    selector_overlay_class = section_matricies[section][1].join('');
                    break;
                default:
                    selector_overlay_class = section_matricies[section][0].join('');
                    break;
            }
            
            var selected_overlay = section_view_panel.select(
                '.viewSelector > .sel' + selector_overlay_class
            ).classed('active', true);
            section_view_panel
                .style('display', 'block')
                .style('top', (($(window).width() / parseFloat($("body").css("font-size"))) <= 30 ? $(window).scrollTop() : 0) + 'px');
            var lr_width = Math.floor(section_view_panel
                .select('.lower-right')
                    .node()
                    .getBoundingClientRect().width - 30) / 3;
            selected_overlay.selectAll('.sel-row div')
                .style('width', (lr_width) + 'px')
                .style('height', (lr_width) + 'px');
            jQuery('.viewSelector > div').css('height', (jQuery('.section-details').width() / 2) + 'px');
            update_share_urls();
        }

        function close_section(){
            section_view_panel.style('display', 'none');
            if(history.pushState) {
                history.replaceState(null, null, '#');
            } else {
                window.location.hash = hash;
            }
            update_share_urls();
        }

        function update_share_urls(){
            // Facebook
            section_view_panel.select('.sharing .facebook').attr(
                'href',
                fb_url.format(
                    encodeURIComponent(window.location.href),
                    encodeURIComponent(window.location.href),
                    encodeURIComponent('Spokesman Review: View my seat selection at The Mac' )));
            // Twitter
            section_view_panel.select('.sharing .twitter').attr(
                'href',
                twitter_url.format(
                    encodeURIComponent('Spokesman Review: View my seat selection at The Mac' ),
                    encodeURIComponent(window.location.href)));
            // Email
            section_view_panel.select('.sharing .email').attr(
                'href',
                mailto_url.format(
                    encodeURIComponent('Spokesman Review: View my seat selection at The Mac' ),
                    encodeURIComponent(window.location.href)))
        }

        function show_error(msg){
            if (error_state === false) {
                error_state = true;
                error_pane.find('p').text(msg);
                error_pane.fadeIn(200);
                setTimeout(hide_error, 2000);
            };
        }

        function hide_error(){
            error_pane.fadeOut(200);
            error_state = false;
        }


        /* ========== VARIABLES & FUNCTIONS ========== */
        var spreadsheet_url = '',


        /* ========== SETUP SVG ========== */

        container = selection,
        svg = selection.select('.canvas'),
        section_view_panel = selection.select('.section-view-panel'),
        error_pane = jQuery('.error').fadeOut();

        /* ============================= */
        /* ========== RUNTIME ========== */
        /* ============================= */

        draw_ui();
        d3.xml('https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/stadium.svg', load_image);

        /* ========== DEBUG ========== */

        if (document.URL.indexOf('stadiumdebug') > 0) {
            // ECHO MOUSE POSITION
            svg.on('mousemove.position', function(){
                var coord = d3.mouse(this);
                console.log(coord[0], coord[1]);
            });
        }
    }

    return my;
}

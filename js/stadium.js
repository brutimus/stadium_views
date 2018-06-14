//@codekit-prepend "../bower_components/d3/d3.js"

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
    var diagram_url = 'img/sections/angels_SEC{0}.png',
        photo_url = 'img/photos/{0}{1}{2}{3}.jpg',
        mailto_url = 'mailto:?subject={0}&body={1}',
        hash_re = new RegExp('^#(\\d{3})-(\\d{1,2})-(\\d{1,2})$'),
        section_metadata = {
            'A': {
                'name': 'A',
                'rows': 10,
                'columns': 17,
                'photos':
            },
            'B': {
                'name': 'B',
                'rows': 10,
                'columns': 16,
                'photos':
            },
            'C': {
                'name': 'C',
                'rows': 10,
                'columns': 16,
                'photos':
            },
            'D': {
                'name': 'D',
                'rows': 9,
                'columns': 15,
                'photos':
            },
            'E': {
                'name': 'E',
                'rows': 9,
                'columns': 16,
                'photos':
            },
            'F': {
                'name': 'F',
                'rows': 9,
                'columns': 15,
                'photos':
            },
            'G': {
                'name': 'G',
                'rows': 8,
                'columns': 14,
                'photos':
            },
            'H': {
                'name': 'H',
                'rows': 8,
                'columns': 16,
                'photos':
            },
            'I': {
                'name': 'I',
                'rows': 8,
                'columns': 14,
                'photos':
            },
            'J': {
                'name': 'J',
                'rows': 9,
                'columns': 15,
                'photos':
            },
            'K': {
                'name': 'K',
                'rows': 9,
                'columns': 16,
                'photos':
            },
            'L': {
                'name': 'L',
                'rows': 9,
                'columns': 15,
                'photos':
            },
            'M': {
                'name': 'M',
                'rows': 10,
                'columns': 15,
                'photos':
            },
            'N': {
                'name': 'N',
                'rows': 10,
                'columns': 16,
                'photos':
            },
            'O': {
                'name': 'O',
                'rows': 10,
                'columns': 17,
                'photos':
            },
            'P': {
                'name': 'P',
                'rows': 10,
                'columns': 18,
                'photos':
            },
            'LF1': {
                'name': 'LF1',
                'rows': 10,
                'columns': 18,
                'photos':
            },
            'LFB1': {
                'name': 'LFB1',
                'rows': 6,
                'columns': 18,
                'photos':
            },
            'LF2': {
                'name': 'LF2',
                'rows': 19,
                'columns': 27,
                'photos':
            },
            'LLF2': {
                'name': 'LLF2',
                'rows': 6,
                'columns': 27,
                'photos':
            },
            'LF3': {
                'name': 'LF3',
                'rows': 19,
                'columns': 18,
                'photos':
            },
            'LLF3': {
                'name': 'LLF3',
                'rows': 7,
                'columns': 18,
                'photos':
            },
            'LF4': {
                'name': 'LF4',
                'rows': 19,
                'columns': 23,
                'photos':
            },
            'LLF4': {
                'name': 'LLF4',
                'rows': 7,
                'columns': 23,
                'photos':
            },
            'RF1': {
                'name': 'RF1',
                'rows': 19,
                'columns': 27,
                'photos':
            },
            'RF2': {
                'name': 'RF2',
                'rows': 19,
                'columns': 18,
                'photos':
            },
            'RFB2': {
                'name': 'RFB2',
                'rows': 6,
                'columns': 14,
                'photos':
            },
            'RF3': {
                'name': 'RF3',
                'rows': 19,
                'columns': 23,
                'photos':
            },
            'RFB3': {
                'name': 'RFB3',
                'rows': 6,
                'columns': 18,
                'photos':
            },
        }
        section_sizes = {
            'A': [17, 10],
            'B': [16, 10],
            'C': [16, 10],
            'D': [15, 9],
            'E': [16, 9],
            'F': [15, 9],
            'G': [14, 8],
            'H': [16, 8],
            'I': [14, 8],
            'J': [15, 9],
            'K': [16, 9],
            'L': [15, 9],
            'M': [15, 10],
            'N': [16, 10],
            'O': [17, 10],
            'P': [18, 10],
            'LF1': [18, 10],
            'LFB1': [18, 6],
            'LF2': [27, 19],
            'LLF2': [27, 6],
            'LF3': [18, 19],
            'LLF3': [18, 7],
            'LF4': [23, 19],
            'LLF4': [23, 7],
            'RF1': [27, 19],
            'RF2': [18, 19],
            'RFB2': [14, 6],
            'RF3': [23, 19],
            'RFB3': [18, 6],
        },
        section_matricies = {
            'A': [3, 3, 3],
            'B': [3, 3, 3],
            'C': [3, 3, 3],
            'D': [3, 3, 3],
            'E': [3, 3, 3],
            'F': [3, 3, 3],
            'G': [3, 3, 3],
            'H': [3, 3, 3],
            'I': [3, 3, 3],
            'J': [3, 3, 3],
            'K': [3, 3, 3],
            'L': [3, 3, 3],
            'M': [3, 3, 3],
            'N': [3, 3, 3],
            'O': [3, 3, 3],
            'P': [3, 3, 3],
            'LF1': [2, 2, 2],
            'LFB1': [2, 2, 2],
            'LF2': [3, 3, 3],
            'LLF2': [2, 2, 2],
            'LF3': [3, 3, 3],
            'LLF3': [2, 2, 2],
            'LF4': [3, 3, 3],
            'LLF4': [2, 2, 2],
            'RF1': [3, 3, 3],
            'RF2': [3, 3, 3],
            'RFB2': [2, 2, 2],
            'RF3': [3, 3, 3],
            'RFB3': [2, 2, 2],
        },
        view_y_options = ['b', 'm', 't'],
        error_state = false;

    function my(selection) {

        function draw_ui(){
            // This function begins setting up the UI elements (canvas, dropdows,
            // event handling, etc.,)
            content_group = svg.append('g')
                .attr('class', 'content');
            content_group.append('rect')
                .attr('id', 'content-background')
                .attr('width', '100%')
                .attr('height', '100%');

            content = content_group.append('g');

            container.select('#seat-selector').on('submit', function(){
                var e = d3.event;
                e.preventDefault();
                view_section(e.target[0].value, e.target[1].value, e.target[2].value);
            })
            section_view_panel.select('.close-button').on('click', close_section);
            section_view_panel.selectAll('.viewSelector > div > div').on('click', function(){
                var e = d3.event;
                e.preventDefault();
                activate_view(d3.select(e.target).attr('class').split(' ')[0]);
            });
            container.select('#seat-selector #section')
                .selectAll('option')
                .data(Object.keys(section_sizes))
                .enter()
                .append('option')
                .attr('value', function(d){return d})
                .text(function(d){return d});
            read_url_hash();
        }

        function load_image(data){
            // This function retrieves the SVG file, parses it and processes all
            // the layers within. It setups up hover and click events within the
            // SVG as well.
            var svgNode = data.getElementsByTagName("svg")[0];
            content.node().appendChild(svgNode);
            $.each(d3.selectAll('#sections > *').nodes(), function(index, val) {
                console.log(val);
                var section = d3.select(val),
                    section_number = section.attr('id').replace('section', '');
                if (section.attr('id') == 'floor'){
                    return
                }
                console.log('SECTION:', section_number)
                // sections.push(section_number);
                section.datum({'number': section_number});
                section.on('mouseover', function(d){
                    // console.log('hover, ', this);
                    $(this).attr('orig-fill', $(this).attr('fill'));
                    $(this).attr('fill', 'red');
                }).on('mouseout', function(d){
                    $(this).attr('fill', $(this).attr('orig-fill'));
                }).on('click', function(d){
                    container.select('#seat-selector #section').node().value = section_number;
                    view_section(section_number, '', '');
                });
            });
        }

        function translate_seat_to_photo(section, row, seat){
            // This function takes care of finding the photo that should be
            // displayed when a section+row+seat is selected. It translates
            // the many possible options down to the few available photos,
            // however they were shot (3x3 grid, 3x2 grid, etc.)

            // console.log('z', section, row, seat)
            // console.log(typeof(row), typeof(seat))

            var section_size = section_sizes[section],
                section_matrix = section_matricies[section],
                x_size = section_size[0],
                y_size = section_size[1],
                seat = !isNaN(parseInt(seat)) ? +seat : (x_size / 2),
                row = !isNaN(parseInt(row)) ? +row : Math.floor(y_size / 2),
                x_ratio = (seat / x_size),
                y_ratio = row / y_size,
                photo_x,
                photo_y, photo_y_index;

            // Test to see if selected row/seat are out of bounds
            if (x_ratio > 1 || y_ratio > 1) {
                return null
            };

            // Calculate photo-y
            photo_y_index = Math.min(Math.floor(y_ratio * 3), 2);
            photo_y = view_y_options[photo_y_index];

            // Calculate photo-x
            switch (section_matrix[photo_y_index]) {
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
            console.log("photo_x", photo_x);
            console.log("photo_y", photo_y);


            if (x_ratio > 1 || y_ratio > 1) {
                return null;
            };
            return [
                section,
                photo_y,
                photo_x
            ];
        }

        function activate_photo(section, row, seat) {
            console.log('--> activate_photo()')
            section_photoview = translate_seat_to_photo(section, row, seat);
            if (section_photoview == null) {
                return false;
            };
            // console.log(section_photoview)
            do_activate_photo(section_photoview);
            write_url_hash(section, row, seat);
            return true;
        }

        function do_activate_photo(photo_params){
            section_view_panel.select('.photo').attr(
                'src', photo_url.format(
                    photo_params[0],   // Section
                    photo_params[2],   // Photo Y
                    photo_params[3])); // Photo X
        }

        function activate_view(view){
            var section = container.select('#seat-selector #section').node().value;
            do_activate_photo(section, view);
        }

        function read_url_hash(){
            // This function reads the permalink hash from the URL and will
            // display a selected seat's overlay upon page load.
            var hash = window.location.hash;
            console.log(hash)

            if (hash_re.test(hash)) {
                var matches = hash_re.exec(hash),
                    section = matches[1],
                    row = matches[2],
                    seat = parseInt(matches[3]);
                container.select('#seat-selector #section').node().value = section;
                view_section(section, row, seat);
                activate_photo(section, row, seat);
            } else if (parseInt(hash.slice(1)) > 0) {
                var section = parseInt(hash.slice(1));
                container.select('#seat-selector #section').node().value = section;
                view_section(section, '', '');
                // activate_photo(section, '', '');
            };
        }
        function write_url_hash(section, row, seat){
            // Writes the permalink hash to the URL
            window.location.hash = section + '-' + row + '-' + seat;
        }

        function view_section(sec, row, seat){
            // The main function that handles viewing a section. This is used by
            // many other parts of the code.
            console.log(sec, row, seat);
            var result = activate_photo(sec, row, seat);
            if (!result) {
                show_error("Please select a valid seat");
                return
            };
            console.log(diagram_url.format(sec))
            section_view_panel.select('.diagram img').attr('src', diagram_url.format(sec));
            section_view_panel.select('.title').text('Section ' + sec);
            section_view_panel.style('display', 'block');
            jQuery('.viewSelector > div').css('height', (jQuery('.section-details').width() / 2) + 'px');
        }

        function close_section(){
            // Closes the section overlay.
            section_view_panel.style('display', 'none');
            window.location.hash = '';
        }

        function update_share_urls(section, view){
            // Handles updating all the share URLs with the permalink for the
            // selected seat.
            // Facebook

            // Twitter

            // Email
            section_view_panel.select('.sharing .email').attr(
                'href',
                mailto_url.format(
                    encodeURIComponent('Spokesman: View my seat selection at The Mac' ),
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
            // svg,


        /* ========== SETUP SVG ========== */

        container = selection,
        svg = selection.select('.canvas'),
        section_view_panel = selection.select('.section-view-panel'),
        error_pane = jQuery('.error').fadeOut();

        /* ============================= */
        /* ========== RUNTIME ========== */
        /* ============================= */

        draw_ui();
        d3.xml('img/stadium.svg', load_image);

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

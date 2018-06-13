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
        photo_url = 'img/photos/{0}/{1}{2}.jpg',
        mailto_url = 'mailto:?subject={0}&body={1}',
        hash_re = new RegExp('^#(\\d{3})([a-z]{1,2})(\\d{1,2})$'),
        sections = [],
        // The sections where they only took three horiz. photos
        threeBySections = [],
        section_sizes = {
            'A': [10,10],
            'B': [10,10],
            'C': [10,10],
            'D': [10,10],
            'E': [10,10],
            'F': [10,10],
            'G': [10,10],
            'H': [10,10],
            'I': [10,10],
            'J': [10,10],
            'K': [10,10],
            'L': [10,10],
            'M': [10,10],
            'N': [10,10],
            'O': [10,10],
            'P': [10,10],
            'LFB1U': [10,10],
            'LFB1L': [10,10],
            'LF2U': [10,10],
            'LF2L': [10,10],
            'LF3U': [10,10],
            'LF3L': [10,10],
            'LF4U': [10,10],
            'LF4L': [10,10],
            'RF1': [10,10],
            'RF2': [10,10],
            'RF3': [10,10],
            'RFB2': [10,10],
            'RFB3': [10,10],
        },
        row_options = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32
        ],
        view_x_options = ['l', 'm', 'r'],
        view_y_options = ['l', 'm', 't'],
        error_state = false;

    function my(selection) {

        function draw_ui(){
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
            var svgNode = data.getElementsByTagName("svg")[0];
            content.node().appendChild(svgNode);
            $.each(svg.selectAll('path')[0], function(index, val) {
                console.log('foo')
                var section = d3.select(val),
                    section_number = section.attr('id').replace('section', '');
                if (section.attr('id') == 'floor'){
                    return
                }
                console.log('SECTION:', section_number)
                // sections.push(section_number);
                section.datum({'number': section_number});
                // section.select('g').remove();
                section.on('mouseover', function(d){
                    $(this).attr('orig-fill', $(this).attr('fill'));
                    $(this).attr('fill', 'red');
                }).on('mouseout', function(d){
                    $(this).attr('fill', $(this).attr('orig-fill'));
                }).on('click', function(d){
                    console.log('click: ', section_number);
                    container.select('#seat-selector #section').node().value = section_number;
                    view_section(section_number, 1, 1);
                });
            });
        }

        function translate_seat_to_photo(section, row, seat){

            var section_size = section_sizes[section],
                x_size = section_size[0],
                y_size = section_size[1],
                x_ratio = (seat / x_size),
                y_ratio = row_options.indexOf(row) / y_size;
            console.log(section, row, seat)
            console.log(section_size, x_size, y_size, x_ratio, y_ratio)
            console.log(row_options.indexOf(row) / y_size)

            if (x_ratio >= 1 || y_ratio >= 1) {
                return null
            };
            return [
                section,
                view_y_options[Math.floor(y_ratio/.33)] +
                ((threeBySections.indexOf(section) > -1) ? 'm' : view_x_options[Math.floor(x_ratio/.33)])
            ];
        }

        function activate_photo(section, row, seat) {
            console.log('--> activate_photo()')
            section_photoview = translate_seat_to_photo(section, row, seat);
            if (section_photoview == null) {
                return false;
            };
            console.log('section_photoview: ', section_photoview)
            do_activate_photo(section_photoview[0], section_photoview[1]);
            write_url_hash(section, row, seat);
            return true;
        }

        function do_activate_photo(section, view){
            section_view_panel.select('.photo').attr(
                'src', photo_url.format(
                    Math.floor(section / 100) * 100,
                    section,
                    view));
            section_view_panel.selectAll('.viewSelector > div > .active').classed('active', false);
            section_view_panel.selectAll('.viewSelector > div > .' + view).classed('active', true);
        }

        function activate_view(view){
            var section = container.select('#seat-selector #section').node().value;
            do_activate_photo(section, view);
        }

        function read_url_hash(){
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
            };
        }
        function write_url_hash(section, row, seat){
            window.location.hash = section + row + seat;
        }

        function view_section(sec, row, seat){
            console.log(sec, row, seat);
            var result = activate_photo(sec, row, seat);
            if (!result) {
                show_error("Please select a valid seat");
                return
            };
            console.log(diagram_url.format(sec))
            section_view_panel.select('.diagram img').attr('src', diagram_url.format(sec));
            section_view_panel.select('.title').text('Section ' + sec);
            section_view_panel.selectAll('.viewSelector > div').classed('active', false);
            if (threeBySections.indexOf(sec) > -1) {
                section_view_panel.select('.viewSelector > .threeBy').classed('active', true);
            } else {
                section_view_panel.select('.viewSelector > .nineBy').classed('active', true);
            };
            section_view_panel.style('display', 'block');
            jQuery('.viewSelector > div').css('height', (jQuery('.section-details').width() / 2) + 'px');
        }

        function close_section(){
            section_view_panel.style('display', 'none');
            window.location.hash = '';
        }

        function update_share_urls(section, view){
            // Facebook

            // Twitter

            // Email
            section_view_panel.select('.sharing .email').attr(
                'href',
                mailto_url.format(
                    encodeURIComponent('OCREGISTER: View my seat selection at Angel\'s Stadium' ),
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

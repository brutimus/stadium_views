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
    var diagram_url = 'img/sections/{0}.png',
        photo_url = 'img/photos/{0}{1}{2}.jpg',
        mailto_url = 'mailto:?subject={0}&body={1}',
        hash_re = new RegExp('^#([a-z0-9]+)-(\\d+)-(\\d+)$'),
        section_metadata = {
            'a': {
                'name': 'Section A',
                'rows': 10,
                'columns': 17,
                'photos': [3, 3, 3]
            },
            'b': {
                'name': 'Section B',
                'rows': 10,
                'columns': 16,
                'photos': [3, 3, 3]
            },
            'c': {
                'name': 'Section C',
                'rows': 10,
                'columns': 16,
                'photos': [3, 3, 3]
            },
            'd': {
                'name': 'Section D',
                'rows': 9,
                'columns': 15,
                'photos': [3, 3, 3]
            },
            'e': {
                'name': 'Section E',
                'rows': 9,
                'columns': 16,
                'photos': [3, 3, 3]
            },
            'f': {
                'name': 'Section F',
                'rows': 9,
                'columns': 15,
                'photos': [3, 3, 3]
            },
            'g': {
                'name': 'Section G',
                'rows': 8,
                'columns': 14,
                'photos': [3, 3, 3]
            },
            'h': {
                'name': 'Section H',
                'rows': 8,
                'columns': 16,
                'photos': [3, 3, 3]
            },
            'i': {
                'name': 'Section I',
                'rows': 8,
                'columns': 14,
                'photos': [3, 3, 3]
            },
            'j': {
                'name': 'Section J',
                'rows': 9,
                'columns': 15,
                'photos': [3, 3, 3]
            },
            'k': {
                'name': 'Section K',
                'rows': 9,
                'columns': 16,
                'photos': [3, 3, 3]
            },
            'l': {
                'name': 'Section L',
                'rows': 9,
                'columns': 15,
                'photos': [3, 3, 3]
            },
            'm': {
                'name': 'Section M',
                'rows': 10,
                'columns': 15,
                'photos': [3, 3, 3]
            },
            'n': {
                'name': 'Section N',
                'rows': 10,
                'columns': 16,
                'photos': [3, 3, 3]
            },
            'o': {
                'name': 'Section O',
                'rows': 10,
                'columns': 17,
                'photos': [3, 3, 3]
            },
            'p': {
                'name': 'Section P',
                'rows': 10,
                'columns': 18,
                'photos': [3, 3, 3]
            },
            'lf1': {
                'name': 'Section LF1',
                'rows': 10,
                'columns': 18,
                'photos': [3, 3]
            },
            'lfb1': {
                'name': 'Section LFB1',
                'rows': 6,
                'columns': 18,
                'photos': [3, 3]
            },
            'lf2': {
                'name': 'Section LF2',
                'rows': 19,
                'columns': 27,
                'photos': [3, 3, 3]
            },
            'llf2': {
                'name': 'Section LLF2',
                'rows': 6,
                'columns': 27,
                'photos': [3, 3]
            },
            'lf3': {
                'name': 'Section LF3',
                'rows': 19,
                'columns': 18,
                'photos': [3, 3, 3]
            },
            'llf3': {
                'name': 'Section LLF3',
                'rows': 7,
                'columns': 18,
                'photos': [3, 3]
            },
            'lf4': {
                'name': 'Section LF4',
                'rows': 19,
                'columns': 23,
                'photos': [3, 3, 3]
            },
            'llf4': {
                'name': 'Section LLF4',
                'rows': 7,
                'columns': 23,
                'photos': [3, 3]
            },
            'rf1': {
                'name': 'Section RF1',
                'rows': 19,
                'columns': 27,
                'photos': [3, 3, 3]
            },
            'rf2': {
                'name': 'Section RF2',
                'rows': 19,
                'columns': 18,
                'photos': [3, 3, 3]
            },
            'rfb2': {
                'name': 'Section RFB2',
                'rows': 6,
                'columns': 14,
                'photos': [3, 3]
            },
            'rf3': {
                'name': 'Section RF3',
                'rows': 19,
                'columns': 23,
                'photos': [3, 3, 3]
            },
            'rfb3': {
                'name': 'Section RFB3',
                'rows': 6,
                'columns': 18,
                'photos': [3, 3]
            },
            'skybox3': {
                'name': 'Skybox 3',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox4': {
                'name': 'Skybox 4',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox5': {
                'name': 'Skybox 5',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox6': {
                'name': 'Skybox 6',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox7': {
                'name': 'Skybox 7',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox8': {
                'name': 'Skybox 8',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox9': {
                'name': 'Skybox 9',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox10': {
                'name': 'Skybox 10',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox11': {
                'name': 'Skybox 11',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox12': {
                'name': 'Skybox 12',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox13': {
                'name': 'Skybox 13',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox14': {
                'name': 'Skybox 14',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox15': {
                'name': 'Skybox 15',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox16': {
                'name': 'Skybox 16',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox17': {
                'name': 'Skybox 17',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox18': {
                'name': 'Skybox 18',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox19': {
                'name': 'Skybox 19',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox20': {
                'name': 'Skybox 20',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox21': {
                'name': 'Skybox 21',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox22': {
                'name': 'Skybox 22',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox23': {
                'name': 'Skybox 23',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox24': {
                'name': 'Skybox 24',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox25': {
                'name': 'Skybox 25',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },
            'skybox26': {
                'name': 'Skybox 26',
                'rows': 1,
                'columns': 1,
                'photos': [1]
            },

        },
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
            // section_view_panel.selectAll('.viewSelector > div > div').on('click', function(){
            //     var e = d3.event;
            //     e.preventDefault();
            //     activate_view(d3.select(e.target).attr('class').split(' ')[0]);
            // });
            container.select('#seat-selector #section')
                .on('change', update_rows_seats_options)
                .selectAll('option')
                .data(d3.entries(section_metadata))
                .enter()
                    .append('option')
                    .attr('value', function(d){return d.key})
                    .text(function(d){return d.value.name});
            update_rows_seats_options();
            read_url_hash();

            zoom = d3.zoom()
                .scaleExtent([1, 3])
                .on("zoom", function () {
                    content.attr("transform", d3.event.transform)
                });

            content_group
                .call(zoom);

        }

        function load_image(data){
            // This function retrieves the SVG file, parses it and processes all
            // the layers within. It setups up hover and click events within the
            // SVG as well.
            var svgNode = data.getElementsByTagName("svg")[0];
            content.node().appendChild(svgNode);
            $.each(d3.selectAll('#sections > g').nodes(), function(index, val) {
                console.log(val);
                var section = d3.select(val),
                    section_number = section.attr('id');
                console.log('SECTION:', section_number)
                section.datum({'number': section_number});
                section.on('click', function(d){
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

            var section_config = section_metadata[section],
                x_size = section_config.columns,
                y_size = section_config.rows,
                seat = !isNaN(parseInt(seat)) ? +seat : (x_size / 2),
                row = !isNaN(parseInt(row)) ? +row : Math.floor(y_size / 2),
                x_ratio = (seat / x_size),
                y_ratio = row / y_size,
                photo_x,
                photo_y, photo_y_index,
                x_photo_positions,
                y_photo_positions = section_config.photos.length;

            // Test to see if selected row/seat are out of bounds
            if (x_ratio > 1 || y_ratio > 1) {
                return null
            };

            // Calculate photo-y
            console.log('y_ratio: ', y_ratio)
            console.log('y_index: ', Math.floor(y_ratio * y_photo_positions))

            photo_y_index = Math.floor(y_ratio * y_photo_positions);

            switch (y_photo_positions) {
                case 1:
                    photo_y = '';
                    break;
                case 2:
                    photo_y = ['b', 't'][photo_y_index]
                    break;
                case 3:
                    photo_y = ['b', 'm', 't'][photo_y_index]
                    break;
            }

            x_photo_positions = section_config.photos[photo_y_index];

            // Calculate photo-x
            switch (x_photo_positions) {
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
            console.log('activate_photo().section_photoview: ', section_photoview);
            if (section_photoview == null) {
                return false;
            };
            do_activate_photo(section_photoview);
            write_url_hash(section, row, seat);
            return true;
        }

        function do_activate_photo(photo_params){
            console.log('do_activate_photo(): ', photo_params);
            section_view_panel.select('.photo').attr(
                'src', photo_url.format(
                    photo_params[0],   // Section
                    photo_params[1],   // Photo Y
                    photo_params[2])); // Photo X
        }

        function activate_view(view){
            var section = container.select('#seat-selector #section').node().value;
            do_activate_photo([section, view[0], view[1]]);
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

            //TODO: Fix this so that it can be variable, for this graphic all
            // sections have three columns.
            switch (section_metadata[sec].photos[0]) {
                case 1:
                    selector_x_options = []
                    break;
                case 2:
                    selector_x_options = ['l', 'r']
                    break;
                case 3:
                    selector_x_options = ['l', 'c', 'r']
                    break;
            }

            switch (section_metadata[sec].photos.length) {
                case 1:
                    selector_y_options = []
                    break;
                case 2:
                    selector_y_options = ['b', 't']
                    break;
                case 3:
                    selector_y_options = ['b', 'm', 't']
                    break;
            }

            var touch_options = selector_y_options.map(function(dy){
                return selector_x_options.map(function(dx){
                    return dy + dx
                })
            })
            console.log(touch_options);

            var row_divs = d3.select('.diagram .viewSelector')
                .html(null)
                .selectAll('div')
                .data(touch_options)
                .enter()
                    .append('div')
                    .attr('class', 'selectorRow');

            row_divs.selectAll('div')
                .data(function(d){return d})
                .enter()
                    .append('div')
                    .attr('class', function(d){return d})
                    .on('click', activate_view);
        }

        function update_rows_seats_options(){
            // Handles the updating of the seat and row dropdowns depending
            // on which section is selected.
            var selected = d3.select('#section').property('value');
                section_config = section_metadata[selected],
                rows = section_config.rows,
                seats = section_config.columns;
            console.log(selected, rows, seats)

            d3.select('#seat-selector #row')
                .html(null)
                .selectAll('option')
                .data(d3.range(1, rows + 1))
                .enter()
                    .append('option')
                    .attr('value', function(d){return d})
                    .text(function(d){return 'Row ' + d});
            
            d3.select('#seat-selector #seat')
                .html(null)
                .selectAll('option')
                .data(d3.range(1, seats + 1))
                .enter()
                    .append('option')
                    .attr('value', function(d){return d})
                    .text(function(d){return 'Seat ' + d});
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
                    encodeURIComponent('Spokesman: View my seat selection' ),
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

        /* ========== SETUP SVG ========== */

        container = selection,
        svg = selection.select('.canvas'),
        section_view_panel = selection.select('.section-view-panel'),
        // error_pane = jQuery('.error').fadeOut();

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

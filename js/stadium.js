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
    var diagram_url = '../img/sections/angels_SEC{0}.png',
        photo_url = '../img/photos/{0}/{1}{2}.jpg',
        mailto_url = 'mailto:?subject={0}&body={1}',
        hash_re = new RegExp('^#(\\d{3})([a-z]{1,2})(\\d{1,2})$'),
        sections = [],
        threeBySections = [
            201,202,203,204,205,206,207,208,209,210,211,212,213,221,222,223,
            224,225,226,227,228,229,230,231,232,233,236,240,241,242,243,244,
            249,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,
            316,317,318,319,320,321,322,330,331,332,333,334,335,336,337,338,
            339,340,341,342,343,344,345,346,347,348],
        section_sizes = {
            101: [28, 25], 102: [28, 25], 103: [28, 25], 104: [15, 25], 105: [28, 25],
            106: [28, 25], 107: [28, 25], 108: [28, 25], 109: [28, 25], 110: [28, 25],
            111: [28, 25], 112: [28, 25], 113: [28, 25], 114: [28, 15], 115: [10, 15],
            116: [10, 10], 117: [10, 10], 118: [10, 10], 119: [10, 10], 120: [10, 10],
            121: [10, 10], 122: [28, 15], 123: [28, 25], 124: [28, 25], 125: [28, 25],
            126: [28, 25], 127: [28, 25], 128: [28, 25], 129: [28, 25], 130: [28, 25],
            131: [28, 25], 132: [15, 25], 133: [28, 25], 201: [28, 15], 202: [28, 15],
            203: [28, 15], 204: [28, 15], 205: [28, 15], 206: [28, 15], 207: [28, 15],
            208: [28, 15], 209: [28, 15], 210: [28, 15], 211: [28, 15], 212: [28, 15],
            213: [28, 15], 214: [28, 15], 215: [28, 15], 216: [28, 15], 217: [28, 15],
            218: [28, 15], 219: [28, 15], 220: [28, 15], 221: [28, 15], 222: [28, 15],
            223: [28, 15], 224: [28, 15], 225: [28, 15], 226: [28, 15], 227: [28, 15],
            228: [28, 15], 229: [28, 15], 230: [28, 15], 231: [28, 15], 232: [28, 15],
            233: [28, 15], 236: [15, 25], 237: [28, 25], 238: [28, 25], 239: [28, 25],
            240: [15, 25], 241: [10, 15], 242: [10, 15], 243: [15, 15], 244: [15, 15],
            245: [28, 15], 246: [28, 15], 247: [28, 15], 248: [28, 15], 249: [15, 15],
            256: [15, 10], 257: [28, 25], 258: [28, 15], 259: [28, 15], 260: [28, 15],
            301: [28, 10], 302: [28, 10], 303: [28, 10], 304: [28, 10], 305: [28, 10],
            306: [28, 10], 307: [15, 10], 308: [10, 10], 309: [15, 10], 310: [15, 10],
            311: [15, 10], 312: [15, 10], 313: [15, 10], 314: [15, 10], 315: [15, 10],
            316: [15, 10], 317: [15, 10], 318: [15, 10], 319: [15, 10], 320: [15, 10],
            321: [28, 10], 322: [15, 10], 330: [15, 10], 331: [28, 10], 332: [15, 10],
            333: [15, 10], 334: [15, 10], 335: [15, 10], 336: [15, 10], 337: [15, 10],
            338: [15, 10], 339: [15, 10], 340: [15, 10], 341: [15, 10], 342: [15, 10],
            343: [15, 10], 344: [15, 10], 345: [15, 10], 346: [28, 10], 347: [28, 10],
            348: [28, 10], 349: [28, 10], 350: [28, 10], 351: [28, 10], 401: [28, 15],
            402: [28, 15], 403: [28, 15], 404: [28, 15], 405: [28, 15], 406: [28, 15],
            407: [28, 15], 408: [28, 15], 409: [28, 15], 410: [28, 15], 411: [28, 15],
            412: [28, 15], 413: [28, 15], 414: [28, 15], 415: [28, 15], 416: [28, 15],
            417: [28, 15], 418: [28, 15], 419: [28, 15], 420: [28, 15], 421: [28, 15],
            422: [28, 15], 423: [28, 15], 424: [28, 15], 425: [28, 15], 426: [28, 15],
            427: [28, 15], 428: [28, 15], 429: [28, 15], 430: [28, 15], 431: [28, 15],
            432: [28, 15], 433: [28, 15], 434: [28, 15], 435: [28, 15], 436: [28, 15],
            501: [10, 15], 502: [28, 15], 503: [28, 15], 504: [28, 15], 505: [28, 15],
            506: [28, 15], 507: [28, 15], 508: [28, 15], 509: [28, 15], 510: [28, 15],
            511: [28, 15], 512: [28, 15], 513: [28, 15], 514: [28, 15], 515: [28, 15],
            516: [28, 15], 517: [28, 15], 518: [28, 15], 519: [28, 15], 520: [15, 15],
            521: [15, 15], 522: [28, 15], 523: [28, 15], 524: [28, 15], 525: [28, 15],
            526: [28, 15], 527: [28, 15], 528: [28, 15], 529: [28, 15], 530: [28, 15],
            531: [28, 15], 532: [28, 15], 533: [28, 15], 534: [28, 15], 535: [28, 15],
            536: [28, 15], 537: [28, 15], 538: [28, 15], 539: [28, 15], 540: [10, 15]
        },
        row_options = [
            'aa','bb','a','b','c','d','e','f','g','h','j','k',
            'l','m','n','p','r','s','t','u','v','w','x','y','z'
        ],
        view_x_options = ['l', 'm', 'r'],
        view_y_options = ['l', 'm', 't'];

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
            read_url_hash();
        }

        function load_image(data){
            var svgNode = data.getElementsByTagName("svg")[0];
            content.node().appendChild(svgNode);
            $.each(svg.select('#sections').selectAll('#sections > g')[0], function(index, val) {
                var section = d3.select(val),
                    section_number = section.attr('id').substring(7, 10);
                sections.push(section_number);
                section.datum({'number': section_number});
                section.select('g').remove();
                section.select('path').on('mouseover', function(d){
                    $(this).attr('orig-fill', $(this).attr('fill'));
                    $(this).attr('fill', 'red');
                }).on('mouseout', function(d){
                    $(this).attr('fill', $(this).attr('orig-fill'));
                }).on('click', function(d){
                    container.select('#seat-selector #section').node().value = parseInt(section_number);
                    view_section(section_number, 'a', 1);
                });
            });
            container.select('#seat-selector #section')
                .selectAll('option')
                .data(sections)
                .enter()
                .append('option')
                .attr('value', function(d){return d})
                .text(function(d){return d});
        }

        function translate_seat_to_photo(section, row, seat){

            var section_size = section_sizes[section],
                x_size = section_size[0],
                y_size = section_size[1],
                x_ratio = (seat / x_size),
                y_ratio = row_options.indexOf(row) / y_size;
            console.log(section, row, seat)
            console.log(x_size, y_size, x_ratio, y_ratio)
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
            section_photoview = translate_seat_to_photo(section, row, seat);
            if (section_photoview == null) {
                return false;
            };
            console.log(section_photoview)
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
            var section = parseInt(container.select('#seat-selector #section').node().value);
            do_activate_photo(section, view);
        }

        function read_url_hash(){
            var hash = window.location.hash;
            console.log(hash)
            if (hash_re.test(hash)) {
                var matches = hash_re.exec(hash),
                    section = parseInt(matches[1]),
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

        function view_section(number, row, seat){
            console.log(number, row, seat);
            var number = parseInt(number),
                result = activate_photo(number, row, seat);
            if (!result) {
                return
                // Error here
            };
            console.log(diagram_url.format(number))
            section_view_panel.select('.diagram img').attr('src', diagram_url.format(number));
            section_view_panel.select('.title').text('Section ' + number);
            section_view_panel.selectAll('.viewSelector > div').classed('active', false);
            if (threeBySections.indexOf(number) > -1) {
                section_view_panel.select('.viewSelector > .threeBy').classed('active', true);
            } else {
                section_view_panel.select('.viewSelector > .nineBy').classed('active', true);
            };
            section_view_panel.style('display', 'block');
            jQuery('.viewSelector > div').css('height', jQuery('.diagram img').width() + 'px');
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


        /* ========== VARIABLES & FUNCTIONS ========== */
        var spreadsheet_url = '',
            // svg,


        /* ========== SETUP SVG ========== */

        container = selection,
        svg = selection.select('.canvas'),
        section_view_panel = selection.select('.section-view-panel');

        /* ============================= */
        /* ========== RUNTIME ========== */
        /* ============================= */

        draw_ui();
        d3.xml('../img/stadium.svg', load_image);

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

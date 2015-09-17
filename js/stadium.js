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
            111: [28, 25], 112: [28, 25], 113: [28, 25], 114: [28, 15], 115: [10, 10],
            116: [10, 10], 117: [10, 10], 118: [10, 10], 119: [10, 10], 120: [10, 10],
            121: [10, 10], 122: [28, 15], 123: [28, 25], 124: [28, 25], 125: [28, 25],
            126: [28, 25], 127: [28, 25], 128: [28, 25], 129: [28, 25], 130: [28, 25],
            131: [28, 25], 132: [15, 25], 133: [28, 25], 201: [28, 10], 202: [28, 10],
            203: [28, 10], 204: [28, 10], 205: [28, 10], 206: [28, 10], 207: [28, 10],
            208: [28, 10], 209: [28, 10], 210: [28, 10], 211: [28, 10], 212: [28, 10],
            213: [28, 10], 214: [28, 10], 215: [28, 10], 216: [28, 10], 217: [28, 10],
            218: [28, 10], 219: [28, 10], 220: [28, 10], 221: [28, 10], 222: [28, 10],
            223: [28, 10], 224: [28, 10], 225: [28, 10], 226: [28, 10], 227: [28, 10],
            228: [28, 10], 229: [28, 10], 230: [28, 10], 231: [28, 10], 232: [28, 10],
            233: [28, 10], 236: [15, 25], 237: [28, 25], 238: [28, 25], 239: [28, 25],
            240: [15, 25], 241: [10, 10], 242: [10, 10], 243: [15, 10], 244: [15, 10],
            245: [28, 10], 246: [28, 10], 247: [28, 10], 248: [28, 10], 249: [15, 10],
            256: [15, 10], 257: [28, 25], 258: [28, 15], 259: [28, 15], 260: [28, 15],
            301: [28, 10], 302: [28, 10], 303: [28, 10], 304: [28, 10], 305: [28, 10],
            306: [28, 10], 307: [15, 10], 308: [10, 10], 309: [15, 10], 310: [15, 10],
            311: [15, 10], 312: [15, 10], 313: [15, 10], 314: [15, 10], 315: [15, 10],
            316: [15, 10], 317: [15, 10], 318: [15, 10], 319: [15, 10], 320: [15, 10],
            321: [28, 10], 322: [15, 10], 330: [15, 10], 331: [28, 10], 332: [15, 10],
            333: [15, 10], 334: [15, 10], 335: [15, 10], 336: [15, 10], 337: [15, 10],
            338: [15, 10], 339: [15, 10], 340: [15, 10], 341: [15, 10], 342: [15, 10],
            343: [15, 10], 344: [15, 10], 345: [15, 10], 346: [28, 10], 347: [28, 10],
            348: [28, 10], 349: [28, 10], 350: [28, 10], 351: [28, 10], 401: [28, 10],
            402: [28, 10], 403: [28, 10], 404: [28, 10], 405: [28, 10], 406: [28, 10],
            407: [28, 10], 408: [28, 10], 409: [28, 10], 410: [28, 10], 411: [28, 10],
            412: [28, 10], 413: [28, 10], 414: [28, 10], 415: [28, 10], 416: [28, 10],
            417: [28, 10], 418: [28, 10], 419: [28, 10], 420: [28, 10], 421: [28, 10],
            422: [28, 10], 423: [28, 10], 424: [28, 10], 425: [28, 10], 426: [28, 10],
            427: [28, 10], 428: [28, 10], 429: [28, 10], 430: [28, 10], 431: [28, 10],
            432: [28, 10], 433: [28, 10], 434: [28, 10], 435: [28, 10], 436: [28, 10],
            501: [10, 15], 502: [28, 15], 503: [28, 15], 504: [28, 15], 505: [28, 15],
            506: [28, 15], 507: [28, 15], 508: [28, 15], 509: [28, 15], 510: [28, 15],
            511: [28, 15], 512: [28, 15], 513: [28, 15], 514: [28, 15], 515: [28, 15],
            516: [28, 15], 517: [28, 15], 518: [28, 15], 519: [28, 15], 520: [15, 15],
            521: [15, 15], 522: [28, 15], 523: [28, 15], 524: [28, 15], 525: [28, 15],
            526: [28, 15], 527: [28, 15], 528: [28, 15], 529: [28, 15], 530: [28, 15],
            531: [28, 15], 532: [28, 15], 533: [28, 15], 534: [28, 15], 535: [28, 15],
            536: [28, 15], 537: [28, 15], 538: [28, 15], 539: [28, 15], 540: [10, 15]
        };

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
                activate_photo_view(d3.select(e.target).attr('class').split(' ')[0]);
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
                    view_section(section_number);
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

        function activate_photo(number, view) {
            section_view_panel.select('.photo').attr(
                'src', photo_url.format(Math.floor(number / 100) * 100, number, view));
            section_view_panel.selectAll('.viewSelector > div > .active').classed('active', false);
            section_view_panel.selectAll('.viewSelector > div > .' + view).classed('active', true);
            write_url_hash(number, view);
        }

        function activate_photo_view(view){
            var number = parseInt(container.select('#seat-selector #section').node().value);
            activate_photo(number, view);
        }

        function read_url_hash(){
            var hash = window.location.hash;
            console.log(hash)
            if (hash.length == 6) {
                var section = parseInt(hash.substring(1, 4)),
                    view = hash.substring(4);
                container.select('#seat-selector #section').node().value = section;
                view_section(section);
                activate_photo(section, view);
            };
        }
        function write_url_hash(section, view){
            window.location.hash = section + view;
        }

        function view_section(number, row, seat){
            console.log(number, row, seat);
            var number = parseInt(number);
            activate_photo(number, 'mm');
            section_view_panel.select('.diagram').attr('src', diagram_url.format(number));
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

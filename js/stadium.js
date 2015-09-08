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
        sections = [],
        threeBySections = [
            201,202,203,204,205,206,207,208,209,210,211,212,213,221,222,223,
            224,225,226,227,228,229,230,231,232,233,236,240,241,242,243,244,
            249,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,
            316,317,318,319,320,321,322,330,331,332,333,334,335,336,337,338,
            339,340,341,342,343,344,345,346,347,348];

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
                view_section(e.target[0].value);
            })
            section_view_panel.select('.close-button').on('click', close_section);
            section_view_panel.selectAll('.viewSelector > div > div').on('click', function(){
                var e = d3.event;
                e.preventDefault();
                activate_photo_view(d3.select(e.target).attr('class').split(' ')[0]);
            })
        }

        function load_image(data){
            var svgNode = data.getElementsByTagName("svg")[0];
            content.node().appendChild(svgNode);
            // console.log(svg.select('#sections').selectAll('#sections > g')[0])
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
        }

        function activate_photo_view(view){
            var number = parseInt(container.select('#seat-selector #section').node().value);
            activate_photo(number, view);
        }

        function view_section(number){
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
            jQuery('.viewSelector > div').css('height', jQuery('.diagram img').height() + 'px');
        }

        function close_section(){
            section_view_panel.style('display', 'none');
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

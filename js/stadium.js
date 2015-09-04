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
        sections = [];

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

        function view_section(number){
            // console.log(sections)
            section_view_panel.select('.photo').attr('src', photo_url.format(Math.floor(number / 100) * 100, number, 'mm'))
            section_view_panel.select('.diagram').attr('src', diagram_url.format(number));
            section_view_panel.select('.title').text('Section ' + number)
            section_view_panel.style('display', 'block');
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

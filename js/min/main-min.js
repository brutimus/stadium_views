function stadium(){function e(e){function u(){content_group=L.append("g").attr("class","content"),content_group.append("rect").attr("class","content-background").attr("width","100%").attr("height","100%"),content=content_group.append("g"),F.select("#seat-selector").on("submit",function(){var e=d3.event;e.preventDefault(),y(e.target[0].value,e.target[1].value,e.target[2].value)}),S.select(".close-button").on("click",x),S.selectAll(".viewSelector > div > div > div").on("click",function(){var e=d3.event;e.preventDefault(),v(d3.select(e.target).attr("class"))}),g(),zoom=d3.zoom().scaleExtent([1,3]).on("zoom",function(){content.attr("transform",d3.event.transform)}),content_group.call(zoom)}function f(e){var t=e.getElementsByTagName("svg")[0];content.node().appendChild(t),$.each(d3.selectAll("#sections > g").nodes(),function(e,t){var o=d3.select(t),n=o.attr("id"),a=n.length>4?n[4]:"",s=n.substring(1,4);r.indexOf(s)<0&&r.push(s),o.datum({number:s,subsection:a}),o.on("mouseover",function(e){var t=d3.select(this),o=t.select("rect,polygon");o.attr("orig-fill",o.attr("fill")),o.attr("fill","red")}).on("mouseout",function(e){var t=d3.select(this),o=t.select("rect,polygon");o.attr("fill",o.attr("orig-fill"))}).on("click",function(e){F.select("#seat-selector #section").node().value=parseInt(s),y(s,"","",a)})}),r.sort(),F.select("#seat-selector #section").selectAll("option").data(r).enter().append("option").attr("value",function(e){return e}).text(function(e){return e})}function h(e,t,o,n){var a=i[e],s=l[e],c,r=a[0],u=a[1],d;switch(n){case"l":t=7,o=r/2,c=s[0],d=.5;break;case"u":t=(u-lower_upper_cutoff)/2,o=r/2,c=s[1],d=.5;break;case"x":t=lower_upper_cutoff+1,o=r/2,c=s[1],d=1}var o=isNaN(parseInt(o))?r/2:+o,t=isNaN(parseInt(t))?Math.floor(u/2):+t,f=o/r,h,m,w;if(n||(s.length>1?(lower_upper_cutoff>=t?(n="l",d=t/lower_upper_cutoff):s[1].length>1?(n="u",d=(t-lower_upper_cutoff)/(u-lower_upper_cutoff)):(n="x",d=1),c=s["l"==n?0:1]):(d=t/u,n="",c=s[0])),f>1||d>1)return null;switch("x"===n?(w=0,m=""):(w=Math.min(Math.floor(3*d),2),m=p[w]),c[w]){case 1:h="";break;case 2:h=["l","r"][Math.min(Math.floor(2*f),2)];break;case 3:h=["l","c","r"][Math.min(Math.floor(3*f),2)]}return f>1||d>1?null:[e,n,m,h]}function m(e,t,o,n){return section_photoview=h(e,t,o,n),null==section_photoview?!1:(w(section_photoview),_(e,t,o,n),section_photoview)}function w(e){S.select(".photo").attr("src",o.format(e[0],e[1],e[2],e[3]))}function v(e){var t=F.select(".diagram img").attr("src").split("/"),o=t[t.length-1],n,a=o.slice(0,3);switch(o[3]){case"u":case"x":case"l":n=o[3];break;default:n=""}w([a,n,e[0].trim(),e[1].trim()]),b()}function g(){var e=window.location.hash;if(regex_parts=c.exec(e)){var t=parseInt(regex_parts[1]),o=regex_parts[2],n=regex_parts[3],a=regex_parts[4];F.select("#seat-selector #section").node().value=t,y(t,o,n,a)}else if(parseInt(e.slice(1))>0){var t=parseInt(e.slice(1));F.select("#seat-selector #section").node().value=t,y(t,"","")}}function _(e,t,o,n){var a="#"+((e||"")+"-"+(t||"")+"-"+(o||"")+"-"+(n||""));history.pushState?history.replaceState(null,null,a):window.location.hash=a}function y(e,o,n,a){var e=parseInt(e),s=m(e,o,n,a);if(!s)return void k("Please select a valid seat");S.select(".diagram img").attr("src",t.format(s[0],s[1])),S.select(".title").text("Section "+e),S.selectAll(".viewSelector > div").classed("active",!1);var c;switch(s[1]){case"u":case"x":c=l[e][1].join("");break;default:c=l[e][0].join("")}var r=S.select(".viewSelector > .sel"+c).classed("active",!0);S.style("display","block").style("top",($(window).width()/parseFloat($("body").css("font-size"))<=30?$(window).scrollTop():0)+"px");var i=Math.floor(S.select(".lower-right").node().getBoundingClientRect().width-30)/3;r.selectAll(".sel-row div").style("width",i+"px").style("height",i+"px"),jQuery(".viewSelector > div").css("height",jQuery(".section-details").width()/2+"px"),b()}function x(){S.style("display","none"),history.pushState?history.replaceState(null,null,"#"):window.location.hash=hash,b()}function b(){S.select(".sharing .facebook").attr("href",n.format(encodeURIComponent(window.location.href),encodeURIComponent(window.location.href),encodeURIComponent("Spokesman Review: View my seat selection at The Mac"))),S.select(".sharing .twitter").attr("href",a.format(encodeURIComponent("Spokesman Review: View my seat selection at The Mac"),encodeURIComponent(window.location.href))),S.select(".sharing .email").attr("href",s.format(encodeURIComponent("Spokesman Review: View my seat selection at The Mac"),encodeURIComponent(window.location.href)))}function k(e){d===!1&&(d=!0,M.find("p").text(e),M.fadeIn(200),setTimeout(R,2e3))}function R(){M.fadeOut(200),d=!1}var I="",F=e,L=e.select(".canvas"),S=e.select(".section-view-panel"),M=jQuery(".error").fadeOut();u(),d3.xml("https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/stadium.svg",f),document.URL.indexOf("stadiumdebug")>0&&L.on("mousemove.position",function(){var e=d3.mouse(this);console.log(e[0],e[1])})}var t="https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/sections/{0}{1}.png",o="https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/photos/comp/{0}{1}{2}{3}.jpg",n="https://www.facebook.com/dialog/feed?link={0}&app_id=316254480466&redirect_uri={1}&caption={2}",a="https://twitter.com/share?text={0}&url={1}",s="mailto:?subject={0}&body={1}",c=new RegExp("^#(\\d{3})-(\\d{0,2})-(\\d{0,2})-([ulx]?)$"),r=[],i={101:[18,15],102:[22,11],103:[25,32],104:[18,32],105:[18,32],106:[18,32],107:[25,32],108:[22,14],109:[18,15],110:[15,15],111:[22,14],112:[25,32],113:[18,32],114:[18,32],115:[18,32],116:[25,32],117:[22,11],118:[15,15]},l={A:[],B:[],C:[],D:[],E:[],F:[],G:[],H:[],I:[],J:[],K:[],L:[],M:[],N:[],O:[],P:[],LFB1U:[],LFB1L:[],LF2U:[],LF2L:[],LF3U:[],LF3L:[],LF4U:[],LF4L:[],RF1:[],RF2:[],RF3:[],RFB2:[],RFB3:[],101:[[3,3,3]],102:[[1,2,3],[3]],103:[[1,1,2],[2,3,3]],104:[[3,3,3],[3,3,3]],105:[[3,3,3],[3,3,3]],106:[[3,3,3],[3,3,3]],107:[[1,1,2],[2,3,3]],108:[[1,2,3]],109:[[3,3,3]],110:[[3,3,3]],111:[[1,2,3]],112:[[1,1,2],[2,3,3]],113:[[3,3,3],[2,3,3]],114:[[3,3,3],[3,3,3]],115:[[3,3,3],[2,3,3]],116:[[1,1,2],[2,3,3]],117:[[1,2,3],[3]],118:[[3,3,3]]},u=["l","c","r"],p=["b","m","t"],d=!1;return e}String.prototype.format||(String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,o){return"undefined"!=typeof e[o]?e[o]:t})}),$(document).ready(function(){d3.select(".seating-chart-container").call(stadium())});
//# sourceMappingURL=./main-min.js.map
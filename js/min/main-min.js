function stadium(){function e(e){function d(){content_group=C.append("g").attr("class","content"),content_group.append("rect").attr("class","content-background").attr("width","100%").attr("height","100%"),content=content_group.append("g"),M.select("#seat-selector").on("submit",function(){var e=d3.event;e.preventDefault(),b(e.target[0].value,e.target[1].value,e.target[2].value)}),U.select(".close-button").on("click",k),U.selectAll(".viewSelector > div > div > div").on("click",function(){var e=d3.event;e.preventDefault(),w(d3.select(e.target).attr("class"))}),y()}function f(e){var t=e.getElementsByTagName("svg")[0];content.node().appendChild(t),$.each(d3.selectAll("#sections > g").nodes(),function(e,t){var n=d3.select(t),o=n.attr("id"),a=o.length>4?o[4]:"",s=o.substring(1,4);i.indexOf(s)<0&&i.push(s),n.datum({number:s,subsection:a}),n.on("mouseover",function(e){var t=d3.select(this),n=t.select("rect,polygon");n.attr("orig-fill",n.attr("fill")),n.attr("fill","red")}).on("mouseout",function(e){var t=d3.select(this),n=t.select("rect,polygon");n.attr("fill",n.attr("orig-fill"))}).on("click",function(e){M.select("#seat-selector #section").node().value=parseInt(s),b(s,"","",a)})}),i.sort(),M.select("#seat-selector #section").selectAll("option").data(i).enter().append("option").attr("value",function(e){return e}).text(function(e){return e})}function m(e,t,n,o){var a=l[e],s=u[e],c,i=a[0],d=a[1],h;switch(o){case"l":t=7,n=i/2,c=s[0],h=.5;break;case"u":t=(d-r)/2,n=i/2,c=s[1],h=.5;break;case"x":t=r+1,n=i/2,c=s[1],h=1}var n=isNaN(parseInt(n))?i/2:+n,t=isNaN(parseInt(t))?Math.floor(d/2):+t,f=n/i,m,v,g;if(o||(s.length>1?(r>=t?(o="l",h=t/r):s[1].length>1?(o="u",h=(t-r)/(d-r)):(o="x",h=1),c=s["l"==o?0:1]):(h=t/d,o="",c=s[0])),f>1||h>1)return null;switch("x"===o?(g=0,v=""):(g=Math.min(Math.floor(3*h),2),v=p[g]),c[g]){case 1:m="";break;case 2:m=["l","r"][Math.min(Math.floor(2*f),2)];break;case 3:m=["l","c","r"][Math.min(Math.floor(3*f),2)]}return f>1||h>1?null:[e,o,v,m]}function v(e,t,n,o){return section_photoview=m(e,t,n,o),null==section_photoview?!1:(g(section_photoview),x(e,t,n,o),section_photoview)}function g(e){U.select(".photo").attr("src",n.format(e[0],e[1],e[2],e[3]))}function w(e){var t=M.select(".diagram img").attr("src").split("/"),n=t[t.length-1],o,a=n.slice(0,3);switch(n[3]){case"u":case"x":case"l":o=n[3];break;default:o=""}g([a,o,e[0].trim(),e[1].trim()]),I()}function y(){var e=window.location.hash;if(regex_parts=c.exec(e)){var t=parseInt(regex_parts[1]),n=regex_parts[2],o=regex_parts[3],a=regex_parts[4];M.select("#seat-selector #section").node().value=t,b(t,n,o,a)}else if(parseInt(e.slice(1))>0){var t=parseInt(e.slice(1));M.select("#seat-selector #section").node().value=t,b(t,"","")}}function x(e,t,n,o){var a="#"+((e||"")+"-"+(t||"")+"-"+(n||"")+"-"+(o||""));history.pushState?history.replaceState(null,null,a):window.location.hash=a}function b(e,n,o,a){var e=parseInt(e),s=v(e,n,o,a);if(!s)return void S("Please select a valid seat");U.select(".diagram img").attr("src",t.format(s[0],s[1])),U.select(".title").text("Section "+e),U.selectAll(".viewSelector > div").classed("active",!1);var c;switch(s[1]){case"u":case"x":c=u[e][1].join("");break;default:c=u[e][0].join("")}var i=U.select(".viewSelector > .sel"+c).classed("active",!0);U.style("display","block").style("top",($(window).width()/parseFloat($("body").css("font-size"))<=30?$(window).scrollTop():0)+"px");var r=Math.floor(U.select(".lower-right").node().getBoundingClientRect().width-30)/3;i.selectAll(".sel-row div").style("width",r+"px").style("height",r+"px"),jQuery(".viewSelector > div").css("height",jQuery(".section-details").width()/2+"px"),I()}function k(){U.style("display","none"),history.pushState?history.replaceState(null,null,"#"):window.location.hash=hash,I()}function I(){U.select(".sharing .facebook").attr("href",o.format(encodeURIComponent(window.location.href),encodeURIComponent(window.location.href),encodeURIComponent("Spokesman Review: View my seat selection at The Mac"))),U.select(".sharing .twitter").attr("href",a.format(encodeURIComponent("Spokesman Review: View my seat selection at The Mac"),encodeURIComponent(window.location.href))),U.select(".sharing .email").attr("href",s.format(encodeURIComponent("Spokesman Review: View my seat selection at The Mac"),encodeURIComponent(window.location.href)))}function S(e){h===!1&&(h=!0,j.find("p").text(e),j.fadeIn(200),setTimeout(_,2e3))}function _(){j.fadeOut(200),h=!1}var R="",M=e,C=e.select(".canvas"),U=e.select(".section-view-panel"),j=jQuery(".error").fadeOut();d(),d3.xml("https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/stadium.svg",f),document.URL.indexOf("stadiumdebug")>0&&C.on("mousemove.position",function(){var e=d3.mouse(this);console.log(e[0],e[1])})}var t="https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/sections/{0}{1}.png",n="https://s3-us-west-2.amazonaws.com/public.spokesman.com/mac-seating-chart/photos/comp/{0}{1}{2}{3}.jpg",o="https://www.facebook.com/dialog/feed?link={0}&app_id=316254480466&redirect_uri={1}&caption={2}",a="https://twitter.com/share?text={0}&url={1}",s="mailto:?subject={0}&body={1}",c=new RegExp("^#(\\d{3})-(\\d{0,2})-(\\d{0,2})-([ulx]?)$"),i=[],r=14,l={101:[18,15],102:[22,11],103:[25,32],104:[18,32],105:[18,32],106:[18,32],107:[25,32],108:[22,14],109:[18,15],110:[15,15],111:[22,14],112:[25,32],113:[18,32],114:[18,32],115:[18,32],116:[25,32],117:[22,11],118:[15,15]},u={101:[[3,3,3]],102:[[1,2,3],[3]],103:[[1,1,2],[2,3,3]],104:[[3,3,3],[3,3,3]],105:[[3,3,3],[3,3,3]],106:[[3,3,3],[3,3,3]],107:[[1,1,2],[2,3,3]],108:[[1,2,3]],109:[[3,3,3]],110:[[3,3,3]],111:[[1,2,3]],112:[[1,1,2],[2,3,3]],113:[[3,3,3],[2,3,3]],114:[[3,3,3],[3,3,3]],115:[[3,3,3],[2,3,3]],116:[[1,1,2],[2,3,3]],117:[[1,2,3],[3]],118:[[3,3,3]]},d=["l","c","r"],p=["b","m","t"],h=!1;return e}String.prototype.format||(String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,n){return"undefined"!=typeof e[n]?e[n]:t})}),$(document).ready(function(){d3.select(".seating-chart-container").call(stadium())});
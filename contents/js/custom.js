$('.content').css("opacity", '1');

$(document).ready(function() {
  $(".button-collapse").sideNav();

  // init Masonry
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });

  //Yellow highlight
  highlight('h1');
  highlight('h2');
  highlight('h3');


});

// Function to apply the yellow highlight.
//Class CSS is in custom.css
function highlight(element) {
  var str, href;
  $(element).each(function() {
    str = $(this).text();
    if (str.indexOf("||") >= 0) {
      //opening tag

      if ($(this).find('a').attr('href')) { // if the element to be highlighted is a link
        href = $(this).find('a').attr('href');
        str = str.replace("||", '<a class="highlight" href=' + href + '> <span>');
      } else {
        str = str.replace("||", '<a class="highlight"><span>');
      }
      //closing tag
      str = str.replace("/||", '</span></a>');
      $(this).html(str);
    }
  });
}

// Google analytics
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-53098803-1', 'auto');
ga('send', 'pageview');

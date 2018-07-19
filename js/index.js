if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
  // Yes, there's really no need for `Object.defineProperty` here
  NodeList.prototype.forEach = Array.prototype.forEach;
}

$(function() {
  $.fn.editable.defaults.mode = 'inline';
});
var inputsText = document.querySelectorAll('input')

inputsText.forEach(function(input){
  input.addEventListener('change', function() {
    if (this.value !== '')
      this.classList.add('valid')
  })
})

$('#btn-solicita-credito-fixed').click(function(){
  $('html, body').animate({ scrollTop: $('#cotizador').offset().top }, 'slow');
})

//Navigation Menu Slider
$('#nav-expander').on('click', function(e) {
  e.preventDefault();
  $('body').toggleClass('nav-expanded');
});
$('.open-menu i').on('click', function(e) {
  e.preventDefault();
  $('body').toggleClass('nav-expanded');
});
$('#nav-close').on('click', function(e) {
  e.preventDefault();
  $('body').removeClass('nav-expanded');
});

$(function() {
  $('img.svg').each(function() {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = $(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, else we gonna set it if we can.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
});



$(function() {

  function hideFlash() {
    setTimeout(function() { $('#flash').slideUp('slow') }, 5000);
  }

  function cssHacks() {
    // Make the heights of direct children of the elements that request this fix
    // equal.
    $('.jsClearfix').each(function(i, el) {
      var maxHeight = 0;
      $(el).children().each(function(j, childEl) {
        maxHeight = Math.max(maxHeight, parseInt($(childEl).height(), 10));
      });
      $(el).children().each(function(j, childEl) {
        if ($(childEl).attr('id') === 'sectionAnnotations') {
          $(childEl).height(maxHeight + parseInt($('footer').height(), 10)
              + parseInt($('footer').css('padding-bottom'), 10)
              // Multiply by 2 since the annotations have a negative margin.
              + 2 * parseInt($('#main').css('padding-bottom'), 10));
        } else {
          $(childEl).height(maxHeight);
        }
      });
    });
  }

  // Call initializing functions
  (function() {
    hideFlash();
    cssHacks();
  })();

});

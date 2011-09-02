(function(window, undefined) {
  var sr = {};
  sr.cache = {};


  window.sr = sr;

})(window);


$(function() {

  (function hideFlash() {
    setTimeout(function() { $('#flash').slideUp('slow') }, 5000);
  })();

  (function cssHacks() {
    // Make the heights of direct children of the elements that request this fix
    // equal.
    $('.jsClearfix').each(function(i, el) {
      var maxHeight = 0;
      $(el).children().each(function(j, childEl) {
        maxHeight = Math.max(maxHeight, parseInt($(childEl).height(), 10));
      });
      $(el).children().each(function(j, childEl) {
        if ($(childEl).attr('id') === 'sectionAnnotations') {
          $(childEl).height(maxHeight
              + parseInt($('footer').height(), 10)
              + parseInt($('footer').css('padding-bottom'), 10)
              // Multiply by 2 since the annotations have a negative margin.
              + 2 * parseInt($('#main').css('padding-bottom'), 10)
           );
        } else {
          $(childEl).height(maxHeight);
        }
      });
    });
  })();

  // Triggers highlight eventson the body text.
  /*
  (function addHighlightEventTrigger() {
    var sectionText = $('#sectionText');
    $(document.body).mouseup(function() {
      var txt = '';
      if (window.getSelection) {
        txt = window.getSelection();
      } else if (document.getSelection) {
        txt = document.getSelection();
      } else if (document.selection) {
        txt = document.selection.createRange();
        txt.toString = function() { return this.text };
        txt.toHtml = function() { return this.htmlText };
      }
      console.log(sectionText.text());
      console.log(txt.toString());
      if (txt && sectionText.text().replace("\n", " ").indexOf(txt.toString().replace("\n", " ")) !== -1) {
        console.log('achievement unlocked');
      } else {
        console.log('bitch, please');
      }
    });
  })();
  */

  (function addDropdownListeners() {
    $('.dropdownButtonArrowContainer').hover(function(e) {
      var button = $(this).closest('.dropdownButton');
      var dropdown = button.find('.dropdown');
      button.mouseleave(function() {
        dropdown.slideUp('fast');
      });
      dropdown.slideDown('fast');
    });
  })();

  (function addWorkDropdownListeners() {
    $('.jumpSection').click(function(e) {
      $.get('/works/' + $(this).data('work_id') + '/jump_sections', {},
          function(data) {
        sr.setOverlay(data);
      });
    });
  })();

  (function initializeOverlay() {
    $('#overlayClose').click(function() {
      sr.hideOverlay();
    });
  })();

  sr.setOverlay = function(newHtml) {
    var overlay = $('#overlay'),
        overlayContent = $('#overlayContent');
    overlayContent.html(newHtml);
    overlay.show();
  };

  // Optionally pass in overlay
  sr.hideOverlay = function(overlay) {
    overlay = overlay || $('#overlay');
    overlay.hide();
  }

});


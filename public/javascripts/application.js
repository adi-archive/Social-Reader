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
  (function addHighlightEventTrigger() {
    $("#sectionText").mousedown(function() {
      $("#sectionText").one('mouseup', function() {
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
        sr.runHighlightDisplay();
      });
    });
  })();

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

    var getPermalink = function(node) {
      var permalink_data_key = 'work_permalink';
      return node.data(permalink_data_key) ||
          node.closest('.dropdown').data(permalink_data_key)
    };

    $('.jumpSection').click(function(e) {
      $.get('/works/' + getPermalink($(this)) + '/jump_sections', {},
          function(data) {
        sr.setOverlay(data);
      });
    });

    $('.download').click(function(e) {
      window.open('/works/' + getPermalink($(this)) + '/download');
    });

  })();

  (function initializeOverlay() {
    $('#overlayClose').click(function() {
      sr.hideOverlay();
    });
  })();

  sr.runHighlightDisplay = function() {
  };

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
  };

});


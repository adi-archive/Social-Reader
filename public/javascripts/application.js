(function(window, undefined) {
  var sr = {};
  sr.cache = {};
  sr.panel = {};
  sr.util = {};

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
        // Give the browser time to unselect before doing this check. Otherwise,
        // if they click on highlighted text, the selection won't be updated at
        // this point.
        setTimeout(function() {
          function getRangeObject(selectionObject) {
            if(selectionObject && $.trim(selectionObject.toString())) {
              if (selectionObject.getRangeAt) {
                return selectionObject.collapsed ?
                    null : selectionObject.getRangeAt(0);
              } else { // Safari!
                var range = document.createRange();
                range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
                range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
                return range;
              }
            } else {
              return null;
            }
          }

          var userSelection;
          if (window.getSelection) {
            userSelection = window.getSelection();
          } else if (document.selection) { // should come last; Opera!
            userSelection = document.selection.createRange();
          }

          var rangeObject = getRangeObject(userSelection);
          var contents = rangeObject && $(rangeObject.extractContents());
          if (contents) {
            // Hide existing markers.
            $('.marker').removeClass('marker');
            var wrapper = $('<span class="marker"></span>')
                .append(contents)[0];
            rangeObject.insertNode(wrapper);
            sr.panel.displayStartCommentThread();
          } else {
            sr.panel.hideComments();
          }
        }, 10);
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

  sr.panel.hideComments = function() {
    $('#newCommentForm').hide();
    $('.marker').removeClass('marker');
    $('#sectionAnnotationsIntro').show();

  };

  sr.panel.displayStartCommentThread = function() {
    // TODO - set margin-top

    $('#sectionAnnotationsIntro').hide();
    $('#newCommentForm').show();

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


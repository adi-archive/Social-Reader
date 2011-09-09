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
          var userSelection;
          if (window.getSelection) {
            userSelection = window.getSelection();
          } else if (document.selection) { // should come last; Opera!
            userSelection = document.selection.createRange();
          }

          var rangeObject = getRangeObject(userSelection);
          if (rangeObject) {
            /*
            var wrapper = $('<span class="markymark"></span>')[0];
            rangeObject.surroundContents(wrapper);
            */
            var wrapper = $('<span class="marker"></span>')
                .append($(rangeObject.extractContents()))[0];
            rangeObject.insertNode(wrapper);

            /*

            var paras = $('.markymark').find('p');
            if (paras.length > 0) {
              paras.each(function(i, el) {
                  $(el).html(
                    '<span style="background:yellow">' + $(el).html() + '</span>'
                  );
              });
              join($('.line' + paras.first().data('num')));
              join($('.line' + paras.last().data('num')));
            } else {
              $('.markymark').css({
                background: 'yellow'
              });
            }
            */

          }

          /*
          function join($objs) {
            $objs.each(function(i, el) {

            });
          }
          */

          function getRangeObject(selectionObject) {
            if (selectionObject.getRangeAt) {
              return selectionObject.collapsed ?
                  null : selectionObject.getRangeAt(0);
            } else { // Safari!
              var range = document.createRange();
              range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
              range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
              return range;
            }
          }

          /*
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
          // TODO - catch clicking on link...
          if ($.trim(txt.toString()) === '') {
            sr.panel.hideComments();
          } else {
            sr.util.highlightText(txt);
            sr.panel.runHighlightDisplay(txt);
          }
          */
        }, 10);
      });
    });
  })();

  sr.util.highlightText = function(selection) {
    if ($.trim(selection) === '') {
      return true;
    }
    console.log(selection);
    console.log(selection.innerHTML);
    // selection_button = $('<span id="exegize_button" class="sprite spr-exegize_floater"/>')[0];
    var new_range;
    if (!!selection.getRangeAt) {
      var range = selection.getRangeAt(0);
      new_range = document.createRange();
      new_range.setStart(selection.focusNode, range.endOffset);
      // new_range.insertNode(selection_button);
    } else {
      selection.expand("word");
      selection.moveEnd("character", -2);
      selection.moveStart("character", -2);
      new_range = selection.duplicate();
      new_range.collapse(false);
      // new_range.pasteHTML(selection_button.outerHTML)
    }
    var fragment = range.extractContents().innerHTML;
    console.log(fragment);
    console.log (
        $('<span style="background:red"></span>').append(fragment)
        );
    console.log($(new_range.extractContents()));
  };

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
    $('#sectionAnnotationsIntro').show();

  };

  sr.panel.runHighlightDisplay = function() {
    // TODO - set margin-top

    $('#sectionAnnotationsIntro').hide();
    $('#newCommentForm').show();

    /*
    var newComment = $('#newComment .annotation').clone();
    $('#sectionAnnotationsIntro').hide();
    $('#comments').html('')
        .append(newComment);
    */
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


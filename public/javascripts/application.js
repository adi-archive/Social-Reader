$(function() {

  function hideFlash() {
    setTimeout(function() { $('#flash').slideUp('slow') }, 5000);
  }

  // Call initializing functions
  (function() {
    hideFlash();
  })();

});

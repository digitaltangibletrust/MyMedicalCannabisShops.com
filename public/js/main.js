/* global jQuery, window, document */
'use strict';

(function($){
  $(document).ready(adjustHeights);
  $(window).resize(adjustHeights);

  function adjustHeights(){
    equalizeHeights('.partner-sidebar');
    equalizeHeights('.homepage-offer');
  }

  function equalizeHeights(selector){
    var heights = $(selector).height('auto').map(function(){
      return $(this).height();
    }).get();

    var maxHeight = Math.max.apply(null, heights);
    $(selector).height(maxHeight);
  }

})(jQuery);
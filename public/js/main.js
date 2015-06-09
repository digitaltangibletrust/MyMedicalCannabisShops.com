/* global jQuery, window, document */
'use strict';

(function($){
  $(document).ready(adjustHeights);
  $(window).resize(adjustHeights);

  function adjustHeights(){
    equalizeHeights('.merchant-sidebar');
    equalizeHeights('.homepage-offer');
  }

  function equalizeHeights(selector){
    var heights = $(selector).height('auto').map(function(merchant){
      return $(this).height();
    }).get();

    var maxHeight = Math.max.apply(null, heights);
    $(selector).height(maxHeight);
  }

})(jQuery);
/* global jQuery, window, document */
'use strict';

(function ($) {
  $(document).ready(adjustHeights);
  $(window).resize(adjustHeights);

  function adjustHeights() {
    equalizeHeights('.partner-box');
    equalizeHeights('.homepage-offer');
  }

  function equalizeHeights(selector) {
    var heights = $(selector).height('auto').map(function () {
      return $(this).height();
    }).get();

    var maxHeight = Math.max.apply(null, heights);
    $(selector).height(maxHeight);
  }
  $('.claim-offer').click(function (e) {
    e.preventDefault();
    var offer = $(this).parent();
    var modal = $('#offerModal');
    var claimUrl = offer.children('a.btn.claim-offer').attr('href') + '/claim';
    $('#offerLabel').text(offer.children('h4').text());
    $('#claim').attr('href', claimUrl);
    $('#claimDescription').html(offer.children('.hidden.claim-descr').html());
    $('#partner').html(offer.children('h5.partner-info').html());
    $('#offerModal').modal('show');
  });

})(jQuery);

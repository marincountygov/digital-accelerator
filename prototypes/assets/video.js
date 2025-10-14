// *************************************************************************
// Name: video.js
//
// Author: Christopher White, County of Marin IST Department
//
// Date: 12/16/2022
//
// Version: 2.3
//
// Modified: 10/31/2023 (Christopher White: fixed code to put caption in data-caption not title.)
//           07/23/2024 (Christopher White: changed aria-label text.)
//           09/18/2024 (Christopher White: added interrnationalization.)
//
// Description: JS to load videos in a Fancybox.
//
// *************************************************************************

jQuery(document).ready(function () {

  // Use the title as the popup caption
  jQuery.fancybox.defaults.caption = function (instance, item) {
    return GetCaption(this);
  };

  // Make the link text the video caption
  jQuery("a.video-fancybox").each(function () {
    var title = jQuery(this).text();
    title = title.replace(/\[.*$/, "");
    jQuery(this).attr("data-caption", title);
  });

   // *********** Standalone popup video display event handler *********** //
  jQuery('a.video-fancybox').fancybox({
    type: 'iframe',
    afterShow: function (instance, current) {
      // Internationalization (properties set in contact-us.js)
      jQuery(".fancybox-button--close").attr("aria-label", labellang[myLangcode].CLOSE).attr("title", labellang[myLangcode].CLOSE);
      jQuery(".fancybox-button--share").attr("aria-label", labellang[myLangcode].SHARE).attr("title", labellang[myLangcode].SHARE);
      jQuery(".fancybox-button--fullscreen").attr("aria-label", labellang[myLangcode].FULL_SCREEN).attr("title", labellang[myLangcode].FULL_SCREEN);
      // Remove scrollbars and change background
      current.$content.css({
        overflow: 'visible',
        background: '#000',
        'max-width': '1160px',
        'max-height': '625px'
      });
      jQuery(".fancybox-button--close").focus();
    },
    onUpdate: function (instance, current) {
      // Scale the Fancybox with the window
      var width,
      height,
      ratio = 16 / 9,
      video = current.$content;
      if (video) {
        video.hide();
        width = current.$slide.width();
        height = current.$slide.height() - 100;
        if (height * ratio > width) {
          height = width / ratio;
        }
        else {
          width = height * ratio;
        }
        video.css({
          width: width,
          height: height
        }).show();
      }
    }
  });
});

// Get the text of the Fancybox caption
function GetCaption(ele) {
  var caption = "";
  if (typeof jQuery(ele).attr("data-caption") === "undefined") {
    if (typeof jQuery(ele).attr("title") !== "undefined") {
      caption = jQuery(ele).attr("title");
    }
  }
  else {
    caption = jQuery(ele).attr("data-caption");
  }
  return caption;
}


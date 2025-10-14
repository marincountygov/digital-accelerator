// *************************************************************************
// Name: hidden-gallery.js
//
// Author: Christopher White, County of Marin IST Department
//
// Date: 1/10/2024
//
// Version: 1.3
//
// Modified: 01/29/2024 (Christopher White: modifed callback to set focus on the close button once, not after
//                      every slide operation.)
//           07/23/2024 (Christopher White: added internationalization.)
//           09/18/2024 (Christopher White: finished up internationalization.)
//
// Description: companion to the Hidden Gallery Paragraph component; sets up the hidden gallery
//              using the Fancybox; allows for animation types.
//
// *************************************************************************

// If the currrent language is not supported use English
// NOTE: this code must be modified if the i18n property of the Fancybox options is changed!
switch(langcode) {
  case "en":
  case "es":
  case "zh-hans":
  case "ko":
  case "ru":
  case "fil":
  case "vi":
    myHGLangcode = langcode;
    break;
  default:
    myHGLangcode = "en";
}

// Allows focusing on elements in a Fancybox; the delay (see below) is because the Fancybox is totally generated 
function FocusMe() {
    jQuery(".fancybox-button--close").focus();
}

// Fancybox options
var foptions = {
   loop: true,
   type: 'image',
   infobar: true,
   buttons: [
     "thumbs",
     "slideShow",
     "fullScreen",
     "close"
   ],
   idleTime: 0,
   transitionDuration: 4000,
   caption: function (instance, item) {
      return GetHGCaption(this);
   },
   onInit: function (instance, current) {
     setTimeout(FocusMe, 500);
   },
   lang: myHGLangcode,
   i18n: {
      "en": {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded.<br />Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      "es": {
        CLOSE: "Cerrar",
        NEXT: "Siguiente",
        PREV: "Anterior",
        ERROR: "No se puede cargar el contenido solicitado.<br />Intente de nuevo más tarde.",
        PLAY_START: "Comenzar la presentación",
        PLAY_STOP: "Pausar la presentación",
        FULL_SCREEN: "Pantalla completa",
        THUMBS: "Miniaturas",
        DOWNLOAD: "Descargar",
        SHARE: "Compartir",
        ZOOM: "Zoom"
      },
      "zh-hans": {
        CLOSE: "打开新窗口",
        NEXT: "下一页",
        PREV: "上一页",
        ERROR: "无法加载所请求的内容。请稍后重试。",
        PLAY_START: "开始播放幻灯片",
        PLAY_STOP: "暂停播放幻灯片",
        FULL_SCREEN: "全屏",
        THUMBS: "缩略图",
        DOWNLOAD: "下载",
        SHARE: "分享",
        ZOOM: "放大"
      },
      "ko": {
        CLOSE: "닫기",
        NEXT: "다음",
        PREV: "이전",
        ERROR: "요청된 콘텐츠를 불러올 수 없습니다. 나중에 다시 시도해 주세요.",
        PLAY_START: "슬라이드 쇼 시작",
        PLAY_STOP: "슬라이드 쇼 중지",
        FULL_SCREEN: "전체 화면",
        THUMBS: "썸네일",
        DOWNLOAD: "다운로드",
        SHARE: "공유",
        ZOOM: "확대/축소"
      },
      "ru": {
        CLOSE: "Закрыть",
        NEXT: "Далее",
        PREV: "Назад",
        ERROR: "Запрошенный контент не удается загрузить.<br />Повторите попытку позже.",
        PLAY_START: "Начать слайд-шоу",
        PLAY_STOP: "Остановить слайд-шоу",
        FULL_SCREEN: "Во весь экран",
        THUMBS: "Миниатюры",
        DOWNLOAD: "Загрузить",
        SHARE: "Поделиться",
        ZOOM: "Увеличить"
      },
      "fil": {
        CLOSE: "Isara",
        NEXT: "Susunod",
        PREV: "Nakaraan",
        ERROR: "Hindi ma-load ang hiniling na content.<br />Mangyaring subukang muli mamaya.",
        PLAY_START: "Simulan ang slideshow",
        PLAY_STOP: "I-pause ang slideshow",
        FULL_SCREEN: "Buong screen",
        THUMBS: "Mga thumbnail",
        DOWNLOAD: "I-download",
        SHARE: "I-share",
        ZOOM: "I-zoom"
      },
      "vi": {
        CLOSE: "Đóng",
        NEXT: "Tiếp theo",
        PREV: "Trước đó",
        ERROR: "Không thể tải được nội dung yêu cầu.<br />Vui lòng thử lại sau.",
        PLAY_START: "Bắt đầu trình chiếu",
        PLAY_STOP: "Tạm dừng trình chiếu",
        FULL_SCREEN: "Toàn màn hình",
        THUMBS: "Hình thu nhỏ",
        DOWNLOAD: "Tải xuống",
        SHARE: "Chia sẻ",
        ZOOM: "Thu phóng"
      },
   },
   afterShow: function (instance, current) {
     if (hdDebug) console.log("afterShow: set aria-labels");
     jQuery(".fancybox-button--close").attr("aria-label", instance.opts.i18n[myHGLangcode].CLOSE);
     jQuery(".fancybox-button--fullscreen").attr("aria-label", instance.opts.i18n[myHGLangcode].FULL_SCREEN);
     jQuery(".fancybox-button--play").attr("aria-label", instance.opts.i18n[myHGLangcode].PLAY_START);
     jQuery(".fancybox-button--pause").attr("aria-label", instance.opts.i18n[myHGLangcode].PLAY_STOP);
     jQuery(".fancybox-button--thumbs").attr("aria-label", instance.opts.i18n[myHGLangcode].THUMBS);
     jQuery(".fancybox-button--arrow_left").attr("aria-label", instance.opts.i18n[myHGLangcode].PREV);
     jQuery(".fancybox-button--arrow_right").attr("aria-label", instance.opts.i18n[myHGLangcode].NEXT);
     current.$image.attr('alt', "");
   }
};

// Set the Fancybox side caption method
jQuery.fancybox.defaults.caption = function (instance, item) {
   return GetHGCaption(this);
};

// Get the text of the Fancybox caption
function GetHGCaption(ele) {
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

jQuery(document).ready(function () {

  // Attach the Fancybox behavior to images with the proper data attribute
  jQuery("a[data-fancybox='gallery']").fancybox(foptions);

  // These variables will be set if the user has selected them in the Paragraph
  if (typeof(doAnimation) !== "undefined") {
    jQuery.fancybox.defaults.animationEffect = openingEffect;
    jQuery.fancybox.defaults.transitionEffect = transitionEffect;
  }

  // Clicking this button will start the slideshow
  jQuery("a[data-role=run_hidden_gallery]").click(function (event) {
    event.preventDefault();
    var links = jQuery('[data-fancybox="gallery"]');
    var instance = jQuery.fancybox.open(links, foptions);
    if (hdDebug) console.log("Hidden gallery: fancybox instance = " + instance);
      instance.SlideShow.start();
  });

});

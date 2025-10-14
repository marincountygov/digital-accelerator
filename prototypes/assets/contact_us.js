// *************************************************************************
// Name: contact_us.js
//
// Author: Christopher White, County of Marin IST Department
//
// Date: 12/15/2022
//
// Version: 1.9
//
// Modified: 12/30/2022 (Christopher White: modified to handle the Contact Info Card.)
//           05/02/2023 (Christopher White: removed "title" attribute from rewritten anchor tag.)
//           09/13/2023 (Christopher White: made modifications for the new non-Site Studio environment; added
//                      the ability to create a data override for the link text.)
//           07/23/2024 (Christopher White: added the current language code to the Jotform query string.)
//           08/22/2024 (Christopher White: added code to handle new webmaster form using the news: protocol.)
//           09/03/2024 (Christopher White: added code to strip off the ? from the URL being passed to the
//                      Jotform as the source page; the extra ? would break Jotform's URL parser.)
//           09/17/2024 (Christopher White: fixed a bug created by using the news: protocol; replaced with a
//                      normal page link that would not be duplicated anywhere; fixed a problem with the focus
//                      being set on the *last* close button, not the first; added all international phrases.)
//           09/20/2024 (Christopher White: removed incrypting the email address [the Obfuscate Email module will
//                      handle that from now on] and changed decrypting to use ROT13.)
//           09/25/2024 (Christopher White: added code for the special BoS Contact Form.)
//
// Description: JS to rewrite "mailto" links and attach a contact form via a Fancybox; process special form links
//              beginning with "/rec.".
//
// Note: the email address can be in the normal format or in the following:
//       mail:foo@bar.com
//       mail:foo#bar.com
//       mailto:foo#bar.com
//
// Dependency: crypt.js
//
// *************************************************************************

// Global variables
const hdDebug = false;
var myLangcode = langcode;

// Internationalization
const labellang = {
  "en": {
    OPEN: 'opens a new window',
    CLOSE: 'Close',
    TITLE: 'Contact us',
    FULL_SCREEN: "Full screen",
    SHARE: "Share",
  },
  "es": {
    OPEN: 'Abre una nueva ventana',
    CLOSE: 'Cerrar',
    TITLE: 'Comuníquese con nosotros',
    FULL_SCREEN: "Pantalla completa",
    SHARE: "Compartir",
  },
  "zh-hans": {
    OPEN: '打开新窗口',
    CLOSE: '关闭',
    TITLE: '联系我们',
    FULL_SCREEN: "全屏",
    SHARE: "分享",
  },
   "ko": {
    OPEN: '새 창을 엽니다',
    CLOSE: '닫기',
    TITLE: '문의하기',
    FULL_SCREEN: "전체 화면",
    SHARE: "공유",
  },
   "ru": {
    OPEN: 'открывает новое окно',
    CLOSE: 'Закрыть',
    TITLE: 'Связаться с нами',
    FULL_SCREEN: "Во весь экран",
    SHARE: "Поделиться",
  },
   "fil": {
    OPEN: 'Nagbubukas ng bagong window',
    CLOSE: 'Isara',
    TITLE: 'Makipag-ugnayan sa amin',
    FULL_SCREEN: "Buong screen",
    SHARE: "I-share",
  },
   "vi": {
    OPEN: 'Mở một cửa sổ mới',
    CLOSE: 'Đóng',
    TITLE: 'Liên lạc với chúng tôi',
    FULL_SCREEN: "Toàn màn hình",
    SHARE: "Chia sẻ",
  }
};

function FocusClose(myClass) {
  // Set the focus on the FIRST button, before the iframe
  var ele = jQuery(myClass);
  jQuery(ele[0]).focus();
}

function CallFB(address) {
  // Open the Fancybox; the JotForm will be loaded via an iframe
  jQuery.fancybox.open({
    type: 'iframe',
    src: address,
    iframe: {
      attr: {
        title: labellang[myLangcode].TITLE
      },
      css: {
        height: '100%',
        width: '50%'
      }
    },
    smallBtn: true,
    toolbar: false,
    afterShow: function (instance, current) {
      jQuery(".fancybox-close-small").attr("aria-label", labellang[myLangcode].CLOSE).attr("title", labellang[myLangcode].CLOSE);
      // Separate function so that the first instance of the close button will get the focus
      FocusClose(".fancybox-close-small");
    }
  });
}

jQuery(document).ready(function () {

  // If the current language is not supported then use English
  if (!labellang.hasOwnProperty(langcode)) {
    myLangcode = "en";
  }

  // Set the trigger for the "Did you find?" link
  jQuery("a[href='/rec.didyoufind']").click(function (event) {
    if (hdDebug) console.log("Clicked on Did you find? link: " + jQuery(this).attr("href"));
    event.preventDefault();
    var pageFrom = location.href;
    if (location.href.indexOf('?') > -1) {
      var searchIndex = pageFrom.indexOf('?');
      pageFrom = pageFrom.substring(0, searchIndex);
    }
    var frameSource = "https://marincounty.jotform.com/242384077866973?language=" + myLangcode + "&dropdown=hidden&pageFrom=" + pageFrom;
    if (hdDebug) console.log("FrameSource = " + frameSource);
    // Call the function that opens the Fancybox
    // The JotForm will be loaded into the Fancybox via an iframe
    CallFB(frameSource);
  });

  // Set the trigger for the special webmaster contact form; no preprocessing required
  jQuery("a[href='/rec.webmaster']").click(function (event) {
    if (hdDebug) console.log("Clicked on webmaster link: " + jQuery(this).attr("href"));
    event.preventDefault();
    var pageFrom = location.href;
    if (location.href.indexOf('?') > -1) {
      var searchIndex = pageFrom.indexOf('?');
      pageFrom = pageFrom.substring(0, searchIndex);
    }
    var frameSource = "https://marincounty.jotform.com/242384232964965?language=" + myLangcode + "&dropdown=hidden&emailTo=webmaster@marincounty.gov" + "&name=Webmaster" + "&pageFrom=" + pageFrom;
    if (hdDebug) console.log("FrameSource = " + frameSource);
    // Call the function that opens the Fancybox
    // The JotForm will be loaded into the Fancybox via an iframe
    CallFB(frameSource);
  });

  // BoS Contact Form link rewrite
  //jQuery("a[href^='mailto:boscontactform@marincounty.gov']").each(function () {
  // The email address is obfuscated
  jQuery("a[href^='mailto:obfpbagnpgsbez@znevapbhagl.tbi']").each(function () {
    if (hdDebug) console.log("Fixing BoS Contact Form link: " + jQuery(this).attr("href"));
    // Set the new attributes
    var newText = jQuery(this).text().replace(/[\n]/g, " ").trim();
    jQuery(this).attr({
      'data-role': "boscontact",
      'aria-label': newText + " (" + labellang[myLangcode].OPEN + ")",
      'role': "button"
    });
    // Rewrite the href -- we don't need it anymore
    jQuery(this).attr("href", "javascript:");
  });

  // BoS Contact Form trigger
  jQuery("a[data-role='boscontact']").click(function () {
    if (hdDebug) console.log("Clicked on BoS Contact Form link: " + jQuery(this).attr("href"));
    event.preventDefault();
    var pageFrom = location.href;
    if (location.href.indexOf('?') > -1) {
      var searchIndex = pageFrom.indexOf('?');
      pageFrom = pageFrom.substring(0, searchIndex);
    }
    var frameSource = "https://marincounty.jotform.com/202165646998974?language=" + myLangcode + "&dropdown=hidden&pageFrom=" + pageFrom;
    if (hdDebug) console.log("FrameSource = " + frameSource);
    // Call the function that opens the Fancybox
    // The JotForm will be loaded into the Fancybox via an iframe
    CallFB(frameSource);
  });

  // Mailto preprocessor: rewrite generic HTML mailto links into Fancybox-based mail links
  jQuery("a[href^='mail']").each(function () {
    // If the attribute "data-noprocessing" exists (we don't care what the
    //    value is) then don't process this mailto
    var noproc = jQuery(this).attr("data-noprocessing");
    if (typeof noproc !== "undefined") {
      return;
    }
    var dataOverride = "";
    // Get the link text and clean it up
    var newText = jQuery(this).text().replace(/[\n]/g, " ").trim();
    // Get the href and process it
    var fixHref = jQuery(this).attr("href");
    // Strip off "mailto:" or "mail:"; if the user used a # instead of @
    //    (as suggested) replace it
    fixHref = fixHref.replace(/^mail[^:]*:/, "").replace("#", "@");
    if (hdDebug) console.log("Modified the href: " + fixHref);
    // If there is trailing text in the href (starting with ?) then it's the data-override; strip it
    //   from the href after assigning it to the variable
    if (fixHref.indexOf('?') > 1) {
       dataOverride = fixHref.substring(fixHref.indexOf('?') + 1);
       dataOverride = dataOverride.replace(/_/g, " ").replace(/=/, "");
       fixHref = fixHref.replace(/\?.*/, "");
       if (hdDebug) console.log("Data-override = " + dataOverride + " ; href = " + fixHref);
       jQuery(this).attr("data-override", dataOverride);
    }
    // If there's no address then rewrite the element (remove the link)
    // This could be the case in the Contact Info Card
    if (fixHref.length < 1) {
      console.log("Contact Us: no email address found.");
      jQuery(this).replaceWith(function () {
        return jQuery("<span />").append(newText);
      });
      return;
    }
    // Encrypt the mail address [OBSOLETE]
    //var cryptedHref = encodeStr(fixHref);
    //var cryptedHref = fixHref;
    // Set the new attributes
    jQuery(this).attr({
      'data-link': fixHref,
      'data-name': encodeURI(newText),
      'data-role': "mailto",
      'aria-label': newText + " (" + labellang[myLangcode].OPEN + ")",
      'role': "button"
    });
    // For accessibility we must alert the user that clicking on the link
    //    will open a new window (aria-label)
    // Rewrite the href -- we don't need it anymore
    jQuery(this).attr("href", "javascript:");
  });

  // Set a trigger for the Fancybox
  jQuery("a[data-role='mailto']").click(function () {
    // If the attribute "data-noprocessing" exists (we don't care what the
    // value is) then don't process this mailto
    var newName = "";
    var noproc = jQuery(this).attr("data-noprocessing");
    if (typeof noproc !== "undefined") {
      return;
    }
    // Decorde the email address
    //var emailTo = decodeStr(jQuery(this).attr("data-link"));
    var emailTo = decodeROT13(jQuery(this).attr("data-link")).trim();
    if (hdDebug) console.log("emailTo = " + emailTo + " : data-name = " + jQuery(this).attr('data-name'));
    // If there is a data-override, use that instead of data-name
    var override = jQuery(this).attr("data-override");
    if (typeof(override) !== "undefined" && override !== "") {
       newName = override;
    }
    else {
      newName = jQuery(this).attr("data-name");
    }
    // Assemble the full URL string for the Fancybox
    var pageFrom = location.href;
    if (location.href.indexOf('?') > -1) {
      var searchIndex = pageFrom.indexOf('?');
      pageFrom = pageFrom.substring(0, searchIndex);
    }
    var frameSource = "https://marincounty.jotform.com/223473950835058?language=" + myLangcode + "&dropdown=hidden&emailTo=" + emailTo + "&name=" + newName + "&pageFrom=" + pageFrom;
    if (hdDebug) console.log("frameSource = " + frameSource);
    // Call the function that opens the Fancybox
    // The JotForm will be loaded into the Fancybox via an iframe
    CallFB(frameSource);
  });
});



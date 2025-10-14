// *************************************************************************
// Name: link_icons.js
//
// Author: Christopher White, County of Marin IST Department
//
// Date: 12/16/2022
//
// Version: 1.4
//
// Modified: 01/19/2023 (Christopher White: added globe icon to Google Translate widget; fixed a bug in adding
//                      the "visually-hidden" class.)
//           03/23/2023 (Christopher White: fixed yet another bug in the way the screen reader text was being
//                      applied [because it wasn't].)
//           06/15/2023 (Christopher White: fixed a bug in the PDF and Excel classes that kept the "visually-
//                      hidden" class from being applied.)
//           10/26/2023 (Christopher White: changed the class names from Site Studio to new "vanilla" ones.)
//           
//
// Description: replaces the file link text in components with glyphs and adds
//              text for screen readers to the links with doc-related CSS
//              classes.
//
// *************************************************************************

jQuery(document).ready(function () {

  const hDebug = false;
  // Not really a link icon, but an icon nonetheless
  //jQuery(".gtranslate").prepend('<i class="fas fa-globe-americas" style="font-size:24px;color:white;padding-right:3px;vertical-align:text-bottom"></i>');

  // Replace text in collection page item titles with file type icons
  var fileCheck = "";

  var extLink = { className: "external-link", text: "[External]" };
  //var extLinkOpen = { className: "externalopen", text: "[External Opens a New Window]" };
  //var extPdf = { className: "externallinkpdf", text: "[External PDF]" };
  //var extWord = { className: "externallinkword", text: "[External Word]" };
  var pdf = { className: "pdfdoc-link", text: "[PDF]" };
  var podcast = { className: "podcast-link", text: "[Podcast]" };
  var ppt = { className: "powerpoint-link", text: "[Powerpoint]" };
  var video = { className: "video-link", text: "[Video]" };
  var word = { className: "word-link", text: "[Word]" };
  var xls = { className: "excel-link", text: "[Excel]" };
  var objList = [extLink, pdf, video, word, xls, ppt, podcast];

  // If the text of the link has a keyword in it then add the link class (used for components)
  jQuery("a").each(function () {
    fileCheck = jQuery(this).text();
    if (hDebug) console.log("Filecheck = " + fileCheck);
    if (fileCheck.indexOf(extLink.text) > -1) {
      jQuery(this).addClass(extLink.className);
      if (hDebug) console.log("Added external class to " + fileCheck);
    }
    else if (fileCheck.indexOf(pdf.text) > -1) {
      jQuery(this).addClass(pdf.className);
    }
    else if (fileCheck.indexOf(word.text) > -1) {
      jQuery(this).addClass(word.className);
    }
    else if (fileCheck.indexOf(video.text) > -1) {
      jQuery(this).addClass(video.className);
    }
    else if (fileCheck.indexOf(podcast.text) > -1) {
      jQuery(this).addClass(podcast.className);
    }
    else if (fileCheck.indexOf(ppt.text) > -1) {
      jQuery(this).addClass(ppt.className);
    }
    else if (fileCheck.indexOf(xls.text) > -1) {
      jQuery(this).addClass(xls.className);
    }
  });

  // Loop through the object arrays and process each type in turn
  // Add the info for the screen reader if the class matches
  for (i = 0; i < objList.length; i++) {
    myObj = objList[i];
    myClass = "." + myObj.className;
    if (hDebug) console.log("Looping through " + myClass);
    // Loop through the anchors that have this class and process them
    jQuery(myClass).each(function (index) {
      var myText = jQuery(this).text();
      if (hDebug) console.log("Second loop: " + myText);
      if (myText.indexOf(myObj.text) > -1) {
        // The text contains the trigger, replace it
        myText = myText.replace(myObj.text, "");
        if (hDebug) console.log("Second loop: replaced myText = " + myText);
        jQuery(this).text(myText);
      }
      jQuery(this).append("<span class='visually-hidden'>" + myObj.text + "</span>");
    });
  }
});

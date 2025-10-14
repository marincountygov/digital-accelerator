// *************************************************************************
// Name: faq.js
//
// Author: County of Marin IST Department
//
// Date: 7/6/2011
//
// Version: 1.5
//
// Modified: 04/05/2013 (Christopher White: added code to return focus on the internal anchor after all
//                      the JQuery minipulation of the page, which causes the size of
//                      of the page to change, often rendering the link location outside
//                      the viewport.
//           11/17/2014 (Christohper White: added ARIA attributes.)
//           09/06/2018 (Christopher White: made the slidedowns more 508-compliant.)
//           10/07/2020 (Christopher White: modified the script because the animation
//                      was interfering with focusing on the anchor when using the
//                      FAQRedirector to link to a category or question).
//           01/11/2022 (Christopher White: added "aria-pressed" to the toggle button; removed
//                      "title" from same.)
//
// Description: JavaScript functions needed to open and close FAQ items. 
//
// *************************************************************************

// This is what happens when you click on a question
function questionClick(element, event) {
  event.preventDefault();
  var textEle = jQuery(element).attr("aria-controls");
  var question = jQuery("#" + textEle);
  if (jQuery(element).hasClass("answerclosed")) {
    jQuery(element).attr("aria-expanded", "true");
    jQuery(element).attr("class", "answeropen");
    jQuery(question).show('slow');
    jQuery(question).attr("aria-hidden", "false");
  }
  else {
     // Class could be "answeropen" or "answerinit"
     jQuery(element).attr("aria-expanded", "false");
     jQuery(element).attr("class", "answerclosed");
     jQuery(question).hide('slow');
     jQuery(question).attr("aria-hidden", "true");
  }
}

// If an in-page anchor is being used, change the behavior of the questions
function openAnchor() {
  var anchorValue = location.hash;
  if (anchorValue.length > 1) {
     // Because of the order in which the script fires and the reloading done
     //    by the FAQRedirector "answeropen" made the question close, so the
     //    class being replaced had to be changed
     jQuery(anchorValue).removeClass("answerinit").addClass("answerclosed");
  }
}

// Run this after a delay
function ShowMe(linkLoc) {
  jQuery(linkLoc).css("outline", "0").focus();
}

jQuery(document).ready(function() {

  // The questions are all open by default, so that if JS is not enabled the user can see the questions
  openAnchor();

  // Now that we have marked a question so it will stay open, close the other questions; other than the question(s)
  //    that should stay open (marked by openAnchor()) the initial class of the questions is "answerinit"; when
  //    the click event is fired, the class will be changed to "answerclosed"; "answerinit" will never be used again
  jQuery(".answerinit").click();

  // Register the toggle link; this will open or close all the questions, depending on the current state
 
    jQuery("#faqopenclose").attr("aria-pressed", "false").removeAttr("title");
    jQuery("#faqopenclose").click(function (event) {
          event.preventDefault();
          var curText = jQuery(this).text();
          if (curText.indexOf("Open") > -1) {
            jQuery(".answerclosed").click();
            jQuery(this).text("Close All Questions");
            jQuery(this).attr("aria-pressed", "true");
          }
          else {
            jQuery(".answeropen").click();
              jQuery(this).text("Open All Questions");
              jQuery(this).attr("aria-pressed", "false");
          }
      });
  
  // Make the FAQs visible -- partially fixs the FOUC problem when the questions are closed on page init
  jQuery(".faq").css("display", "block");
  // Once all the JQuery magic happens, the location of the original link is lost; we need to reset
  //    the focus to the internal anchor and turn off the outline (especially since this ID can't be
  //    tabbed to anyway)
  var linkLoc = location.hash;
  if (linkLoc.length > 1) {
     // Run this after the animation has stopped
     setTimeout(ShowMe, 1000, linkLoc);
  }

});
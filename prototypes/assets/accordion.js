// *************************************************************************
// Name: accordion.js
//
// Author: Christopher White, County of Marin IST Department
//
// Date: 12/18/2023
//
// Version: 1.2
//
// Modified: 07/25/2024 (Matt Crist: modified code to allow translation of the "open/close" text.)
//           07/29/2024 (Christopher White: fixed a bug that stopped the "open/close" text from being replaced
//                      properly -- the attributes were added to the wrong element in the Twig.)
//
// Description: JavaScript functions to handle opening and closing all accordion panels.
//
// *************************************************************************

window.addEventListener('load', (event) => {
  DoToggle();
});

function DoToggle() {
  // Once the window loads make the opening button visible. Before the page fully loads the button won't work.
  jQuery(".usa-accordion-opener").css("display", "block");
  // Capture click or <enter>.
  jQuery(".accordion-toggle").click(function(event) {
    event.preventDefault();

    const closeText = jQuery(this).data("close-text");
    const openText = jQuery(this).data("open-text");

    // Swap out the text and change the icon accordingly.
    if (event.which == 1 || event.which == 13) {
      // Switch to using ARIA attributes to determine the state.
      if (jQuery(this).attr("aria-pressed") === "true") {
        // The button is currently pressed (aria-pressed is true)
        jQuery(this).closest('.usa-accordion-container').find("button[id^='accordionid-'][aria-expanded='true']").each(function() {
          jQuery(this).attr('aria-expanded', 'false');
          jQuery(this).closest('.usa-accordion__heading').next().attr('hidden', 'true'); // Assuming the next element is the panel content that needs to be hidden
        });
        jQuery(this).html("<i id='toggle-button' class='fa fa-toggle-off' aria-hidden='true'></i>&nbsp;" + openText).attr("aria-pressed", "false");
      } else {
        // The button is currently not pressed (aria-pressed is false)
        jQuery(this).closest('.usa-accordion-container').find("button[id^='accordionid-'][aria-expanded='false']").each(function() {
          jQuery(this).attr('aria-expanded', 'true');
          jQuery(this).closest('.usa-accordion__heading').next().removeAttr('hidden'); // Assuming the next element is the panel content that needs to be shown
        });
        jQuery(this).html("<i id='toggle-button' class='fa fa-toggle-on' aria-hidden='true'></i>&nbsp;" + closeText).attr("aria-pressed", "true");
      }
    }
  });
}

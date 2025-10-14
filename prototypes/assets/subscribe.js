// *************************************************************************
// Name: subscribe.js
//
// Author: Christopher White, County of Marin IST Department
//
// Date: 07/23/2014
//
// Version: 2.2
//
// Modified: 11/04/2022 (Christopher White: modified for Acquia Drupal.)
//           10/30/2023 (Christopher White: added ARIA attributes to Subscribe button elements for A11Y.)
//
// Description: JavaScript functions to handle the subscription widget in the site footer.
//
// *************************************************************************

window.addEventListener('load', (event) => {
  DoSubscribe();
});

function DoSubscribe() {
  jQuery("#email-signup").keypress(function (event) {
    if (event.which == 13) {
      event.preventDefault();
      jQuery("#email-button").trigger('click');
    }
  });

  jQuery("#email-button").click(function (event) {
    var mailAdd = jQuery("#email-signup").val();
    if (mailAdd == "") {
      jQuery("#email-error").css("display", "block").html("<i class='far fa-exclamation-circle email-alert'></i>&nbsp;" + jQuery("#email-error").data("email-error"));
      jQuery("#email-signup").attr("aria-invalid", "true");
      return;
    }
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    if (mailAdd.match(re)) {
      document.location.href = "https://public.govdelivery.com/accounts/CAMARIN/subscribers/qualify?email=" + mailAdd;
    }
    else {
      jQuery("#email-error").css("display", "block").html("<i class='far fa-exclamation-circle email-alert'></i>&nbsp;" + jQuery("#email-error").data("email-invalid"));
      jQuery("#email-signup").attr("aria-invalid", "true");
    }

  });
};

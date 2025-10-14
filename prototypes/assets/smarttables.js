// *************************************************************************
// Name: smarttables.js
//
// Author: Christopher White
//
// Date: 06/02/2016
//
// Version: 1.3
//
// Modified:    06/09/2016 (Christopher White: fixed a bug in the selector for the tables; added a warning
//                         about needing to scroll to the right to see more data -- visibility of this
//                         warning is toggled by a CSS media query.)
//              06/20/2016 (Christopher White: added search.regex parameter; removed the
//                         mechanism to use classes to control options in the table because
//                         DataTables automatically uses HTML5 data-* attributes already.)
//              06/24/2016 (Christopher White: fixed a typo in the "smarttable" selector.)
//              07/09/2024 (Christopher White: modified to work with Drupal.)
//
// Original Description: Turns ordinary tables into paginated/sortable tables.  Applies the DataTable
//              plugin to specified tables; wraps the table in a div that will generate a
//              horizontal scroll-bar if the table is wider than the window width.
//
// New Description: only handles wide tables with jQuery; DataTables functionality removed; works in
//              conjunction with CSS.
//
// Notes:       Options can be set by adding specific attributes to the table:
//                 data-order: (boolean) turns on/off table sorting;
//                 data-paging: (boolean) turns on/off paging;
//                 data-searching: (boolean) turns on/off the search mechanism.
//                 data-length-menu: changes the number of rows to display in the dropdown
//                    filter in the heading.
//                    Double-quote the strings, and single-quote the whole attribute value.
//                    Example: data-length-menu='[[20, 50, 200, -1], [20, 50, 200, "All"]]'
//                    The default value is in the pageMenu variable, below.
//
// *************************************************************************

jQuery(document).ready(function () {
    // Add a numbered ID attribute to each table marked with the "widetable" class
    jQuery(".widetable").each(function( index ) {
       console.log("smarttable num: " + index);
       var strIdx = index.toString();
       jQuery(this).attr("id", "smarttable" + strIdx);
    });
    // Wrap the table in a scrollable div for wide table handling
    jQuery(".marin-prose table").wrap("<div class='widetablediv'></div>");
    // For those tables marked as a "widetable" add the warning text
    jQuery("table[id^='smarttable']").before("<p class='widetabledivmsg'><strong>WARNING:</strong> You may need to scroll to the right to see some of this data. For best results please view the data in landscape mode.</p>");;
    /* DataTables commented out
    // var pageMenu = [[5, 10, 50, -1], [5, 10, 50, "All"]];
    // Turn off default error handling
    $.fn.dataTable.ext.errMode = "none";
    $("table[id^='smarttable']").each(function(index) {
        // Redirect error messages to the console
        $(this).on('error.dt', function (e, settings, techNote, message) {
            console.log('An error has been reported by DataTables: ', message);
        });
        $(this).DataTable({
            keys: true,
            search: {
                regex: true
            },
            lengthMenu: pageMenu
        });
    });
    */
});

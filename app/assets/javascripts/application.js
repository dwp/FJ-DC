/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Sortable tables
$(document).ready(function() {

  // DataTable
  var table = $('.listing-table').DataTable({
    // "scrollY": 400,
    "paging":   false,
    "scrollX": true,
    "fixedHeader": true,
    "lengthChange": false,
    "info":         false,
    "ordering": false,
  });

  $(".dataTables_filter").find('input').attr("placeholder", "Type to filter");

});

// Moment dates on plan listing page

$(document).ready(function() {
  
  $moments = $(".moment");
  
  $moments.each(function() {
    $dateOffset = $(this).text();
    $dueDate = moment().add($dateOffset, 'days').format('D MMMM');
    $(this).text($dueDate);
  });

  // $shortMoments = $(".short-moment");
  
  // $shortMoments.each(function() {
  //   $dateOffset = $(this).text();
  //   $dueDate = moment().add($dateOffset, 'days').format('D MMMM');
  //   $(this).text($dueDate);
  // });

});
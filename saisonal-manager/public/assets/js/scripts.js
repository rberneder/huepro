var ui = ui || {};

$.datepicker.setDefaults({
    showMonthAfterYear: false,
    dateFormat: "yy-mm-dd",
    nextText: "<span class='icon icon-arrow-right'></span>",
    prevText: "<span class='icon icon-arrow-left'></span>",
})

// Call this with: onfocus="ui.newDatepicker(this)"
ui.newDatepicker = function(obj) {
    var $obj = $(obj);
    $obj.datepicker();
    $obj.datepicker('show');
}
"use strict";
$(function () {
//   $("#firstAccordion, #secondAccordion").collapse("hide");
//   $('input[name="filter"]').change(function () {
//     if ($("#customCheckTemp3").is(":checked")) {
//       $("#accordion1").collapse("show");
//     } else {
//       $("#firstAccordion").collapse("hide");
//     }

//     if ($("#secondRadio").is(":checked")) {
//       $("#secondAccordion").collapse("show");
//     } else {
//       $("#firstAccordion").collapse("hide");
//     }

//     if ($("#thirdRadio").is(":checked")) {
//       $("#firstAccordion").collapse("hide");
//       $("#secondAccordion").collapse("hide");
//     }
// });
$.fn.extend({
  check : function()  {
     return this.filter(":radio, :checkbox").attr("checked", true);
  },
  uncheck : function()  {
     return this.filter(":radio, :checkbox").removeAttr("checked");
  }
});
});

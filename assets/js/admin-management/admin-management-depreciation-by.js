(function () {
  var elements = document.querySelectorAll(
    "#beginDate, #DoneDate"
  );
  elements.forEach(function (element) {
    element.flatpickr({ monthSelectorType: "static" });
  });
})();
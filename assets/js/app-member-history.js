"use strict";
$(function () {
  var e,
    t = $(".datatables-history"),
    l = "member-view.html";
  t.length &&
    (e = t.DataTable({
      ajax: assetsPath + "json/member-history.json",
      columns: [
        { data: "" },
        { data: "check_in" },
        { data: "check_in" },
        { data: "night_stays" },
        { data: "check_out" },
        { data: "hotel" },
        { data: "area_city" },
      ],
      columnDefs: [
        {
          className: "control",
          orderable: !1,
          searchable: !1,
          responsivePriority: 2,
          targets: 0,
          render: function (e, t, a, n) {
            return '<span>Detail</span>';
          },
        },
        { targets: 1, searchable: !1, visible: !1 },
        {
          targets: 2,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.check_in + "</span>";
          },
        },
        {
          targets: 3,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.night_stays + "</span>";
          },
        },
        {
          targets: 4,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.check_out + "</span>";
          },
        },
        {
          targets: 5,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.hotel + "</span>";
          },
        },
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (e) {
              return "Details of " + e.data().full_name;
            },
          }),
          type: "column",
          renderer: function (e, t, a) {
            a = $.map(a, function (e, t) {
              return "" !== e.title
                ? '<tr data-dt-row="' +
                    e.rowIndex +
                    '" data-dt-column="' +
                    e.columnIndex +
                    '"><td>' +
                    e.title +
                    ":</td> <td>" +
                    e.data +
                    "</td></tr>"
                : "";
            }).join("");
            return !!a && $('<table class="table"/><tbody />').append(a);
          },
        },
      },
    })),
    $(".datatables-hotels tbody").on(
      "click",
      ".delete-record",
      function () {
        e.row($(this).parents("tr")).remove().draw();
      }
    );
});

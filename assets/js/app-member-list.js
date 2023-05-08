"use strict";
$(function () {
  var e,
    t = $(".datatables-member"),
    l = "member-update.html";
  t.length &&
    (e = t.DataTable({
      ajax: assetsPath + "json/member-list.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "full_name" },
        { data: "email" },
        { data: "last_checkin" },
        { data: "place" },
        { data: "" },
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
            return '<span class="text-nowrap">' + a.full_name + "</span>";
          },
        },
        {
          targets: 3,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.email + "</span>";
          },
        },
        {
          targets: 4,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.last_checkin + "</span>";
          },
        },
        {
          targets: 5,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.place + "</span>";
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, a, n) {
            return (
              '<a href="./member-history.html" class="me-2 text-warning"><i class="mdi mdi-history me-2"></i><span>History</span></a><a href="' + l + '" class="me-2"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a><a href="javascript:;" class="text-danger delete-record me-2"><i class="mdi mdi-delete-outline"></i><span>Delete</span></a></div>'
            );
          },
        },
      ],
      order: [[1, "asc"]],
      dom: '<"row mx-1"<"col-sm-12 col-md-3" l><"col-sm-12 col-md-9"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center flex-wrap me-1"<"me-3"f>B>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "Search",
        searchPlaceholder: "Search..",
      },
      buttons: [
        {
          text: '<i class="mdi mdi-export-variant me-1"></i><span class="d-none d-sm-inline-block">Import Data</span>',
            className: "btn btn-label-secondary mx-3",
            action: function() {
              window.location.href = './member-import.html';
            }
        },
        {
          text: '<i class="mdi mdi-plus me-1"></i><span class="d-none d-sm-inline-block">Create Member</span>',
            className: "add-new btn btn-primary mx-3",
            action: function() {
              window.location.href = './member-create.html';
            }
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
      initComplete: function () {
        this.api()
          .columns(3)
          .every(function () {
            var t = this,
              a = $(
                '<select id="area" class="form-select text-capitalize"><option value=""> All Area (City) </option></select>'
              )
                .appendTo(".role")
                .on("change", function () {
                  var e = $.fn.dataTable.util.escapeRegex($(this).val());
                  t.search(e ? "^" + e + "$" : "", !0, !1).draw();
                });
            t.data()
              .unique()
              .sort()
              .each(function (e, t) {
                a.append(
                  '<option value="' +
                    e +
                    '" class="text-capitalize">' +
                    e +
                    "</option>"
                );
              });
          });
      },
    })),
    $(".datatables-member tbody").on(
      "click",
      ".delete-record",
      function () {
        e.row($(this).parents("tr")).remove().draw();
      }
    );
});

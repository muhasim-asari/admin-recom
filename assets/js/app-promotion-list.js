"use strict";
$(function () {
  let t, a;
  var e,
    s = $(".datatables-users"),
    i = $(".select2"),
    r = "./template-promotion-customize.html"
  i.length &&
    (i = i)
      .wrap('<div class="position-relative"></div>')
    s.length &&
      (e = s.DataTable({
        ajax: assetsPath + "json/template-promotion-list.json",
        columns: [
          { data: "" },
          { data: "template_code" },
          { data: "template_code" },
          { data: "name_promotion" },
          { data: "action" },
        ],
        columnDefs: [
          {
            className: "control",
            searchable: !1,
            orderable: !1,
            responsivePriority: 2,
            targets: 0,
            render: function (e, t, a) {
              return "";
            },
          },
          {
            targets: 1,
            orderable: !1,
            render: function () {
              return '<input type="checkbox" class="dt-checkboxes form-check-input">';
            },
            checkboxes: {
              selectAllRender:
                '<input type="checkbox" class="form-check-input">',
            },
            responsivePriority: 4,
          },
          {
            targets: 2,
            responsivePriority: 4,
            render: function (e, t, a, n) {
              var s = a.template_code
              return (
                '<span class="fw-500">' +
                s +
                '</span>'
              );
            },
          },
          {
            targets: 3,
            render: function (e) {
              return '<span class="text-heading">' + e + "</span>";
            },
          },
          {
            targets: -1,
            title: "Actions",
            searchable: !1,
            orderable: !1,
            render: function (e, t, a, n) {
              return (
                '<div class="d-inline-block text-nowrap"><button class="btn btn-sm btn-icon btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical mdi-20px"></i></button><div class="dropdown-menu dropdown-menu-end m-0"><a href="javascript:;" data-bs-target="#sendTestEmail" data-bs-toggle="modal" data-bs-dismiss="modal" class="dropdown-item"><i class="mdi mdi-send-outline me-2"></i><span>Send Test Email</span></a><a href="./preview-mode-calendar-event.html" class="dropdown-item"><i class="mdi mdi-eye-outline me-2"></i><span>Preview Mode</span></a><a href="' + r + '" class="dropdown-item"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a><a href="javascript:;" class="dropdown-item delete-record"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a></div></div>'
              );
            },
          },
        ],
        order: [[2, "desc"]],
        dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        language: {
          sLengthMenu: "Show _MENU_",
          search: "",
          searchPlaceholder: "Search..",
        },
        buttons: [
          {
            text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Template</span>',
            className: "add-new btn btn-primary mx-3",
            action: function() {
              window.location.href = './template-promotion-create.html';
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
      })),
    $(".datatables-users tbody").on("click", ".delete-record", function () {
      e.row($(this).parents("tr")).remove().draw();
    });
});

"use strict";
$(function () {
  var e = $(".datatables-users"),
    l = {
      1: { title: "Pending", class: "bg-label-warning" },
      2: { title: "Active", class: "bg-label-success" },
      3: { title: "Inactive", class: "bg-label-secondary" },
    },
    i = "app-user-view-account.html";
  e.length &&
    e.DataTable({
      ajax: assetsPath + "json/user-list-2.json",
      columns: [
        { data: "" },
        { data: "full_name" },
        { data: "full_name" },
        { data: "email" },
        { data: "role" },
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
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
        },
        {
          targets: 2,
          responsivePriority: 4,
          render: function (e, t, a, n) {
            var l = a.full_name,
              s = a.email,
              r = a.avatar;
            return (
              '<div class="d-flex justify-content-left align-items-center"><div class="avatar-wrapper"><div class="avatar avatar-sm me-3">' +
              (r
                ? '<img src="' +
                  assetsPath +
                  "img/avatars/" +
                  r +
                  '" alt="Avatar" class="rounded-circle">'
                : '<span class="avatar-initial rounded-circle bg-label-' +
                  [
                    "success",
                    "danger",
                    "warning",
                    "info",
                    "dark",
                    "primary",
                    "secondary",
                  ][Math.floor(6 * Math.random()) + 1] +
                  '">' +
                  (r = (
                    ((r = (l = a.full_name).match(/\b\w/g) || []).shift() ||
                      "") + (r.pop() || "")
                  ).toUpperCase()) +
                  "</span>") +
              '</div></div><div class="d-flex flex-column"><a href="' +
              i +
              '" class="text-body text-truncate"><span class="fw-medium text-heading">' +
              l +
              '</span></a><small class="text-muted">' +
              s +
              "</small></div></div>"
            );
          },
        },
        {
          targets: 3,
          render: function (e, t, a, n) {
            a = a.role;
            return (
              "<span class='text-truncate d-flex align-items-center'>" +
              a +
              "</span>"
            );
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, a, n) {
            return (
              '<a href="' +
              i +
              '" class="btn btn-sm btn-icon btn-text-secondary rounded-pill"><i class="mdi mdi-eye-outline mdi-20px"></i></a>'
            );
          },
        },
      ],
      order: [[2, "desc"]],
      dom: '<"row mx-2"<"col-sm-12 col-md-4 col-lg-6" l><"col-sm-12 col-md-8 col-lg-6"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center align-items-center flex-sm-nowrap flex-wrap me-1"<"me-3"f><"user_role w-px-200 pb-3 pb-sm-0">>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "Search",
        searchPlaceholder: "Search..",
      },
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
                '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
              )
                .appendTo(".user_role")
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
    });
}),
  (function () {
    var e = document.querySelectorAll(".role-edit-modal"),
      t = document.querySelector(".add-new-role"),
      a = document.querySelector(".role-title");
    (t.onclick = function () {
      a.innerHTML = "Add New Role";
    }),
      e &&
        e.forEach(function (e) {
          e.onclick = function () {
            a.innerHTML = "Edit Role";
          };
        });
  })();

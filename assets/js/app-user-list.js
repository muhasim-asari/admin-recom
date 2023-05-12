"use strict";
$(function () {
  let t, a;
  var e,
    s = $(".datatables-users"),
    i = $(".select2"),
    r = "user-update.html",
    o = {
      1: { title: "Pending", class: "bg-label-warning" },
      2: { title: "Active", class: "bg-label-success" },
      3: { title: "Inactive", class: "bg-label-secondary" },
    };
  i.length &&
    (i = i)
      .wrap('<div class="position-relative"></div>')
      .select2({ placeholder: "Select Country", dropdownParent: i.parent() }),
    s.length &&
      (e = s.DataTable({
        ajax: assetsPath + "json/user-list-2.json",
        columns: [
          { data: "" },
          { data: "full_name" },
          { data: "full_name" },
          { data: "email" },
          { data: "role" },
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
              var s = a.full_name,
                o = a.avatar;
              return (
                '<div class="d-flex justify-content-start align-items-center user-name"><div class="avatar-wrapper"><div class="avatar avatar-sm me-3">' +
                (o
                  ? '<img src="' +
                    assetsPath +
                    "img/avatars/" +
                    o +
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
                    ][Math.floor(6 * Math.random())] +
                    '">' +
                    (o = (
                      ((o = (s = a.full_name).match(/\b\w/g) || []).shift() ||
                        "") + (o.pop() || "")
                    ).toUpperCase()) +
                    "</span>") +
                '</div></div><div class="d-flex flex-column"><span class="fw-500">' +
                s +
                '</span><small class="text-muted">'
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
            targets: 4,
            render: function (e, t, a, n) {
              a = a.role;
              return (
                "<span class='text-truncate d-flex align-items-center'>" +
                {
                  Admin:
                    '<i class="mdi mdi-laptop mdi-20px text-danger me-2"></i>',
                  Operator:
                    '<i class="mdi mdi-cog-outline mdi-20px text-warning me-2"></i>',
                }[a] +
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
                '<a href="./user-change-password.html" class="me-2"><i class="mdi mdi-lock-outline me-2"></i><span>Password</span><a href="' +
                r +
                '" class="me-2"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a><a href="javascript:;" class="text-danger delete-record"><i class="mdi mdi-delete-outline"></i><span>Delete</span></a></div>'
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
            text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add User</span>',
            className: "add-new btn btn-primary mx-3",
            action: function() {
              window.location.href = './user-create.html';
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
                  a.append('<option value="' + e + '">' + e + "</option>");
                });
            })
        },
      })),
    $(".datatables-users tbody").on("click", ".delete-record", function () {
      e.row($(this).parents("tr")).remove().draw();
    });
}),
  (function () {
    var e = document.querySelectorAll(".phone-mask"),
      t = document.getElementById("addNewUserForm");
    e &&
      e.forEach(function (e) {
        new Cleave(e, { phone: !0, phoneRegionCode: "US" });
      }),
      FormValidation.formValidation(t, {
        fields: {
          userFullname: {
            validators: { notEmpty: { message: "Please enter fullname " } },
          },
          userPassword: {
            validators: { notEmpty: { message: "Please enter Password " } },
          },
          userEmail: {
            validators: {
              notEmpty: { message: "Please enter your email" },
              emailAddress: {
                message: "The value is not a valid email address",
              },
            },
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          bootstrap5: new FormValidation.plugins.Bootstrap5({
            eleValidClass: "",
            rowSelector: function (e, t) {
              return ".mb-4";
            },
          }),
          submitButton: new FormValidation.plugins.SubmitButton(),
          autoFocus: new FormValidation.plugins.AutoFocus(),
        },
      });
  }),
  (function () {
    // Get the "Select All" checkbox element
    const selectAllCheckbox = document.getElementById("selectAll");

    // Get all the checkboxes to be selected/deselected
    const checkboxes = document.querySelectorAll(".input-filter");

    // Add a "change" event listener to the "Select All" checkbox
    selectAllCheckbox.addEventListener("change", function () {
      checkboxes.forEach(function (checkbox) {
        // Set the state of the checkboxes to be the same as the "Select All" checkbox
        checkbox.checked = selectAllCheckbox.checked;
      });
    });
  })();

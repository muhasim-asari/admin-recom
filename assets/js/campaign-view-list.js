"use strict";
$(function () {
  let t, a;
  var e,
    s = $(".datatables-manage-users");
    s.length &&
      (e = s.DataTable({
        ajax: assetsPath + "json/campaign-member-view.json",
        columns: [
          { data: "" },
          { data: "name" },
          { data: "date_of_birth" },
          { data: "religion" },
          { data: "phone_number" },
          { data: "email" },
          { data: "" },
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
          { targets: 1, searchable: !1, visible: !1 },
          {
            targets: 2,
            render: function (e, t, a, n) {
              return '<span class="text-nowrap">' + a.name + "</span>";
            },
          },
          {
            targets: 3,
            render: function (e, t, a, n) {
              return (
                '<span class="text-nowrap">' + a.date_of_birth + "</span>"
              );
            },
          },
          {
            targets: 4,
            render: function (e, t, a, n) {
              return (
                '<span class="text-nowrap">' + a.religion + "</span>"
              );
            },
          },
          {
            targets: 5,
            render: function (e, t, a, n) {
              return (
                '<span class="text-nowrap">' + a.phone_number + "</span>"
              );
            },
          },
          {
            targets: -1,
            render: function (e, t, a, n) {
              return (
                '<span class="text-nowrap">' + a.email + "</span>"
              );
            },
          }
          
        ],
        order: [[1, "desc"]],
        
        language: {
          sLengthMenu: "Show _MENU_",
          search: "",
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
                  a.append('<option value="' + e + '">' + e + "</option>");
                });
            })
        },
      })),
    $(".datatables-manage-users tbody").on("click", ".delete-record", function () {
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

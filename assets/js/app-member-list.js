"use strict";
$(function () {
  var e,
    t = $(".datatables-member"),
    l = "member-update.html";
  t.length &&
    (e = t.DataTable({
      ajax: assetsPath + "json/member-list.json",
      columns: [
        { data: "full_name" },
        { data: "full_name" },
        { data: "date_of_birth" },
        { data: "religion" },
        { data: "email" },
        { data: "last_checkin" },
      ],
      columnDefs: [
        {
          searchable: 1,
          responsivePriority: 2,
          targets: 0,
          render: function (e, t, a, n) {
            return '<span>'+ a.full_name +'</span>';
          },
        },
        {
          targets: 1,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.date_of_birth + "</span>";
          },
        },
        {
          targets: 2,
          render: function (e, t, a, n) {
            return '<span class="text-nowrap">' + a.religion + "</span>";
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
            return '<span class="text-nowrap">' + a.last_checkin + "</span>" + '<br/>' + a.place ;
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, a, n) {
            return (
              '<div class="d-inline-block text-nowrap"><button class="btn btn-sm btn-icon btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical mdi-20px"></i></button><div class="dropdown-menu dropdown-menu-end m-0"><a href="./member-history.html" class="me-2 text-warning dropdown-item"><i class="mdi mdi-history me-2"></i><span>History</span></a><a href="' + l + '" class="me-2 dropdown-item"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a><a href="javascript:;" class="text-danger dropdown-item delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a></div></div></div>'
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
// mendapatkan elemen 'select' dan 'input'
const select = document.getElementById('selectedFilter');
const input = document.getElementById('inputDateFilter');
const wrapperSelect = document.getElementById('wrapperSelect');

// menambahkan event listener pada 'select'
select.addEventListener('change', () => {
  // mendapatkan nilai 'value' dari 'select'
  const value = select.value;

  // menampilkan atau menyembunyikan elemen 'input' berdasarkan nilai 'value' dari 'select'
  if (value === 'true') {
    input.style.display = 'block';
    wrapperSelect.classList.add("col-md-6");
    wrapperSelect.classList.remove("col-md-12");
  } else {
    input.style.display = 'none';
    wrapperSelect.classList.remove("col-md-6");
    wrapperSelect.classList.add("col-md-12");
  }
});


"use strict";

$(function () {
  var table = $(".datatables-master-sub-location").DataTable({
    ajax: assetsPath + "json/admin-management/list-sub-location.json",
    columns: [
      { data: "sub_location_name" },
      { data: "sub_sub_locations" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: true,
    columnDefs: [
      {
        responsivePriority: 2,
        targets: 0,
        render: function (data, type, row, meta) {
          return (
            '<a href="./admin-management-master-data-sub-location-detail-update.html">' +
            row.sub_location_name +
            "</a>"
          );
        },
      },
      {
        targets: 1,
        render: function (data, type, row, meta) {
          var subSubLocations = row.sub_sub_locations;
          var renderedSubSubLocations = '';

          if (subSubLocations && subSubLocations.length > 0) {
            renderedSubSubLocations = '<ul>';

            subSubLocations.forEach(function (subSubLocation) {
              renderedSubSubLocations += '<li>' + subSubLocation.sub_sub_location_name + '</li>';
            });

            renderedSubSubLocations += '</ul>';
          }

          return renderedSubSubLocations;
        },
      },
      {
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (data, type, row, meta) {
          return (
            '<a href="javascript:;" class="text-danger delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a>'
          );
        },
      },
    ],
    order: [[2, "desc"]],
    dom:
      '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    language: {
      sLengthMenu: "Show _MENU_",
      search: "",
      searchPlaceholder: "Search..",
    },
    buttons: [
      {
        extend: "collection",
        className: "btn btn-label-secondary dropdown-toggle mx-3",
        text:
          '<i class="mdi mdi-microsoft-excel me-1"></i> <span class="d-none d-sm-inline-block">Excel</span>',
        buttons: [
          {
            extend: "excel",
            text:
              '<i class="mdi mdi-export-variant me-1" ></i>Export Excel',
            className: "dropdown-item",
            exportOptions: {
              columns: [1, 2, 3, 4, 5],
              format: {
                body: function (data, row, column, node) {
                  var text = node.textContent || node.innerText;
                  if (
                    node.classList &&
                    node.classList.contains("user-name")
                  ) {
                    return node.lastChild.firstChild.textContent;
                  } else {
                    return text;
                  }
                },
              },
            },
            customize: function (xlsx) {
              var sheet = xlsx.xl.worksheets['sheet1.xml'];
              $('row c[r^="D"]', sheet).attr('s', '2');
            },
          },
          {
            extend: "excel",
            text: '<i class="mdi mdi-import me-1" ></i>Import Excel',
            className: "dropdown-item",
            action: function (e, dt, button, config) {
              alert("Import Excel logic goes here");
            },
          },
        ],
      },
      {
        text:
          '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Sub Location</span>',
        className: "add-new btn btn-primary mx-3",
        action: function () {
          window.location.href =
            "./admin-management-master-data-sub-location-add.html";
        },
      },
    ],
  });

  $(".datatables-master-sub-location tbody").on(
    "click",
    ".delete-record",
    function () {
      table.row($(this).parents("tr")).remove().draw();
    }
  );
});

$(document).ready(function () {
  toastr.options = {
    closeButton: true,
    debug: false,
    progressBar: true,
    positionClass: "toast-top-right",
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    var assetGroupName = $("#locationName").val();
    var description = $("#description").val();

    if (assetGroupName && description) {
      toastr.success("Berhasil Membuat Location Baru", "Create Success!");
    } else {
      toastr.error("Gagal Membuat Location Baru", "Create Error!");
    }
  }

  $("#createLocation").submit(handleFormSubmit);
  $("#updateLocation").submit(handleFormSubmit);
});

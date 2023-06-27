"use strict";

$(function() {
  var s = $(".datatables-asset-depreciation-n-a"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    s.DataTable({
      ajax: assetsPath + "json/admin-management/list-asset-registration.json",
      columns: [
        { data: "asset_code" },
        { data: "asset_name" },
        { data: "asset_category" },
        { data: "asset_group" },
        { data: "depreciation_start_date" },
        { data: "action" }
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 2,
          targets: 0,
          render: function(e, t, a, n) {
            return '<a href="./admin-management-asset-list-detail-update.html">' + a.asset_code + '</a>';
          }
        },        
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function(e, t, a, n) {
            return (
              '<a href="./admin-management-depreciation-show.html" class="text-primary"><i class="mdi mdi-eye-outline me-2"></i><span>Show Depreciation</span></a>'
            );
          }
        }
      ]
    });
  }

  $(".datatables-asset-registration tbody").on(
    "click",
    ".delete-record",
    function() {
      s.DataTable()
        .row($(this).parents("tr"))
        .remove()
        .draw();
    }
  );
});

$(document).ready(function() {
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
    hideMethod: "fadeOut"
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    var employeeName = $("#poNumber").val();

    if (employeeName) {
      toastr.success("Berhasil Membuat PO Data Baru", "Create Success!");
    } else {
      toastr.error("Gagal Membuat PO Data Baru", "Create Error!");
    }
  }

  $("#createdAssetRegistration, #updateAssetRegistration").submit(handleFormSubmit);
});


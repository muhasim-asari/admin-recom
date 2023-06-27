"use strict";

$(function() {
  var s = $(".datatables-asset-registration"),
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
        { data: "tags" },
        { data: "asset_category" },
        { data: "created_date" },
        { data: "updated_date" },
        { data: "action" }
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 2,
          targets: 0,
          render: function(e, t, a, n) {
            return '<a href="./admin-management-asset-wo-tag-detail-update.html">' + a.asset_code + '</a>';
          }
        },        
        {
          targets: 2,
          render: function(e, t, a, n) {
            return a.tags.length + ' / ' + a.required;
          }
        },  
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function(e, t, a, n) {
            return (
              '<a href="./admin-management-generate-tag.html" class="text-info me-2"><i class="mdi mdi-qrcode me-2"></i><span>Gen. Tag</span></a>'
            );
          }
        }
      ],
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


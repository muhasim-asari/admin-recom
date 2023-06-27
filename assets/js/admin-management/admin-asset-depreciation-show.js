"use strict";

$(function() {
  var s = $(".datatables-depreciation-show"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    s.DataTable({
      ajax: assetsPath + "json/admin-management/list-depreciation-show.json",
      columns: [
        { data: "period" },
        { data: "acquisition_cost" },
        { data: "depreciation_value" },
        { data: "net_book_value" },
        { data: "information" },
        { data: "action" }
      ],
      bLengthChange: false,
      bInfo: false,
      columnDefs: [
        {
          targets: 1,
          render: function (e, t, a, n) {
            if (a.acquisition_cost.originated_currency === 0 && a.acquisition_cost.base_currency === 0) {
              return "";
            } else {
              return (
                "<span class='me-2'>" + "IDR" + "</span>" + a.acquisition_cost.originated_currency + "<br/>" +
                "<span class='me-2'>" + "USD" + "</span>" + a.acquisition_cost.base_currency 
              );
            }
          }
        },
        {
          targets: 2,
          render: function (e, t, a, n) {
        
            return (
              "<span class='me-2'>" + "IDR" + "</span>" + a.depreciation_value.originated_currency + "<br/>" +
              "<span class='me-2'>" + "USD" + "</span>" + a.depreciation_value.base_currency 
            );
          }
        },
        {
          targets: 3,
          render: function (e, t, a, n) {
        
            return (
              "<span class='me-2'>" + "IDR" + "</span>" + a.net_book_value.originated_currency + "<br/>" +
              "<span class='me-2'>" + "USD" + "</span>" + a.net_book_value.base_currency 
            );
          }
        },
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function(e, t, a, n) {
            return (
              '<a href="javascript:;" class="me-2"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a>'
            );
          }
        }
      ],
    });
  }

  $(".datatables-po-data tbody").on(
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

  $("#createdPoData, #updatePoData").submit(handleFormSubmit);
});

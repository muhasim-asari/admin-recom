"use strict";

const generateTagsCheckbox = document.getElementById('generateTags');
const generateAutomaticDiv = document.getElementById('generateAutomatic');
const generateManualDiv = document.getElementById('generateManual');

$(function() {
  var s = $(".datatables-asset-name"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    $.ajax({
      url: assetsPath + "json/admin-management/list-asset-name.json",
      dataType: "json",
      success: function(data) {
        $(s).DataTable({
          data: data.sub_assets,
          columns: [
            { data: "sub_asset_name" },
            { data: "sub_sub_asset_name" },
            { data: "tag" }
          ],
          bLengthChange: false,
          bInfo: false,
          paging: false,
          searching: false,
          columnDefs: [
            {
              responsivePriority: 2,
              targets: 2,
              render: function(e, t, a, n) {
                return '<input type="text" class="form-control" id="defaultFormControlInput" placeholder="Enter Tag" aria-describedby="defaultFormControlHelp">';
              }
            },
          ]
        });
      }
    });
  }

  $(".datatables-asset-name tbody").on(
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

$(function() {
  var s = $(".datatables-asset-name-1"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    $.ajax({
      url: assetsPath + "json/admin-management/list-asset-name.json",
      dataType: "json",
      success: function(data) {
        $(s).DataTable({
          data: data.sub_assets,
          columns: [
            { data: "sub_asset_name" },
            { data: "sub_sub_asset_name" },
            { data: "tag" },
            { data: "action" }
          ],
          bLengthChange: false,
          bInfo: false,
          paging: false,
          searching: false,
          columnDefs: [
            {
              targets: 2,
              render: function(e, t, a, n) {
                return '<a href="./admin-management-view-barcode.html">' + a.tag + '</a>';
              }
            },
            {
              targets: -1,
              title: "Actions",
              searchable: false,
              orderable: false,
              render: function(e, t, a, n) {
                return (
                  '<a href="./admin-management-generate-tag.html" class="text-info me-2"><i class="mdi mdi-qrcode me-2"></i><span>Re Generate</span></a><a href="javascript:;" class="text-danger delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a>'
                );
              }
            }
          ]
        });
      }
    });
  }

  $(".datatables-asset-name-1 tbody").on(
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

generateTagsCheckbox.addEventListener('change', function() {
  if (this.checked) {
    generateAutomaticDiv.style.display = 'block';
    generateManualDiv.style.display = 'none';
  } else {
    generateAutomaticDiv.style.display = 'none';
    generateManualDiv.style.display = 'block';
  }
});

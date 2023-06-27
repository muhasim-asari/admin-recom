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
            var iconHtml = a.id === 1 ? '<i class="mdi mdi-chart-box-outline ms-1 text-warning" data-toggle="tooltip" data-placement="top" title="Depreciation N/A"></i><i class="mdi mdi-alert-circle-outline ms-1 text-info" data-toggle="tooltip" data-placement="top" title="Asset W/O Tags"></i>' : '';
            return '<a href="./admin-management-asset-list-detail-update.html">' + a.asset_code + '</a>' + iconHtml;
          }
        },        
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function(e, t, a, n) {
            return (
              '<a href="./admin-management-depreciation-set-up.html" class="text-info me-2"><i class="mdi mdi-cog-outline me-2"></i><span>Set Up</span></a>'
            );
          }
        }
      ],
      order: [[2, "desc"]],
      dom:
        '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        sLengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search.."
      },
      buttons: [
        {
          extend: "excel",
          text:
            '<i class="mdi mdi-export-variant me-1"></i>Export to Excel',
          className: "btn btn-label-secondary mx-3",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
            format: {
              body: function(data, row, column, node) {
                var text = node.textContent || node.innerText;
                if (
                  node.classList &&
                  node.classList.contains("user-name")
                ) {
                  return node.lastChild.firstChild.textContent;
                } else {
                  return text;
                }
              }
            }
          },
          customize: function(xlsx) {
            var sheet = xlsx.xl.worksheets["sheet1.xml"];
            $('row c[r^="D"]', sheet).attr("s", "2");
          }
        },
      ],
      initComplete: function () {
        var dataTable = this.api();
        var data = dataTable.data();
        dataTable.clear().row.add(data[1]).draw();
      },
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


"use strict";

$(function() {
  var s = $(".datatables-po-data"),
    i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    s.DataTable({
      ajax: assetsPath + "json/admin-management/list-department.json",
      columns: [
        { data: "po_number" },
        { data: "po_date" },
        { data: "po_status" },
        { data: "action" }
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 2,
          targets: 0,
          render: function(e, t, a, n) {
            return (
              '<a href="./admin-management-purchase-po-data-detail-update.html">' +
              a.po_number +
              "</a>"
            );
          }
        },
        {
          targets: 2,
          render: function (e, t, a, n) {
            function changeStatus(button) {
              var poStatus = button.dataset.status;
              var newStatus = poStatus === 'active' ? 'inactive' : 'active';
              button.dataset.status = newStatus;
              button.classList.toggle('btn-success');
              button.classList.toggle('btn-primary');
            }
            
            var poStatus = a.po_status;
            var buttonHtml = '<button type="button" class="btn btn-icon ' +
              (poStatus === 'Active' ? 'btn-success' : 'btn-danger') +
              ' waves-effect waves-light">' +
              '<span class="tf-icons mdi mdi-power"></span>' +
              '</button>';
        
            return buttonHtml;
          }
        },
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function(e, t, a, n) {
            return (
              '<a href="javascript:;" class="text-danger dropdown-item delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a>'
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
        {
          text:
            '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add PO</span>',
          className: "add-new btn btn-primary",
          action: function() {
            window.location.href =
              "./admin-management-purchase-po-data-add.html";
          }
        }
      ]
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

"use strict";

$(function () {
  let t, a, n;
  var e;
  var s = $(".datatables-asset-maintenance");
  var i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    e = s.DataTable({
      ajax: assetsPath + "json/admin-management/list-asset-maintenance.json",
      columns: [
        { data: "asset_code" },
        { data: "asset_name" },
        { data: "total_maintenance_group" },
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

              "<div>" +
                "<a href='./admin-management-repair-asset-management-detail.html'>" +
                  row.asset_code +
                "</a>" +
              "</div>"
            );
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
            '<i class="mdi mdi-printer-outline me-1"></i> <span class="d-none d-sm-inline-block">Print</span>',
          buttons: [
            {
              extend: "pdf",
              text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    var parsedData;
                    return data.length <= 0
                      ? data
                      : ((data = $.parseHTML(data)),
                        (parsedData = ""),
                        $.each(data, function (index, element) {
                          if (
                            typeof element.classList !== "undefined" &&
                            element.classList.contains("user-name")
                          ) {
                            parsedData += element.lastChild.firstChild.textContent;
                          } else if (typeof element.innerText === "undefined") {
                            parsedData += element.textContent;
                          } else {
                            parsedData += element.innerText;
                          }
                        }),
                        parsedData);
                  },
                },
              },
            },
            {
              extend: "excel",
              text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    var parsedData;
                    return data.length <= 0
                      ? data
                      : ((data = $.parseHTML(data)),
                        (parsedData = ""),
                        $.each(data, function (index, element) {
                          if (
                            typeof element.classList !== "undefined" &&
                            element.classList.contains("job-order-audit")
                          ) {
                            parsedData += element.lastChild.firstChild.textContent;
                          } else if (typeof element.innerText === "undefined") {
                            parsedData += element.textContent;
                          } else {
                            parsedData += element.innerText;
                          }
                        }),
                        parsedData);
                  },
                },
              },
            },
          ],
        },
        {
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Asset Maintenance</span>',
          className: "add-new btn btn-primary mx-3",
          action: function () {
            window.location.href = "./admin-management-repair-asset-management-add.html";
          },
        },
      ],
      initComplete: function () {
        var statusSelect = $(
          '<label>Status: <select id="status" class="form-select text-capitalize"><option value="">All Status</option><option value="Process">Process</option><option value="Waiting Approval">Waiting Approval</option><option value="Completed">Completed</option></select></label>'
        ).appendTo(".status");
  
        statusSelect.on("change", function () {
          var status = $(this).val();
          table.column(3).search(status).draw();
        });
      },
    });

    $(".datatables-asset-maintenance tbody").on(
      "click",
      ".delete-record",
      function () {
        e.row($(this).parents("tr")).remove().draw();
      }
    );
  }
});

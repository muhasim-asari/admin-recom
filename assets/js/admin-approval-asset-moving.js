"use strict";

$(function () {
  let t, a, n;
  var e;
  var s = $(".datatables-asset-moving");
  var i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    e = s.DataTable({
      ajax: assetsPath + "json/admin-approval/list-asset-moving.json",
      columns: [
        { data: "asset_moving_created_date" },
        { data: "transaction_number" },
        { data: "moving_type" },
        { data: "person_in_charge" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 2,
          targets: 1,
          render: function (data, type, row, meta) {
            var getStatusIcon = function (status) {
              switch (status) {
                case "Complete":
                  return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
                case "Waiting Approval":
                  return '<i class="mdi mdi-alert mdi-20px text-danger me-1"></i>';
                case "Waiting Moving":
                  return '<i class="mdi mdi-information mdi-20px text-warning me-1"></i>';
                case "Disapprove":
                  return '<i class="mdi mdi-close-circle mdi-20px text-secondary me-1"></i>';
                default:
                  return "";
              }
              
            };

            var getStatusColorClass = function (status) {
              switch (status) {
                case "Complete":
                  return "text-success";
                case "Waiting Approval":
                  return "text-danger";
                case "Waiting Moving":
                  return "text-warning";
                case "Disapprove":
                  return "text-secondary";
                default:
                  return "";
              }
            };

            return (
              "<div>" +
              "<a href='./admin-approval-asset-moving-detail.html'>" +
              row.transaction_number +
              "</a>" +
              "<br/>" +
              "<span class='" +
              getStatusColorClass(row.status) +
              " fw-normal'>" +
              getStatusIcon(row.status) +
              row.status +
              "</span>" +
              "</div>"
            );
          },
        },
        {
          targets: 3,
          render: function (data, type, row, meta) {
            return (
              '<div class="text-heading">' +
              row.person_in_charge.name +
              "<br/>" +
              row.person_in_charge.department +
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
              '<a href="javascript:;" class="text-danger dropdown-item delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a>'
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
                columns: [1, 2, 3, 4],
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
                columns: [1, 2, 3, 4],
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

    $(".datatables-asset-moving tbody").on(
      "click",
      ".delete-record",
      function () {
        e.row($(this).parents("tr")).remove().draw();
      }
    );
  }
});

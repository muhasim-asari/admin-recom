"use strict";

$(function () {
  let t, a, n;
  var e;
  var s = $(".datatables-detail-information");
  var i = $(".select2");

  if (i.length) {
    i.wrap('<div class="position-relative"></div>');
  }

  if (s.length) {
    e = s.DataTable({
      ajax: assetsPath + "json/admin-management/list-asset-maintenance.json",
      columns: [
        { data: "maintenance_group_name" },
        { data: "maintenance_period_km" },
        { data: "first_maintenance_date" },
        { data: "last_maintenance_date" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      searching: false,
      columnDefs: [
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (data, type, row, meta) {
            return (
              '<a href="./admin-management-asset-maintenance-detail-2.html" class="text-info me-2"><i class="mdi mdi-pencil-outline me-2"></i><span></span></a><a href="javascript:;" class="text-danger delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span></span></a>'
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
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Maintenance</span>',
          className: "add-new btn btn-primary mx-3 my-3",
          action: function () {
            window.location.href = "./admin-management-asset-maintenance-detail-add.html";
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

    $(".datatables-asset-repair tbody").on(
      "click",
      ".delete-record",
      function () {
        e.row($(this).parents("tr")).remove().draw();
      }
    );
  }
});

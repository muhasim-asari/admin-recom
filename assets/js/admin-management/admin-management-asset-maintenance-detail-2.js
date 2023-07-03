$(function () {
  $(".datatables-asset-maintenance-detail").DataTable({
    ajax: assetsPath + "json/admin-management/list-asset-maintenance.json",
    columns: [
      { data: "maintenance_created_date" },
      { data: "maintenance_approval_date" },
      { data: "maintenance_date" },
      { data: "maintenance_completed_date" },
      { data: "status" },
      { data: "" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: false,
    searching: false,
    columnDefs: [
      {
        responsivePriority: 2,
        targets: 4,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status) {
            switch (status) {
              case "Complete":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Maintenance":
                return '<i class="mdi mdi-alert mdi-20px text-dark me-1"></i>';
              default:
                return "";
            }
          };

          var getStatusColorClass = function (status) {
            switch (status) {
              case "Complete":
                return "text-success";
              case "Waiting Maintenance":
                return "text-dark";
              default:
                return "";
            }
          };

          return (
            "<div>" +
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
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (data, type, row, meta) {
          return '<a href="javascript:;" class="text-info me-2" data-bs-toggle="modal" data-bs-target="#detailMaintenance"><i class="mdi mdi-information-outline me-2"></i><span></span></a><a href="javascript:;" class="text-danger delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span></span></a>';
        },
      },
    ],
    order: [[2, "desc"]],
    dom: '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    language: {
      sLengthMenu: "Show _MENU_",
      search: "",
      searchPlaceholder: "Search..",
    },
    buttons: [
      {
        text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add List Periodic Maintenance</span>',
        className: "add-new btn btn-primary mx-3 my-3",
        attr: {
          "data-bs-toggle": "modal",
          "data-bs-target": "#addListPeriodic",
        },
      },
    ],
  });

  $(".datatables-detail-information").DataTable({
    ajax: assetsPath + "json/admin-management/list-asset-maintenance.json",
    columns: [
      { data: "maintenance_group_name" },
      { data: "maintenance_period_km" },
      { data: "description" },
      { data: "first_maintenance_date" },
      { data: "last_maintenance_date" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: false,
    searching: false,
    columnDefs: [],
    initComplete: function () {
      var dataTable = this.api();
      var data = dataTable.data();

      var filteredData = data.filter(function (item) {
        return item.id === 1;
      });

      dataTable.clear().draw();
      dataTable.rows.add(filteredData).draw();
    },
  });
});

$(function () {
  $(".datatables-asset-out-detail").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-out.json",
    columns: [
      { data: "asset_out_created_date" },
      { data: "asset_out_approval_date" },
      { data: "asset_out_date" },
      { data: "asset_out_completed_date" },
      { data: "person_in_charge" },
      { data: "asset_destination" },
      { data: "status" },
      { data: "information" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: false,
    searching: false,
    columnDefs: [
      {
        targets: 4,
        render: function (data, type, row, meta) {
          return (
            '<div class="text-heading">' +
            row.person_in_charge.department +
            "<br/>" +
            row.person_in_charge.name +
            "</div>"
          );
        },
      },
      {
        targets: 6,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status) {
            switch (status) {
              case "Complete":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Approval":
                return '<i class="mdi mdi-alert mdi-20px text-danger me-1"></i>';
              case "Waiting Asset Out":
                return '<i class="mdi mdi-information mdi-20px text-warning me-1"></i>';
              case "Disapprove":
                return '<i class="mdi mdi-close-circle mdi-20px text-secondary me-1"></i>';
              case "Asset Out":
                return '<i class="mdi mdi-arrow-left mdi-20px text-info me-1"></i>';
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
              case "Waiting Asset Out":
                return "text-warning";
              case "Disapprove":
                return "text-secondary";
              case "Asset Out":
                return "text-info";
              default:
                return "";
            }              
          };

          return (
            "<div>" +
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
    ],
    initComplete: function () {
      var dataTable = this.api();
      var data = dataTable.data();
      var randomIndex = Math.floor(Math.random() * data.length);
      dataTable.clear().row.add(data[randomIndex]).draw();
    },
  });

  $(".datatables-asset-out-information").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-out-information.json",
    columns: [
      { data: "asset_name" },
      { data: "quantity" },
      { data: "asset_origin" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: false,
    searching: false,
    columnDefs: [
      {
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (e, t, a, n) {
          var disabled = a.id === 1 ? "disabled" : "";
          return '<button class="btn btn-sm btn-danger waves-effect waves-light me-2" data-bs-toggle="modal" data-bs-target="#disapprove"><span class="tf-icons mdi mdi mdi-close me-1"></span>Disapprove</button> <button class="btn btn-sm btn-success waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#approve"><span class="tf-icons mdi mdi mdi-check me-1"></span>Approve</button>';
        },
      },
    ],
  });
});

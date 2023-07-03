$(function () {
  $(".datatables-asset-moving-detail").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-moving.json",
    columns: [
      { data: "asset_moving_created_date" },
      { data: "asset_moving_approval_date" },
      { data: "asset_moving_completed_date" },
      { data: "moving_type" },
      { data: "person_in_charge" },
      { data: "asset_moving_destination" },
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
            row.person_in_charge.name +
            "<br/>" +
            row.person_in_charge.department +
            "</div>"
          );
        },
      },
      {
        responsivePriority: 2,
        targets: 6,
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

  $(".datatables-detail-information").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-moving-information.json",
    columns: [
      { data: "asset_code" },
      { data: "asset_name" },
      { data: "asset_category" },
      { data: "asset_group" },
      { data: "status_approval_asset_moving" },
      { data: "status_moving_asset" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: true,
    searching: true,
    columnDefs: [
      {
        responsivePriority: 2,
        targets: 4,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Approve":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              default:
                return "";
            }
            
          };

          var getStatusColorClass = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Approve":
                return "text-success";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_approval_asset_moving) +
            " fw-normal'>" +
            getStatusIcon(row.status_approval_asset_moving) +
            row.status_approval_asset_moving +
            "</span>" +
            "</div>"
          );
        },
      },
      {
        responsivePriority: 2,
        targets: 5,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Done Moving":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Moving Approval":
                return '<i class="mdi mdi-alert mdi-20px text-warning me-1"></i>';
              default:
                return "";
            }
            
          };

          var getStatusColorClass = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Done Moving":
                return "text-success";
              case "Waiting Moving Approval":
                return "text-warning";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_moving_asset) +
            " fw-normal'>" +
            getStatusIcon(row.status_moving_asset) +
            row.status_moving_asset +
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
        render: function (e, t, a, n) {
          if (a.status_moving_asset === "Done Moving" || a.status_moving_asset === "Waiting Moving Approval") {
            return '<button class="btn btn-primary btn-sm waves-effect waves-light" disabled>Moving</button>';
          } else {
            return '<button class="btn btn-primary btn-sm waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#editDiscrepancy"><span class="tf-icons mdi mdi mdi-pencil-outline"></span></button>';
          }
        },
      },
    ],
    dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f><'col-sm-12 ps-0 information-table'>>" +
       "<'row'<'col-sm-12'tr>>" +
       "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" +
       "<'row'<'col-sm-12'>>",
    initComplete: function () {
      var dataTable = this.api();
      var data = dataTable.data();

      var filteredData = data.filter(function (item) {
        return item.status_moving_asset === "Done Moving";
      });

      dataTable.clear().draw();
      dataTable.rows.add(filteredData).draw();

      $('.dataTables_wrapper .information-table').html('<div class="p-2 px-3 btn-label-secondary">Location: IT Room</div>');
    }
  });

  $(".datatables-detail-information-1").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-moving-information.json",
    columns: [
      { data: "asset_code" },
      { data: "asset_name" },
      { data: "asset_category" },
      { data: "asset_group" },
      { data: "status_approval_asset_moving" },
      { data: "status_moving_asset" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: true,
    searching: true,
    columnDefs: [
      {
        responsivePriority: 2,
        targets: 4,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Approve":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              default:
                return "";
            }
            
          };

          var getStatusColorClass = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Approve":
                return "text-success";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_approval_asset_moving) +
            " fw-normal'>" +
            getStatusIcon(row.status_approval_asset_moving) +
            row.status_approval_asset_moving +
            "</span>" +
            "</div>"
          );
        },
      },
      {
        responsivePriority: 2,
        targets: 5,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Done Moving":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Moving Approval":
                return '<i class="mdi mdi-alert mdi-20px text-warning me-1"></i>';
              default:
                return "";
            }
            
          };

          var getStatusColorClass = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Done Moving":
                return "text-success";
              case "Waiting Moving Approval":
                return "text-warning";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_moving_asset) +
            " fw-normal'>" +
            getStatusIcon(row.status_moving_asset) +
            row.status_moving_asset +
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
        render: function (e, t, a, n) {
          if (a.status_moving_asset === "Done Moving" || a.status_moving_asset === "Waiting Moving Approval") {
            return '<button class="btn btn-primary btn-sm waves-effect waves-light" disabled>Moving</button>';
          } else {
            return '<button class="btn btn-primary btn-sm waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#editDiscrepancy"><span class="tf-icons mdi mdi mdi-pencil-outline"></span></button>';
          }
        },
      },
    ],
    dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f><'col-sm-12 ps-0 information-table'>>" +
       "<'row'<'col-sm-12'tr>>" +
       "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" +
       "<'row'<'col-sm-12'>>",
    initComplete: function () {
      var dataTable = this.api();
      var data = dataTable.data();

      var filteredData = data.filter(function (item) {
        return item.status_moving_asset === "Waiting Moving Approval";
      });

      dataTable.clear().draw();
      dataTable.rows.add(filteredData).draw();

      $('.dataTables_wrapper .information-table').html('<div class="p-2 px-3 btn-label-secondary">Location: Office</div>');
    }
  });

  $(".datatables-detail-information-2").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-moving-information.json",
    columns: [
      { data: "asset_code" },
      { data: "asset_name" },
      { data: "asset_category" },
      { data: "asset_group" },
      { data: "status_approval_asset_moving" },
      { data: "status_moving_asset" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: true,
    searching: true,
    columnDefs: [
      {
        responsivePriority: 2,
        targets: 4,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Approve":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              default:
                return "";
            }
            
          };

          var getStatusColorClass = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Approve":
                return "text-success";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_approval_asset_moving) +
            " fw-normal'>" +
            getStatusIcon(row.status_approval_asset_moving) +
            row.status_approval_asset_moving +
            "</span>" +
            "</div>"
          );
        },
      },
      {
        responsivePriority: 2,
        targets: 5,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Done Moving":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Moving Approval":
                return '<i class="mdi mdi-alert mdi-20px text-warning me-1"></i>';
              default:
                return "";
            }
            
          };

          var getStatusColorClass = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Done Moving":
                return "text-success";
              case "Waiting Moving Approval":
                return "text-warning";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_moving_asset) +
            " fw-normal'>" +
            getStatusIcon(row.status_moving_asset) +
            row.status_moving_asset +
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
        render: function (e, t, a, n) {
          if (a.status_moving_asset === "Done Moving" || a.status_moving_asset === "Waiting Moving Approval") {
            return '<button class="btn btn-primary btn-sm waves-effect waves-light" disabled>Moving</button>';
          } else {
            return '<button class="btn btn-outline-primary btn-sm waves-effect" data-bs-toggle="modal" data-bs-target="#movingAsset">Moving</button>';
          }
        },
      },
    ],
    dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f><'col-sm-12 ps-0 information-table'>>" +
       "<'row'<'col-sm-12'tr>>" +
       "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>" +
       "<'row'<'col-sm-12'>>",
    initComplete: function () {
      var dataTable = this.api();
      var data = dataTable.data();

      var filteredData = data.filter(function (item) {
        return item.status_moving_asset === "Not Yet";
      });

      dataTable.clear().draw();
      dataTable.rows.add(filteredData).draw();

      $('.dataTables_wrapper .information-table').html('<div class="p-2 px-3 btn-label-secondary">Location: Office</div>');
    }
  });
});

function enableEditMode() {
  var inputAssetMatch = document.getElementById('inputAssetMatch');
  var editAssetMatch = document.getElementById('editAssetMatch');
  var doneAssetMatch = document.getElementById('doneAssetMatch');
  
  inputAssetMatch.disabled = false;  // Mengaktifkan input
  editAssetMatch.style.display = 'none';  // Menyembunyikan tombol edit
  doneAssetMatch.style.display = '';  // Menampilkan tombol done
}

function disableEditMode() {
  var inputAssetMatch = document.getElementById('inputAssetMatch');
  var editAssetMatch = document.getElementById('editAssetMatch');
  var doneAssetMatch = document.getElementById('doneAssetMatch');
  
  inputAssetMatch.disabled = true;  // Menonaktifkan input
  doneAssetMatch.style.display = 'none';  // Menyembunyikan tombol done
  editAssetMatch.style.display = '';  // Menampilkan tombol edit
}
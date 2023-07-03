$(function () {
  $(".datatables-asset-in-detail").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-in.json",
    columns: [
      { data: "asset_in_created_date" },
      { data: "asset_in_approval_date" },
      { data: "asset_in_date" },
      { data: "asset_in_completed_date" },
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
              case "Waiting Asset In":
                return '<i class="mdi mdi-information mdi-20px text-warning me-1"></i>';
              case "Disapprove":
                return '<i class="mdi mdi-close-circle mdi-20px text-secondary me-1"></i>';
              case "Asset In":
                return '<i class="mdi mdi-arrow-right mdi-20px text-info me-1"></i>';
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
              case "Waiting Asset In":
                return "text-warning";
              case "Disapprove":
                return "text-secondary";
              case "Asset In":
                return "text-info";
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

      var filteredData = data.filter(function (item) {
        return item.status === "Waiting Asset In";
      });

      dataTable.clear().draw();
      dataTable.rows.add(filteredData).draw();
    }
  });

  $(".datatables-detail-information").DataTable({
    ajax: assetsPath + "json/admin-management/list-asset-in-information.json",
    columns: [
      { data: "assetName" },
      { data: "quantity" },
      { data: "assetOrigin" },
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
          return '<button class="btn btn-outline-primary btn-sm waves-effect" data-bs-toggle="modal" data-bs-target="#assetIn">Asset In</button>'
        },
      },
    ],
    initComplete: function () {
      var dataTable = this.api();
      var data = dataTable.data();

      var filteredData = data.filter(function (item) {
        return item.id === 1;
      });

      dataTable.clear().draw();
      dataTable.rows.add(filteredData).draw();
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
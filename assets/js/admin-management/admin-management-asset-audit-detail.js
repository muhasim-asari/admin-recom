$(function () {
  $(".datatables-asset-audit-detail").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-audit.json",
    columns: [
      { data: "begin_audit_date" },
      { data: "done_audit_date" },
      { data: "transaction_number" },
      { data: "audit_type" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: false,
    searching: false,
    columnDefs: [
      {
        targets: 1,
        render: function (data, type, row, meta) {
          if (data === "") {
            return "Not finished yet";
          } else {
            return data;
          }
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
    ajax: assetsPath + "json/admin-approval/list-asset-audit-information.json",
    columns: [
      { data: "asset_code" },
      { data: "asset_name" },
      { data: "total_tags" },
      { data: "missing_tags" },
      { data: "missing_asset" },
      { data: "asset_dislocation" },
      { data: "asset_out" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: false,
    searching: false,
    columnDefs: [
      {
        target: 3,
        render: function (e, t, a, n) {
          return '<span class="text-warning" data-toggle="tooltip" data-placement="top" title="112233445566, 12232424142, 3423424324">' + a.missing_tags +'</span>'
        }
      },
      {
        target: 4,
        render: function (e, t, a, n) {
          return '<span class="text-info" data-toggle="tooltip" data-placement="top" title="112233445566">' + a.missing_asset +'</span>'
        }
      },
      {
        target: 5,
        render: function (e, t, a, n) {
          return '<span class="text-danger" data-toggle="tooltip" data-placement="top" title="112233445566, 12232424142, 3423424324, 23213123">' + a.asset_dislocation +'</span>'
        }
      },
      {
        target: 6,
        render: function (e, t, a, n) {
          return '<span class="text-dark" data-toggle="tooltip" data-placement="top" title="112233445566">' + a.asset_out +'</span>'
        }
      },
      {
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (e, t, a, n) {
          return '<button class="btn btn-text-primary waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#editDiscrepancy"><span class="tf-icons mdi mdi mdi-pencil-outline"></span></button>';
        },
      },
    ],
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
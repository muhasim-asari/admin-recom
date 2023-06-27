$(function () {
  $(".datatables-asset-audit-detail").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-audit.json",
    columns: [
      { data: "begin_audit_date" },
      { data: "done_audit_date" },
      { data: "transaction_number" },
      { data: "audit_type" },
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
          return '<button class="btn btn-sm btn-success btn-fab demo waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#approveDetailInformation"><span class="tf-icons mdi mdi mdi-check-circle me-1"></span>Approve</button>';
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
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (e, t, a, n) {
          var disabled = a.id === 1 ? "disabled" : "";
          return '<button class="btn btn-text-success waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#verifyData" ' + disabled + '><span class="tf-icons mdi mdi mdi-check-circle"></span></button>';
        },
      },
    ],
  });
});

"use strict";
$(function () {
  var e1, e2; // Variabel untuk menyimpan objek DataTables

  var s1 = $(".datatables-master-supplier");

  var i = $(".select2");
  i.length && i.wrap('<div class="position-relative"></div>');

  if (s1.length) {
    e1 = s1.DataTable({
      ajax: assetsPath + "json/admin-management/list-supplier.json",
      columns: [
        { data: "company_name" },
        { data: "total" },
        { data: "physical_check" },
        { data: "repair" },
        { data: "asset_out" },
        { data: "disposal" },
        { data: "available" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 3,
          targets: 1,
          render: function (data, type, row, meta) {
            return (
              '<span>' + 'Total: ' + row.total_asset.total + '</span>' +'<br/>' +
              '<span>' + 'Tags: ' + row.total_asset.tags + '</span>' +'<br/>' +
              '<span>' + 'W/O Tags: ' + row.total_asset.wo_tags + '</span>'
            );
          },
        },
      ],
    });
  }

  $(".datatables-master-asset-category tbody").on("click", ".delete-record", function () {
    e1.row($(this).parents("tr")).remove().draw();
  });

  $(".datatables-master-another-category tbody").on("click", ".delete-record", function () {
    e2.row($(this).parents("tr")).remove().draw();
  });
});
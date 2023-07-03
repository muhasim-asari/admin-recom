"use strict";
$(function () {
  var e1, e2; // Variabel untuk menyimpan objek DataTables

  var s1 = $(".datatables-master-asset-category");
  var s2 = $(".datatables-master-asset-group");

  var i = $(".select2");
  i.length && i.wrap('<div class="position-relative"></div>');

  if (s1.length) {
    e1 = s1.DataTable({
      ajax: assetsPath + "json/admin-management/list-asset-category-and-group.json",
      columns: [
        { data: "asset_category_name" },
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
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, row, meta) {
            return (
              "<a href='./admin-management-filter-by-asset-group.html'>" +
              row.asset_category_name +
              "</a>"
            );
          },
        },
      ],
    });
  }

  if (s2.length) {
    e2 = s2.DataTable({
      ajax: assetsPath + "json/admin-management/list-asset-category-and-group.json",
      columns: [
        { data: "asset_group_name" },
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
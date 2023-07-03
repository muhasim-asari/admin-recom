"use strict";
$(function () {
  var e1, e2; // Variabel untuk menyimpan objek DataTables

  var s1 = $(".datatables-master-location");
  var s2 = $(".datatables-master-sub-location");

  var i = $(".select2");
  i.length && i.wrap('<div class="position-relative"></div>');

  if (s1.length) {
    e1 = s1.DataTable({
      ajax: assetsPath + "json/admin-management/list-location.json",
      columns: [
        { data: "location_name" },
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
              "<a href='./admin-management-filter-by-sub-location.html'>" +
              row.location_name +
              "</a>"
            );
          },
        },
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

  if (s2.length) {
    e2 = s2.DataTable({
      ajax: assetsPath + "json/admin-management/list-location.json",
      columns: [
        {
          data: "sub_locations",
          render: function(data, type, row, meta) {
            if (data && data.length > 0) {
              var subLocations = data.map(function(subLocation) {
                return subLocation.sub_location_name;
              });
              return subLocations.join(", ");
            }
            return null; // Return null if sub_locations is empty
          },
        },
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
          render: function(data, type, row, meta) {
            return (
              '<span>' + 'Total: ' + row.total_asset.total + '</span>' + '<br/>' +
              '<span>' + 'Tags: ' + row.total_asset.tags + '</span>' + '<br/>' +
              '<span>' + 'W/O Tags: ' + row.total_asset.wo_tags + '</span>'
            );
          },
        },
      ],
      createdRow: function(row, data, dataIndex) {
        if (!data.sub_locations || data.sub_locations.length === 0) {
          $(row).hide(); // Hide the row if sub_locations is empty
        }
      },
    });    
  }

  $(".datatables-master-asset-category tbody").on("click", ".delete-record", function () {
    e1.row($(this).parents("tr")).remove().draw();
  });

  $(".datatables-master-another-category tbody").on("click", ".delete-record", function () {
    e2.row($(this).parents("tr")).remove().draw();
  });
});
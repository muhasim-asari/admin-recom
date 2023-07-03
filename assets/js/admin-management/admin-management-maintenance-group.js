"use strict";
$(function () {
  var e,
    s = $(".datatables-maintenance-group"),
    i = $(".select2");
  i.length && (i = i).wrap('<div class="position-relative"></div>');
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/admin-management/list-asset-maintenance.json",
      columns: [
        { data: "maintenance_group_name" },
        { data: "maintenance_period_km" },
        { data: "description" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 2,
          targets: 0,
          render: function (e, t, a, n) {
            return (
              "<a href='./admin-management-repair-maintenance-group-detail-update.html'>" +
              a.maintenance_group_name +
              "</a>"
            );
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, a, n) {
            return '<a href="javascript:;" class="text-danger dropdown-item delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a>';
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
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Maintenance Group</span>',
          className: "add-new btn btn-primary mx-3",
          action: function () {
            window.location.href = "./admin-management-repair-maintenance-group-add.html";
          },
        },
      ],
    })),
    $(".datatables-master-asset-category tbody").on("click", ".delete-record", function () {
      e.row($(this).parents("tr")).remove().draw();
    });
}),
  $(document).ready(function () {
    toastr.options = {
      closeButton: true,
      debug: false,
      progressBar: true,
      positionClass: "toast-top-right",
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };

    function handleFormSubmit(event) {
      event.preventDefault();
      var currrencyName = $("#assetCatName").val();
      var abbreviation = $("#description").val();

      if (currrencyName && abbreviation ) {
        toastr.success("Berhasil Membuat Asset Category Baru", "Create Success!");
      } else {
        toastr.error("Gagal Membuat Asset Category Baru", "Create Error!");
      }
    }

    $("#createAssetCategory").submit(handleFormSubmit);
    $("#updateAssetCategory").submit(handleFormSubmit);
  });
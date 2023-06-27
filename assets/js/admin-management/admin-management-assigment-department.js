"use strict";
$(function () {
  var e,
    s = $(".datatables-department"),
    i = $(".select2");
  i.length && (i = i).wrap('<div class="position-relative"></div>');
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/admin-management/list-department.json",
      columns: [
        { data: "department_name" },
        { data: "division_name" },
        { data: "asset_count" },
        { data: "asset_value" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          responsivePriority: 3,
          targets: 2,
          render: function (e, t, a, n) {
            return (
              "<div>" +
                "<span>" + "Total: " + a.asset_count.total + "</span>" + "<br/>" +
                "<span>" + "Tags: " + a.asset_count.tags + "</span>" + "<br/>" +
                "<span>" + "W/O Tags: " + a.asset_count.wo_tags + "</span>"
              +"</div>"
            );
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, a, n) {
            return '<a href="./admin-management-asset-assigment-department-asset-list.html" class="text-primary me-2"><i class="mdi mdi-eye-outline me-2"></i><span>Show Asset</span></a>';
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
          extend: "print",
          className: "btn btn-label-secondary mx-3",
          text: '<i class="mdi mdi-printer-outline me-1"></i> <span class="d-none d-sm-inline-block">Print PDF</span>',
        },
      ],
    })),
    $(".datatables-division tbody").on("click", ".delete-record", function () {
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
      var assetGroupName = $("#divisionName").val();
      var description = $("#departmentName").val();

      if (assetGroupName && description ) {
        toastr.success("Berhasil Membuat Division Baru", "Create Success!");
      } else {
        toastr.error("Gagal Membuat Division Baru", "Create Error!");
      }
    }

    $("#createDivision").submit(handleFormSubmit);
    $("#updateDivision").submit(handleFormSubmit);
  });
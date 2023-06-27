"use strict";
$(function () {
  var e,
    s = $(".datatables-master-branch"),
    i = $(".select2");
  i.length && (i = i).wrap('<div class="position-relative"></div>');
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/admin-company/list-branch.json",
      columns: [
        { data: "branch_name" },
        { data: "phone_number" },
        { data: "email" },
        { data: "address" },
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
              "<a href='./admin-company-master-data-branch-detail-update.html'>" +
              a.branch_name +
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
            return '<div class="d-inline-block text-nowrap"><button class="btn btn-sm btn-icon btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical mdi-20px"></i></button><div class="dropdown-menu dropdown-menu-end m-0"><a href="./admin-company-master-data-branch-manage-user.html" class="me-2 dropdown-item"><i class="mdi mdi-account-outline me-2"></i><span>Manage User</span></a><a href="javascript:;" class="text-danger dropdown-item delete-record me-2"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a></div></div></div>';
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
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle mx-3",
          text: '<i class="mdi mdi-microsoft-excel me-1"></i> <span class="d-none d-sm-inline-block">Excel</span>',
          buttons: [
            {
              extend: "excel",
              text: '<i class="mdi mdi-export-variant me-1" ></i>Export Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                format: {
                  body: function (data, row, column, node) {
                    var text = node.textContent || node.innerText;
                    if (node.classList && node.classList.contains("user-name")) {
                      return node.lastChild.firstChild.textContent;
                    } else {
                      return text;
                    }
                  },
                },
              },
              customize: function (xlsx) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                $('row c[r^="D"]', sheet).attr('s', '2');
              },
            },
            {
              extend: "excel",
              text: '<i class="mdi mdi-import me-1" ></i>Import Excel',
              className: "dropdown-item",
              action: function (e, dt, button, config) {
                alert("Import Excel logic goes here");
              },
            },
          ],
        },
        {
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Branch</span>',
          className: "add-new btn btn-primary mx-3",
          action: function () {
            window.location.href = "./admin-company-master-data-branch-add.html";
          },
        },
      ],
    })),
    $(".datatables-master-branch tbody").on("click", ".delete-record", function () {
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
      var branchName = $("#branchName").val();
      var companyName = $("#companyName").val();
      var groupName = $("#groupName").val();
      var phoneNumber = $("#phoneNumber").val();
      var fax = $("#fax").val();
      var emailCompany = $("#emailCompany").val();
      var address = $("#address").val();

      if (companyName && groupName && phoneNumber && fax && emailCompany && branchName && address ) {
        toastr.success("Berhasil Membuat Branch Baru", "Create Success!");
      } else {
        toastr.error("Gagal Membuat Branch Baru", "Create Error!");
      }
    }

    $("#createBranch").submit(handleFormSubmit);
    $("#updateBranch").submit(handleFormSubmit);
  });
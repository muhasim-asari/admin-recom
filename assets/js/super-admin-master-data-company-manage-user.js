"use strict";
$(function () {
  var e,
    s = $(".datatables-master-company-manage-user"),
    i = $(".select2");
  i.length && (i = i).wrap('<div class="position-relative"></div>');
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/list-company-manage-user.json",
      columns: [
        { data: "name" },
        { data: "email" },
        { data: "action" },
      ],
      bLengthChange: false,
      bInfo: true,
      columnDefs: [
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, a, n) {
            return '<a href="./super-admin-master-data-company-manage-user.html" class="me-2"><i class="mdi mdi-account-outline me-2"></i><span>Manage User</span></a><a href="javascript:;" class="text-danger delete-record"><i class="mdi mdi-delete-outline"></i><span>Delete</span></a></div>';
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
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Company</span>',
          className: "add-new btn btn-primary mx-3",
          action: function () {
            window.location.href = "./super-admin-master-data-company-add.html";
          },
        },
      ],
    })),
    $(".datatables-users tbody").on("click", ".delete-record", function () {
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
      var groupName = $("#groupName").val();
      var website = $("#website").val();
      var groupLogo = $("#groupLogo").val();

      if (groupName && website && groupLogo) {
        toastr.success("Berhasil Membuat Group Baru", "Create Success!");
      } else {
        toastr.error("Gagal Membuat Group Baru", "Create Error!");
      }
    }

    $("#createCompany").submit(handleFormSubmit);
    $("#updateCompany").submit(handleFormSubmit);
  });

// Preview Image
function addPreview() {
  const fileInput = document.getElementById("companyLogo");
  const previewContainer = document.getElementById("previewCompanyLogo");

  fileInput.addEventListener("change", function (event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", function () {
        const imgElement = document.createElement("img");
        imgElement.classList.add("preview-image", "w-100", "mt-3");
        imgElement.src = reader.result;

        previewContainer.innerHTML = "";
        previewContainer.appendChild(imgElement);
      });

      reader.readAsDataURL(file);
    }
  });
}

addPreview();

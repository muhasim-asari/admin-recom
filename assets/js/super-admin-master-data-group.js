"use strict";
$(function () {
  var e,
    s = $(".datatables-master-group"),
    i = $(".select2");
  i.length && (i = i).wrap('<div class="position-relative"></div>');
  s.length &&
    (e = s.DataTable({
      ajax: assetsPath + "json/super-admin/list-group.json",
      columns: [
        { data: "group_name" },
        { data: "website" },
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
              "<a href='./super-admin-master-data-group-detail-update.html'>" +
              a.group_name +
              "</a>"
            );
          },
        },
        {
          targets: 1,
          responsivePriority: 3,
          render: function (e, t, a, n) {
            return a.website;
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, a, n) {
            return '<a href="javascript:;" class="text-danger delete-record"><i class="mdi mdi-delete-outline"></i><span>Delete</span></a></div>';
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
          text: '<i class="mdi mdi-plus me-0 me-sm-1"></i><span class="d-none d-sm-inline-block">Add Group</span>',
          className: "add-new btn btn-primary mx-3",
          action: function () {
            window.location.href = "./super-admin-master-data-group-add.html";
          },
        },
      ],
    })),
    $(".datatables-master-group tbody").on("click", ".delete-record", function () {
      e.row($(this).parents("tr")).remove().draw();
    });
}),

$(document).ready(function() {
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

    if (groupName && website) {
      toastr.success("Berhasil Membuat Group Baru", "Create Success!");
    } else {
      toastr.error("Gagal Membuat Group Baru", "Create Error!");
    }
  }

  $("#createGroup").submit(handleFormSubmit);
  $("#updateGroup").submit(handleFormSubmit);
});

// Preview Image
function addPreview() {
  const fileInput = document.getElementById('groupLogo');
  const previewContainer = document.getElementById('previewGroupLogo');

  fileInput.addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', function () {
        const imgElement = document.createElement('img');
        imgElement.classList.add('preview-image', 'w-100', 'mt-3');
        imgElement.src = reader.result;

        previewContainer.innerHTML = '';
        previewContainer.appendChild(imgElement);
      });
      
      reader.readAsDataURL(file);
    }
  });
}

addPreview()

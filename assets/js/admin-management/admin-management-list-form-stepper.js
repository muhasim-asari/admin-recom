"use strict";

$(function () {
  var select2Elements = $(".select2");
  var selectpickerElements = $(".selectpicker");

  if (selectpickerElements.length) {
    selectpickerElements.selectpicker();
  }

  if (select2Elements.length) {
    select2Elements.wrap('<div class="position-relative"></div>');

    select2Elements.select2({
      placeholder: "Select value",
      dropdownParent: select2Elements.parent(),
    });
  }
});

(function () {
  var formAssetList = document.querySelector(".form-asset-list");
  var btnNextElements = [].slice.call(formAssetList.querySelectorAll(".btn-next"));
  var btnPrevElements = [].slice.call(formAssetList.querySelectorAll(".btn-prev"));
  var btnSubmitElement = formAssetList.querySelector(".btn-submit");

  if (formAssetList !== null) {
    const stepper = new Stepper(formAssetList, { linear: false });

    btnNextElements.forEach((btnNext) => {
      btnNext.addEventListener("click", (e) => {
        stepper.next();
      });
    });

    btnPrevElements.forEach((btnPrev) => {
      btnPrev.addEventListener("click", (e) => {
        stepper.previous();
      });
    });

    if (btnSubmitElement) {
      btnSubmitElement.addEventListener("click", (e) => {
        alert("Submitted..!!");
      });
    }
  }
})();

(function () {
  var dropzoneTemplate = `<div class="dz-preview dz-file-preview">
    <div class="dz-details">
      <div class="dz-thumbnail">
        <img data-dz-thumbnail>
        <span class="dz-nopreview">No preview</span>
        <div class="dz-success-mark"></div>
        <div class="dz-error-mark"></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="progress">
          <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
        </div>
      </div>
      <div class="dz-filename" data-dz-name></div>
      <div class="dz-size" data-dz-size></div>
    </div>
  </div>`;

  new Dropzone("#dropzone-multi", {
    previewTemplate: dropzoneTemplate,
    parallelUploads: 1,
    maxFilesize: 5,
    addRemoveLinks: true,
  });
})();

$(function () {
  var datatablesTag = $(".datatables-tag");
  var select2Elements = $(".select2");

  if (select2Elements.length) {
    select2Elements.wrap('<div class="position-relative"></div>');
  }

  if (datatablesTag.length) {
    datatablesTag.DataTable({
      ajax: assetsPath + "json/admin-management/list-tag.json",
      columns: [
        { data: "asset_name" },
        { data: "sub_asset_name" },
        { data: "sub_sub_asset_name" },
        { data: "tag" },
      ],
      lengthChange: false,
      info: true,
      searching: false,
      order: [[2, "desc"]],
      dom:
        '<"row mx-2"<"col-md-2"<"me-3"l>><"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      language: {
        lengthMenu: "Show _MENU_",
        search: "",
        searchPlaceholder: "Search..",
      },
      buttons: [
        {
          extend: "excel",
          text: '<i class="mdi mdi-export-variant me-1"></i>Export to CSV',
          className: "btn btn-label-secondary mb-3",
          exportOptions: {
            columns: [1, 2, 3, 4, 5],
            format: {
              body: function (data, row, column, node) {
                var text = node.textContent || node.innerText;
                if (
                  node.classList &&
                  node.classList.contains("user-name")
                ) {
                  return node.lastChild.firstChild.textContent;
                } else {
                  return text;
                }
              },
            },
          },
          customize: function (xlsx) {
            var sheet = xlsx.xl.worksheets["sheet1.xml"];
            $('row c[r^="D"]', sheet).attr("s", "2");
          },
        },
      ],
    });
  }
});

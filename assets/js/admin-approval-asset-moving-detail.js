$(function () {
  $(".datatables-asset-audit-detail").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-moving.json",
    columns: [
      { data: "asset_moving_created_date" },
      { data: "asset_moving_approval_date" },
      { data: "asset_moving_completed_date" },
      { data: "moving_type" },
      { data: "person_in_charge" },
      { data: "asset_moving_destination" },
      { data: "status" },
      { data: "information" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: false,
    paging: false,
    searching: false,
    columnDefs: [
      {
        targets: 4,
        render: function (data, type, row, meta) {
          return (
            '<div class="text-heading">' +
            row.person_in_charge.name +
            "<br/>" +
            row.person_in_charge.department +
            "</div>"
          );
        },
      },
      {
        targets: 6,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status) {
            switch (status) {
              case "Completed":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Process":
                return '<i class="mdi mdi-clock-time-five mdi-20px text-danger me-1"></i>';
              case "Waiting Approval":
                return '<i class="mdi mdi-alert mdi-20px text-warning me-1"></i>';
              default:
                return "";
            }
          };

          var getStatusColorClass = function (status) {
            switch (status) {
              case "Completed":
                return "text-success";
              case "Process":
                return "text-danger";
              case "Waiting Approval":
                return "text-warning";
              default:
                return "";
            }
          };

          return (
            "<div>" +
              "<span class='" +
              getStatusColorClass(row.status) +
              " fw-normal'>" +
              getStatusIcon(row.status) +
              row.status +
              "</span>" +
              "</div>"
          )
        }
      },
      {
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (e, t, a, n) {
          return `
            <div class="d-inline-block text-nowrap">
              <button class="btn btn-sm btn-icon btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                <i class="mdi mdi-dots-vertical mdi-20px"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end m-0">
                <a href="javascript:;" class="me-2 dropdown-item text-success" data-bs-toggle="modal" data-bs-target="#approveModal">
                  <i class="mdi mdi-check-outline me-2"></i>
                  <span>Approve</span>
                </a>
                <a href="javascript:;" class="text-danger dropdown-item me-2" data-bs-toggle="modal" data-bs-target="#disapproveModal">
                  <i class="mdi mdi-close-outline me-2"></i>
                  <span>Disapprove</span>
                </a>
              </div>
            </div>
          `;
        },
      }      
    ],
    initComplete: function () {
      var dataTable = this.api();
      var data = dataTable.data();
      var randomIndex = Math.floor(Math.random() * data.length);
      dataTable.clear().row.add(data[randomIndex]).draw();
    },
  });

  $(".datatables-detail-information-1").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-moving-information-1.json",
    columns: [
      { data: "asset_code" },
      { data: "asset_name" },
      { data: "asset_category" },
      { data: "asset_group" },
      { data: "status_approval_asset_moving" },
      { data: "status_moving_asset" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: true,
    pageLength: 3,
    paging: true,
    searching: true,
    columnDefs: [
      {
        targets: 5,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Completed":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Approval":
                return '<i class="mdi mdi-alert mdi-20px text-danger me-1"></i>';
              default:
                return "";
            }
          };

          var getStatusColorClass = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Completed":
                return "text-success";
              case "Waiting Approval":
                return "text-danger";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_moving_asset) +
            " fw-normal'>" +
            getStatusIcon(row.status_moving_asset) +
            row.status_moving_asset +
            "</span>" +
            "</div>"
          );
        },
      },
      {
        targets: 4,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Completed":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Approval":
                return '<i class="mdi mdi-alert mdi-20px text-danger me-1"></i>';
              default:
                return "";
            }
          };

          var getStatusColorClass = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Completed":
                return "text-success";
              case "Waiting Approval":
                return "text-danger";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_approval_asset_moving) +
            " fw-normal'>" +
            getStatusIcon(row.status_approval_asset_moving) +
            row.status_approval_asset_moving +
            "</span>" +
            "</div>"
          );
        },
      },
      {
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (e, t, a, n) {
          return `
            <div class="d-inline-block text-nowrap">
              <button class="btn btn-sm btn-icon btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                <i class="mdi mdi-dots-vertical mdi-20px"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end m-0">
                <a href="javascript:;" class="me-2 dropdown-item text-success" data-bs-toggle="modal" data-bs-target="#approveModal">
                  <i class="mdi mdi-check-outline me-2"></i>
                  <span>Approve</span>
                </a>
                <a href="javascript:;" class="text-danger dropdown-item me-2" data-bs-toggle="modal" data-bs-target="#disapproveModal">
                  <i class="mdi mdi-close-outline me-2"></i>
                  <span>Disapprove</span>
                </a>
              </div>
            </div>
          `;
        },
      }      
    ],
    order: [[2, "desc"]],
    dom:
    '<"row mx-2"<"col-md-6 d-flex align-items-center"<"me-3"lB>><"col-md-6"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"f>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    language: {
      sLengthMenu: "Show _MENU_",
      search: "",
      searchPlaceholder: "Search..",
    },
    buttons: [
      {
        text: '<span class="tf-icons mdi mdi-close me-1"></span>Disapprove All',
        className: 'btn btn-danger waves-effect waves-light me-4',
        action: function () {
          alert('Disapprove All button clicked');
        }
      },
      {
        text: '<span class="tf-icons mdi mdi-check me-1"></span>Approve All',
        className: 'btn btn-success waves-effect waves-light',
        action: function () {
          alert('Approve All button clicked');
        }
      }
    ]
  });

  $(".datatables-detail-information-2").DataTable({
    ajax: assetsPath + "json/admin-approval/list-asset-moving-information-2.json",
    columns: [
      { data: "asset_code" },
      { data: "asset_name" },
      { data: "asset_category" },
      { data: "asset_group" },
      { data: "status_approval_asset_moving" },
      { data: "status_moving_asset" },
      { data: "action" },
    ],
    bLengthChange: false,
    bInfo: true,
    pageLength: 3,
    paging: true,
    searching: true,
    columnDefs: [
      {
        targets: 5,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Completed":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Approval":
                return '<i class="mdi mdi-alert mdi-20px text-danger me-1"></i>';
              default:
                return "";
            }
          };

          var getStatusColorClass = function (status_moving_asset) {
            switch (status_moving_asset) {
              case "Completed":
                return "text-success";
              case "Waiting Approval":
                return "text-danger";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_moving_asset) +
            " fw-normal'>" +
            getStatusIcon(row.status_moving_asset) +
            row.status_moving_asset +
            "</span>" +
            "</div>"
          );
        },
      },
      {
        targets: 4,
        render: function (data, type, row, meta) {
          var getStatusIcon = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Completed":
                return '<i class="mdi mdi-check-circle mdi-20px text-success me-1"></i>';
              case "Waiting Approval":
                return '<i class="mdi mdi-alert mdi-20px text-danger me-1"></i>';
              default:
                return "";
            }
          };

          var getStatusColorClass = function (status_approval_asset_moving) {
            switch (status_approval_asset_moving) {
              case "Completed":
                return "text-success";
              case "Waiting Approval":
                return "text-danger";
              default:
                return "";
            }
          };

          return (
            "<div>" +
            "<span class='" +
            getStatusColorClass(row.status_approval_asset_moving) +
            " fw-normal'>" +
            getStatusIcon(row.status_approval_asset_moving) +
            row.status_approval_asset_moving +
            "</span>" +
            "</div>"
          );
        },
      },
      {
        targets: -1,
        title: "Actions",
        searchable: false,
        orderable: false,
        render: function (e, t, a, n) {
          return `
            <div class="d-inline-block text-nowrap">
              <button class="btn btn-sm btn-icon btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                <i class="mdi mdi-dots-vertical mdi-20px"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end m-0">
                <a href="javascript:;" class="me-2 dropdown-item text-success" data-bs-toggle="modal" data-bs-target="#approveModal">
                  <i class="mdi mdi-check-outline me-2"></i>
                  <span>Approve</span>
                </a>
                <a href="javascript:;" class="text-danger dropdown-item me-2" data-bs-toggle="modal" data-bs-target="#disapproveModal">
                  <i class="mdi mdi-close-outline me-2"></i>
                  <span>Disapprove</span>
                </a>
              </div>
            </div>
          `;
        },
      }
      
    ],
    order: [[2, "desc"]],
    dom:
    '<"row mx-2"<"col-md-6 d-flex align-items-center"<"me-3"lB>><"col-md-6"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"f>>>t<"row mx-2"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
    language: {
      sLengthMenu: "Show _MENU_",
      search: "",
      searchPlaceholder: "Search..",
    },
    buttons: [
      {
        text: '<span class="tf-icons mdi mdi-close me-1"></span>Disapprove All',
        className: 'btn btn-danger waves-effect waves-light me-4',
        action: function () {
          alert('Disapprove All button clicked');
        }
      },
      {
        text: '<span class="tf-icons mdi mdi-check me-1"></span>Approve All',
        className: 'btn btn-success waves-effect waves-light',
        action: function () {
          alert('Approve All button clicked');
        }
      }
    ]
  });
});

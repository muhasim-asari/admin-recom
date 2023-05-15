"use strict";
let direction = "ltr";
isRtl && (direction = "rtl"),
  document.addEventListener("DOMContentLoaded", function () {
    {
      const v = document.getElementById("calendar"),
        m = document.querySelector(".app-calendar-sidebar"),
        f = document.querySelector(".app-overlay"),
        g = {
          Holiday: "danger",
        },
        k = document.querySelector("#eventStartDate"),
        w = document.querySelector("#eventEndDate"),
        q = $("#eventLabel"),
        D = $("#eventGuests"),
        Y = document.querySelector(".inline-calendar");
      let a,
        l = events,
        e;
      function t(e) {
        return e.id
          ? "<span class='badge badge-dot bg-" +
              $(e.element).data("label") +
              " me-2'> </span>" +
              e.text
          : e.text;
      }
      function n(e) {
        return e.id
          ? "<div class='d-flex flex-wrap align-items-center'><div class='avatar avatar-xs me-2'><img src='" +
              assetsPath +
              "img/avatars/" +
              $(e.element).data("avatar") +
              "' alt='avatar' class='rounded-circle' /></div>" +
              e.text +
              "</div>"
          : e.text;
      }
      var d, o;
      function s() {
        var e = document.querySelector(".fc-sidebarToggle-button");
        for (
          e.classList.remove("fc-button-primary"),
            e.classList.add("d-lg-none", "d-inline-block", "ps-0");
          e.firstChild;

        )
          e.firstChild.remove();
        e.setAttribute("data-bs-toggle", "sidebar"),
          e.setAttribute("data-overlay", ""),
          e.setAttribute("data-target", "#app-calendar-sidebar"),
          e.insertAdjacentHTML(
            "beforeend",
            '<i class="mdi mdi-menu mdi-24px text-body"></i>'
          );
      }
      q.length &&
        q.wrap('<div class="position-relative"></div>').select2({
          placeholder: "Select value",
          dropdownParent: q.parent(),
          templateResult: t,
          templateSelection: t,
          minimumResultsForSearch: -1,
          escapeMarkup: function (e) {
            return e;
          },
        }),
        D.length &&
          D.wrap('<div class="position-relative"></div>').select2({
            placeholder: "Select value",
            dropdownParent: D.parent(),
            closeOnSelect: !1,
            templateResult: n,
            templateSelection: n,
            escapeMarkup: function (e) {
              return e;
            },
          }),
        k &&
          (d = k.flatpickr({
            enableTime: !0,
            altFormat: "Y-m-dTH:i:S",
            onReady: function (e, t, n) {
              n.isMobile && n.mobileInput.setAttribute("step", null);
            },
          })),
        w &&
          (o = w.flatpickr({
            enableTime: !0,
            altFormat: "Y-m-dTH:i:S",
            onReady: function (e, t, n) {
              n.isMobile && n.mobileInput.setAttribute("step", null);
            },
          })),
        Y && (e = Y.flatpickr({ monthSelectorType: "static", inline: !0 }));
      let i = new Calendar(v, {
        initialView: "listMonth",
        events: function (e, t) {
          t(l);
        },
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timegridPlugin],
        editable: !0,
        dragScroll: !0,
        dayMaxEvents: 2,
        eventResizableFromStart: !0,
        customButtons: { sidebarToggle: { text: "Sidebar" } },
        headerToolbar: {
          start: "sidebarToggle, prev,next, title",
          end: "dayGridMonth,listMonth",
        },
        direction: direction,
        initialDate: new Date(),
        navLinks: !0,
        eventClassNames: function ({ event: e }) {
          return ["fc-event-" + g[e._def.extendedProps.calendar]];
        },
        dateClick: function (e) {
          e = moment(e.date).format("YYYY-MM-DD");
        },
        eventClick: function (e) {
          e.jsEvent.preventDefault();
          var eventId = e.event.id;
          window.location.href = "calendar-update.html?id=" + eventId;
        },
        datesSet: function () {
          s();
        },
        viewDidMount: function () {
          s();
        },
      });
      i.render(), s();
      e.config.onChange.push(function (e) {
        i.changeView(i.view.type, moment(e[0]).format("YYYY-MM-DD")),
          s(),
          m.classList.remove("show"),
          f.classList.remove("show");
      });
    }
  });

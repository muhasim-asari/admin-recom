"use strict";
let date = new Date(),
  nextDay = new Date(new Date().getTime() + 864e5),
  nextMonth =
    11 === date.getMonth()
      ? new Date(date.getFullYear() + 1, 0, 1)
      : new Date(date.getFullYear(), date.getMonth() + 1, 1),
  prevMonth =
    11 === date.getMonth()
      ? new Date(date.getFullYear() - 1, 0, 1)
      : new Date(date.getFullYear(), date.getMonth() - 1, 1),
  events = [
    {
      id: 1,
      title: "Hari Buruh",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -30),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -30),
      allDay: !0,
      extendedProps: { calendar: "Holiday" },
    },
    {
      id: 2,
      title: "Hari Raya Waisak",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -25),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -25),
      allDay: !0,
      extendedProps: { calendar: "Holiday" },
    },
    {
      id: 5,
      title: "Kenaikan Isa Al Masih",
      start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      end: new Date(date.getFullYear(), date.getMonth() + 1, -13),
      allDay: !0,
      extendedProps: { calendar: "Holiday" },
    },
  ];

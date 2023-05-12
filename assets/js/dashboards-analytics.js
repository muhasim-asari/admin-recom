"use strict";
!(function () {
  let o, e, r, t;
  t = (
    isDarkStyle
      ? ((o = config.colors_dark.cardColor),
        (e = config.colors_dark.textMuted),
        (r = config.colors_dark.headingColor),
        config.colors_dark)
      : ((o = config.colors.cardColor),
        (e = config.colors.textMuted),
        (r = config.colors.headingColor),
        config.colors)
  ).borderColor;
  var s = document.querySelector("#sessions"),
    a = {
      chart: {
        height: 102,
        type: "line",
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      grid: {
        borderColor: e,
        strokeDashArray: 6,
        xaxis: { lines: { show: !0 } },
        yaxis: { lines: { show: !1 } },
        padding: { top: -15, left: -7, right: 7, bottom: -15 },
      },
      colors: [config.colors.info],
      stroke: { width: 3 },
      series: [{ data: [0, 20, 5, 30, 15, 45] }],
      tooltip: { shared: !1, intersect: !0, x: { show: !1 } },
      tooltip: { enabled: !1 },
      xaxis: {
        labels: { show: !1 },
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
      },
      yaxis: { labels: { show: !1 } },
      markers: {
        size: 6,
        strokeWidth: 3,
        strokeWidth: 3,
        strokeColors: "transparent",
        colors: ["transparent"],
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: 5,
            fillColor: o,
            strokeColor: config.colors.info,
            size: 6,
            shape: "circle",
          },
        ],
        hover: { size: 7 },
      },
      responsive: [
        { breakpoint: 1441, options: { chart: { height: 70 } } },
        { breakpoint: 1310, options: { chart: { height: 90 } } },
        { breakpoint: 1189, options: { chart: { height: 70 } } },
        { breakpoint: 1025, options: { chart: { height: 73 } } },
        { breakpoint: 992, options: { chart: { height: 102 } } },
      ],
    },
    s =
      (null !== s && new ApexCharts(s, a).render(),
      document.querySelector("#totalTransactionChart")),
    a = {
      chart: {
        height: 218,
        stacked: !0,
        type: "bar",
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      tooltip: {
        y: {
          formatter: function (o) {
            return Math.abs(o);
          },
        },
      },
      legend: { show: !1 },
      dataLabels: { enabled: !1 },
      colors: [config.colors.primary, config.colors.success],
      grid: {
        borderColor: t,
        xaxis: { lines: { show: !0 } },
        yaxis: { lines: { show: !1 } },
        padding: { top: -5, bottom: -25 },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
          barHeight: "30%",
          horizontal: !0,
          endingShape: "flat",
          startingShape: "rounded",
        },
      },
      xaxis: {
        position: "top",
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: {
          formatter: function (o) {
            return Math.abs(Math.round(o));
          },
          style: { colors: e, fontFamily: "Inter" },
        },
      },
      yaxis: { labels: { show: !1 } },
      series: [
        { name: "Last Week", data: [83, 153, 213, 279, 213, 153, 83] },
        { name: "This Week", data: [-84, -156, -216, -282, -216, -156, -84] },
      ],
    },
    s =
      (null !== s && new ApexCharts(s, a).render(),
      document.querySelector("#performanceChart")),
    a = {
      chart: { height: 247, type: "radar", toolbar: { show: !1 } },
      legend: {
        show: !0,
        markers: { offsetX: -2 },
        itemMargin: { horizontal: 10 },
        fontFamily: "Inter",
        fontSize: "15px",
        labels: { colors: e, useSeriesColors: !1 },
      },
      plotOptions: {
        radar: { polygons: { strokeColors: t, connectorColors: t } },
      },
      yaxis: { show: !1 },
      series: [
        { name: "Income", data: [70, 90, 80, 95, 75, 90] },
        { name: "Net Worth", data: [110, 72, 62, 65, 100, 75] },
      ],
      colors: [config.colors.warning, config.colors.primary],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        labels: {
          show: !0,
          style: {
            colors: [e, e, e, e, e, e],
            fontSize: "15px",
            fontFamily: "Inter",
          },
        },
      },
      fill: { opacity: [1, 0.9] },
      stroke: { show: !1, width: 0 },
      markers: { size: 0 },
      grid: { show: !1, padding: { top: 0, bottom: -10 } },
      responsive: [
        { breakpoint: 1398, options: { chart: { height: 287 } } },
        { breakpoint: 1200, options: { chart: { height: 393 } } },
      ],
    },
    s =
      (null !== s && new ApexCharts(s, a).render(),
      document.querySelector("#totalRevenue")),
    a = {
      chart: {
        height: 115,
        type: "bar",
        distributed: !0,
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      grid: {
        padding: { top: -20, left: -14, right: 0, bottom: -15 },
        yaxis: { lines: { show: !1 } },
      },
      series: [
        { name: "Earning", data: [120, 200, 150, 120] },
        { name: "Expense", data: [72, 120, 50, 65] },
      ],
      legend: { show: !1 },
      tooltip: { enabled: !1 },
      dataLabels: { enabled: !1 },
      colors: [config.colors.primary, config.colors.warning],
      plotOptions: {
        bar: { borderRadius: 6, columnWidth: "48%", startingShape: "rounded" },
      },
      states: { hover: { filter: {} }, active: { filter: { type: "none" } } },
      xaxis: {
        labels: { show: !1 },
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
      },
      yaxis: { labels: { show: !1 } },
      responsive: [
        {
          breakpoint: 834,
          options: { plotOptions: { bar: { borderRadius: 4 } } },
        },
        {
          breakpoint: 768,
          options: { plotOptions: { bar: { borderRadius: 8 } } },
        },
        {
          breakpoint: 426,
          options: { plotOptions: { bar: { borderRadius: 10 } } },
        },
      ],
    },
    s =
      (null !== s && new ApexCharts(s, a).render(),
      document.querySelector("#overviewChart")),
    a = {
      chart: { height: 134, type: "radialBar", sparkline: { enabled: !0 } },
      plotOptions: {
        radialBar: {
          hollow: { size: "55%" },
          dataLabels: {
            name: { show: !1 },
            value: {
              show: !0,
              offsetY: 5,
              fontWeight: 600,
              fontSize: "1rem",
              fontFamily: "Inter",
              color: r,
            },
          },
          track: { background: config.colors_label.secondary },
        },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      stroke: { lineCap: "round" },
      colors: [config.colors.primary],
      grid: { padding: { bottom: -15 } },
      series: [64],
      labels: ["Progress"],
    },
    s =
      (null !== s && new ApexCharts(s, a).render(),
      document.querySelector("#salesCountryChart")),
    a = {
      chart: {
        type: "bar",
        height: 368,
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      series: [{ name: "Sales", data: [17165, 13850, 12375, 9567, 7880] }],
      plotOptions: {
        bar: {
          borderRadius: 10,
          barHeight: "60%",
          horizontal: !0,
          distributed: !0,
          startingShape: "rounded",
          dataLabels: { position: "bottom" },
        },
      },
      dataLabels: {
        enabled: !0,
        textAnchor: "start",
        offsetY: 8,
        offsetX: 11,
        style: { fontWeight: 600, fontSize: "0.9375rem", fontFamily: "Inter" },
      },
      tooltip: { enabled: !1 },
      legend: { show: !1 },
      colors: [
        config.colors.primary,
        config.colors.success,
        config.colors.warning,
        config.colors.info,
        config.colors.danger,
      ],
      grid: {
        strokeDashArray: 8,
        borderColor: t,
        xaxis: { lines: { show: !0 } },
        yaxis: { lines: { show: !1 } },
        padding: { top: -18, left: 21, right: 33, bottom: 10 },
      },
      xaxis: {
        categories: ["US", "IN", "JA", "CA", "AU"],
        labels: {
          formatter: function (o) {
            return Number(o / 1e3) + "K";
          },
          style: { fontSize: "0.9375rem", colors: e, fontFamily: "Inter" },
        },
        axisBorder: { show: !1 },
        axisTicks: { show: !1 },
      },
      yaxis: {
        labels: {
          style: {
            fontWeight: 600,
            fontSize: "0.9375rem",
            colors: r,
            fontFamily: "Inter",
          },
        },
      },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
    },
    s =
      (null !== s && new ApexCharts(s, a).render(),
      document.querySelector("#weeklySalesChart")),
    a = {
      chart: {
        stacked: !0,
        type: "line",
        height: 261,
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      tooltip: { enabled: !1 },
      series: [
        { type: "column", name: "Earning", data: [90, 52, 67, 45, 75, 55, 48] },
        {
          type: "column",
          name: "Expense",
          data: [-53, -29, -67, -84, -60, -40, -77],
        },
        { type: "line", name: "Expense", data: [73, 20, 50, -20, 58, 15, 31] },
      ],
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: "57%",
          endingShape: "flat",
          startingShape: "rounded",
        },
      },
      markers: {
        size: 4,
        strokeWidth: 3,
        fillOpacity: 1,
        strokeOpacity: 1,
        colors: [o],
        strokeColors: config.colors.warning,
      },
      stroke: {
        curve: "smooth",
        width: [0, 0, 3],
        colors: [config.colors.warning],
      },
      dataLabels: { enabled: !1 },
      legend: { show: !1 },
      colors: [config.colors.primary, config.colors_label.primary],
      grid: {
        yaxis: { lines: { show: !1 } },
        padding: { top: -28, left: -6, right: -8, bottom: -5 },
      },
      xaxis: {
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        labels: { style: { colors: e } },
      },
      yaxis: { max: 100, min: -100, show: !1 },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
    },
    s =
      (null !== s && new ApexCharts(s, a).render(),
      document.querySelector("#visitsByDayChart")),
    a = {
      chart: {
        height: 238,
        type: "bar",
        parentHeightOffset: 0,
        toolbar: { show: !1 },
      },
      plotOptions: {
        bar: {
          borderRadius: 12,
          distributed: !0,
          columnWidth: "55%",
          endingShape: "rounded",
          startingShape: "rounded",
        },
      },
      series: [{ data: [38, 55, 48, 65, 80, 38, 48] }],
      tooltip: { enabled: !1 },
      legend: { show: !1 },
      dataLabels: { enabled: !1 },
      colors: [
        config.colors_label.warning,
        config.colors.warning,
        config.colors_label.warning,
        config.colors.warning,
        config.colors.warning,
        config.colors_label.warning,
        config.colors_label.warning,
      ],
      grid: { show: !1, padding: { top: -15, left: -7, right: -4 } },
      states: {
        hover: { filter: { type: "none" } },
        active: { filter: { type: "none" } },
      },
      xaxis: {
        axisTicks: { show: !1 },
        axisBorder: { show: !1 },
        categories: ["S", "M", "T", "W", "T", "F", "S"],
        labels: { style: { colors: e } },
      },
      yaxis: { show: !1 },
      responsive: [{ breakpoint: 1200, options: { chart: { height: 266 } } }],
    };
  null !== s && new ApexCharts(s, a).render();
})();

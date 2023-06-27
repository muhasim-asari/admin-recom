const t = "#28dac6";
const e = "#ffcf5c";

new Chart(document.getElementById("dataAsset"), {
  type: "doughnut",
  data: {
    labels: ["IT hardware & software", "Furniture"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: [t, e],
        borderWidth: 4,
        pointStyle: "rectRounded",
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 500 },
    cutout: 0,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return " " + (context.labels || "") + " : " + context.parsed + " %";
          },
        },
      },
    },
  },
});

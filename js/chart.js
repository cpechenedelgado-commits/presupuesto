import { formatearMoneda } from "./utils.js";

const ctx = document.getElementById("grafico").getContext("2d");

let grafico = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Ingresos", "Egresos"],
    datasets: [{
      data: [0, 0],
      backgroundColor: ["#00c853", "#d50000"],
      borderWidth: 0
    }]
  },
  options: {
    cutout: "60%",
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label(context) {
            return formatearMoneda(context.raw);
          }
        }
      }
    }
  }
});

export function actualizarGrafico(ingresos, egresos) {
  const totalIngresos = ingresos.reduce((a, b) => a + b.valor, 0);
  const totalEgresos = egresos.reduce((a, b) => a + b.valor, 0);

  grafico.data.datasets[0].data = [
    totalIngresos,
    totalEgresos
  ];

  grafico.update();
}

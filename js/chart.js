const ctx = document.getElementById("budgetChart").getContext("2d");

let budgetChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Ingresos", "Egresos"],
    datasets: [
      {
        label: "Monto",
        data: [0, 0],
        backgroundColor: ["#4CAF50", "#F44336"]
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

export function actualizarGrafica(ingresos, egresos) {
  const totalIngresos = ingresos.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  const totalEgresos = egresos.reduce(
    (acc, item) => acc + item.valor,
    0
  );

  budgetChart.data.datasets[0].data = [
    totalIngresos,
    -totalEgresos // 👈 clave
  ];

  budgetChart.update();
}


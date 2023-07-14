var chart1, chart2;

function calcularCosto() {
  var materialA = parseInt(document.getElementById("materialA").value);
  var materialB = parseInt(document.getElementById("materialB").value);
  var materialC = parseInt(document.getElementById("materialC").value);
  var manoDeObra = parseInt(document.getElementById("manoDeObra").value);

  // Calcular el costo total de producción
  var costoProduccion = materialA * 10 + materialB * 8 + materialC * 12 + manoDeObra * 15;

  // Mostrar el resultado en la página con animación
  var resultadoElement = document.getElementById("resultado");
  resultadoElement.innerText = "El costo total de producción es: $";
  anime({
    targets: resultadoElement,
    innerText: ["El costo total de producción es: $", "El costo total de producción es: $" + costoProduccion],
    round: 1,
    duration: 1000,
    easing: 'easeInOutQuart'
  });

  // Actualizar datos del gráfico 1
  chart1.data.datasets[0].data = [materialA * 10, materialB * 8, materialC * 12, manoDeObra * 15];
  chart1.update();

  // Actualizar datos del gráfico 2
  var data2 = [0, 100, 150, 200, 250, costoProduccion];
  chart2.data.datasets[0].data = data2;
  chart2.options.scales.y.max = Math.max(...data2) + 50;
  chart2.update();
}

document.addEventListener("DOMContentLoaded", function() {
  // Crear el gráfico 1
  var ctx1 = document.getElementById("grafico1").getContext("2d");
  chart1 = new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Material A", "Material B", "Material C", "Mano de Obra"],
      datasets: [
        {
          label: "Costo Unitario",
          data: [0, 0, 0, 0],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(255, 99, 132, 0.7)'
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Costo Unitario',
            font: {
              family: 'Roboto',
              size: 14,
              weight: 'bold',
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Costo Unitario por Material y Mano de Obra',
          font: {
            family: 'Roboto',
            size: 18,
            weight: 'bold',
          },
        },
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    },
  });

  // Crear el gráfico 2
  var ctx2 = document.getElementById("grafico2").getContext("2d");
  var gradient = ctx2.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(0, 123, 255, 0.7)");
  gradient.addColorStop(1, "rgba(0, 123, 255, 0.1)");

  chart2 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: ["0", "50", "100", "150", "200", "250"],
      datasets: [
        {
          label: "Índice de Producción",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: gradient,
          borderColor: "#007bff",
          borderWidth: 2,
          pointBackgroundColor: "#007bff",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Índice de Producción',
            font: {
              family: 'Roboto',
              size: 14,
              weight: 'bold',
            },
          },
        },
        x: {
          title: {
            display: true,
            text: 'Costo Total de Producción',
            font: {
              family: 'Roboto',
              size: 14,
              weight: 'bold',
            },
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return "$" + context.formattedValue;
            },
          },
        },
        title: {
          display: true,
          text: 'Relación entre Costo Total de Producción e Índice de Producción',
          font: {
            family: 'Roboto',
            size: 18,
            weight: 'bold',
          },
        },
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    },
  });
});

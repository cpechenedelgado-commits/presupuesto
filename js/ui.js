import { formatearMoneda } from "./utils.js";

const totalIngresos = document.getElementById("total-ingresos");
const totalEgresos = document.getElementById("total-egresos");
const presupuestoDisponible = document.getElementById("presupuesto-disponible");

const listaIngresos = document.getElementById("lista-ingresos");
const listaEgresos = document.getElementById("lista-egresos");

export function actualizarTotalesUI(ingresos, egresos) {
  const sumaIngresos = ingresos.reduce((a, b) => a + b.valor, 0);
  const sumaEgresos = egresos.reduce((a, b) => a + b.valor, 0);

  totalIngresos.textContent = formatearMoneda(sumaIngresos);
  totalEgresos.textContent = formatearMoneda(sumaEgresos);

  const disponible = sumaIngresos - sumaEgresos;
  presupuestoDisponible.textContent = formatearMoneda(disponible);

  presupuestoDisponible.classList.remove("positivo", "negativo");
  presupuestoDisponible.classList.add(disponible < 0 ? "negativo" : "positivo");
}

export function renderizarListasUI(transacciones) {
  listaIngresos.innerHTML = "";
  listaEgresos.innerHTML = "";

  const ingresos = transacciones.filter(t => t.tipo === "ingreso");
  const egresos = transacciones.filter(t => t.tipo === "egreso");

  if (ingresos.length === 0) {
    listaIngresos.innerHTML = "<li class='empty'>No hay ingresos aún</li>";
  }

  if (egresos.length === 0) {
    listaEgresos.innerHTML = "<li class='empty'>No hay egresos aún</li>";
  }

  ingresos.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre}
      <strong class="positivo">+${formatearMoneda(item.valor)}</strong>
      <button class="borrar" data-id="${item.id}">X</button>
    `;
    listaIngresos.appendChild(li);
  });

  egresos.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre}
      <strong class="negativo">-${formatearMoneda(item.valor)}</strong>
      <button class="borrar" data-id="${item.id}">X</button>
    `;
    listaEgresos.appendChild(li);
  });
}




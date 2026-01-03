import { getTransacciones, saveTransacciones } from "./storage.js";
import {actualizarTotalesUI,renderizarListasUI} from "./ui.js";
import { actualizarGrafica } from "./chart.js";

let transacciones = getTransacciones();

const formulario = document.getElementById("formulario");
const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const valor = document.getElementById("valor");

function getIngresos() {
  return transacciones.filter(t => t.tipo === "ingreso");
}

function getEgresos() {
  return transacciones.filter(t => t.tipo === "egreso");
}

function filtrarPorFecha(transacciones, desde, hasta) {
  return transacciones.filter(t => {
    if (desde && t.fecha < desde) return false;
    if (hasta && t.fecha > hasta) return false;
    return true;
  });
}

// --- Borrar ítem ---
function borrarItem(id) {
  transacciones = transacciones.filter(t => t.id !== id);
  saveTransacciones(transacciones);
  actualizarTodo();
}

// --- Agregar nuevo ítem ---
formulario.addEventListener("submit", e => {
  e.preventDefault();

  if (!nombre.value.trim()) {
    alert("Debes escribir una descripción");
    return;
  }

  if (!valor.value || Number(valor.value) <= 0) {
    alert("El monto debe ser mayor a 0");
    return;
  }

  const nueva = {
    id: crypto.randomUUID(),
    tipo: tipo.value,
    nombre: nombre.value.trim(),
    valor: Number(valor.value),
    fecha: new Date().toISOString().split("T")[0]
  };

  transacciones.push(nueva);
  saveTransacciones(transacciones);
  actualizarTodo();
  formulario.reset();
});

// --- Inicialización ---
actualizarTotalesUI(getIngresos(), getEgresos());
renderizarListasUI(getIngresos(), getEgresos());
actualizarGrafica(getIngresos(), getEgresos());
actualizarTodo();

// --- MODO OSCURO ---
const btnModo = document.getElementById("modo-toggle");

btnModo.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    // Cambiar texto del botón
    if (document.body.classList.contains("modo-oscuro")) {
        btnModo.textContent = "Modo Claro";
    } else {
        btnModo.textContent = "Modo Oscuro";
    }
});

document.getElementById("aplicar-filtro").addEventListener("click", () => {
  const desde = document.getElementById("desde").value;
  const hasta = document.getElementById("hasta").value;

  const filtradas = filtrarPorFecha(transacciones, desde, hasta);

  renderizarListasUI(filtradas);
});


    function estaEnRango(fecha) {
        if (desde && fecha < desde) return false;
        if (hasta && fecha > hasta) return false;
        return true;
    }

document.getElementById("limpiar-filtro").addEventListener("click", () => {
    document.getElementById("desde").value = "";
    document.getElementById("hasta").value = "";

    actualizarTodo();

});


document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("borrar")) return;
  borrarItem(e.target.dataset.id);
});

function actualizarTodo() {
  const ingresos = getIngresos();
  const egresos = getEgresos();

  actualizarTotalesUI(ingresos, egresos);
  renderizarListasUI(transacciones);
  actualizarGrafica(ingresos, egresos);
}



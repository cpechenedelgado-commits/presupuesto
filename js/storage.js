const STORAGE_KEY = "transacciones";

export function getTransacciones() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveTransacciones(transacciones) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transacciones));
}


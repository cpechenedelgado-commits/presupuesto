export function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 2
  }).format(valor);
}


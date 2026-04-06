import request from "./api";

export function listarProdutos() {
  return request("/produtos");
}

export function criarProduto(payload) {
  return request("/produtos", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function atualizarProduto(id, payload) {
  return request(`/produtos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function apagarProduto(id) {
  return request(`/produtos/${id}`, {
    method: "DELETE"
  });
}

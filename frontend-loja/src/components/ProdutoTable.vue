<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  produtos: {
    type: Array,
    default: () => []
  },
  carregando: {
    type: Boolean,
    default: false
  }
});

defineEmits(["editar", "apagar"]);

const paginaAtual = ref(1);
const itensPorPagina = 9;

const totalPaginas = computed(() =>
  Math.max(1, Math.ceil(props.produtos.length / itensPorPagina))
);

const produtosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  return props.produtos.slice(inicio, fim);
});

watch(
  () => props.produtos.length,
  () => {
    if (paginaAtual.value > totalPaginas.value) {
      paginaAtual.value = totalPaginas.value;
    }
  }
);

function paginaAnterior() {
  if (paginaAtual.value > 1) {
    paginaAtual.value -= 1;
  }
}

function proximaPagina() {
  if (paginaAtual.value < totalPaginas.value) {
    paginaAtual.value += 1;
  }
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
</script>

<template>
  <section class="card">
    <h2>Produtos</h2>

    <p v-if="carregando">Carregando produtos...</p>
    <p v-else-if="produtos.length === 0">Nenhum produto cadastrado.</p>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preco</th>
            <th>Quantidade</th>
            <th>Descricao</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtosPaginados" :key="produto.id">
            <td>{{ produto.nome }}</td>
            <td>{{ formatarPreco(produto.preco) }}</td>
            <td>{{ produto.quantidade }}</td>
            <td>{{ produto.descricao || "-" }}</td>
            <td class="acoes">
              <button class="button-secondary" @click="$emit('editar', produto)">Editar</button>
              <button class="button-danger" @click="$emit('apagar', produto.id)">Apagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="produtos.length > itensPorPagina" class="pagination">
      <button
        type="button"
        class="button-secondary pagination-arrow"
        :disabled="paginaAtual === 1"
        @click="paginaAnterior"
        aria-label="Pagina anterior"
      >
        &larr;
      </button>
      <span>Pagina {{ paginaAtual }} de {{ totalPaginas }}</span>
      <button
        type="button"
        class="button-secondary pagination-arrow"
        :disabled="paginaAtual === totalPaginas"
        @click="proximaPagina"
        aria-label="Proxima pagina"
      >
        &rarr;
      </button>
    </div>
  </section>
</template>

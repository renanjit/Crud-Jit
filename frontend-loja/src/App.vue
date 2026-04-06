<script setup>
import { computed, onMounted, ref } from "vue";
import wallpaper from "./wallpaper.jpg";
import ProdutoForm from "./components/ProdutoForm.vue";
import ProdutoTable from "./components/ProdutoTable.vue";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  apagarProduto
} from "./services/produtoService";

const produtos = ref([]);
const carregando = ref(false);
const salvando = ref(false);
const erro = ref("");
const produtoEditando = ref(null);
const modalAberto = ref(false);
const textoBusca = ref("");

const produtosFiltrados = computed(() => {
  const termo = textoBusca.value.trim().toLowerCase();
  if (!termo) {
    return produtos.value;
  }

  return produtos.value.filter((produto) => {
    const nome = String(produto.nome || "").toLowerCase();
    const descricao = String(produto.descricao || "").toLowerCase();
    return nome.includes(termo) || descricao.includes(termo);
  });
});

function limparErro() {
  erro.value = "";
}

async function carregarProdutos() {
  carregando.value = true;
  limparErro();
  try {
    produtos.value = await listarProdutos();
  } catch (e) {
    erro.value = e.message;
  } finally {
    carregando.value = false;
  }
}

async function handleSalvar(payload) {
  salvando.value = true;
  limparErro();
  try {
    if (produtoEditando.value?.id) {
      await atualizarProduto(produtoEditando.value.id, payload);
    } else {
      await criarProduto(payload);
    }
    produtoEditando.value = null;
    modalAberto.value = false;
    await carregarProdutos();
  } catch (e) {
    erro.value = e.message;
  } finally {
    salvando.value = false;
  }
}

function editarProduto(produto) {
  limparErro();
  produtoEditando.value = { ...produto };
  modalAberto.value = true;
}

function cancelarEdicao() {
  modalAberto.value = false;
  produtoEditando.value = null;
  limparErro();
}

async function handleExcluir(id) {
  const confirmar = window.confirm("Deseja realmente remover este produto?");
  if (!confirmar) return;

  limparErro();
  try {
    await apagarProduto(id);
    if (produtoEditando.value?.id === id) {
      produtoEditando.value = null;
      modalAberto.value = false;
    }
    await carregarProdutos();
  } catch (e) {
    erro.value = e.message;
  }
}

function abrirCadastro() {
  limparErro();
  produtoEditando.value = null;
  modalAberto.value = true;
}

onMounted(() => {
  carregarProdutos();
});
</script>

<template>
  <main>
    <section class="hero" :style="{ backgroundImage: `url(${wallpaper})` }">
      <div class="hero-overlay"></div>
      <header class="hero-topbar">
        <button class="hero-button" type="button" @click="abrirCadastro">
          Cadastrar produtos
        </button>
      </header>
      <div class="hero-content">
        <h1>Painel da Loja</h1>
      </div>
    </section>

    <section class="container">
      <p v-if="erro" class="feedback error">{{ erro }}</p>
      <div class="search-box">
        <input
          v-model="textoBusca"
          type="text"
          placeholder="Buscar por nome ou descricao"
          aria-label="Buscar produtos"
        />
      </div>

      <ProdutoTable
        :produtos="produtosFiltrados"
        :carregando="carregando"
        @editar="editarProduto"
        @apagar="handleExcluir"
      />
    </section>

    <div
      v-if="modalAberto"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="cancelarEdicao"
    >
      <div class="modal-panel">
        <button type="button" class="modal-close" @click="cancelarEdicao">Fechar</button>
        <p v-if="erro" class="feedback error modal-error">{{ erro }}</p>
        <ProdutoForm
          :produto-editando="produtoEditando"
          :salvando="salvando"
          @salvar="handleSalvar"
          @cancelar="cancelarEdicao"
        />
      </div>
    </div>
  </main>
</template>

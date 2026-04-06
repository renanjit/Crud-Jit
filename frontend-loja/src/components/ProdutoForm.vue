<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  produtoEditando: {
    type: Object,
    default: null
  },
  salvando: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["salvar", "cancelar"]);

const form = ref({
  nome: "",
  preco: 1,
  quantidade: 1,
  descricao: ""
});

const titulo = computed(() =>
  props.produtoEditando ? "Editar Produto" : "Novo Produto"
);

watch(
  () => props.produtoEditando,
  (produto) => {
    if (produto) {
      form.value = {
        nome: produto.nome,
        preco: Number(produto.preco),
        quantidade: Number(produto.quantidade),
        descricao: produto.descricao || ""
      };
      return;
    }

    form.value = {
      nome: "",
      preco: 1,
      quantidade: 1,
      descricao: ""
    };
  },
  { immediate: true }
);

function enviar() {
  emit("salvar", {
    nome: form.value.nome.trim(),
    preco: Number(form.value.preco),
    quantidade: Number(form.value.quantidade),
    descricao: form.value.descricao.trim()
  });
}
</script>

<template>
  <section class="card">
    <h2>{{ titulo }}</h2>
    <form @submit.prevent="enviar" class="form-grid">
      <label>
        Nome
        <input v-model="form.nome" type="text" required />
      </label>

      <label>
        Preco
        <input v-model.number="form.preco" type="number" min="0.01" step="0.01" required />
      </label>

      <label>
        Quantidade
        <input v-model.number="form.quantidade" type="number" min="0" step="1" required />
      </label>

      <label class="descricao">
        Descricao
        <textarea v-model="form.descricao" rows="3" />
      </label>

      <div class="actions">
        <button type="submit" :disabled="salvando">
          {{ salvando ? "Salvando..." : "Salvar" }}
        </button>
        <button
          v-if="produtoEditando"
          type="button"
          class="button-secondary"
          @click="$emit('cancelar')"
          :disabled="salvando"
        >
          Cancelar
        </button>
      </div>
    </form>
  </section>
</template>

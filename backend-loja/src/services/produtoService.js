const { z } = require('zod');
const produtoRepository = require('../repository/produtoRepository');
const AppError = require('../middlewares/AppError');

const produtoSchema = z.object({
    nome: z.string().min(1, 'O nome do produto e obrigatorio.'),
    preco: z.number().positive('O preco tem de ser maior que zero.'),
    quantidade: z.number().int().nonnegative('A quantidade tem de ser valida (0 ou mais).'),
    descricao: z.string().optional()
});

function validarProduto(payload) {
    const validacao = produtoSchema.safeParse(payload);
    if (!validacao.success) {
        throw new AppError(validacao.error.issues[0].message, 400);
    }

    return validacao.data;
}

const produtoService = {
    async listarProdutos() {
        return produtoRepository.listarTodos();
    },

    async criarProduto(payload) {
        const dadosValidados = validarProduto(payload);
        return produtoRepository.criar(dadosValidados);
    },

    async atualizarProduto(id, payload) {
        const dadosValidados = validarProduto(payload);
        const linhasAlteradas = await produtoRepository.atualizar(id, dadosValidados);

        if (linhasAlteradas === 0) {
            throw new AppError('Produto nao encontrado.', 404);
        }

        return { id: Number(id), ...dadosValidados };
    },

    async apagarProduto(id) {
        const linhasApagadas = await produtoRepository.apagar(id);

        if (linhasApagadas === 0) {
            throw new AppError('Produto nao encontrado.', 404);
        }
    }
};

module.exports = produtoService;

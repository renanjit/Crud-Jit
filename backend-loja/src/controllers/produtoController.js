const produtoService = require('../services/produtoService');

const produtoController = {
    async listar(req, res) {
        const produtos = await produtoService.listarProdutos();
        res.json(produtos);
    },

    async criar(req, res) {
        const produtoCriado = await produtoService.criarProduto(req.body);
        res.status(201).json(produtoCriado);
    },

    async atualizar(req, res) {
        const produtoAtualizado = await produtoService.atualizarProduto(req.params.id, req.body);
        res.json(produtoAtualizado);
    },

    async apagar(req, res) {
        await produtoService.apagarProduto(req.params.id);
        res.status(204).send();
    }
};

module.exports = produtoController;

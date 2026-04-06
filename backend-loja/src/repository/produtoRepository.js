const prisma = require('../database/prismaClient');

const produtoRepository = {
    async listarTodos() {
        return prisma.produtos.findMany();
    },

    async criar(dadosProduto) {
        return prisma.produtos.create({ data: dadosProduto });
    },

    async atualizar(id, dadosProduto) {
        const resultado = await prisma.produtos.updateMany({
            where: { id: Number(id) },
            data: dadosProduto
        });

        return resultado.count;
    },

    async apagar(id) {
        const resultado = await prisma.produtos.deleteMany({
            where: { id: Number(id) }
        });

        return resultado.count;
    }
};

module.exports = produtoRepository;

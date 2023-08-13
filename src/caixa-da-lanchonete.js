class CaixaDaLanchonete {
  constructor() {
    this.menu = {
      cafe: { descricao: "Café", valor: 3.0 },
      chantily: {
        descricao: "Chantily (extra do Café)",
        valor: 1.5,
        extras: ["cafe", "combo2"],
      },
      suco: {
        descricao: "Suco Natural",
        valor: 6.2,
      },
      sanduiche: {
        descricao: "Sanduíche",
        valor: 6.5,
      },
      queijo: {
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2.0,
        extras: ["sanduiche", "combo1", "combo2"],
      },
      salgado: {
        descricao: "Salgado",
        valor: 7.25,
      },
      combo1: {
        descricao: "1 Suco e 1 Sanduíche",
        valor: 9.5,
      },
      combo2: {
        descricao: "1 Café e 1 Sanduíche",
        valor: 7.5,
      },
    };
  }

  formatarValor(valor) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const formaDePagamentoValida = ["dinheiro", "credito", "debito"];
    if (!formaDePagamentoValida.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    const itensObjeto = itens.map((item) => {
      const [itemCode, quantidade] = item.split(",");
      return { itemCode, quantidade };
    });

    let erro;

    for (const item of itensObjeto) {
      const itemMenu = this.menu[item.itemCode];
      if (!itemMenu?.extras) {
        continue;
      }

      let inclui = false;
      for (const extra of itemMenu.extras) {
        const index = itensObjeto.findIndex((item) => item.itemCode === extra);
        if (index !== -1) {
          inclui = true;
          break;
        }
      }

      if (!inclui) {
        erro = "Item extra não pode ser pedido sem o principal";
        break;
      }
    }

    let total = 0;

    for (const { itemCode, quantidade } of itensObjeto) {
      if (!Object.keys(this.menu).includes(itemCode)) {
        erro = "Item inválido!";
        break;
      }
      if (isNaN(quantidade) || quantidade <= 0) {
        erro = "Quantidade inválida!";
        break;
      }

      const item = this.menu[itemCode];
      total += item.valor * quantidade;
    }

    if (erro) {
      return erro;
    }

    if (formaDePagamento === "dinheiro") {
      total *= 0.95;
    } else if (formaDePagamento === "credito") {
      total *= 1.03;
    }

    return this.formatarValor(total);
  }
}
export { CaixaDaLanchonete };

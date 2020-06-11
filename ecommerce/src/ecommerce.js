import React, { useState } from 'react';
import './ecommerce.css';
import Menu from './components/menu/menu';
import Produtos from './components/produtos/produtos';
import Checkout from './components/checkout/checkout';
import Container from 'react-bootstrap/Container'

function MiniEcommerce() {

  const [carrinho, setCarrinho] = useState({ produtos: [] });
  const [exibirProdutos, setExibirProdutos] = useState(false);
  const [exibirCheckout, setExibirCheckout] = useState(true);
  const [total, setTotal] = useState('0.00');

  function adicionarProduto(produto) {
    const objCarrinho = Object.assign({}, carrinho);
    // atualizar a quantidade
    let novoProduto = true;
    objCarrinho.produtos.forEach((prod, indice) => {
      if (prod.nome === produto.nome) {
        objCarrinho.produtos[indice].quantidade++;
        novoProduto = false;
      }
    });


    // adicionar novo produto ao carrinho
    if (novoProduto) {
      objCarrinho.produtos.push({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: 1
      })
    }
    setCarrinho(objCarrinho);
  }

  function handleExibirProdutos() {
    setExibirCheckout(false);
    setExibirProdutos(true)
  }

  function handleExibirCheckout(total) {
    setExibirCheckout(true);
    setExibirProdutos(false);
    setTotal(total);
  }

  return (
    <React.Fragment>
      <Menu
        produtos={carrinho.produtos}
        handleExibirProdutos={handleExibirProdutos}
        handleExibirCheckout={handleExibirCheckout} />
      <Container className="mt-3">
        <Produtos
          visivel={exibirProdutos}
          adicionarProduto={adicionarProduto} />
        <Checkout />
      </Container>
    </React.Fragment>
  );
}

export default MiniEcommerce;

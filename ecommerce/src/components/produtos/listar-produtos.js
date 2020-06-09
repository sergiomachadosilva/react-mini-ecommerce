import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import placeholder from '../../images/image-produto.png';
import PropTypes from 'prop-types';

function ListarProdutos(props) {

    const produtos = [
        { nome: 'Aprenda Javascripts em 12 semanas', preco: 'R$ 59,99' },
        { nome: 'Introdução ao React', preco: 'R$ 36,00' },
        { nome: 'Aplicações escalaveis com React', preco: 'R$ 149,80' },
        { nome: 'Aprenda a usar hooks no React', preco: 'R$ 21,00' },
        { nome: 'Construa um dashboard com componentes reutilizaveis', preco: 'R$ 85,50' },
        { nome: 'Aplicações web real-time com Node.js', preco: 'R$ 45,00' }
    ];

    function handleComprar(event, produto) {
        event.preventDefault();
        props.adicionarProduto(produto)
        props.exibirMensagem(produto)
    }


    function render() {
        let key = 1;

        const cards = produtos.map(produto =>
            <Col
                md={4}
                key={key}
                className="mb-3"
                data-testid={'card' + key++}>
                <Card>
                    <Card.Img variant="top" src={placeholder} />
                    <Card.Body>
                        <Card.Title>{produto.nome}</Card.Title>
                        <Card.Text>
                            Descrição do produto
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={(event) => handleComprar(event, produto)}>
                            Comprar {produto.preco}
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        );

        return cards;
    }

    return render();
}

ListarProdutos.propTypes = {
    adicionarProduto: PropTypes.func.isRequired,
    exibirMensagem: PropTypes.func.isRequired
}

export default ListarProdutos;
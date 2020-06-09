import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import ListarProdutos from './listar-produtos';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';


function Produtos(props) {

    const [exibirMsg, setExibirMsg] = useState(false);
    const [produto, setProduto] = useState('');

    function visivel() {
        return props.visivel ? null : 'd-none';
    }

    function exibirMensagem(produto) {
        setExibirMsg(true);
        setProduto(produto.nome);
        setTimeout(() => {
            setExibirMsg(false)
        }, 3000);

    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Alert variant="success" show={exibirMsg}>
                        <b>{produto}</b> adicionado com sucesso ao carrinho!</Alert>
                </Col>
            </Row>

            <Row className={visivel()}>
                <ListarProdutos
                    exibirMensagem={exibirMensagem}
                    adicionarProduto={props.adicionarProduto} />
            </Row>
        </React.Fragment>
    )
}

Produtos.propTypes = {
    visivel: PropTypes.bool.isRequired,
    adicionarProduto: PropTypes.func.isRequired
}

export default Produtos;
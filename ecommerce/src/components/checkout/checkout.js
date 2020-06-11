import React, { useState } from 'react';
import './style.css';
import { Form, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstados from './listar-estados';
import ListarCidades from './listar-cidades';

registerLocale('pt', pt);

function Checkout(props) {

    function visivel() {
        return props.visivel ? "mt-3 mb-5" : 'd-none';
    }

    return (
        <React.Fragment>
            <Card bg="light" className={visivel()}>
                <Card.Header>
                    <h4 className="mb-0">Finalizar compra</h4>
                </Card.Header>
                <Card.Body>
                    <Form noValidate>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                data-testid="txt-email" />
                            <Form.Control.Feedback type="invalid">
                                Digite um email válido.
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="nomeCompleto">
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome completo"
                                name="nomeCompleto"
                                data-testid="txt-nome-completo" />
                            <Form.Control.Feedback type="invalid">
                                Digite seu nome completo (mínimo 5 caracteres)
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="dataNascimento">
                            <Form.Label>Data de nascimento</Form.Label>
                            <DatePicker
                                locale="pt"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                                placeholderText="selecione a data"
                                className="form-control"
                                name="dataNascimento"
                                withPortal
                            />
                        </Form.Group>

                        <Form.Group controlId="cpf">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu CPF"
                                name="cpf"
                                data-testid="txt-cpf" />
                            <Form.Control.Feedback type="invalid">
                                Digite um cpf válido
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="endereco">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu endereço"
                                name="endereco"
                                data-testid="txt-endereco" />
                            <Form.Control.Feedback type="invalid">
                                Digite seu endereço
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="estado">
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                as="select"
                                name="estado"
                                data-testid="estado"
                            >
                                <ListarEstados />
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Selecione seu Estado
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="cidade">
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control
                                as="select"
                                name="cidade"
                                data-testid="cidade"
                            >
                                <option value="">Selecione a Cidade</option>
                                <ListarCidades estado={''} />
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Selecione sua Cidade
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="cep">
                            <Form.Label>CEP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu CEP"
                                name="cep"
                                data-testid="txt-cep" />
                            <Form.Control.Feedback type="invalid">
                                Digite seu CEP
                        </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="emailPromocional">
                            <Form.Label className="w-100">Deseja receber email com promoções?</Form.Label>
                            <Form.Check
                                inline
                                name="emailPromocional"
                                type="radio"
                                id="promocaoSim"
                                value="S"
                                label="Sim"
                            />
                            <Form.Check
                                inline
                                name="emailPromocional"
                                type="radio"
                                id="promocaoNao"
                                value="N"
                                label="Não"
                            />
                        </Form.Group>

                        <Form.Group controlId="termosCondicoes">
                            <Form.Check
                                name="termosCondicoes"
                                type="checkbox"
                                label="Concordo com os termos e condições"
                            />
                        </Form.Group>

                        <Row>
                            <Col className="justify-content-center d-flex">
                                <Button
                                    variant="success"
                                    className="mt-3 mb-3"
                                    data-testid="btn-finalizar-compra"
                                    type="submit">
                                    Finalizar compra
                            </Button>
                            </Col>
                        </Row>

                    </Form>
                </Card.Body>
            </Card>

            <Modal show={false} centered data-testid="modal-compra-sucesso">
                <Modal.Header closeButton>
                    <Modal.Title>Compra realizada com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Um email de confirmação foi enviado com os detalhes da transação.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success">
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={false} centered data-testid="modal-erro-comprar">
                <Modal.Header closeButton>
                    <Modal.Title>Erro ao processar o pedido.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tente novamente em instantes
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning">
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

Checkout.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirProdutos: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired,
    produtos: PropTypes.object.isRequired,
    handleLimparCarrinho: PropTypes.func.isRequired
}

export default Checkout;
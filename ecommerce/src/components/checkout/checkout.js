import React, { useState } from 'react';
import './style.css';
import { Form, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ListarEstados from './listar-estados';
import ListarCidades from './listar-cidades';
import { Formik } from 'formik';
import * as yup from 'yup';
import { validarCpf, formatarCpf } from '../../utils/cpf-util';
import formatarCep from '../../utils/cep-util';
import axios from 'axios';

registerLocale('pt', pt);

function Checkout(props) {

    const CHECKOUT_URL = 'http://localhost:3001/checkout';

    const [dataNascimento, setDataNascimento] = useState(null);
    const [formEnviado, setFormEnviado] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErroModal, setShowErroModal] = useState(false);

    const schema = yup.object({
        email: yup.string().email().required(),
        nomeCompleto: yup.string().required().min(5),
        cpf: yup.string().required().min(14).max(14)
            .test('cpf-valido', 'CPF inválido', (cpf) => validarCpf(cpf)),
        endereco: yup.string().min(5).required(),
        estado: yup.string().required(),
        cidade: yup.string().required(),
        cep: yup.string().required().min(9).max(9),
        emailPromocional: yup.string().required(),
        termosCondicoes: yup.bool().oneOf([true])
    });

    function visivel() {
        return props.visivel ? "mt-3 mb-5" : 'd-none';
    }

    async function finalizarCompra(dados) {
        if (!dataNascimento) {
            setFormEnviado(true);
            return;
        }

        dados.dataNascimento = dataNascimento;
        dados.produtos = JSON.stringify(props.produtos);
        dados.total = `R$ ${props.total}`;

        try {
            await axios.post(CHECKOUT_URL, dados);
            setShowModal(true);
            props.handleLimparCarrinho();

        } catch (err) {
            setShowErroModal(true);
        }

    }

    function datePickerCss() {
        if (!formEnviado) {
            return "form-control"
        }
        if (dataNascimento) {
            return "form-control is-valid"
        } else {
            return "form-control is-invalid"
        }
    }

    function handleDataNascimento(data) {
        setDataNascimento(data);
    }

    function handleContinuar() {
        setShowModal(false);
        props.handleExibirProdutos();
    }

    function handleFecharErroModal() {
        setShowErroModal(false)
    }

    return (
        <React.Fragment>
            <Card bg="light" className={visivel()}>
                <Card.Header>
                    <h4 className="mb-0">Finalizar compra</h4>
                </Card.Header>
                <Card.Body>
                    <Formik
                        onSubmit={(values) => finalizarCompra(values)}
                        initialValues={{
                            email: '',
                            nomeCompleto: '',
                            cpf: '',
                            endereco: '',
                            cidade: '',
                            estado: '',
                            cep: '',
                            termosCondicoes: false,
                            emailPromocional: 'S'
                        }}
                        validationSchema={schema}>
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            errors
                        }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Digite seu email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={touched.email && !!errors.email}
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
                                            value={values.nomeCompleto}
                                            onChange={handleChange}
                                            isValid={touched.nomeCompleto && !errors.nomeCompleto}
                                            isInvalid={touched.nomeCompleto && !!errors.nomeCompleto}
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
                                            name="dataNascimento"
                                            withPortal
                                            selected={dataNascimento}
                                            onChange={handleDataNascimento}
                                            className={datePickerCss()}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="cpf">
                                        <Form.Label>CPF</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Digite seu CPF"
                                            name="cpf"
                                            value={values.cpf}
                                            onChange={e => {
                                                e.currentTarget.value = formatarCpf(e.currentTarget.value);
                                                handleChange(e);
                                            }}
                                            isValid={touched.cpf && !errors.cpf}
                                            isInvalid={touched.cpf && !!errors.cpf}
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
                                            value={values.endereco}
                                            onChange={handleChange}
                                            isValid={touched.endereco && !errors.endereco}
                                            isInvalid={touched.endereco && !!errors.endereco}
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
                                            value={values.estado}
                                            onChange={handleChange}
                                            isValid={touched.estado && !errors.estado}
                                            isInvalid={touched.estado && !!errors.estado}
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
                                            value={values.cidade}
                                            onChange={handleChange}
                                            isValid={touched.cidade && !errors.cidade}
                                            isInvalid={touched.cidade && !!errors.cidade}
                                            data-testid="cidade">
                                            <option value="">Selecione a cidade</option>
                                            <ListarCidades estado={values.estado} />
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
                                            value={values.cep}
                                            onChange={e => {
                                                e.currentTarget.value = formatarCep(e.currentTarget.value);
                                                handleChange(e);
                                            }}
                                            isValid={touched.cep && !errors.cep}
                                            isInvalid={touched.cep && !!errors.cep}
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
                                            checked={values.emailPromocional === 'S'}
                                            onChange={handleChange}
                                            label="Sim"
                                        />
                                        <Form.Check
                                            inline
                                            name="emailPromocional"
                                            type="radio"
                                            id="promocaoNao"
                                            value="N"
                                            checked={values.emailPromocional === 'N'}
                                            onChange={handleChange}
                                            label="Não"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="termosCondicoes">
                                        <Form.Check
                                            name="termosCondicoes"
                                            label="Concordo com os termos e condições"
                                            data-testid="check-termos-condicoes"
                                            value={values.termosCondicoes}
                                            onChange={handleChange}
                                            isValid={touched.termosCondicoes && !errors.termosCondicoes}
                                            isInvalid={touched.termosCondicoes && !!errors.termosCondicoes}

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
                            )}
                    </Formik>
                </Card.Body>
            </Card>

            <Modal show={showModal} centered
                data-testid="modal-compra-sucesso"
                onHide={handleContinuar}>
                <Modal.Header closeButton>
                    <Modal.Title>Compra realizada com sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Um email de confirmação foi enviado com os detalhes da transação.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success" onClick={handleContinuar}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showErroModal} centered
                onHide={handleFecharErroModal}
                data-testid="modal-erro-comprar">
                <Modal.Header closeButton>
                    <Modal.Title>Erro ao processar o pedido.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tente novamente em instantes
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="warning" onClick={handleFecharErroModal}>
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
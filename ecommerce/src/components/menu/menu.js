import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingBasket, faCashRegister, faShoppingCart
} from '@fortawesome/free-solid-svg-icons';


function Menu() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">Mini Ecommerce</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavDropdown
                        title={
                            <div style={{ display: 'inline-block' }}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                                &nbsp;
                                Carrinho
                            </div>
                        }
                        drop="left">
                        <NavDropdown.Item href="#">
                            <FontAwesomeIcon icon={faShoppingBasket} />
                           &nbsp;
                           <strong>Produtos</strong>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        {/* itens do carringo */}
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#" data-testid="total-carrinho">
                            Total: R$ {/* Chamar função de calculo de total */}
                        </NavDropdown.Item>

                        <span>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#" className="text-success bg-white">
                                <FontAwesomeIcon icon={faCashRegister} />
                                &nbsp;
                                Finalizar compra
                            </NavDropdown.Item>
                        </span>

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Menu;
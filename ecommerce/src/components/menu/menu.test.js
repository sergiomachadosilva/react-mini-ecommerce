import React from 'react';
import { render } from '@testing-library/react';
import Menu from './menu';

describe('Teste do componente Menu', () => {

    it('deve renderizar o componente sem erros', () => {
        const { getByText } = render(
            <Menu
                produtos={[]}
                handleExibirProdutos={() => false}
                handleExibirCheckout={() => false} />
        );
        const texto = getByText(/Mini Ecommerce/i);
        expect(texto).toBeInTheDocument();

    })
})
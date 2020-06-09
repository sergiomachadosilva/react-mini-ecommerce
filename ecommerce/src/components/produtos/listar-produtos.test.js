import React from 'react';
import { render } from '@testing-library/react';
import ListarProdutos from './listar-produtos';

describe('Teste do componente de listagem de produtos', () => {

    it('deve rexibir os nomes dos produtos nos cards', () => {
        const { getByTestId } = render(
            <ListarProdutos
                adicionarProduto={() => false}
                exibirMensagem={() => false}
            />
        );
        expect(getByTestId('card1')).toHaveTextContent('Aprenda Javascripts em 12 semanas')
        expect(getByTestId('card2')).toHaveTextContent('Introdução ao React')
    })

    it('deve exibir as descrições dos produtos nos cards', () => {
        const { getByTestId } = render(
            <ListarProdutos
                adicionarProduto={() => false}
                exibirMensagem={() => false}
            />
        );
        expect(getByTestId('card1')).toHaveTextContent('Descrição do produto')
        expect(getByTestId('card3')).toHaveTextContent('Descrição do produto')
    })

    it('deve exibir os preços dos produtos nos botões de comprar', () => {
        const { getByTestId } = render(
            <ListarProdutos
                adicionarProduto={() => false}
                exibirMensagem={() => false}
            />
        );
        expect(getByTestId('card1')).toHaveTextContent('Comprar R$ 59,99')
        expect(getByTestId('card3')).toHaveTextContent('Comprar R$ 149,80')
    })
})
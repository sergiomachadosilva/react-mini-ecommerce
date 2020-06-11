import React from 'react';
import { render } from '@testing-library/react';
import ListarEstados from './listar-estados';

describe('Teste do componente listar estados', () => {

    it('deve gerar uma listagem de estados', () => {
        const { getByTestId } = render(<ListarEstados />);
        expect(getByTestId('MT')).toHaveTextContent('Mato Grosso')
        expect(getByTestId('PB')).toHaveTextContent('Paraíba')
    })
})
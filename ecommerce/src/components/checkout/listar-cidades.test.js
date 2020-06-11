import React from 'react';
import { render } from '@testing-library/react';
import axiosMock from 'axios';
import ListarCidades from './listar-cidades';

describe('Teste do componente de listagem de cidades', () => {

    it('deve gerar uma listagem de cidades', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: ['João Pessoa', 'Patos'] });
        const { findByTestId } = render(<ListarCidades estado="pb" />);
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(await findByTestId('João Pessoa')).toHaveTextContent('João Pessoa');
        expect(await findByTestId('Patos')).toHaveTextContent('Patos');
    })
})
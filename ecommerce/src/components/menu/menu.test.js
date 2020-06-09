import React from 'react';
import { render } from '@testing-library/react';
import Menu from './menu';

describe('Teste do componente Menu', () => {

    it('deve renderizar o componente sem erros', () => {
        const { getByText } = render(<Menu />);
        const texto = getByText(/menu/i);
        expect(texto).toBeInTheDocument();

    })
})
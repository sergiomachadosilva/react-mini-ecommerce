import React from 'react';
import { render } from '@testing-library/react';
import MiniEcommerce from './ecommerce';

describe('Teste do componente ecommerce', () => {
 
  it('deve renderizar o componente sem erros', () => {
    const { getByText } = render(<MiniEcommerce />);
    const linkElement = getByText('Mini Ecommerce');
    expect(linkElement).toBeInTheDocument();
  });

})



import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from './Footer';

afterEach(cleanup);

it('should say `check out my code on github`', () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('footerText')).toHaveTextContent('Check out my code on Github!')
});

it('Links to github', () => {
    render(<Footer />);
    const link = document.querySelector('a');
    expect(link).toHaveAttribute('href', 'https://github.com/rufusbiggs/Jammming/tree/main');
})
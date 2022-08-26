import { render, screen } from '@testing-library/react'
import Track from './track';

describe('Track Page', () => {
    it('should render', () => {
        render(<Track />)
        screen.getByText(/total/i);
    } )
})

import { render, screen } from '@testing-library/react'
import {TrackPage} from './index.stories';

describe('Track Page', () => {
    it('should render', () => {
        render(<TrackPage />)
        screen.getByText(/total/i);
    } )
})

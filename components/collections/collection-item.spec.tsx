import { render, screen } from '@testing-library/react'
import CollectionItem from '../collections/collection-item';
import '@testing-library/jest-dom'
import {SearchItem} from "../search/types/search.type";

describe('CollectionItem', () => {
    const item: SearchItem = {
        slug: 'mfers',
        floor_price: 1.5,
        name: 'Mfers',
        mp: 'opensea',
        image_url: 'https://lh3.googleusercontent.com/cb_wdEAmvry_noTfeuQzhqKpghhZWQ_sEhuGS9swM03UM8QMEVJrndu0ZRdLFgGVqEPeCUzOHGTUllxug9U3xdvt0bES6VFdkRCKPqg=s120',
        score: 1,
        volume: 1
    }
    render(<CollectionItem collection={item} />)
    it('renders a heading', () => {


        const main = screen.getByText('Mfers')

        expect(main).toBeInTheDocument()
    })
})

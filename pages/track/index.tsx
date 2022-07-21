import {useCallback, useState} from 'react'
import Layout from "../../components/layout";
import AsyncSelect from 'react-select/async';
import {debounce} from "lodash"
import type {SearchItem} from "../../lib/collections/search.type";
import CollectionItem from "../../components/collections/collection-item";
import { GroupBase, OptionProps, StylesConfig } from 'react-select';
import CollectionSearch from '../../components/collections/collection-search';


export default function Index() {
    const [collections, setCollections] = useState<SearchItem[]>([]);
    return (
        <>
            <Layout>
                <CollectionSearch onSearchResultSelection={(item: SearchItem) => setCollections(collections => [item, ...collections])      } />
                <div className="mt-2">
                    {collections.map(collection => (
                        <CollectionItem key={collection._id} collection={collection} />
                    ))}
                </div>
            </Layout>

        </>
            
            

    )
}

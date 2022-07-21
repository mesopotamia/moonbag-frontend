import {useState} from 'react'
import Layout from "../../components/layout";
import type {SearchItem} from "../../lib/collections/search.type";
import CollectionItem from "../../components/collections/collection-item";
import CollectionSearch from '../../components/collections/collection-search';


export default function Index() {
    const [collections, setCollections] = useState<SearchItem[]>([]);
    return (
        <>
            <Layout>
                <CollectionSearch onSearchResultSelection={(item: SearchItem) => setCollections(collections => [item, ...collections])      } />
                <div className="mt-6">
                    <div className="grid grid-cols-3 text-secondary-text-color mb-3 gap-2 ">
                        <div>Token</div>
                        <div>Price</div>
                        <div>Holdings</div>
                    </div>
                    {collections.map(collection => (
                        <CollectionItem key={collection._id} collection={collection} />
                    ))}
                </div>
            </Layout>

        </>
            
            

    )
}

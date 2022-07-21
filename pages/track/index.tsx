import {useEffect, useState} from 'react'
import Layout from "../../components/layout";
import type {SearchItem} from "../../lib/collections/search.type";
import CollectionItem from "../../components/collections/collection-item";
import CollectionSearch from '../../components/collections/collection-search';
import {CollectionDetails} from "../../lib/collections/backend.type";


export default function Index() {
    const [collections, setCollections] = useState<SearchItem[]>([]);
    const [detailedCollection, setDetailedCollection] = useState<CollectionDetails>(null);
    const removeCollectionAtIndex = (index: number, list: SearchItem[]): SearchItem => {
        const removedItem = list.splice(index, 1);
        setCollections(_ => [...list]);
        return removedItem[0];
    }
    const onSearchResultSelection = async (item: SearchItem) => {
        await setCollections(collections => [item, ...collections]);
        // load details
        const id = item.slug;
        const url = `https://collections.palmyra-flair01.workers.dev/api/collections/details/${id}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const detailedCollection: CollectionDetails = jsonResponse.data;
        setDetailedCollection(detailedCollection);
        console.log(detailedCollection.stats.floor_price);

    }
    useEffect(() => {
        if (!detailedCollection) {
            return;
        }
        const removedItem = removeCollectionAtIndex(0, collections);
        removedItem.floor_price = detailedCollection.stats.floor_price;
        setCollections(collections => [removedItem, ...collections]);
    }, [detailedCollection])
    return (
        <>
            <Layout>
                <CollectionSearch onSearchResultSelection={onSearchResultSelection} />
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

import {useEffect, useState} from 'react'
import Layout from "../../components/layout";
import type {SearchItem} from "../../lib/collections/search.type";
import CollectionItem from "../../components/collections/collection-item";
import CollectionSearch from '../../components/collections/collection-search';
import {CollectionDetails} from "../../lib/collections/backend.type";
import PullToRefresh from 'react-simple-pull-to-refresh';
import useFetch from "react-fetch-hook";

export default function Index() {
    const [collections, setCollections] = useState<SearchItem[]>([]);
    const [detailedCollection, setDetailedCollection] = useState<CollectionDetails>(null);
    const removeCollectionAtIndex = (index: number, list: SearchItem[]): SearchItem => {
        const removedItem = list.splice(index, 1);
        setCollections(_ => [...list]);
        return removedItem[0];
    }
    const getCollectionDetails = async(slug: string) => {
        const url = `https://collections.palmyra-flair01.workers.dev/api/collections/details/${slug}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const detailedCollection: CollectionDetails = jsonResponse.data;
        return detailedCollection;
    }
    const getMultipleCollectionDetails = async(slugs: string[]) => {

        const url = `https://collections.palmyra-flair01.workers.dev/api/collections/multiple/details/`;
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({slugs: slugs}),
        })
        .then(response => response.json())
        .then(jsonResposne => jsonResposne.data);
    }
    const onRefresh = async () => {
        return getMultipleCollectionDetails(collections.map(item => item.slug))
        .then((data) => {
            try {
                console.log(data);
                const newItems: SearchItem[] = data
                    .map(item => {
                        // console.log(item);
                        return JSON.parse(item)
                    })
                    .map(item => item.data)
                    .map(item => {
                        // console.log(item)
                        return {
                            image_url: item.metadata.image_url,
                            mp: 'opensea',
                            score: 0,
                            volume: 0,
                            floor_price: item.stats.floor_price,
                            slug: item.slug,
                            name: item.name
                        }
                    });
                setCollections(newItems)
            }
            catch(e) {
                console.log(e);
            }
        })
    }
    const onSearchResultSelection = async (item: SearchItem) => {
        setCollections(collections => [item, ...collections]);
        const detailedCollection = await getCollectionDetails(item.slug);
        setDetailedCollection(detailedCollection);
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
                    <div className="grid grid-cols-4 text-secondary-text-color mb-3 gap-2 ">
                        <div className="col-span-2">Token</div>
                        <div>Price</div>
                        <div>Holdings</div>
                    </div>
                    <PullToRefresh pullingContent="" onRefresh={onRefresh} >
                        <div style={{height: 400}}>
                            {collections.map(collection => (
                                <CollectionItem key={collection.slug} collection={collection} />
                            ))}
                        </div>
                    </PullToRefresh>
                        
                </div>
            </Layout>

        </>
            
            

    )
}

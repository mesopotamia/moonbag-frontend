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
                const newItems = data.map(item => JSON.parse(item)).map(item => ({
                    image_url: item.metadata.image_url,
                    mp: 'opensea',
                    score: 0,
                    volume: 0,
                    floor_price: item.stats.floor_price,
                    slug: item.slug,
                    _id: '',
                    name: item.name
                }));
            }
            catch(e) {
                console.log(e);
            }
            
            // console.log('new Items',newItems);
        })
        // if (!newCollections) {
        //     return;
        // }
        // console.log(newCollections);
        // const searchItems = newCollections
        // .map(item => JSON.parse(item))
        // .map(item => ({
        //     image_url: item.metadata.image_url,
        //     mp: 'opensea',
        //     score: 0,
        //     volume: 0,
        //     floor_price: item.stats.floor_price,
        //     slug: item.slug,
        //     _id: '',
        //     name: item.name
        // }))
        // console.log(searchItems);
        // return newCollections;
        // return newCollections.then((data) => {
        //     console.log('data', data)
        //     return data;
        // });
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
                    <PullToRefresh pullingContent="" onRefresh={() => onRefresh()} >
                        <div style={{height: 400}}>
                            {collections.map(collection => (
                                <CollectionItem key={collection._id} collection={collection} />
                            ))}
                        </div>
                    </PullToRefresh>
                        
                </div>
            </Layout>

        </>
            
            

    )
}

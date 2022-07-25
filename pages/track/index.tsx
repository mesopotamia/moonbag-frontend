import {useEffect, useState} from 'react'
import Layout from "../../components/layout";
import type {SearchItem} from "../../lib/collections/search.type";
import CollectionItem from "../../components/collections/collection-item";
import CollectionSearch from '../../components/collections/collection-search';
import {CollectionDetails} from "../../lib/collections/backend.type";
import PullToRefresh from 'react-simple-pull-to-refresh';
import PortfolioTotal from "../../components/portoflio-total";

export default function Index() {
    const [collections, setCollections] = useState<SearchItem[]>([]);
    const [detailedCollection, setDetailedCollection] = useState<CollectionDetails>(null);
    const [amount, setAmount] = useState(0);
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
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({slugs: slugs}),
        })
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.data);
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
                calculateTotalAmount();
            }
            catch(e) {
                console.log(e);
            }
        })
    }
    const onSearchResultSelection = async (item: SearchItem) => {
        const isAlreadyInList = collections.find(collectionItem => item.slug === collectionItem.slug);
        if (!isAlreadyInList) {
            setCollections(collections => [item, ...collections]);
        }
        
        const detailedCollection = await getCollectionDetails(item.slug);
        setDetailedCollection(detailedCollection);
    }
    const calculateTotalAmount = () => {
        const total = collections.reduce(
            (result: number, item) => {
                result += item.floor_price;
                return result ;
            }, 0
        )
        setAmount(total);
    }
    useEffect(() => {
        if (!detailedCollection) {
            return;
        }
        const removedItem = removeCollectionAtIndex(0, collections);
        removedItem.floor_price = detailedCollection.stats.floor_price;
        setCollections(collections => [removedItem, ...collections]);
        calculateTotalAmount();
    }, [detailedCollection])
    return (
        <>
            <Layout>
                <div className="mb-5">
                    <PortfolioTotal amount={amount}></PortfolioTotal>
                </div>
                <CollectionSearch onSearchResultSelection={onSearchResultSelection} />
                <div className="mt-6 h-full">
                    <div className="grid grid-cols-6 text-secondary-text-color mb-3 gap-2 ">
                        <div className="col-span-4">Token</div>
                        <div>Price</div>
                        <div>Holdings</div>
                    </div>
                    <PullToRefresh pullingContent="" onRefresh={() => onRefresh()} >
                        <div>
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

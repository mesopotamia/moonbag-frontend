import { useEffect, useState } from 'react'
import Layout from "../../../components/layout";
import type { SearchItem } from "../../../components/search/types/search.type";
import CollectionSearch from '../../../components/search/collection-search';
import { CollectionDetails } from "../../../components/collections/types/backend.type";
import PortfolioTotal from "../../../components/collections/portoflio-total";
import CollectionsList from "../../../components/collections/collections-list";

export default function Index() {
    const [collections, setCollections] = useState<SearchItem[]>([]);
    const [detailedCollection, setDetailedCollection] = useState<CollectionDetails>(null);
    const [amount, setAmount] = useState<number>(0);
    const removeCollectionAtIndex = (index: number, list: SearchItem[]): SearchItem => {
        const removedItem = list.splice(index, 1);
        setCollections(_ => [...list]);
        return removedItem[0];
    }
    const getCollectionDetails = async (slug: string) => {
        const url = `https://collections.palmyra-flair01.workers.dev/api/collections/details/${slug}`;
        const response = await fetch(url);
        const jsonResponse = await response.json();
        const detailedCollection: CollectionDetails = jsonResponse.data;
        return detailedCollection;
    }
    const fetchMultipleCollectionDetails = async (slugs: string[]) => {

        const url = `https://collections.palmyra-flair01.workers.dev/api/collections/multiple/details/`;
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({ slugs: slugs }),
        })
            .then(response => response.json())
            .then(jsonResponse => jsonResponse.data);
    }
    const onRefresh = async () => {
        return fetchMultipleCollectionDetails(collections.map(item => item.slug))
            .then((data) => {

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
                    setCollections(newItems);
            })
    }
    const onSearchResultSelection = async (item: SearchItem) => {
        const isAlreadyInList = collections.find(collectionItem => item.slug === collectionItem.slug);
        if (isAlreadyInList) {
            return;
        }
        setCollections(collections => [item, ...collections]);
        const detailedCollection = await getCollectionDetails(item.slug);
        setDetailedCollection(detailedCollection);
    }
    const calculateTotalAmount = () => {
        const total = collections.reduce(
            (result: number, item) => {
                result += item.floor_price;
                return result;
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
    }, [detailedCollection]);
    useEffect(() => {
        calculateTotalAmount();
    }, [collections]);
return (
    <>
        <Layout>
            <div className="mb-5">
                <PortfolioTotal amount={amount || 0}></PortfolioTotal>
            </div>
            <CollectionSearch onSearchResultSelection={onSearchResultSelection} />
            {
                collections.length > 0
                ? <CollectionsList collections={collections} onRefresh={onRefresh} />
                : <></>
            }

        </Layout>

    </>



)
}

import {useEffect, useState} from 'react'
import Layout from "../../components/layout";
import CollectionsList from "../../components/collections/collections-list";
import CollectionItem from "../../components/collections/collection-item";



export default function Index() {
    const [collections, setCollections] = useState<{slug: string}>({slug: ''});
    const id = "otherdeed";
    useEffect(() => {
        async function getData(id: string) {
            const response = await fetch(`https://collections.palmyra-flair01.workers.dev/api/collections/details/${id}`);
            const data = await response.json();
            setCollections(data.data);
        }
        getData(id);
    }, [id]);
       console.log('render');
       console.log(collections.slug);
    return (    
        <>
            <Layout>
                <h1>Collection: {collections.slug}</h1>
                <CollectionItem></CollectionItem>
            </Layout>
            
        </>
            
            

    )
}

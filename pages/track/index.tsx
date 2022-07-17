import {useEffect, useState} from 'react'
import Layout from "../../components/layout";
import CollectionsList from "../../components/collections/collections-list";
import CollectionItem from "../../components/collections/collection-item";



export default function Index() {
    const [collection, setCollections] = useState<{slug: string}>({slug: ''});
    const [id, setId] = useState('otherdeed');
    useEffect(() => {
        async function getData(id: string) {
            const response = await fetch(`https://collections.palmyra-flair01.workers.dev/api/collections/details/${id}`);
            const jsonResponse = await response.json();
            setCollections(jsonResponse.data);
        }
        getData(id);
    }, []);
       console.log('render');
       console.log(collection.slug);
    return (    
        <>
            <Layout>
                <h1>Collection: {collection.slug}</h1>
                <CollectionItem></CollectionItem>
            </Layout>
            
        </>
            
            

    )
}

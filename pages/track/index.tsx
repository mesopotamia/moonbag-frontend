import {useCallback, useEffect, useState} from 'react'
import Layout from "../../components/layout";
import CollectionsList from "../../components/collections/collections-list";
import CollectionItem from "../../components/collections/collection-item";
import AsyncSelect from 'react-select/async'
import {debounce} from "lodash"


export default function Index() {
    const [collection, setCollections] = useState<{slug: string}>({slug: ''});
    const [id, setId] = useState('otherdeed');
    const [selection, setSelection] = useState([]);
    /*useEffect(() => {
        async function getData(id: string) {
            const response = await fetch(`https://collections.palmyra-flair01.workers.dev/api/collections/details/${id}`);
            const jsonResponse = await response.json();
            setCollections(jsonResponse.data);
        }
        getData(id);
    }, []);*/
       console.log('render');
       console.log(collection.slug);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const promiseOptions = async (id: string): Promise<{label: string, value: string}[]> => {
            const url = `https://collections.palmyra-flair01.workers.dev/api/collections/search/${id}`;
            const response = await fetch(url);
            const jsonResponse = await response.json();
            return jsonResponse.map(item => ({label: item.name, value: item.slug, index: item._id}));
    };

    const fetchWithDebounce = useCallback(
        debounce((inputText, callback) => {
            console.log('use call')
            promiseOptions(inputText).then(items => {
                console.log(items);
                callback(items)
            })
        }, 300),
        []
    );
    return (
        <>
            <Layout>
                <AsyncSelect
                    components={{ DropdownIndicator: null }}
                    instanceId="123"
                    controlShouldRenderValue={false}
                    loadOptions={fetchWithDebounce}
                    defaultValue={[]}
                    isClearable
                    defaultOptions={[]} />
                <h1>Collection: {collection.slug}</h1>
                <CollectionItem></CollectionItem>
            </Layout>
            
        </>
            
            

    )
}

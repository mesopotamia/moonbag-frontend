import {useCallback, useEffect, useState} from 'react'
import Layout from "../../components/layout";
import CollectionsList from "../../components/collections/collections-list";
import CollectionItem from "../../components/collections/collection-item";
import AsyncSelect from 'react-select/async';
import {components} from 'react-select'
import {debounce} from "lodash"


export default function Index() {
    const [collection, setCollections] = useState<{slug: string}>({slug: ''});
    const promiseOptions = async (id: string): Promise<{label: string, value: string}[]> => {
            const url = `https://collections.palmyra-flair01.workers.dev/api/collections/search/${id}`;
            const response = await fetch(url);
            const jsonResponse = await response.json();
            return jsonResponse.map(item => ({
                label: item.name,
                value: item.slug,
                index: item._id,
                image_url: item.image_url
            }));
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
    const CustomOption = (props) => {
        const { innerProps, innerRef } = props;
        console.log(props);
        return (
            <div className="p-2 flex" ref={innerRef} {...innerProps}>
                <span>
                    <img style={{height: "30px"}} src={props.data.image_url} />
                </span>
                <span className="ml-2">{props.data.label}</span>
            </div>
        )
    };
    return (
        <>
            <Layout>
                <AsyncSelect
                    components={{ DropdownIndicator: null, Option: CustomOption}}
                    instanceId="123"
                    controlShouldRenderValue={false}
                    loadOptions={fetchWithDebounce}
                    onChange={(item) => {console.log(item)}}
                    defaultValue={[]}
                    isClearable
                    defaultOptions={[]} />
            </Layout>
            
        </>
            
            

    )
}

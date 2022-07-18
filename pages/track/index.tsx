import {useCallback, useState} from 'react'
import Layout from "../../components/layout";
import AsyncSelect from 'react-select/async';
import {debounce} from "lodash"
import type {SearchItem} from "../../lib/collections/search.type";
import CollectionItem from "../../components/collections/collection-item";
import { OptionProps } from 'react-select';


export default function Index() {
    const [collections, setCollections] = useState<SearchItem[]>([]);
    const promiseOptions = async (id: string): Promise<SearchItem[]> => {
            const url = `https://collections.palmyra-flair01.workers.dev/api/collections/search/${id}`;
            const response = await fetch(url);
            return await response.json();
    };

    const fetchWithDebounce = useCallback(
        debounce((inputText, callback) => {
            promiseOptions(inputText).then(items => {
                callback(items)
            })
        }, 300),
        []
    );
    const CustomOption = (props: OptionProps<SearchItem>) => {
        const { innerProps, innerRef } = props;
        const data: SearchItem = props.data;
        return (
            <div className="p-2 flex cursor-pointer" ref={innerRef} {...innerProps}>
                <span>
                    <img style={{height: "30px"}} src={data.image_url} />
                </span>
                <span className="ml-2">{data.name}</span>
            </div>
        )
    };
    const NoOptions = () => (<div>No Collections Found</div>)
    const LoadingOptions = () => (<div>Searching for collection</div>)
    const onChange = (item: SearchItem) => {
        if (!item) {
            return;
        }
        setCollections(collections => [item, ...collections]);
    }
    return (
        <>
            <Layout>
                <AsyncSelect
                    placeholder="Search collection ..."
                    noOptionsMessage={NoOptions}
                    loadingMessage={LoadingOptions}
                    components={{ DropdownIndicator: null, Option: CustomOption, ClearIndicator: null}}
                    instanceId="123"
                    controlShouldRenderValue={false}
                    loadOptions={fetchWithDebounce}
                    onChange={onChange}
                    defaultValue={[]}
                    isClearable
                    defaultOptions={[]} />
                <div className="mt-2">
                    {collections.map(collection => (
                        <CollectionItem key={collection._id} collection={collection} />
                    ))}
                </div>
            </Layout>

        </>
            
            

    )
}

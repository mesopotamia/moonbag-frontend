import {useCallback, useState} from 'react'
import Layout from "../../components/layout";
import AsyncSelect from 'react-select/async';
import {debounce} from "lodash"
import type {SearchItem} from "../../lib/collections/search.type";


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
    const CustomOption = (props) => {
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
    const onChange = (item) => {
        setCollections(collections => [item, ...collections]);
    }
    return (
        <>
            <Layout>
                <AsyncSelect
                    placeholder="Search collection ..."
                    noOptionsMessage={NoOptions}
                    loadingMessage={LoadingOptions}
                    components={{ DropdownIndicator: null, Option: CustomOption}}
                    instanceId="123"
                    controlShouldRenderValue={false}
                    loadOptions={fetchWithDebounce}
                    onChange={onChange}
                    defaultValue={[]}
                    isClearable
                    defaultOptions={[]} />
                <div>
                    {collections.map(collection => (
                        <div key={collection._id} className="bg-white p-5 flex items-center flex-col relative">
                            <button type="button"
                                    className="absolute top-0 right-0 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor"
                                     aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                            <h1 className="text-2xl font-bold mb-2">{collection?.name}</h1>

                            <div className="mb-2 md:mb-4">
                                <img height="120" width="120" src={collection?.image_url} alt=""/>
                            </div>
                        </div>
                    ))}
                </div>
            </Layout>

        </>
            
            

    )
}

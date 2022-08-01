import type { SearchItem } from "../../lib/collections/search.type";
import {useCallback} from 'react';
import {debounce} from 'lodash'
import { GroupBase, OptionProps, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async'

export default function CollectionSearch({onSearchResultSelection}) {
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
const NoOptions = ({/*inputValue*/}) => {
    return (<div>No Collections Found</div>)
}
const LoadingOptions = () => (<div>Searching for collection</div>)
const onChange = (item: SearchItem) => {
    if (!item) {
        return;
    }
    onSearchResultSelection(item);
    // setCollections(collections => [item, ...collections]);
}
const customStyles: StylesConfig<SearchItem, boolean, GroupBase<SearchItem>> = {
    control: (provided) => ({
        ...provided,
        color: 'var(--primary-text-color)',
        backgroundColor: 'var(--primary-bg-color)',
        borderColor: 'var(--border-color)'
    }),
    input: (provided) => ({
        ...provided,
        color: 'var(--primary-text-color)',
        borderColor: 'var(--border-color)'
    }),
    menu: (provided) => ({
        ...provided,
        color: 'var(--primary-text-color)',
        backgroundColor: 'var(--primary-bg-color)',
        boxShadow: 'var(--box-shadow)'
    }),
    loadingMessage: (provided) => ({
        ...provided,
        color: 'var(--primary-text-color)',
    }),
    noOptionsMessage: (provided) => ({
        ...provided,
        color: 'var(--primary-text-color)',
    }),
    menuList: (provided) => ({
        ...provided,
        color: 'var(--primary-text-color)',
        backgroundColor: 'var(--primary-bg-color)',
        borderColor: 'var(--border-color)'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'var(--secondary-text-color)',
    }),
    option: (provided) => ({
        ...provided,
        color: 'var(--primary-text-color)',
        backgroundColor: 'var(--primary-bg-color)',
        borderColor: 'var(--border-color)'
    }),
}
    return (
        <AsyncSelect
                    styles={customStyles}
                    placeholder="Add a collection ..."
                    noOptionsMessage={NoOptions}
                    loadingMessage={LoadingOptions}
                    components={{ DropdownIndicator: null, Option: CustomOption, ClearIndicator: null}}
                    instanceId="123"
                    // onInputChange={() => {debugger}}
                    controlShouldRenderValue={false}
                    loadOptions={fetchWithDebounce}
                    onChange={onChange}
                    defaultValue={[]}
                    isClearable
                    defaultOptions={[]} />
    )
}

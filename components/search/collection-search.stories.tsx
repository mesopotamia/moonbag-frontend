import CollectionSearch from "./collection-search";
import {ComponentStory} from "@storybook/react";
import {noop} from "lodash";
import withMock from 'storybook-addon-mock';

export default {
    component: CollectionSearch,
    decorators: [withMock],
}

const Template: ComponentStory<typeof CollectionSearch> = (args) => <CollectionSearch {...args} />;

export const NoResults = Template.bind({});
NoResults.args = {
    onSearchResultSelection: noop
}
NoResults.parameters = {
    mockData: [
        {
            url: 'https://collections.palmyra-flair01.workers.dev/api/collections/search/:id',
            method: 'GET',
            status: 200,
            response: (request) => [
            {
                "_id": "630694afec8d73cd842edb4e",
                "mp": "opensea",
                "slug": "polychrome-music-by-rafael-rozendaal-danny-wolfers",
                "image_url": "https://openseauserdata.com/files/0792b31d9501e2255cb98c479b33c620.gif",
                "name": "Polychrome Music by Rafaël Rozendaal & Danny Wolfers (Legowelt)",
                "volume": 50.545637779999986,
                "score": 1.0015368327078027
            }, {
                "_id": "621bf8430055c9918626396a",
                "mp": "opensea",
                "slug": "mfers",
                "image_url": "https://lh3.googleusercontent.com/J2iIgy5_gmA8IS6sXGKGZeFVZwhldQylk7w7fLepTE9S7ICPCn_dlo8kypX8Ju0N6wvLVOKsbP_7bNGd8cpKmWhFQmqMXOC8q2sOdqw=s120",
                "name": "mfers",
                "volume": 26.179299999999998,
                "score": 3.375
            }],
        },
    ],
}

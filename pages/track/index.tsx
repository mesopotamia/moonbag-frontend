import Layout from "../../components/layout";
import CollectionsList from "../../components/collections/collections-list";
import CollectionItem from "../../components/collections/collection-item";

export default function Index() {

    return (
        <Layout>
            <div>Track</div>
            <CollectionsList></CollectionsList>
            <CollectionItem></CollectionItem>
        </Layout>
    )
}

import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import BreadcrumbStore from "../components/store/BreadcrumbStore";
import DetailStore from "../components/store/DetailStore";
import useStore from "../hooks/useStore";

const DetailStorePage = () => {
    const { storeId } = useParams();
    const { store } = useStore(storeId);

    return (
        <Layout>
            <Container className="py-3">
                <BreadcrumbStore storeName={store.storeName} />
                <DetailStore />
            </Container>
        </Layout>
    );
}

export default DetailStorePage;
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NoPermission from "../components/form/auth/NoPermission";
import FormEditStore from "../components/form/FormEditStore";
import Layout from "../components/layout/Layout";
import useStore from "../hooks/useStore";

const EditStorePage = () => {
    const { storeId } = useParams();
    const { store, editPermission } = useStore(storeId);

    return (
        <Layout>
            <Container>
                {editPermission ? (
                    <FormEditStore
                        storeId={storeId}
                        storeName={store.storeName}
                        country={store.country}
                        city={store.city}
                        storeEmail={store.storeEmail}
                        phoneNumber={store.phoneNumber}
                        description={store.description} />
                ) : (
                    <NoPermission />
                )}
            </Container>
        </Layout>
    );
}

export default EditStorePage;
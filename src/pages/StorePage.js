import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { searchStoreAPI } from "../api/store-api";
import FormSearch from "../components/form/FormSearch";
import Layout from "../components/layout/Layout";
import CardStore from "../components/store/CardStore";
import AuthContext from "../context/auth-context";
import useListStore from "../hooks/useListStore";

const StorePage = (props) => {
    const authCtx = useContext(AuthContext);
    const [listStore, setListStore] = useState([]);
    const [searchParams] = useSearchParams();

    const { stores } = useListStore();

    useEffect(() => {
        if (searchParams.get("search") === null) {
            setListStore(stores);
        }

        if (searchParams.get("search") !== null) {
            searchStoreAPI(searchParams.get("search"), authCtx.token)
                .then((res) => {
                    setListStore(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [authCtx.token, searchParams, stores]);

    return (
        <Layout>
            <Container>
                <div className={props.className}>
                    <div className="d-flex my-3 justify-content-between">
                        <Link
                            to="/stores/add"
                            className="btn btn-primary fw-bold"
                        >Add Store <i className="fa-solid fa-plus"></i></Link>
                        <FormSearch />
                    </div>
                </div>
                <div className="row">
                    {listStore.map((store) => (
                        <CardStore key={store.storeId} store={store} />
                    ))}
                </div>
                {listStore.length <= 0 && (
                    <h2 className="text-muted">Store Not Found!</h2>
                )}
            </Container>
        </Layout>
    );
}

export default StorePage;
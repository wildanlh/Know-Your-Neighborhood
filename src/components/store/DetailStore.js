import { Link, useParams } from "react-router-dom";
import { istore, userprofile } from "../../assets";
import useStore from "../../hooks/useStore";

const DetailStore = () => {
    const { storeId } = useParams();
    const { store, user, editPermission, error } = useStore(storeId);

    const profilePicture = user.imageUrl;

    return (
        <div>
            {!error && (
                <>
                    <div className="card my-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={istore} className="img-fluid rounded-start p-3" alt="store" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="fw-bold">{store.storeName}</h3>
                                    <div className="d-flex">
                                        <i className="fa-sharp fa-solid fa-location-dot me-2 p-1" />
                                        <p className="fw-bold fs-6">{store.city}, {store.country}</p>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fa-regular fa-envelope  me-2 p-1" />
                                        <p className="fw-bold fs-6">{store.storeEmail}</p>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fa-solid fa-phone me-2 p-1" />
                                        <p className="fw-bold fs-6">{store.phoneNumber}</p>
                                    </div>
                                    <span className="fw-bold">Description :</span>
                                    <p className="card-text">{store.description ? store.description : "No description"}</p>
                                    <div className="card">
                                        <div className="d-flex">
                                            <img src={profilePicture ? profilePicture : userprofile} alt="pictures" className="rounded-circle m-3" style={{ width: '70px' }} />
                                            <div>
                                                <Link to={`/profile/${user.name}/${user.userId}`} >
                                                    <p className="mt-3 m-0 fw-bold">{user.name}</p>
                                                </Link>
                                                <p className="m-0">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {editPermission && (
                                        <Link
                                            to="edit"
                                            className="btn btn-primary mt-3"
                                        >
                                            Edit Store
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {error && <p className="text-primary">Store not found!!</p>}
        </div>
    );
}

export default DetailStore;
import React from "react";
import { Link } from "react-router-dom";
import { istore, userprofile } from "../../assets";

const CardStore = ({ store }) => {
    const marginzero = {
        margin: '0'
    };

    const { storeId, storeName, country, city, user } = store;
    const profilePicture = user.imageUrl;

    const strName = user.name.replace(/\s+/g, "-").toLowerCase();
    const strStoreName = storeName.replace(/\s+/g, "-").toLowerCase();

    return (
        <div className="col-12 col-md-6 col-md-4 col-lg-3 mb-3" >
            <div className="card">
                <img className="p-3" src={istore} alt="store" />
                <hr />
                <div className="d-flex text-secondary">
                    <Link to={`/profile/${strName}/${user.userId}`}>
                        <img
                            src={profilePicture ? profilePicture : userprofile}
                            alt="profile_picture"
                            className="rounded-circle m-3"
                            style={{ maxWidth: '60px' }}
                        />
                    </Link>
                    <div>
                        <p className="fw-bold text-primary m-0">{storeName}</p>
                        <p className="m-0"> {country}</p>
                        <p className="m-0">{city}</p>
                    </div>
                </div>

                <Link
                    className="btn btn-primary btn-car w-100 fw-bold"
                    to={`/stores/${strStoreName}/${storeId}`}
                >
                    Check Details
                </Link>
            </div>
        </div >
        // <div className="list-group w-auto mb-3" bis_skin_checked="1">
        //     <a href={`/stores/${strStoreName}/${storeId}`} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
        //         <img src={istore} alt="store" style={{ width: "350px" }} />
        //         <div className="d-flex w-100 alert alert-primary" bis_skin_checked="1">
        //             <Link to={`/profile/${strName}/${user.userId}`}>
        //                 <img
        //                     src={profilePicture ? profilePicture : userprofile}
        //                     alt="profile_picture"
        //                     className="rounded-circle m-3"
        //                     style={{ width: '150px' }}
        //                 />
        //             </Link>
        //             <div>
        //                 <p className="fw-bold text-primary">{storeName}</p>
        //                 <p>{country}</p>
        //                 <p>{city}</p>
        //             </div>
        //         </div>
        //     </a>
        // </div >


        // <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        //     <Col>
        //         <div className="card shadow-sm" bis_skin_checked="1">
        //             <img className="p-3" src={istore} alt="store" />
        //             <div className="card-body" bis_skin_checked="1">
        //                 <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        //                 <div className="d-flex justify-content-between align-items-center" bis_skin_checked="1">
        //                     <div className="btn-group" bis_skin_checked="1">
        //                         <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
        //                         <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
        //                     </div>
        //                     <small className="text-muted">9 mins</small>
        //                 </div>
        //             </div>
        //         </div>
        //     </Col>
        // </Row>
    );
}

export default CardStore;
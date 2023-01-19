import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getUserAPI } from "../api/user-api";
import { userprofile } from "../assets";
import Layout from "../components/layout/Layout";
import CardStore from "../components/store/CardStore";
import AuthContext from "../context/auth-context";

const ProfilePage = (props) => {
    const { profile, stores, token } = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState({});
    const [userStores, setUserStores] = useState([]);
    const [profilePicture, setProfilePicture] = useState("");
    const [isUser, setIsUser] = useState(false);

    const { userId } = useParams();

    useEffect(() => {
        if (userId === undefined) {
            setUserProfile(profile);
            setUserStores(stores);
            setProfilePicture(profile.imageUrl);
            setIsUser(profile.userId === userProfile.userId);
        }

        if (userId !== undefined && userId !== 0) {
            getUserAPI(userId, token)
                .then((res) => {
                    setUserProfile(res.data.profile);
                    setUserStores(res.data.stores);
                    setProfilePicture(res.data.profile.imageUrl);
                })
                .catch((err) => {
                    setUserProfile({ name: "User not found!!" });
                });
        }
    }, [userId, token, profile, stores, userProfile.userId]);

    return (
        <Layout>
            <Container className={props.className}>
                <div className="card my-3" style={{ maxWidth: '750px' }}>
                    <div className="d-flex">
                        <img src={profilePicture ? profilePicture : userprofile} alt="" className="rounded-circle m-4" style={{ width: '270px' }} />
                        <div className="py-3">
                            <h3>{userProfile.name}</h3>
                            <hr />
                            <h5>Email</h5>
                            <p>{userProfile.email}</p>
                            <h5>Address</h5>
                            <p>{userProfile.address}</p>
                            <h5>Phone</h5>
                            <p>{userProfile.phoneNumber}</p>
                        </div>
                        <Link to="/profile/edit">
                            <i className="fa-solid fa-pen-to-square text-end" />
                        </Link>
                    </div>
                </div>
                {isUser && (
                    <div className="d-flex my-3 justify-content-between">
                        <h3 className="fw-bold">Stores</h3>
                        <Link
                            to="/stores/add"
                            className="btn btn-primary fw-bold"
                        >Add Store <i className="fa-solid fa-plus"></i></Link>
                    </div>
                )}
                <hr />
                <div className="row">
                    {userStores.map((store) => (
                        <CardStore key={store.storeId} store={store} />
                    ))}
                </div>
                {userStores.length <= 0 && (
                    <p className="text-muted">No store available</p>
                )}
            </Container>
        </Layout>
    );
}

export default ProfilePage;
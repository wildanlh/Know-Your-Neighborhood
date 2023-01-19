import { useContext } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { editProfileAPI } from "../api/user-api";
import Input from "../components/form/Input";
import Layout from "../components/layout/Layout";
import AuthContext from "../context/auth-context";

const EditProfilePage = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const { userId, name, address, phoneNumber } = authCtx.profile;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        values: {
            userId,
            name,
            address,
            phoneNumber,
        },
    });

    const onSubmitHandler = (data) => {
        editProfileAPI(data, authCtx.token)
            .then((res) => {
                authCtx.refresh();
                navigate("/profile");
            })
            .catch((err) => {
                console.log(err.message);
                navigate("/profile");
            });
    };

    return (
        <Layout>
            <Container>
                <div className="container h-100">
                    <div className="d-flex justify-content-center">
                        <div className="form-auth card m-3 shadow">
                            <div className="card-body p-5" style={{ minWidth: '500px', width: '100%' }}>
                                <h3 className="fs-4 card-title fw-bold mb-4 text-center">Edit Profile</h3>
                                <form onSubmit={handleSubmit(onSubmitHandler)} >
                                    <Input
                                        label="Name*"
                                        name="name"
                                        type="text"
                                        errors={errors}
                                        placeholder="Enter your name"
                                        register={register}
                                        validation={{
                                            required: "Name is required",
                                            minLength: {
                                                value: 3,
                                                message: "Name must be atleast 3 characters long",
                                            },
                                        }}
                                    />

                                    <Input
                                        label="Address"
                                        name="address"
                                        type="text"
                                        errors={errors}
                                        placeholder="Enter your address"
                                        register={register}
                                    />

                                    <Input
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="text"
                                        errors={errors}
                                        placeholder="Enter your phone number"
                                        register={register}
                                    />
                                    <button type="submit" className="btn btn-primary w-100 btn-auth btn-lg mt-3 fw-bold">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export default EditProfilePage;
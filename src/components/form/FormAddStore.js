import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addStoreAPI } from "../../api/store-api";
import AuthContext from "../../context/auth-context";
import FailedMessage from "./auth/FailedMessage";
import Input from "./Input";

const FormAddStore = () => {
    const [status, setStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    const onSubmitHandler = (data) => {
        const store = {
            ...data,
            userId: authCtx.userId,
        };

        // ADD STORE
        addStoreAPI(store, authCtx.token)
            .then((res) => {
                setStatus("SUCCESS");
                authCtx.refresh();
                navigate(`/stores/${res.data.storeName}/${res.data.storeId}`);
                reset();
            })
            .catch((err) => {
                console.log(err);
                setStatus("FAILED");
                setErrorMessage(err.message);
            });
    };

    return (
        <div className="container h-100">
            <div className="d-flex justify-content-center">
                <div className="form-auth card m-3 shadow">
                    <div className="card-body p-5" style={{ minWidth: '500px', width: '100%' }}>
                        <h3 className="fs-4 card-title fw-bold mb-4 text-center">Add Store</h3>
                        <form onSubmit={handleSubmit(onSubmitHandler)} >
                            {status === "FAILED" && (
                                <FailedMessage onClose={() => setStatus("")}>
                                    {errorMessage}
                                </FailedMessage>
                            )}

                            <Input
                                label="Store Name*"
                                name="storeName"
                                type="text"
                                errors={errors}
                                placeholder="Enter store name"
                                register={register}
                                validation={{
                                    required: "Store name is required",
                                }}
                            />
                            <Input
                                label="Country*"
                                name="country"
                                type="text"
                                errors={errors}
                                placeholder="Enter country"
                                register={register}
                                validation={{
                                    required: "Country is required",
                                }}
                            />

                            <Input
                                label="City*"
                                name="city"
                                type="text"
                                errors={errors}
                                placeholder="Enter city"
                                register={register}
                                validation={{
                                    required: "City is required",
                                }}
                            />
                            <Input
                                label="Email*"
                                name="storeEmail"
                                type="text"
                                errors={errors}
                                placeholder="Enter store email"
                                register={register}
                                validation={{
                                    required: "Store email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter valid email",
                                    },
                                }}
                            />
                            <Input
                                label="Phone Number*"
                                name="phoneNumber"
                                type="text"
                                errors={errors}
                                placeholder="Enter phone number"
                                register={register}
                                validation={{
                                    required: "Phone number is required",
                                }}
                            />
                            <Input
                                label="Description"
                                name="description"
                                errors={errors}
                                type="text"
                                placeholder="Enter store description"
                                register={register}
                            />
                            <button type="submit" className="btn btn-primary w-100 btn-auth btn-lg mt-3 fw-bold">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormAddStore;
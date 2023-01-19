import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerAPI } from "../../api/user-api";
import FailedMessage from "./auth/FailedMessage";
import Input from "./Input";
import SuccessMessage from "./auth/SuccessMessage";

import "./FormAuth.css";

const FormRegister = () => {
    const [status, setStatus] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    const onSubmitHandler = (data) => {
        registerAPI({
            name: data.name,
            email: data.email,
            password: data.password,
            address: data.address,
            phoneNumber: data.phoneNumber,
        })
            .then((res) => {
                setSuccessMessage(res.data.message);
                setStatus("SUCCESS");
                reset();
            })
            .catch((err) => {
                setErrorMessage(err.response.data);
                setStatus("FAILED");
            });
    };

    return (
        <div className="container h-100">
            <div className="d-flex justify-content-center">
                <div className="form-auth card m-3 shadow">
                    <div className="card-body p-5" style={{ minWidth: '500px', width: '100%' }}>
                        <h3 className="fs-4 card-title fw-bold mb-4 text-center">Register</h3>
                        <form onSubmit={handleSubmit(onSubmitHandler)} >
                            {status === "SUCCESS" && (
                                <SuccessMessage onClose={() => setStatus("")}>
                                    {successMessage}
                                </SuccessMessage>
                            )}
                            {status === "FAILED" && (
                                <FailedMessage onClose={() => setStatus("")}>
                                    {errorMessage}
                                </FailedMessage>
                            )}

                            <Input
                                label="Email*"
                                name="email"
                                type="text"
                                errors={errors}
                                placeholder="Enter your email"
                                register={register}
                                validation={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter valid email",
                                    },
                                }}
                                emailTaken={status === "FAILED" ? true : false}
                            />

                            <Input
                                label="Password*"
                                name="password"
                                type="password"
                                errors={errors}
                                placeholder="Enter your password"
                                register={register}
                                validation={{
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be between 6-18 characters long",
                                    },
                                    maxLength: {
                                        value: 18,
                                        message: "Password can't be greater than 18 characters long",
                                    },
                                }}
                            />

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
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormRegister;
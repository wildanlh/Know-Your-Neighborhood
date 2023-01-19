import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FACEBOOK_URL } from "../../api/constant";
import { loginAPI } from "../../api/user-api";
import { loginwithfacebook } from "../../assets";
import AuthContext from "../../context/auth-context";
import FailedMessage from "./auth/FailedMessage";
import "./FormAuth.css";
import Input from "./Input";

const FormLogin = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ criteriaMode: "all" });

    const onSubmitHandler = (data) => {
        loginAPI(data.email, data.password)
            .then((res) => {
                authCtx.login(res.data.accessToken);
                setInvalid(false);
                reset();
                navigate("/profile");
            })
            .catch((err) => {
                setInvalid(true);
            });
    };

    return (
        <div className="container h-100">
            <div className="d-flex justify-content-center">
                <div className="form-auth card m-3 shadow">
                    <div className="card-body p-5">
                        <h3 className="fs-4 card-title fw-bold mb-4 text-center">Login</h3>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            {invalid && (
                                <FailedMessage
                                    onClose={() => {
                                        setInvalid(false);
                                    }}
                                >
                                    Invalid username or password.
                                </FailedMessage>
                            )}

                            <Input
                                label="Email"
                                name="email"
                                type="text"
                                errors={(errors.email = true)}
                                placeholder="Enter your email"
                                register={register}
                                validation={{
                                    required: "Please enter email address",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Please enter valid email",
                                    },
                                }}
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                errors={errors}
                                placeholder="Enter your password"
                                register={register}
                                validation={{
                                    required: "Please enter password",
                                }}
                            />
                            <button type="submit" className="btn btn-primary w-100 btn-auth btn-lg fw-bold">
                                Login
                            </button>
                        </form>
                        <div className="or-separator">
                            <span className="or-text">OR</span>
                        </div>
                        <div className="social-login">
                            <a href={FACEBOOK_URL}>
                                <img src={loginwithfacebook} alt="" />
                            </a>
                        </div>
                        <div className="text-center mt-3">
                            <span>Don't have an account?</span>
                            <Link
                                to="/register"
                                className="ms-2 text-underline"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default FormLogin;
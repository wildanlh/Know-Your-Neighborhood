import { React, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FormSearch = () => {
    const ref = useRef();
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const value = ref.current.value.trim();

        if (value === "") {
            return alert("Please enter valid value");
        }

        navigate(`/stores?search=${value}`);
        ref.current.value = "";
    };

    return (
        <form id="searchForm" className="d-flex" onSubmit={onSubmitHandler}>
            <input
                ref={ref}
                className="form-control"
                type="text"
                name="keyword"
                required
                placeholder="Search Store"
            />
            <button type="submit" className="btn btn-light">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </form>
    );
}

export default FormSearch;
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";

const FormLayout = (props) => {
    return (
        <div className="layout">
            <NavBar className="navbar" />
            <main className="container  mt-4 mb-4">{props.children}</main>
            <Footer className="footer" />
        </div>
    );
}

export default FormLayout;
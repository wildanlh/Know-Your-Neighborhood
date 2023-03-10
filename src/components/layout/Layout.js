import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";

import "./Layout.css";

const Layout = (props) => {
    return (
        <div className="layout">
            <NavBar className="navbar" />
            <div className="content">
                {props.children}
            </div>
            <Footer className="footer" />
        </div>
    );
}

export default Layout;
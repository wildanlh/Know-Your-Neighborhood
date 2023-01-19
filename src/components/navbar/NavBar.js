import Container from 'react-bootstrap/Container';
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from '../../context/auth-context';

import './NavBar.css';
import { userprofile } from '../../assets';

const NavBar = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const isLoggedIn = authCtx.isLoggedIn;

    const profilePicture = authCtx.profile.imageUrl;

    const logoutHandler = () => {
        authCtx.logout();
        navigate("/login");
    };

    return (
        <Navbar className={props.className} bg="primary" variant="dark" sticky='top'>
            <Container>
                <NavLink className="navbar-brand fw-bold" style={{ fontSize: '26px' }}>
                    KYN
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto me-md-auto">
                        <NavLink
                            activeclassname="active"
                            className="nav-link text-uppercase fw-bold text-light me-3"
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            activeclassname="active"
                            className="nav-link text-uppercase fw-bold text-light me-3"
                            to="/stores"
                        >
                            Stores
                        </NavLink>
                        <NavLink
                            activeclassname="active"
                            className="nav-link text-uppercase fw-bold text-light me-3"
                            to="/about"
                        >
                            About
                        </NavLink>
                        <NavLink
                            activeclassname="active"
                            className="nav-link text-uppercase fw-bold text-light"
                            to="/contact"
                        >
                            Contact
                        </NavLink>
                    </Nav>
                    {!isLoggedIn && (
                        <Nav>
                            <Link to="/login">
                                <Button
                                    variant="outline-light"
                                    className="me-0 me-md-3 mb-md-0 mb-3 text-light bg-primary fw-bold"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button
                                    variant="light"
                                    className="me-0 me-md-3 mb-md-0 mb-3 text-primary bg-light fw-bold">
                                    Register
                                </Button>
                            </Link>
                        </Nav>
                    )}

                    {isLoggedIn && (
                        <div className='d-flex'>
                            <img src={profilePicture ? profilePicture : userprofile}
                                alt="profile_picture" className='rounded-circle me-2' style={{ width: '26px' }} />
                            <NavDropdown title={authCtx.profile.name} activeclassname="active" className='fw-bold text-light'>

                                <NavDropdown.Item href="/profile"> My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/stores/add">
                                    Add Store
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    <Button
                                        variant="danger"
                                        className="nav-logout btn-sm"
                                        onClick={logoutHandler}
                                    >
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    )}
                </Navbar.Collapse >
            </Container >
        </Navbar >
    );
}

export default NavBar;
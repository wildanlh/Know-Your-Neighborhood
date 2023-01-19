import { Container, Row, Col } from "react-bootstrap";
import { email, location, telephone, waves1, whatsapp } from "../assets";
import Layout from "../components/layout/Layout";

const ContactPage = (props) => {
    return (
        <Layout className={props.className} >
            <div className="about">
                <img src={waves1} alt="" />
                <h2 className="fw-bold">Contact Us</h2>
            </div>
            <Container>
                <Row className="text-center">
                    <Col className="card me-3 p-3">
                        <ul>
                            <img src={location} alt="" style={{ width: '50px' }} />
                            <h5>Bandung, Indonesia</h5>
                        </ul>
                        <ul>
                            <img src={email} alt="" style={{ width: '50px' }} />
                            <h5>help@kyn.com</h5>
                        </ul>
                        <ul>
                            <img src={telephone} alt="" style={{ width: '50px' }} />
                            <h5>+123 456 789</h5>
                        </ul>
                        <ul>
                            <img src={whatsapp} alt="" style={{ width: '50px' }} />
                            <h5>+62 987 654 321</h5>
                        </ul>
                    </Col>
                    <Col className="card p-3">
                        <form className="p-4 p-md-5 border rounded-3 bg-light">
                            <h5>Need Help?</h5>
                            <div className="form-floating mb-3" bis_skin_checked="1">
                                <input type="text" className="form-control" id="floatingPassword" placeholder="Name" />
                                <label for="floatingInput">Name</label>
                            </div>
                            <div className="form-floating mb-3" bis_skin_checked="1">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3" bis_skin_checked="1">
                                <textarea type="text" className="form-control" id="floatingInput" placeholder="Question" />
                                <label for="floatingInput">Question</label>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">Send</button>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default ContactPage;
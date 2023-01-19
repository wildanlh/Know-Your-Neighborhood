import { kyn, waves1 } from "../assets";
import FormSearch from "../components/form/FormSearch";
import Layout from "../components/layout/Layout";
import './css/Home.css';

const HomePage = (props) => {
    return (
        <Layout className={props.className}>
            <div className="about">
                <img src={waves1} alt="background" />
                <h2 className="fw-bold">Welcome to <br /> Know Your Neighborhood</h2>
            </div>
            <div className="px-4 mb-5 text-center border-bottom" bis_skin_checked="1">
                <h1 className="display-4 fw-bold">What is Know Your Neighborhood?</h1>
                <div className="col-lg-6 mx-auto" bis_skin_checked="1">
                    <p className="lead mb-4">Know Your Neighborhood is an online retail platform that specializes in offering a curated selection of products that represent the unique character and charm of a specific community. The store features locally made crafts, specialty foods, apparel, and home decor that showcase the pride and spirit of the neighborhood. The store aims to help customers discover and celebrate the best of what their neighborhood has to offer while supporting local artisans and small businesses.</p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5" bis_skin_checked="1">
                        <button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">Get Started</button>
                        <FormSearch />
                    </div>
                </div>
                <div className="overflow-hidden" style={{ maxHeight: '30vh' }} bis_skin_checked="1">
                    <div className="container px-5" bis_skin_checked="1">
                        <img src={kyn} alt="images" className="img-fluid border rounded-3 shadow-lg mb-4" width="700" height="500" loading="lazy" />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default HomePage;
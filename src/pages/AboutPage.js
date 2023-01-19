import { store, waves1 } from "../assets";
import Layout from "../components/layout/Layout";
import './css/About.css';

const AboutPage = () => {
    return (
        <Layout>
            <div className="about">
                <img src={waves1} alt="" />
                <h2 className="fw-bold">About Us</h2>
            </div>
            <div className=" content container col-xxl-8 px-4 mb-5" bis_skin_checked="1">
                <div className="row flex-lg-row-reverse align-items-center g-5" bis_skin_checked="1">
                    <div className="col-10 col-sm-8 col-lg-6" bis_skin_checked="1">
                        <img src={store} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="500" loading="lazy" />
                    </div>
                    <div className="col-lg-6" bis_skin_checked="1">
                        <h1 className="display-5 fw-bold lh-1 mb-3">Know Your Neighborhood</h1>
                        <p className="lead">Welcome to Know Your Neighborhood, where we offer you a curated selection of products that represent the unique character and charm of your community. From locally made crafts and specialty foods, to apparel and home decor that showcase the pride and spirit of your neighborhood, we are committed to providing you with authentic and high-quality items. Our goal is to help you discover and celebrate the best of what your neighborhood has to offer, while supporting local artisans and small businesses. Thank you for choosing Know Your Neighborhood.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AboutPage;
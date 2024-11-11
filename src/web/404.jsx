import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async";
import './css/style.css';
import Logo from './img/logo.svg';

const Error = () => {
    return (
        <>
            <Helmet>
              <title>error page</title>
              <meta property="og:title" content="error page" />
            </Helmet>
            <div className="error-page">
              <div className="logo-no-animation">
                <img src={Logo} alt="294 Logo" />
              </div>

              <h2 className="error-heading">404 Not Found</h2>
              <p className="error-subheading">
                error message <br />
              </p>
              <span className="error-paragraph">here is a small button</span>
              <Link to="/" className="error-button">
                <span>
                  <i className="fas fa-home-lg"></i>go home
                </span>
              </Link>
            </div>
        </>
    );
}
export default Error;
import React from 'react';
import Layout from "../components/Layout";

function Error({ statusCode }) {
    let titleError = "";
    if (statusCode === 404) {
        titleError = "404"
    }

    return (
        <Layout title={titleError}>
            <div className="error-page">
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}


                <style jsx>{`
                    .error-page {
                        max-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-top: 50px;
                    }
                    
                    .error-img {
                        display: block;
                        width: 100%;
                        max-width: 700px;
                        max-height: 100%;
                    }
                `}</style>
            </div>
        </Layout>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error

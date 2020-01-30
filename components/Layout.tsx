import React, {useEffect, Fragment} from 'react'
import Head from 'next/head';
import { connect } from 'react-redux';
import {getCookie} from "../utils/cookie";
import "../styles/components/layout.scss";
import "../styles/reset.scss";
// action
import {login_success, } from "../redux/actions/auth";

const Layout = props => {
    const {title} = props;

    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            props.dispatch(login_success({token}));
        }
    }, []);

    return (
        <Fragment>
            <Head>
                <title>{title}</title>
                <link rel="stylesheet" href="styles/fonts.css" />
                <link rel="icon" href="favicon.ico" />
            </Head>

            <div className="container">
                {props.children}
            </div>
        </Fragment>
    )
};

Layout.defaultProps = {
    title: "Task-book"
}

export default connect()(Layout);

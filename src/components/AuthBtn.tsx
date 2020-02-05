import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import "../styles/components/auth_btn.scss";

interface Props {
    token?: string
}

const AuthBtn: React.FC<Props>  = props => {
    const {token} = props;

    return (
        <Link href="/authorization">
            <a className="authorization">{token ? "Выйти" : "Авторизация"}</a>
        </Link>
    )
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps)(AuthBtn);

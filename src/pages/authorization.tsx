import React, {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Layout from "../components/Layout";
// action
import {login_request, logout_request} from "../redux/actions/auth";

interface Props {
    dispatch: Function,
    token?: string,
    error?: {
        username: string,
        password: string | number
    }
}

const Authorization: React.FC<Props> = props => {
    const {token, error} = props;

    const username = useRef(null);
    const password = useRef(null);

    useEffect(() => {
        if (token) {
            if (username.current && password.current) {
                username.current.value = "";
                password.current.value = "";
            }
        }
    }, [token]);

    const auth = (e) => {
        e.preventDefault();
        props.dispatch(login_request({
            username: username.current.value, password: password.current.value
        }));
    }

    const profileOut = () => {
        props.dispatch(logout_request());
    };

    return (
        <Layout title={"Авторизация"}>
            <>
                <div className="auth">
                    <form className="auth__form" onSubmit={auth}>
                        {!token && <div className="auth__fields">
                            <p>Авторизация</p>
                            {error && <p className="error-field-text">{error.username}</p>}
                            <input type="text" name="username" className="auth__field" ref={username} />
                            {error && <p className="error-field-text">{error.password}</p>}
                            <input type="password" name="password" className="auth__field" ref={password} />
                        </div>}
                        <div className="auth__block">
                            {token ? <div className="enter" onClick={profileOut}>Выйти из профиля</div>
                            : <button className="enter">Авторизоваться</button>}
                        </div>
                        <Link href="/"><a className="go_back">На главную</a></Link>
                    </form>
                </div>

                <style jsx>{`
                    .auth {
                      background: #fff;
                      width: 350px;
                      margin: 0 auto;
                      padding: 15px;
                      box-shadow: 0 1px 2px rgba(0,0,0,.25);
                      border-radius: $radius;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translateY(-50%) translateX(-50%);
                      color: #1190cb;
                      text-align: center;
                    }
                    
                    .auth__form {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    }
                    
                    .auth__fields {
                        width: 100%;
                    }
                    
                    .auth__field {
                      width: 100%;
                      border: 1px solid rgba(0,0,0,.11);
                      margin: 5px 0;
                      padding: 10px;
                    }
                    
                    .auth__block {
                      width: 100%;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      margin: 10px 0;
                    }
                    
                    .enter, .go_back {
                      width: 100%;
                      display: inline-block;
                      background: #fff;
                      color: #1190cb;
                      padding: 15px 20px;
                      box-shadow: 0 1px 2px rgba(0,0,0,.25);
                      border-radius: 4px;
                      transition: 0.3s all;
                      font-size: 12px;
                      cursor: pointer;
                    }
                    
                    .enter:hover, .go_back:hover {
                        box-shadow: 0 5px 6px rgba(0,0,0,.15), 0 3px 16px rgba(0,0,0,.07), 0 9px 12px rgba(0,0,0,.09);
                    }
                    
                    .error-field-text {
                      color: red;
                      font-size: 12px;
                    }
                `}</style>
            </>
        </Layout>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        error: state.auth.error
    };
};

export default connect(mapStateToProps)(Authorization);

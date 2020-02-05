import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';
import "../styles/components/list_item.scss";
import {getCookie} from "../utils/cookie";
// action
import {edit_task_request} from "../redux/actions/tasks";

interface ModalProps {
    text: string,
    id: number,
    token: string,
    openModal: Function,
    dispatch: Function,
    error?: object | string,
    sort_field: string | null,
    sort_direction: string | null,
    page: number
}

interface Props {
    username: string,
    email: string,
    text: string,
    status: number,
    id: number,
    token?: string,
    dispatch?: Function,
    error?: object | string,
    sort_field: string | null,
    sort_direction: string | null,
    page: number
}

// Modal window
const Modal: React.FC<ModalProps> = props => {
    const [viewError, setViewError] = useState(false);
    const [isTokenInBrow, setIsTokenInBrow] = useState(false);
    const textarea = useRef(null);
    const {id, text, token, openModal, dispatch, error, sort_field, sort_direction, page} = props;

    const changeText = async() => {
        const tokenValue = await getCookie("token");
        if (tokenValue) {
            localStorage.setItem(`id${id}`, id.toString());
            setViewError(true);
            dispatch(edit_task_request([{id, text: textarea.current.value, token}, {sort_field, sort_direction, page}]));
        } else {
            setViewError(true);
            setIsTokenInBrow(true);
        }
    };

    const closeModal = () => {
        openModal();
        setViewError(false);
    };

    return (
        <div className="modal">
            <div className="modal__block">
                {error && viewError && <p className="error">{error}</p>}
                {isTokenInBrow && viewError && <p className="error">Пожалуйста авторизуйтесь</p>}
                <textarea className="modal__text" defaultValue={text} ref={textarea}></textarea>
                <button className="modal__btn" onClick={changeText}>Применить изменения</button>
                <div className="modal__close" onClick={closeModal}></div>
            </div>
        </div>
    );
};
// ============================================================================

const ListItem: React.FC<Props> = props => {
    const [viewModal, setViewModal] = useState(false);
    const [isAdminChange, setIsAdminChange] = useState(false);
    const {id, username, email, text, status, token, dispatch, error, sort_field, sort_direction, page} = props;

    useEffect(() => {
        setIsAdminChange(localStorage[`id${id}`] === id.toString());
    });

    const changeStatus = async() => {
        const tokenValue = await getCookie("token");
        if (tokenValue) {
            if (status === 10) {
                dispatch(edit_task_request([{id, status: 0, token}, {sort_field, sort_direction, page}]));
            } else {
                dispatch(edit_task_request([{id, status: 10, token}, {sort_field, sort_direction, page}]));
            }
        }
    };

    const openModal = () => {
        setViewModal(state => !state);
    };

    return (
        <div className="item">
            <div className="item__block">
                <div className="user">
                    <p className="user__name">{username}</p>
                    <p className="user__email">{email}</p>
                </div>
                <div className="item__status">
                    <button
                        onClick={token ? changeStatus : null}
                        title={status === 10 ? "Отметить как не выполненное" : "Отметить как выполненное"}
                        className={status === 10 ? "status" : "status cancel"}
                    ></button>
                </div>
            </div>
            <div className="item__text">
                {   isAdminChange &&
                    <p className="error">Редактировано администратором</p>
                }
                <p>{text}</p>
                {token && <span className="item__text-edit" onClick={openModal}></span>}
            </div>

            {
                viewModal &&
                <Modal
                    text={text}
                    openModal={openModal}
                    id={id} token={token}
                    dispatch={dispatch}
                    error={error}
                    sort_field={sort_field}
                    sort_direction={sort_direction}
                    page={page}
                />
            }
            <style jsx global>{`
                .status {
                    width: 30px;
                    height: 30px;
                    background-image: url("images/done.svg");
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: contain;
                    transition: 0.3s all;
                }
                
                .status:hover {
                    transform: scale(1.2);
                }
                
                .cancel {
                    background-image: url("images/cancel.svg");
                }
                
                .item__text-edit {
                    display: none;
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                    background: url("images/edit.svg") no-repeat center;
                    background-size: contain;
                    cursor: pointer;
                    transition: 0.3s all;
                }
                
                .item__text-edit:hover {
                    transform: translateY(-50%) scale(1.2);
                }
                
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(177, 177, 177, 0.5);
                    z-index: 100;
                }
                
                .modal__block {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateY(-50%) translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #fff;
                    width: 400px;
                    padding: 15px;
                    box-shadow: 0 1px 2px rgba(0,0,0,.25);
                    border-radius: 4px;
                }
                
                .modal__text {
                    min-height: 100px;
                    width: 100%;
                    border: 1px solid rgba(0,0,0,.11);
                    margin: 5px 0;
                    padding: 10px;
                    resize: vertical;
                }
                
                .modal__btn {
                    min-width: 130px;
                    display: inline-block;
                    background: #fff;
                    color: $mainColor;
                    padding: 15px 20px;
                    box-shadow: 0 1px 2px rgba(0,0,0,.25);
                    border-radius: 4px;
                    transition: 0.3s all;
                    font-size: 12px; 
                    color: #1190cb;
                }
                
                .modal__btn:hover {
                    box-shadow: 0 5px 6px rgba(0,0,0,.15), 0 3px 16px rgba(0,0,0,.07), 0 9px 12px rgba(0,0,0,.09);
                }
                
                .modal__close {
                  position: absolute;
                  top: -17px;
                  right: -17px;
                  width: 35px;
                  height: 35px;
                  cursor: pointer;
                  border-radius: 50%;
                  background: #e62f57;
                  box-shadow: 0 5px 6px rgba(0,0,0,.15), 0 3px 16px rgba(0,0,0,.07), 0 9px 12px rgba(0,0,0,.09);
                }
                
                .modal__close:before,
                .modal__close:after {
                  content: "";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translateY(-50%) translateX(-50%);
                  width: 18px;
                  height: 4px;
                  background: #fff;
                }
                
                .modal__close:before {
                  transform: translateY(-50%) translateX(-50%) rotate(45deg);
                }
                
                .modal__close:after {
                  transform: translateY(-50%) translateX(-50%) rotate(-45deg);
                }
                
                .error {
                    color: red;
                    font-size: 12px;
                }
            `}</style>
        </div>
    )
};

const mapStateToProps = state => {
    let errorMessage;
    if (!state.auth.token) {
        errorMessage = "Пожалуйста авторизуйтесь"
    } else {
        errorMessage = state.tasks.error
    }
    return {
        token: state.auth.token,
        error: errorMessage,
        sort_field: state.filter.sort_field,
        sort_direction: state.filter.sort_direction,
        page: state.filter.page
    };
};

export default connect(mapStateToProps)(ListItem);

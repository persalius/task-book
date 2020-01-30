import React, {useState} from 'react';
import { connect } from 'react-redux';
import "../styles/components/list_item.scss";
// action
import {edit_task_request} from "../redux/actions/tasks";

interface ModalProps {
    text: string,
    id: number,
    token: string,
    openModal: Function,
    dispatch: Function,
    error?: object | string
}

interface Props {
    username: string,
    email: string,
    text: string,
    status: number,
    id: number,
    token?: string,
    dispatch?: Function,
    error?: object | string
}

// Modal window
const Modal: React.FC<ModalProps> = props => {
    const [viewError, setViewError] = useState(false);
    const {id, text, token, openModal, dispatch, error} = props;

    const changeText = () => {
        setViewError(true);
        dispatch(edit_task_request({id, text, token}));
    };

    const closeModal = () => {
        openModal();
        setViewError(false);
    };

    return (
        <div className="modal">
            <div className="modal__block">
                {error && viewError && <p className="error">{error}</p>}
                <textarea className="modal__text" defaultValue={text}></textarea>
                <button className="modal__btn" onClick={changeText}>Применить изменения</button>
                <div className="modal__close" onClick={closeModal}></div>
            </div>
        </div>
    );
};
// ============================================================================

const ListItem: React.FC<Props> = props => {
    const [viewModal, setViewModal] = useState(false);
    const {id, username, email, text, status, token, dispatch, error} = props;

    const changeStatus = () => {
        if (status === 10) {
            dispatch(edit_task_request({id, status: 0, token}));
        } else {
            dispatch(edit_task_request({id, status: 10, token}));
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
            <p className="item__text">
                {text}
                <span className="item__text-edit" onClick={openModal}></span>
            </p>

            {viewModal && <Modal text={text} openModal={openModal} id={id} token={token} dispatch={dispatch} error={error} />}
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
    return {
        token: state.auth.token,
        error: state.tasks.error
    };
};

export default connect(mapStateToProps)(ListItem);

import React, {useState} from 'react';
import { connect } from 'react-redux';
import "../styles/components/create-task.scss";
import xssCheck from "../utils/xss-check";
// Action
import {add_task_request} from "../redux/actions/tasks";

interface Props {
    openModal: Function,
    dispatch?: Function,
    error?: {
        username: string,
        email: string,
        text: string
    },
    isCreateTask: boolean,
    sort_field?: string,
    sort_direction?: string,
    page: number
}

const SystemMessage: React.FC<Props> = props => {
    const [isDoneTask, setIsDoneTask] = useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        text: ""
    });

    const {openModal, error, isCreateTask, sort_field, sort_direction, page} = props;

    const createTask = async (e) => {
        e.preventDefault();
        setIsDoneTask(true);
        await props.dispatch(add_task_request([data, {sort_field, sort_direction, page}]));
    };

    const changeData = (e) => {
        const {name, value} = e.target;
        if (name === "text") {
            let text = xssCheck(value);
            setData(state => ({...state, [name]: text}));
            return;
        }
        setData(state => ({...state, [name]: value}));
    };

    return (
        <div className="task-block">
            <form className="new-task" onSubmit={createTask}>
                {error && <p className="error-field-text">{error.username}</p>}
                <input type="text" placeholder="Имя" name="username" value={data.username} onChange={changeData} />
                {error && <p className="error-field-text">{error.email}</p>}
                <input type="email" placeholder="Email" name="email"value={data.email} onChange={changeData} />
                {error && <p className="error-field-text">{error.text}</p>}
                <textarea placeholder="Текст" name="text" value={data.text} onChange={changeData}></textarea>
                <button className="enter" onClick={createTask}>Создать новую задачу</button>
                {isCreateTask && isDoneTask && <p className="create-task-state">Новая задача создана</p>}
                <div className="task-block__close" onClick={() => {openModal(); setIsDoneTask(false)}}></div>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        error: state.tasks.error,
        isCreateTask: state.tasks.isCreateTask,
        sort_field: state.filter.sort_field,
        sort_direction: state.filter.sort_direction,
        page: state.filter.page,
    };
};

export default connect(mapStateToProps)(SystemMessage);

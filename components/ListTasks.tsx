import React, {useState} from 'react';
import { connect } from 'react-redux';
import ListItem from "./ListItem";
import Pagination from "./Paginations";
import Sort from "./Sort";
import "../styles/components/list_tasks.scss";
// action
import {tasks_request} from "../redux/actions/tasks";
import {edit_filter} from "../redux/actions/filter";

interface Props {
    items: any[],
    error?: {
        message: object | string
    },
    totalTasks: number,
    dispatch?: Function,
    openModal?: Function
}

// =====================================================
const Items:React.FC<Props> = ({items}) => {
    return (
        <>
            {
                items.map(item => (
                    <ListItem key={item.id} {...item} />
                ))
            }
        </>
    );
}
// =====================================================

const ListTasks: React.FC<Props> = props => {
    const [filter, setFilter] = useState({
        sort_field: "id",
        sort_direction: "asc",
        page: 1
    });
    const {items, totalTasks, openModal} = props;

    const changePage = async(page) => {
        await setFilter(state => ({...state, page}));
        await props.dispatch(tasks_request({...filter, page}));
        await props.dispatch(edit_filter({...filter, page}));
    };

    const changeSort = async(sort_field, sort_direction) => {
        await setFilter(state => ({...state, sort_field, sort_direction}));
        await props.dispatch(tasks_request({...filter, sort_field, sort_direction}));
        await props.dispatch(edit_filter({...filter, sort_field, sort_direction}));
    };

    return (
        <div className="list">
            <Sort changeSort={changeSort} openModal={openModal} />
            {items ? <Items items={items} totalTasks={totalTasks} /> : <p>Loading ...</p>}
            <Pagination totalTasks={totalTasks} changePage={changePage} page={filter.page} />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        items: state.tasks.items,
        totalTasks: state.tasks.totalTasks
    }
};

export default connect(mapStateToProps)(ListTasks);

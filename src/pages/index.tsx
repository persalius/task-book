import React, {useState, useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import Layout from "../components/Layout";
import ListTasks from "../components/ListTasks";
import Header from "../components/Header";
import CreateTask from "../components/CreateTask";
// action
import {tasks_request} from "../redux/actions/tasks";

const Home: React.FC = () => {
    const [newTaskWindow, setNewTaskWindow] = useState(false);

    const openModal = () => setNewTaskWindow(state => !state);

    return (
        <Layout>
            <Fragment>
                <Header />
                <ListTasks openModal={openModal} />
                {newTaskWindow ? <CreateTask openModal={openModal} /> : null}
            </Fragment>
        </Layout>
    );
}


//@ts-ignore
Home.getInitialProps = async props => {
    const {store, isServer} = props.ctx;
    store.dispatch(tasks_request(null, isServer));
}

export default connect()(Home);

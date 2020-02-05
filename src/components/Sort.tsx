import React, {useState, useRef} from 'react';
import AddBtn from "./AddBtn";
import "../styles/components/sort.scss";

interface Props {
    changeSort: Function,
    openModal: Function
}

const Sort: React.FC<Props> = props => {
    const {changeSort, openModal} = props;

    const abcd = useRef(null);
    const name = useRef(null);

    const changeFilter = async () => {
        changeSort(name.current.value, abcd.current.value)
    };

    return (
        <div className="sort">
            <div className="sort__block">
                <select name="field" className="select" ref={name} onChange={changeFilter}>
                    <option value="id">ID</option>
                    <option value="username">Имя пользователя</option>
                    <option value="email">Email</option>
                    <option value="status">Статус</option>
                </select>
                <select name="field-more" className="select" ref={abcd} onChange={changeFilter}>
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                </select>
            </div>
            <AddBtn openModal={openModal} />
        </div>
    )
};

export default Sort;

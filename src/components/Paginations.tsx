import React, {useState} from 'react';
import "../styles/components/pagination.scss";

interface Props {
    totalTasks: number,
    changePage: Function,
    page: number
}

const Pagination: React.FC<Props> = props => {
    const [currentPage, setCurrentPage] = useState(1);
    const {totalTasks, changePage, page} = props;
    const pageLength = Math.ceil(totalTasks / 3);

    const btnLength = () => {
        const items = [];
        for (let i = 0; i < pageLength; i++) {
            items.push(i);
        }
        return items;
    };

    const selectPage = async(num: number) => {
        await changePage(num);
        await setCurrentPage(num);
    }

    return (
        <div className="pagination">
            <button className="pagination__btn" onClick={() => selectPage(1)}>|&lt;</button>
            <button className="pagination__btn" onClick={() => selectPage(page-1)}>&lt;</button>

            {btnLength().map((item, i) => {
                const classes = currentPage === i+1 ? "pagination__btn pagination__btn-active" : "pagination__btn";
                return <button onClick={() => selectPage(i + 1)} className={classes} key={i}>{i + 1}</button>
            })}

            <button className="pagination__btn" onClick={() => selectPage(page+1)}>&gt;</button>
            <button className="pagination__btn" onClick={() => selectPage(pageLength)}>&gt;|</button>
        </div>
    )
};

export default Pagination;

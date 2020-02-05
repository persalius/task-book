import React from 'react';

const AddBtn = props => {
    const {openModal} = props;

    return (
        <button className="add" onClick={openModal}>

            <style jsx>{`
                .add {
                    width: 30px;
                    height: 30px;
                    background: url("images/add.svg") no-repeat center;
                    background-size: contain;
                    transition: 0.3s all;
                }
                
                .add:hover {
                    transform: scale(1.2);
                }
            `}</style>
        </button>
    )
};

export default AddBtn;

import React from 'react';
import AuthBtn from "./AuthBtn";

const Header: React.FC = props => {
    return (
        <div className="header">
            <AuthBtn />

            <style jsx>{`
                .header {
                    display: flex;
                    justify-content: flex-end;
                    padding: 10px 0;
                }
            `}</style>
        </div>
    )
};

export default Header;

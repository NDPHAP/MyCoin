import React from 'react';

function Block(props) {
    const {data, hash, prevHash, name} = props;
    return (
        <div className="card block-content shadow-sm mb-2">
            <div className="card-body">
                <div className="blockdata">
                    <span className="blockdata-name">DATA</span>
                    <span className="blockdata-content"><b>{data}</b></span>
                </div>
                <div className="block mt-1">
                    <span>HASH</span>
                    <span className="hash hashborder">
                        {hash}
                    </span>
                </div>
                <div className="block">
                    <span>PREVIOUS HASH</span>
                    <span className="hash">{prevHash}</span>
                </div>
                <p className="blockname">{name}</p>
            </div>
        </div>
    );
}

export default Block;
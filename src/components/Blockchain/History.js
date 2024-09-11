import React from 'react';

function History(props) {
    const {from, to, coin, miner} = props;
    return (
        <div className="card-body" style={{marginLeft: '20px', marginRight: '20px'}}>
            <div className="row card-history shadow-sm">
                <div className="col-5" style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <p>From <span className="txthistory">{from}</span></p>
                    <p>To <span className="txthistory">{to}</span></p>
                </div>
                <div className="col-3 card-small-history ">
                    <p>Coin: <span className="historycoin">{coin}</span></p>
                </div>
                <div className="col-4 card-small-history">
                    <p>Miner: <span className={miner==="Not available"?"txtMinerUn":"txtMiner"}>{miner}</span></p>
                </div>
            </div>
        </div>
    );
}

export default History;
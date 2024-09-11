import React, { useState } from 'react';
import './App.css';
import Wallet from "./components/Wallet/Wallet";
import BlockChain from "./components/Blockchain/Blockchain";
const SHA256 = require("crypto-js/sha256");

const difficulty = 2; // should be max at 4 to be fast
const miningReward = 1;
const hash = (index, prevHash, difficulty) =>{
  let nonce = 0;
  while (true){
    const time = Date.now();
    const hash = index + time + prevHash + nonce;
    const codeHash = SHA256(hash).toString();
    if (codeHash.substring(0, difficulty) === Array(difficulty + 1).join("0")) { // Trick to test whether hash start with enough "0" length or not
      return codeHash;
    }
    nonce++;
  }
}

const findMiner = (from, to, max) =>{
  if (max <= 2 ){ // if wallets <= 2
    return -1;
  }
  while(true){ // if wallets >= 3, random the miner, miner can be any one except reciever and sender
    const randomIndex = Math.floor(Math.random() * max);
    if (randomIndex !== from && randomIndex !== to){
      return randomIndex;
    }
  }
}

function App() {

  // Block state
  const [block, setBlock] = useState([
    { id: 0, data: 'System create first block', prevHash: '0', hash: '0019123a23dd04e37bd41cb421c76ef6760488888c0034a16f329a7bf29468df', name: 'BLOCK #0' }
  ]);

  // Wallets state
  const [wallets, setWallets] = useState([
    { id: 0, name: 'NDPHAP', coin: 100, transfer: 0, recieved: 100}
  ])
  
  // Index has active wallet state
  const [indexWalletActive, setIndexWalletActive] = useState(0); // default: 0 (first wallet in wallets)

  // History state
  const [history, setHistory] = useState([]); // from - to - coin - miner props

  // Function create wallet
  function formCreateWallet(value){
    const numberWalet = wallets.length;
    const nameValue = value.name; // name from form create wallet submitted
    const newWallet = {
      id: numberWalet,
      name: nameValue,
      coin: 0,
      transfer: 0,
      recieved: 0
    }
    let newListWallet = [...wallets];
    newListWallet.push(newWallet);
    setWallets(newListWallet);
    setIndexWalletActive(numberWalet); // Optional, can be omitted
    // setLogForWalletHistory(history, wallets[indexWalletActive].name);
  }

  //Function change wallet
  function getIdWallet(value){
    setIndexWalletActive(value.newId);
  }

  function removeDiv(clName){
    document.getElementsByClassName(clName)[0].classList.remove('xuathien');
  }

  function clearDataForm(id){
    document.getElementById(id).reset();
  }

  function sendCoinWallet(value){
    let newWallet = [...wallets];
    let mycoin = newWallet[indexWalletActive].coin;
    if (value.id === indexWalletActive || value.coin > mycoin || value.coin <= 0 || isNaN(value.coin) ){
      document.getElementsByClassName('txtinvalid')[0].classList.add('xuathientxtinvalid');
      clearDataForm('formsendcoin');
    }
    else{
      // add block to blockchain
      const newId = block.length;
      const iPrevHash = block[newId  - 1].hash;
      let newListBlock = [...block];
      const newData = `'${newWallet[indexWalletActive].name}' sent to '${newWallet[value.id].name}' ${value.coin} Coin`;
      let newBlock = {
        id: newId,
        data: newData,
        prevHash: iPrevHash,
        hash: hash(newId, iPrevHash, difficulty),
        name: "BLOCK #" + newId,
      }
      newListBlock.push(newBlock);
      setBlock(newListBlock);

      // change coin in wallet
      newWallet[indexWalletActive].coin = mycoin - value.coin;
      newWallet[indexWalletActive].transfer += value.coin;
      newWallet[value.id].coin = newWallet[value.id].coin + value.coin;
      newWallet[value.id].recieved += value.coin;

      // find miner
      const idMiner = findMiner(indexWalletActive, value.id, newWallet.length); // from, to bi hoi nguoc (da sua)
      let nameMiner = "Not available";
      if (idMiner !== -1 ){
        nameMiner = newWallet[idMiner].name;
        // Reward
        newWallet[idMiner].coin += miningReward;
        newWallet[idMiner].recieved += miningReward;
      }
      const newHistory = {
        id: Date.now(),
        to: newWallet[value.id].name,
        from: newWallet[indexWalletActive].name,
        coin: value.coin,
        miner: nameMiner
      }
      // add history in list history
      let newListHistory = [...history];
      newListHistory.push(newHistory);
      setHistory(newListHistory); 
      setWallets(newWallet);
      clearDataForm('formsendcoin');
      removeDiv('card-send-coin');    
    }
  }

  return (
    <div className="App"  style={{ backgroundColor: 'white', height: '100vh', margin: '0' }}>
      <div>
        <h1 className="titleName mt-3 mb-4"><b>MY COIN</b></h1>
        <div className="container">
          { }

          <div className="row">
            <BlockChain 
              blocks={block}
              history={history} 
            />
            <Wallet 
              myWallet={wallets[indexWalletActive]} 
              wallets={wallets}
              iWalletActive={indexWalletActive}
              formCreate={formCreateWallet}
              getIdChangeWallet={getIdWallet}
              sendCoin={sendCoinWallet}
            />
          </div>
        </div>
      </div>
    </div>
);
}

export default App;
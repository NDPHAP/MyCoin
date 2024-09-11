document.addEventListener("DOMContentLoaded", function(){
    
    const sendcoin = document.getElementsByClassName('btnsendcoid')[0];
    let sendcoinform = document.getElementsByClassName('card-send-coin')[0];
    const exitsendcoin = document.getElementsByClassName('exitsendcoin')[0];

    const btnview = document.getElementsByClassName('btnview')[0];
    let cardview = document.getElementsByClassName('card-view')[0];
    const iconexit = document.getElementsByClassName('iconexit')[0];

    // const btnviewhistory = document.getElementsByClassName('btnviewhistory')[0];
    let cardviewhistory = document.getElementsByClassName('card-view-history')[0];
    // const iconexithistory = document.getElementsByClassName('iconexithistory')[0];

    const btncreatewallet = document.getElementsByClassName('btncreatewallet')[0];
    const btnchangewallet = document.getElementsByClassName('btnchangewallet')[0];
    const btnformcreatewallet = document.getElementsByClassName('btnformcreatewallet')[0];

    let cardcreatewallet = document.getElementsByClassName('cardcreatewallet')[0];
    let cardchangewallet = document.getElementsByClassName('cardchangewallet')[0];

    let formcreatewallet = document.getElementsByClassName('formcreatewallet')[0];
    formcreatewallet.onclick = () =>{
        formcreatewallet.reset();
    }

     // button click send coin
    sendcoin.onclick = () =>{
    	sendcoinform.classList.toggle('xuathien');
        cardview.classList.remove('xuathien');
        cardviewhistory.classList.remove('xuathien');
        cardchangewallet.classList.remove('xuathien');
        cardcreatewallet.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
        document.getElementsByClassName('txtinvalid')[0].classList.remove('xuathientxtinvalid');
    }
    exitsendcoin.onclick = () =>{
        sendcoinform.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
    }

    // button click view statistics
    btnview.onclick = () =>{
    	cardview.classList.toggle('xuathien');
        sendcoinform.classList.remove('xuathien');
        cardviewhistory.classList.remove('xuathien');
        cardchangewallet.classList.remove('xuathien');
        cardcreatewallet.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
    }
    iconexit.onclick = () =>{
    	cardview.classList.remove('xuathien');
    }

    // // button click view history
    // btnviewhistory.onclick = () =>{
    // 	cardviewhistory.classList.toggle('xuathien');
    //     cardview.classList.remove('xuathien');
    //     sendcoinform.classList.remove('xuathien');
    //     cardchangewallet.classList.remove('xuathien');
    //     cardcreatewallet.classList.remove('xuathien');
    //     formcreatewallet.reset();
    //     document.getElementById('formsendcoin').reset();
    // }
    // iconexithistory.onclick = () =>{
    // 	cardviewhistory.classList.remove('xuathien');
    // }

    
    
    btncreatewallet.onclick = () =>{
    	cardcreatewallet.classList.toggle('xuathien');
        cardchangewallet.classList.remove('xuathien');
        cardviewhistory.classList.remove('xuathien');
        cardview.classList.remove('xuathien');
        sendcoinform.classList.remove('xuathien');
        document.getElementById('formsendcoin').reset();
    }

    btnchangewallet.onclick = () =>{
    	cardchangewallet.classList.toggle('xuathien');
        cardcreatewallet.classList.remove('xuathien');
        cardviewhistory.classList.remove('xuathien');
        cardview.classList.remove('xuathien');
        sendcoinform.classList.remove('xuathien');
        formcreatewallet.reset();
        document.getElementById('formsendcoin').reset();
    }

    btnformcreatewallet.onclick = () =>{
        cardcreatewallet.classList.remove('xuathien');
    }
})
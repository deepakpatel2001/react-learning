import Freind from './Freind';
import LastStage from './LastStage';
import Money from './Money';
import MyRate from './MyRate';
import { useState, useEffect } from 'react';

function Home() {
    const [money, setMoney] = useState('');
    const [myTip, setMyTip] = useState(0);
    const [freindTip, setFreindTip] = useState(0);
    
    function handleMoney(e) {
        setMoney(Number(e.target.value));
    }

    function handleMyRate(e) {
        setMyTip(Number (e.target.value));
    }

    function handleFreind(e) {
        setFreindTip(Number (e.target.value));
    }

    function handleReset(){
        setMoney('')
        setMyTip(0)
        setFreindTip(0)
    }

    let tip = (money * (myTip + freindTip)/2)/100

    return (
        <>
            <Money money={money} onHandleMoney={handleMoney} />

            <MyRate myTip={myTip} onHandleMyRate={handleMyRate} />

            <Freind freindTip={freindTip} onHandleFreind={handleFreind} />

            { money > 0 && <LastStage money={money} avgTip={tip} onHandleReset={handleReset} />}
            
        </>
    );
}

export default Home;

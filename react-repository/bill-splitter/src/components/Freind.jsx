function Freind({ freindTip, onHandleFreind }) {
    return (
        <div>
            <span>How did your Freind like the service.</span>
            <select onChange={(e) => onHandleFreind(e)} value={freindTip}>
                <option value="0">Dissatisfied 0%</option>
                <option value="5">It was okay 5%</option>
                <option value="10">It was good 10%</option>
                <option value="20">It was amazing 20%</option>
            </select>
        </div>
    );
}

export default Freind;

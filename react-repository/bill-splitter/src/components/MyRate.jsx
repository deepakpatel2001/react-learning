function MyRate({ myTip, onHandleMyRate }) {
    return (
        <div>
            <span>How did you like the service.</span>
            <select onChange={(e) => onHandleMyRate(e)} value={myTip}>
                <option value="0">Dissatisfied 0%</option>
                <option value="5">It was okay 5%</option>
                <option value="10">It was good 10%</option>
                <option value="20">It was amazing 20%</option>
            </select>
        </div>
    );
}

export default MyRate;

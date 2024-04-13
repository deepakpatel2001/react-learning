function LastStage({money, avgTip, onHandleReset}) {
    return (
        <div>
            <h3>
                You Pay ₹{money + avgTip} {` (₹${money} + ₹${avgTip}) `}
            </h3>
            <button onClick={onHandleReset}>Reset</button>
        </div>
    );
}

export default LastStage;

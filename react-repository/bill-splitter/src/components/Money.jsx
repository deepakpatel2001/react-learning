function Money({ money, onHandleMoney }) {
    return (
        <div>
            <span>How much was the bill </span>
            <input
                type="text"
                value={money}
                placeholder="0"
                onChange={(e) => onHandleMoney(e) }
            />
        </div>
    );
}

export default Money;

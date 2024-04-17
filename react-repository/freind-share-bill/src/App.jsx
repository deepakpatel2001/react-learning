import { useState } from 'react';
import './index.css';

const initialFriends = [
    {
        id: 118836,
        friendName: 'Clark',
        friendImg: 'https://i.pravatar.cc/48?u=118836',
        balance: -7,
    },
    {
        id: 933372,
        friendName: 'Sarah',
        friendImg: 'https://i.pravatar.cc/48?u=933372',
        balance: 20,
    },
    {
        id: 499476,
        friendName: 'Anthony',
        friendImg: 'https://i.pravatar.cc/48?u=499476',
        balance: 0,
    },
];

function App() {
    const [addFriend, setAddFriend] = useState(false);
    const [mainData, setMainData] = useState(initialFriends);
    const [select, setSelect] = useState(null);

    function handleMainData(data) {
        setMainData((prev) => [...prev, data]);
        setAddFriend(false);
    }

    function handleFriendBtn() {
        setAddFriend((addFriend) => !addFriend);
    }

    function handleSelection(friend) {
        setSelect((select) => (select?.id === friend.id ? null : friend));
        setAddFriend(false);
    }

    function handleSplitBill(value){
        console.log(value)
        setMainData((friends) =>
            friends.map((friend) =>
                friend.id === select.id
                    ? { ...friend, balance: friend.balance + value }
                    : friend
            )
        );
        setSelect(null)
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FreindsList
                    mainData={mainData}
                    onHandleSelection={handleSelection}
                    selectedFriend={select}
                />

                {addFriend && (
                    <FormAddFriend
                        onHandleMainData={(data) => handleMainData(data)}
                    />
                )}

                <Button onClick={handleFriendBtn}>
                    {addFriend ? 'Close' : 'Add Friend'}
                </Button>
            </div>
            {select && (
                <FormSplitBill
                    selectItem={select}
                    selectedFriend={select}
                    onHandleSplitBill={handleSplitBill}
                />
            )}
        </div>
    );
}

function Button({ onClick, children }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

function FreindsList({ mainData, onHandleSelection, selectedFriend }) {
    return (
        <ul>
            {mainData.map((friend) => (
                <Freind
                    key={friend.id}
                    friend={friend}
                    onHandleSelection={onHandleSelection}
                    selectedFriend={selectedFriend}
                />
            ))}
        </ul>
    );
}

function Freind({ friend, onHandleSelection, selectedFriend }) {
    let isSelected = friend.id === selectedFriend?.id;
    return (
        <li className={`${isSelected ? 'selected' : ''}`}>
            <img src={friend.friendImg} alt={friend.friendName} />
            <h3>{friend.friendName}</h3>

            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.friendName} {Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.friendName} owes you {Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance === 0 && (
                <p>You and {friend.friendName} are even</p>
            )}

            <Button id={friend.id} onClick={() => onHandleSelection(friend)}>
                {isSelected ? 'Close' : 'Select'}
            </Button>
        </li>
    );
}

function FormAddFriend({ onHandleMainData }) {
    const [friendName, setFriendName] = useState('');
    const [friendImg, setFriendImg] = useState('https://i.pravatar.cc/48');

    function handleAddFriend(e) {
        e.preventDefault();
    }

    function handleAddFr() {
        if (!friendName || !friendImg) return;

        const data = {
            id: crypto.randomUUID(),
            friendImg,
            friendName,
            balance: 0,
        };
        onHandleMainData(data);

        setFriendName('');
        setFriendImg('https://i.pravatar.cc/48');
    }
    return (
        <form className="form-add-friend" onSubmit={handleAddFriend}>
            <label>🧑‍🤝‍🧑Friend name</label>
            <input
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
            />

            <label>📷Image Url</label>
            <input
                type="text"
                value={friendImg}
                onChange={(e) => setFriendImg(e.target.value)}
            />

            <Button onClick={handleAddFr}>Add</Button>
        </form>
    );
}

function FormSplitBill({ selectedFriend, onHandleSplitBill }) {
    const [bill, setBill] = useState('');
    const [myExpense, setMyExpense] = useState('');
    const friendBill = bill ? bill - myExpense : '';
    const [chooseBiller, setChooseBiller] = useState('user');

    function handleSubmitBill(e) {
        e.preventDefault();
        if (!bill || !myExpense) return;

        onHandleSplitBill(chooseBiller === 'user' ? friendBill : -myExpense);
    }
    return (
        <form className="form-split-bill">
            <h2>Split a bill with {selectedFriend.friendName}</h2>

            <label>💰Bill Value</label>
            <input
                type="text"
                value={bill}
                placeholder={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>🕴️Your Expenses</label>
            <input
                type="text"
                value={myExpense}
                placeholder={myExpense}
                onChange={(e) =>
                    setMyExpense(
                        Number(e.target.value) > bill
                            ? myExpense
                            : Number(e.target.value)
                    )
                }
            />

            <label>🧑‍🤝‍🧑{selectedFriend.friendName}'s expense</label>
            <input type="text" disabled value={friendBill} />

            <label>🤑Who is paying the bill</label>
            <select
                onChange={(e) => setChooseBiller(e.target.value)}
                value={chooseBiller}
            >
                <option value="user">You</option>
                <option value="friend">{selectedFriend.friendName}</option>
            </select>

            <Button onClick={handleSubmitBill}>Split Bill</Button>
        </form>
    );
}

export default App;

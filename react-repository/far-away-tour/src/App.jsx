import { useState } from 'react';
import './index.css';

const initialItems = [
    { id: 1, description: 'Passports', quantity: 2, packed: false },
    { id: 2, description: 'Socks', quantity: 12, packed: false },
    { id: 3, description: 'Charger', quantity: 12, packed: false },
];

export default function App() {
    // state lifting
    const [item, setItem] = useState([]);

    function handleItem(item) {
        setItem((items) => [...items, item]);
    }

    function handleDelete(id){
        setItem((items) => items.filter(item => item.id !== id))
    }

    function handleCheck(id){
        setItem((items) => items.map((item) => item.id === id ? {...item, packed:!item.packed} : item))
    }

    function handleClear(){
        setItem([])
    }

    return (
        <div className="app">
            <Logo />
            <Form onHandleItem={handleItem} />
            <PackingList
                items={item}
                onHandleDelete={handleDelete}
                onHandleCheck={handleCheck}
                onHandleClear={handleClear}
            />
            <Stats items={item} />
        </div>
    );
}

function Logo() {
    return <h1>🌴Far-Away🌴</h1>;
}

function Form({ onHandleItem }) {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) {
            return;
        }
        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };

        onHandleItem(newItem);

        setDescription('');
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip ?</h3>
            <select
                value={quantity}
                onChange={(e) => {
                    setQuantity(Number(e.target.value));
                }}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((val) => (
                    <option value={Number(val)} key={val}>
                        {Number(val)}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Items..."
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onHandleDelete, onHandleCheck, onHandleClear }) {
    const [selected, setSelected] = useState('input')
    let checkStatus;

    if (selected === 'input') checkStatus = items;

    if(selected === 'description') checkStatus = items.slice().sort((a,b) => a.description.localeCompare(b.description))

    if(selected === 'packed') checkStatus = items.slice().sort((a,b) => Number(b.packed) - Number(a.packed))
    return (
        <div className="list">
            <ul>
                {checkStatus.map((val) => (
                    <Item
                        item={val} 
                        key={val.id}
                        onHandleDelete={onHandleDelete}
                        onHandleCheck={onHandleCheck}
                    />
                ))}
            </ul>

            <div className="actions">
                <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                    <option key={1} value="input">Sort by Input</option>
                    <option key={2} value="description">Sort by Description</option>
                    <option key={3} value="packed">Sort by Packed status</option>
                </select>
                <button onClick={() => onHandleClear()}>Clear List</button>
            </div>
        </div>
    );
}

function Item({ item, onHandleDelete, onHandleCheck }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onHandleCheck(item.id)}
            />
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onHandleDelete(item.id)}>❌</button>
        </li>
    );
}

function Stats({items}) {
    // derived states
    const totalItems = items.length;
    const packedItems = (items.filter((item) => item.packed).length);
    const percentage = Math.round((packedItems / totalItems) * 100);

    // conditional rendering
    if(!items.length){
        return (<footer className="stats">
            <em>Please start vacation.✈️</em>
        </footer>)
    }

    return (
        <footer className="stats">
            <em>
                {percentage === 100 ? `You packed all data` : `You have ${totalItems} items in your list, and you packed ${percentage}%`}
            </em>
        </footer>
    );
}

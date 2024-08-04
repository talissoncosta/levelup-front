import './styles.css';
import {useState} from "react";

/*
1. Add new tasks on clicking the "Submit" button. OK
    The <input> field should be cleared upon successful addition. OK
2. Remove tasks from the Todo List upon clicking the "Delete" button. OK

3. Allow adding new item on Enter
 */


const Item = ({ children, onDelete}) => {
    return (
        <li>
            <span>{children}</span>
            <button onClick={onDelete}>Delete</button>
        </li>)
}

let id = 0

export const TodoList = ({ items, setItems}) => {
    const [newItem, setNewItem] = useState('')
    const handleDelete = (id) => {
        if (id === undefined) return
        const filteredItems = items.filter((item) => item.id !== id)
        setItems(filteredItems)
    }

    const handleKeys = (e) => {
        const key = e.key

        const allowedKeys = ['Enter']

        if (!allowedKeys.includes(key)) return

        if (key === 'Enter') {
            handleAdd()
        }

    }


    const handleAdd = () => {
        if (newItem === '') return
        setItems([...items, { id: id++, label: newItem}])
        setNewItem('')
    }

    return (
        <div className="container">
            <h1>Todo List</h1>
            <div className="text-field" onKeyDown={handleKeys}>
                <input type="text" placeholder="Add your task" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                <div>
                    <button onClick={handleAdd}>Submit</button>
                </div>
            </div>
            <ul>
                {items.map(({ label, id }) =>
                    <Item key={id} onDelete={() => handleDelete(id)}> {label} </Item>
                )}
            </ul>
        </div>
    );
}

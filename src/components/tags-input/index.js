import {useState} from "react";
import './styles.css'


const Tag = ({ onRemove, label}) => (
  <div className="tag">
    <span onClick={onRemove}>x</span>
    {label}
  </div>)

export const TagsInput = () => {
  const [selected, setSelected] = useState([])
  const [value, setValue] = useState('')
  const handleRemove = (label) => {
    setSelected(selected.filter((item) => item !== label))
  }
  const handleAdd = (value) => {
      const newValue =  value.trim()

    if (selected.includes(newValue) || newValue.length < 1) return


    setSelected([...selected, newValue])
    setValue('')
  }

  const handleKeyDown = (e) => {
      const key = e.key
      if (key !== 'Enter') return
      handleAdd(value)
  }

  return (
    <div className="container">
      <div className="tags-container" onKeyDown={handleKeyDown}>
        {selected.map((label) => (<Tag key={label} label={label} onRemove={() => handleRemove(label)} /> ))}
          <input aria-label="Add new tag" placeholder="" onChange={(e) => setValue(e.target.value)} value={value}  type="text" />
      </div>
    </div>
  );
}

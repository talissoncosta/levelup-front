import {useState} from "react";
import './styles.css'


const Tag = ({ onRemove, label}) => (
  <div className="tag">
    <span onClick={onRemove}>x</span>
    {label}
  </div>)

const LIST_OPTIONS = ['Foo', 'Bar', 'Car', 'Bike', 'Skate', 'Mirror']
export const TagsInput = () => {
  const [selected, setSelected] = useState([])
  const [options, setOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const handleRemove = (label) => {

    setSelected(selected.filter((item) => item !== label))
  }
  const handleAdd = (label) => {

    if (selected.includes(label)) return


    setSelected([...selected, label])
    setSearchTerm('')
    setOptions([])
  }

  const filterOptions = (list, str) => list.filter((option) => {
    return option.toLowerCase().search(str.toLowerCase()) > -1 && !selected.includes(option)
  } )
  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term === '') {
      setOptions([])
    }
    const filteredItems = LIST_OPTIONS.filter((option) => option.toLowerCase().search(term.toLowerCase()) > -1 )
    setOptions(filteredItems)
  }
  return (
    <div className="container">
      <div className="input-container">
          <div className="tags-container">
            {selected.map((label) => (<Tag key={label} label={label} onRemove={() => handleRemove(label)} /> ))}
          </div>
          <input placeholder="Type to search" onChange={handleSearch} value={searchTerm}  type="text" />
      </div>

      {options.length > 0 && (<div className="input-options">
        {filterOptions(options, searchTerm).map((item) => <div key={item} onClick={() => handleAdd(item)} className="option">{item}</div>)}
      </div>)}
    </div>
  );
}

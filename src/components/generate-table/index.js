import './styles.css';
import {useState} from "react";

export const GenerateTable = () => {
  const [rowsValue, setRowsValue] = useState(null)
  const [colValue, setColValue] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)

    setRowsValue(Number(data.get('rows')))
    setColValue(Number(data.get('cols')))
  }
  return (
    <div className="upper-container">
      <form onSubmit={handleSubmit} className="container">
        <div className="input-field">
          <label htmlFor="rows">Rows:</label>
          <input id="rows" name="rows" min={1} type="number"/>
        </div>

        <div className="input-field">
          <label htmlFor="cols">Columns:</label>
          <input id="cols" name="cols" min={1} type="number"/>
        </div>
        <button>Submit</button>
      </form>
      {(colValue && rowsValue) && <div>
        <table>
          <tbody>
           {Array.from({ length: rowsValue}).map((_,row) => (<tr key={row}> {
             Array.from({ length: colValue}).map((_, col) => <td key={col}>
               {col % 2 === 0
                 ? rowsValue * col + (row + 1)
                 : rowsValue * (col + 1) - row}
             </td>)
           } </tr>))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

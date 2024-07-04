import './styles.css';
import { useState } from "react";

const TODAY = formatDate(new Date());
const DAY_IN_SECONDS = 24 * 60 * 60 * 1000;

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return [year, month, day].join('-');
}
export const FlightBooker = () =>{
  const [departureDate, setDepartureDate] = useState(
    formatDate(new Date(Date.now() + DAY_IN_SECONDS)), // Tomorrow.
  );
  const [returnDate, setReturnDate] =
    useState(departureDate);
  const [option,setOption] = useState('one-way')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (option === 'one-way') {
      alert(
        `You have booked a one-way flight on ${departureDate}`,
      );
      return;
    }

    alert(
      `You have booked a return flight, departing on ${departureDate} and returning on ${returnDate}`,
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <select aria-label="Select the option for your flight" onChange={(e) => setOption(e.target.value)}>
          <option value="one-way">One-way flight</option>
          <option value="return">Return flight</option>
        </select>
        <input min={TODAY} aria-label="Select the departing date" value={departureDate} type="date" />
        {option === 'return' && <input min={departureDate} aria-label="Select the return date" value={returnDate} type="date" />}
      </div>
      <div>
        <button className="submit-button">Book</button>
      </div>
    </form>
  );
}

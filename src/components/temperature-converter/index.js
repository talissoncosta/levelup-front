import './styles.css';
import { useState } from "react";

function format(number) {
    // Show 4 d.p. if number has more than 4 decimal places.
    return /\.\d{5}/.test(number)
        ? Number(number).toFixed(4)
        : number;

}
export const TemperatureConverter = () => {
    const [cValue, setCValue] = useState(0)
    const [fValue, setFValue] = useState(0)

    const convert = (value, setDestination, calculateValue) => {
        const numericValue = Number(value);
        const isValid =
            !Number.isNaN(numericValue) && Boolean(value);
        setDestination(
            isValid ? format(calculateValue(numericValue)) : '',
        );
    }

    return <div className="container">
        <div className="input-field">
            <input
                type="number"
                aria-labelledby="c-label"
                value={cValue}
                onChange={(event) => {
                    const newValue = event.target.value;
                    setCValue(newValue);
                    convert(
                        newValue,
                        setFValue,
                        (value) => (value * 9) / 5 + 32
                    );
                }}
            />
            <label id="c-label">Celsius</label>
        </div>
        <div>
            =
        </div>
        <div className="input-field">
            <input
                type="number"
                aria-labelledby='f-label'
                value={fValue}
                onChange={(event) => {
                    const newValue = event.target.value;
                    setFValue(newValue);
                    convert(
                        newValue,
                        setCValue,
                        (value) => ((value - 32) * 5) / 9,
                    );
                }}
            />
            <label id="f-label">Fahrenheit</label>
        </div>
    </div>;
}

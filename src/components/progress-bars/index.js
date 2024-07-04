import './styles.css';
import {useEffect, useState} from "react";

const ProgressBar = () => {
    const [startTransition, setStartTransition] = useState(false)
    useEffect(() => {
        setStartTransition(true)

        return () => setStartTransition(false)

    },[]);
    return (
        <div role="progressbar" className="progress-container">
            <div className={["progress-bar",startTransition ? "filled": ''].join(' ')} />
        </div>
    )
}

export const ProgressBars = () => {
    const [count, setCount] = useState(0)
    return (
        <div className="container">
            <div>
                <button onClick={() => setCount(count + 1)}>Add</button>
            </div>
            <div className="bars-container">
                {Array.from({ length: count }).map((_, index) => <ProgressBar key={index} />)}
            </div>
        </div>
    );
}

import './styles.css'

const MIN = 0;
const MAX = 100;
export const ProgressBar = ({ current = 5 }) => {
    const clampedValue = Math.min(Math.max(current, MIN), MAX)
    return <div className="progress">
        <div
            role="progressbar"
            aria-valuemin={MIN}
            aria-valuemax={MAX}
            aria-valuenow={clampedValue}
            className="bar"
            style={{ width: `${clampedValue}%` }}
        >
            {`${clampedValue}%`}
        </div>
    </div>;
}

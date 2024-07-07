import { useState, useRef } from 'react'
import './styles.css'
const Star = ({ isFilled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={["star-icon", isFilled ? "star-icon-filled" : ''].filter(Boolean).join(' ')}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

export default function StarRating({ max, current, onSelect, name }) {
  const starRef = useRef([])
  const [currentHoveredItem, setCurrentHoveredItem] = useState(0)

  const handleKeyDown = (e) => {

    const key = e.code

    const selectItemKeys = ['Space', 'Enter']
    const navigationKeys = ['ArrowLeft', 'ArrowRight']
    const allowedKeys = [...navigationKeys, ...selectItemKeys]
    if (!allowedKeys.includes(key)) return

    const currentItemIndex = document.activeElement.getAttribute('data-star-id')
    if (!currentItemIndex) return
    const currentIndex = Number(currentItemIndex)


    // setCurrentHoveredItem(currentIndex)

    if (selectItemKeys.includes(key)) {
      onSelect(currentIndex + 1)
    }

    if (navigationKeys.includes(key)) {
      const firstIndex = 0
      const lastIndex = max - 1



      const mappingKeys = {
        [navigationKeys[0]]:  currentIndex === firstIndex ? lastIndex : currentIndex - 1 , // ArrowLeft
        [navigationKeys[1]]: currentIndex === lastIndex ? firstIndex : currentIndex + 1  // ArrowRight
      }
      const nextIndex = mappingKeys[key]
      starRef.current[nextIndex].focus()
    }



  }

  return (
    <div>
      {Array.from({ length: max }).map((_, index) =>
        <span
          onKeyDown={handleKeyDown}
          onFocus={() => setCurrentHoveredItem(index + 1)}
          onBlur={() => setCurrentHoveredItem(null)}
          key={index}
          tabIndex={0}
          isFilled={index <= current || index <= currentHoveredItem}
          onMouseEnter={() => setCurrentHoveredItem(index + 1)}
          onMouseLeave={() => setCurrentHoveredItem(null)}
          onClick={() => onSelect(index + 1)}
          ref={ref => starRef.current[index] = ref}
          data-star-id={index}
        >
          <Star isFilled={index < current || index < currentHoveredItem} />
          <input type="number" hidden name={name} value={current} />
        </span>
      )}
    </div>
  );
}

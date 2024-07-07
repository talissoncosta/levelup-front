import { useState, useId, useRef, forwardRef } from 'react'
import './styles.css'


const Tab = forwardRef(({ label, onSelect, isSelected, ...rest }, ref) => (
  <button
    ref={ref}
    {...rest}
    className={["tab", isSelected ? "selected": ''].filter(Boolean).join(' ')}
    onClick={onSelect}>
    {label}
  </button>
))

const Panel = ({ content, ...rest }) => (<p className="panel-content" {...rest}>{ content } </p>)
const getPanelId = (componentId, value) => `${componentId}-panel-${value}`
const getTabId = (componentId, value) => `${componentId}-tab-${value}`

export default function Tabs({ items, defaultValue }) {
  const [selectedTab, setSelectedTab] = useState(defaultValue || items[0].value)
  const tabId = useId()
  const tabsRef = useRef([])

  const handleNavigation = (e) => {
    const key = e.key

    const allowedKeys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']

    if (!allowedKeys.includes(key)) return
    const currentItemIndex = items.findIndex((item) => item.value === selectedTab)
    const firstIndex = 0
    const lastIndex = items.length - 1
    const isLastItem = currentItemIndex === lastIndex
    const isFirstItem = currentItemIndex === firstIndex

    const mappingKeys = {
      [allowedKeys[0]]: isFirstItem ? lastIndex : currentItemIndex - 1,  // ArrowLeft
      [allowedKeys[1]]: isLastItem ? firstIndex: currentItemIndex + 1, // ArrowRight
      [allowedKeys[2]]: firstIndex,
      [allowedKeys[3]]: lastIndex
    }

    const nextItem = items[mappingKeys[key]]
    setSelectedTab(nextItem.value)
    tabsRef.current[nextItem.value].focus()
  }

  return (
    <div>
      <div className="tabs" role="tablist" onKeyDown={handleNavigation}>
        {items.map((item) => {
          const isSelected = selectedTab === item.value
          return (<Tab
            role="tab"
            aria-controls={getPanelId(tabId, item.value)}
            aria-selected={isSelected}
            id={getTabId(tabId, item.value)}
            key={item.value}
            tabIndex={isSelected ? 1 : -1}
            label={item.label}
            isSelected={isSelected}
            onSelect={() => setSelectedTab(item.value)}
            ref={ref => tabsRef.current[item.value] = ref }
          />)
        })}
      </div>
      <div className="panel">{items.map((item) => {
        return (<Panel
          role="tabpanel"
          aria-labelledby={getTabId(tabId, item.value)}
          id={getPanelId(tabId, item.value)}
          key={item.value}
          tabIndex={0}
          content={item.content}
          hidden={selectedTab !== item.value}
        />)
      })}</div>
    </div>
  );
}

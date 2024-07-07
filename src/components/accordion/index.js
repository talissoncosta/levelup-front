import { useId, useState, useRef } from 'react';
import './styles.css'
function getAccordionHeaderId(accordionId, value) {
  return accordionId + '-header-' + value;
}

function getAccordionPanelId(accordionId, value) {
  return accordionId + '-panel-' + value;
}

export default function Accordion({ sections }) {
  const accordionId = useId();
  const sectionRef = useRef([])
  const [openSections, setOpenSections] = useState(
    new Set(),
  );

  const handleKeyNavigation = (e) => {
    const key = e.key
    const currentItemValue = document.activeElement.getAttribute('data-accordion-value')
    const validKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End']

    if (!currentItemValue || !validKeys.includes(key)) return

    const currentItemIndex = sections.findIndex(item => item.value === currentItemValue)
    const firstSection = 0
    const lastSection = sections.length - 1

    const isLastSection = currentItemIndex === lastSection
    const isFirstSection = currentItemIndex === firstSection

    const mappingKeys = {
      [validKeys[0]]: isLastSection ? firstSection : currentItemIndex + 1, // ArrowUp
      [validKeys[1]]: isFirstSection ? lastSection : currentItemIndex - 1, // ArrowDown
      [validKeys[2]]: firstSection, // Home
      [validKeys[3]]: lastSection // End
    }

    sectionRef.current[sections[mappingKeys[key]].value].focus()
  }

  return (
    <div className="accordion" onKeyDown={handleKeyNavigation}>
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);
        const headerId = getAccordionHeaderId(
          accordionId,
          value,
        );
        const panelId = getAccordionPanelId(
          accordionId,
          value,
        );

        return (
          <div className="accordion-item" key={value}>
            <button
              aria-controls={panelId}
              aria-expanded={isExpanded}
              id={headerId}
              className="accordion-item-title"
              type="button"
              ref={ref => sectionRef.current[value] = ref}
              data-accordion-value={value}
              onClick={() => {
                const newOpenSections = new Set(
                  openSections,
                );
                newOpenSections.has(value)
                  ? newOpenSections.delete(value)
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}>
              {title}{' '}
              <span
                aria-hidden={true}
                className={[
                  'accordion-icon',
                  isExpanded && 'accordion-icon--rotated',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            </button>
            <div
              aria-labelledby={headerId}
              role="region"
              className="accordion-item-contents"
              id={panelId}
              hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}

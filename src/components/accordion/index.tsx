import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from 'react';
import styles from './accordion.module.scss';
import Icon from '../icon';

const collapseKeys = ['ArrowUp', 'ArrowLeft', 'Escape'];
const expandKeys = ['ArrowDown', 'ArrowRight'];

export interface AccordionProps {
  title: string;
  expanded?: boolean;
  disabled?: boolean;
  onChange?: (isExpanded: boolean) => void;
}

const AccordionContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}>({ isExpanded: false, setIsExpanded: () => undefined });

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  expanded = false,
  disabled = false,
  onChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);
  useEffect(() => {
    if (!isExpanded) {
      contentRef.current?.style.setProperty('max-height', null);
    } else {
      const height = contentRef.current?.scrollHeight;
      contentRef.current?.style.setProperty('max-height', `${height}px`);
    }
  }, [isExpanded]);

  const toggle = () => {
    if (disabled) return;
    onChange?.(!isExpanded);
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (collapseKeys.includes(event.key)) {
      setIsExpanded(false);
    } else if (expandKeys.includes(event.key)) {
      setIsExpanded(true);
    }
  };
  return (
    <AccordionContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        className={styles.accordion}
      >
        <button
          tabIndex={1}
          aria-expanded={isExpanded}
          className={styles.accordionHeader}
          onClick={toggle}
        >
          <h3>{title}</h3>
          <span>
            <Icon name="angle-down" />
          </span>
        </button>
        <div
          role="region"
          ref={contentRef}
          aria-hidden={!isExpanded}
          className={styles.accordionContent}
        >
          {children}
        </div>
      </div>
    </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'useAccordion should only be used with a Accordion component',
    );
  }
  return context;
};

export default Accordion;

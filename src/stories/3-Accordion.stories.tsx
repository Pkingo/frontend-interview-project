import React, { useState } from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Accordion, { useAccordion } from '../components/accordion';

const AccordionContentWithCloseButton = () => {
  const { setIsExpanded } = useAccordion();
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation
      </p>
      <button onClick={() => setIsExpanded(false)}>Close</button>
    </>
  );
};

const AccordionContent = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);

const ControlledAccordionGroup = () => {
  const [expanded, setExpanded] = useState('');

  const handleChange = (accordion: string) => (isExpanded: boolean) => {
    setExpanded(isExpanded ? accordion : '');
  };
  return (
    <>
      <Accordion
        disabled={boolean('Disabled 1', false)}
        expanded={expanded === 'accordion1'}
        onChange={handleChange('accordion1')}
        title={text('Title 1', 'Lorem ipsum 1')}
      >
        <AccordionContent />
      </Accordion>
      <br />
      <Accordion
        disabled={boolean('Disabled 2', false)}
        expanded={expanded === 'accordion2'}
        onChange={handleChange('accordion2')}
        title={text('Title 2', 'Lorem ipsum 2')}
      >
        <AccordionContent />
      </Accordion>
      <br />
      <Accordion
        disabled={boolean('Disabled 3', false)}
        expanded={expanded === 'accordion3'}
        onChange={handleChange('accordion3')}
        title={text('Title 3', 'Lorem ipsum 3')}
      >
        <AccordionContent />
      </Accordion>
    </>
  );
};

export const regular: React.FC = () => {
  return (
    <div>
      <Accordion
        disabled={boolean('Disabled', false)}
        expanded={boolean('Expanded', false)}
        title={text('Title', 'Lorem ipsum')}
      >
        <AccordionContent />
      </Accordion>
    </div>
  );
};

export const withCloseButton = () => (
  <Accordion
    disabled={boolean('Disabled', false)}
    expanded={boolean('Expanded', false)}
    title={text('Title', 'Lorem ipsum')}
  >
    <AccordionContentWithCloseButton />
  </Accordion>
);

export const uncontrolledGroup = () => (
  <>
    <Accordion
      disabled={boolean('Disabled 1', false)}
      expanded={boolean('Expanded 1', false)}
      title={text('Title 1', 'Lorem ipsum 1')}
    >
      <AccordionContent />
    </Accordion>
    <br />
    <Accordion
      disabled={boolean('Disabled 2', false)}
      expanded={boolean('Expanded 2', false)}
      title={text('Title 2', 'Lorem ipsum 2')}
    >
      <AccordionContent />
    </Accordion>
    <br />
    <Accordion
      disabled={boolean('Disabled 3', false)}
      expanded={boolean('Expanded 3', false)}
      title={text('Title 3', 'Lorem ipsum 3')}
    >
      <AccordionContent />
    </Accordion>
  </>
);

export const controlledGroup = () => <ControlledAccordionGroup />;

export default {
  title: 'Accordion',
  decorators: [withKnobs],
};

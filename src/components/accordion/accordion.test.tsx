import React from 'react';
import Accordion, { AccordionProps, useAccordion } from '../accordion';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const Content = () => {
  const { setIsExpanded } = useAccordion();
  return (
    <>
      <p>Children here</p>
      <button onClick={() => setIsExpanded(false)}>Close</button>
    </>
  );
};

const setup = (props: Partial<AccordionProps> = {}) => {
  return render(
    <Accordion title="Title" {...props}>
      <Content />
    </Accordion>,
  );
};

describe('Accordion', () => {
  describe('props', () => {
    it('should display title in the accordion', () => {
      setup();
      expect(screen.getByText(/title/i)).toBeInTheDocument();
    });
    it('should be disabled if the "disabled" prop is true', () => {
      setup({ disabled: true });
      const accordionHeader = screen.getByRole('button', { name: /title/i });

      expect(
        screen.queryByRole('region', { hidden: true }),
      ).toBeInTheDocument();
      userEvent.click(accordionHeader);
      expect(
        screen.queryByRole('region', { hidden: true }),
      ).toBeInTheDocument();
    });
    it('should be expanded if the "expanded" prop is passed', () => {
      setup({ expanded: true });
      expect(
        screen.queryByRole('region', { hidden: false }),
      ).toBeInTheDocument();
    });
    it('should call "onChange" with is expanded when the accordion is opened/closed', () => {
      const mockOnChange = jest.fn();
      setup({ onChange: mockOnChange });
      const accordionHeader = screen.getByRole('button', { name: /title/i });

      expect(mockOnChange).not.toHaveBeenCalled();
      userEvent.click(accordionHeader);
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenLastCalledWith(true);
      userEvent.click(accordionHeader);
      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenLastCalledWith(false);
    });
  });
  describe('content', () => {
    it('should render children inside the accordion while the accordion is expanded', () => {
      setup();
      const accordionHeader = screen.getByRole('button', { name: /title/i });

      expect(
        screen.queryByRole('region', { hidden: true }),
      ).toBeInTheDocument();
      userEvent.click(accordionHeader);
      expect(
        screen.queryByRole('region', { hidden: false }),
      ).toBeInTheDocument();
    });
  });
  describe('useAccordion', () => {
    it('should be able to close the accordion from inside', () => {
      const { debug } = setup();
      debug();

      expect(
        screen.queryByRole('region', { hidden: true }),
      ).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /title/i }));
      expect(
        screen.queryByRole('region', { hidden: false }),
      ).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(
        screen.queryByRole('region', { hidden: true }),
      ).toBeInTheDocument();
    });
  });
});

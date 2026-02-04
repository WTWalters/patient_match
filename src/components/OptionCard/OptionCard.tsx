import React from 'react';
import styles from './OptionCard.module.css';

interface OptionCardProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  children,
  selected,
  onClick,
  disabled = false,
}) => {
  const classNames = [
    styles.card,
    selected ? styles.selected : '',
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className={styles.indicator}>
        {selected && <span className={styles.checkmark}>✓</span>}
      </span>
      <span className={styles.content}>{children}</span>
    </button>
  );
};

import React, { useEffect, useId } from 'react';
import { BadgeCheck, ShieldCheck, Trash2 } from 'lucide-react';

const toneConfig = {
  accent: {
    icon: ShieldCheck,
  },
  success: {
    icon: BadgeCheck,
  },
  danger: {
    icon: Trash2,
  },
};

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  tone = 'accent',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const Icon = toneConfig[tone]?.icon ?? ShieldCheck;

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div
        className={`hrims-confirmation-modal is-${tone}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className={`hrims-confirmation-modal-icon is-${tone}`} aria-hidden="true">
          <Icon size={24} strokeWidth={2.2} />
        </div>

        <div className="hrims-confirmation-modal-copy">
          <h4 id={titleId}>{title}</h4>
          <p id={descriptionId}>{message}</p>
        </div>

        <div className="hrims-confirmation-modal-actions">
          <button
            type="button"
            className="hrims-confirmation-button is-cancel"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`hrims-confirmation-button is-confirm is-${tone}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
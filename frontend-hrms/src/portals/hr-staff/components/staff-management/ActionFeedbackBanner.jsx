import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const toneConfig = {
  success: {
    icon: CheckCircle2,
    className: 'is-success',
  },
  error: {
    icon: AlertCircle,
    className: 'is-error',
  },
};

export default function ActionFeedbackBanner({ feedback }) {
  if (!feedback?.message) {
    return null;
  }

  const config = toneConfig[feedback.tone] ?? toneConfig.success;
  const Icon = config.icon;

  return (
    <div className={`hrims-action-feedback-banner ${config.className}`} role="status" aria-live="polite">
      <Icon size={18} strokeWidth={2.2} />
      <span>{feedback.message}</span>
    </div>
  );
}
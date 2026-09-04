import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;
  const s = status.toUpperCase();

  let badgeClass = 'bg-slate-100 text-slate-700';

  if (s === 'AVAILABLE' || s === 'CLEAN' || s === 'CONFIRMED' || s === 'PAID' || s === 'NORMAL' || s === 'SUCCESS') {
    badgeClass = 'badge-available';
  } else if (s === 'OCCUPIED' || s === 'DIRTY' || s === 'CANCELLED' || s === 'FAILED' || s === 'CRITICAL') {
    badgeClass = 'badge-occupied';
  } else if (s === 'RESERVED' || s === 'PENDING' || s === 'LOW' || s === 'WARNING') {
    badgeClass = 'badge-reserved';
  } else if (s === 'CLEANING' || s === 'CHECKED_IN' || s === 'PREPARING') {
    badgeClass = 'badge-cleaning';
  } else if (s === 'MAINTENANCE' || s === 'SUSPICIOUS') {
    badgeClass = 'badge-maintenance';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge;

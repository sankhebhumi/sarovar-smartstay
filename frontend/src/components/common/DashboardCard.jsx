import React from 'react';

const DashboardCard = ({ title, value, subtitle, icon: Icon, trend, color = 'gold' }) => {
  const colorMap = {
    gold: 'bg-amber-500/10 text-amber-600 border-amber-200',
    blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
    green: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    red: 'bg-rose-500/10 text-rose-600 border-rose-200',
    purple: 'bg-purple-500/10 text-purple-600 border-purple-200',
  };

  return (
    <div className="card flex items-center justify-between hover:-translate-y-0.5 transition-all">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1 font-sans">{value}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        {trend && (
          <span className={`inline-block mt-2 text-[11px] font-semibold ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend} vs last week
          </span>
        )}
      </div>

      {Icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color] || colorMap.gold}`}>
          <Icon size={24} />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;

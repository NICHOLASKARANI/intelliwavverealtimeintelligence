// packages/charts/src/PnLCalendar.tsx
'use client';

import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns';

interface DailyPnL {
  date: string;
  pnl: number;
  trades?: number;
}

interface PnLCalendarProps {
  data: DailyPnL[];
  month?: number;
  year?: number;
  className?: string;
}

export const PnLCalendar: React.FC<PnLCalendarProps> = ({
  data,
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  className,
}) => {
  const calendarData = useMemo(() => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));
    const days = eachDayOfInterval({ start, end });
    const startDay = getDay(start);

    const maxPnL = Math.max(...data.map(d => Math.abs(d.pnl)), 1);
    
    const weeks: (DailyPnL | null)[][] = [];
    let currentWeek: (DailyPnL | null)[] = [];

    // Add empty cells for days before month start
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }

    days.forEach(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayData = data.find(d => d.date === dateStr) || { date: dateStr, pnl: 0, trades: 0 };

      currentWeek.push({
        ...dayData,
        pnl: dayData.pnl || 0,
        trades: dayData.trades || 0,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return { weeks, maxPnL };
  }, [data, month, year]);

  const getColor = (pnl: number, maxPnL: number) => {
    if (pnl === 0) return 'bg-gray-800';
    const intensity = Math.min(Math.abs(pnl) / maxPnL, 1);
    if (pnl > 0) {
      return `bg-green-${Math.ceil(intensity * 9) * 100}`;
    }
    return `bg-red-${Math.ceil(intensity * 9) * 100}`;
  };

  const formatPnL = (pnl: number) => {
    if (pnl === 0) return '-';
    return pnl > 0 ? `+$${pnl.toFixed(0)}` : `-$${Math.abs(pnl).toFixed(0)}`;
  };

  return (
    <Card className={cn('p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Trading Calendar</h3>
        <p className="text-sm text-gray-400">
          {format(new Date(year, month), 'MMMM yyyy')}
        </p>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {calendarData.weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 gap-1">
          {week.map((day, dayIndex) => {
            if (!day) {
              return <div key={dayIndex} className="aspect-square" />;
            }

            return (
              <div
                key={day.date}
                className={cn(
                  'aspect-square rounded-lg p-1 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10',
                  day.pnl > 0 ? 'bg-green-900/30 hover:bg-green-900/50' :
                  day.pnl < 0 ? 'bg-red-900/30 hover:bg-red-900/50' :
                  'bg-gray-800/50 hover:bg-gray-800'
                )}
                title={`${format(new Date(day.date), 'MMM dd')}: ${formatPnL(day.pnl)}`}
              >
                <span className="text-xs text-gray-400">
                  {format(new Date(day.date), 'd')}
                </span>
                {day.trades > 0 && (
                  <div className="flex flex-col items-center mt-1">
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full',
                        day.pnl > 0 ? 'bg-green-400' :
                        day.pnl < 0 ? 'bg-red-400' :
                        'bg-gray-600'
                      )}
                    />
                    <span className="text-[10px] text-gray-500 mt-0.5">
                      {day.trades}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-green-400" />
          <span className="text-xs text-gray-400">Profit</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-red-400" />
          <span className="text-xs text-gray-400">Loss</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-gray-600" />
          <span className="text-xs text-gray-400">No Trades</span>
        </div>
      </div>
    </Card>
  );
};
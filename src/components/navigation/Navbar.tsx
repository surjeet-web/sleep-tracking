import React from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, BarChart2, Calendar, Clock } from 'lucide-react';

export function Navbar() {
  const links = [
    { to: '/', icon: Moon, label: 'Track' },
    { to: '/weekly', icon: BarChart2, label: 'Weekly' },
    { to: '/monthly', icon: Calendar, label: 'Monthly' },
    { to: '/schedule', icon: Clock, label: 'Schedule' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-md mx-auto px-6">
        <div className="flex justify-between">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center py-3 px-4 text-sm ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span className="mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
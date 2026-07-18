// apps/frontend/src/components/layout/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  TrendingUp,
  Bot,
  BarChart3,
  Users,
  Settings,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Wallet,
  History,
  Bell,
  HelpCircle,
  LogOut,
  Star,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const mainItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: TrendingUp, label: 'Trading', href: '/trading' },
  { icon: Bot, label: 'Bots', href: '/bots', badge: '3 Active', badgeColor: 'bg-green-500' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Users, label: 'Copy Trading', href: '/copytrading', badge: 'New', badgeColor: 'bg-purple-500' },
  { icon: Wallet, label: 'Portfolio', href: '/portfolio' },
];

const secondaryItems: SidebarItem[] = [
  { icon: History, label: 'History', href: '/history' },
  { icon: Bell, label: 'Notifications', href: '/notifications', badge: '5', badgeColor: 'bg-red-500' },
  { icon: BookOpen, label: 'Strategies', href: '/strategies' },
  { icon: MessageSquare, label: 'AI Assistant', href: '/assistant' },
  { icon: Shield, label: 'Risk Management', href: '/risk' },
];

const bottomItems: SidebarItem[] = [
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help & Support', href: '/support' },
];

export const Sidebar: React.FC<{
  isCollapsed: boolean;
  onToggle: () => void;
}> = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        'fixed left-0 top-0 h-full bg-gray-900/80 backdrop-blur-xl border-r border-gray-800',
        'flex flex-col z-50 transition-all duration-300'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">IntelliWave</span>
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-gray-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        <div className="px-3 mb-2">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
              Main
            </p>
          )}
          {mainItems.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
              onHover={setHoveredItem}
            />
          ))}
        </div>

        <div className="px-3 mb-2">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-4">
              Tools
            </p>
          )}
          {secondaryItems.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
              onHover={setHoveredItem}
            />
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-800 space-y-1">
        {bottomItems.map((item) => (
          <SidebarLink
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
            onHover={setHoveredItem}
          />
        ))}
        <button
          onClick={logout}
          className={cn(
            'w-full flex items-center space-x-3 px-3 py-2 rounded-lg',
            'text-gray-400 hover:text-red-400 hover:bg-red-500/10',
            'transition-all duration-200',
            isCollapsed && 'justify-center'
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

const SidebarLink: React.FC<{
  item: SidebarItem;
  isActive: boolean;
  isCollapsed: boolean;
  onHover: (id: string | null) => void;
}> = ({ item, isActive, isCollapsed, onHover }) => {
  const Icon = item.icon;

  const linkContent = (
    <Link
      href={item.href}
      className={cn(
        'flex items-center space-x-3 px-3 py-2.5 rounded-lg mb-1',
        'transition-all duration-200 group relative',
        isActive
          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          : 'text-gray-400 hover:text-white hover:bg-white/5',
        isCollapsed && 'justify-center'
      )}
      onMouseEnter={() => onHover(item.label)}
      onMouseLeave={() => onHover(null)}
    >
      <Icon size={20} />
      {!isCollapsed && (
        <div className="flex-1 flex items-center justify-between">
          <span className="text-sm">{item.label}</span>
          {item.badge && (
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full text-white',
              item.badgeColor
            )}>
              {item.badge}
            </span>
          )}
        </div>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right" className="bg-gray-800 border-gray-700">
            <p>{item.label}</p>
            {item.badge && (
              <span className={cn('text-xs text-white ml-1', item.badgeColor)}>
                {item.badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return linkContent;
};
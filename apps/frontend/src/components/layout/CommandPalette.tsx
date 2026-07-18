// apps/frontend/src/components/layout/CommandPalette.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Search,
  TrendingUp,
  Bot,
  BarChart3,
  Settings,
  User,
  Zap,
  ArrowRight,
  Command,
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
  shortcut?: string;
}

export const CommandPalette: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: Command[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, action: () => router.push('/dashboard'), category: 'Navigation', shortcut: 'G D' },
    { id: 'trading', label: 'Trading Terminal', icon: TrendingUp, action: () => router.push('/trading'), category: 'Navigation', shortcut: 'G T' },
    { id: 'bots', label: 'Trading Bots', icon: Bot, action: () => router.push('/bots'), category: 'Navigation', shortcut: 'G B' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, action: () => router.push('/analytics'), category: 'Navigation', shortcut: 'G A' },
    { id: 'new-trade', label: 'New Trade', icon: Zap, action: () => router.push('/trading?new=true'), category: 'Actions', shortcut: 'N T' },
    { id: 'new-bot', label: 'Create Bot', icon: Bot, action: () => router.push('/bots/new'), category: 'Actions', shortcut: 'N B' },
    { id: 'profile', label: 'Profile Settings', icon: User, action: () => router.push('/settings'), category: 'Settings' },
    { id: 'preferences', label: 'Preferences', icon: Settings, action: () => router.push('/settings/preferences'), category: 'Settings' },
  ];

  const filteredCommands = query
    ? commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="p-4 border-b border-gray-800">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    placeholder="Search commands..."
                    className="pl-10 bg-transparent border-none text-white placeholder:text-gray-500 focus:ring-0"
                  />
                </div>
              </div>

              {/* Command List */}
              <div className="max-h-96 overflow-y-auto p-2">
                {Object.entries(groupedCommands).map(([category, cmds]) => (
                  <div key={category} className="mb-2">
                    <p className="text-xs font-semibold text-gray-500 px-3 py-2 uppercase">
                      {category}
                    </p>
                    {cmds.map((cmd, index) => {
                      const globalIndex = filteredCommands.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => {
                            cmd.action();
                            onClose();
                          }}
                          className={cn(
                            'w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150',
                            globalIndex === selectedIndex
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'text-gray-300 hover:bg-white/5'
                          )}
                        >
                          <cmd.icon className="w-4 h-4" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{cmd.label}</p>
                            {cmd.description && (
                              <p className="text-xs text-gray-500">{cmd.description}</p>
                            )}
                          </div>
                          {cmd.shortcut && (
                            <div className="flex items-center space-x-1">
                              {cmd.shortcut.split(' ').map((key, i) => (
                                <React.Fragment key={i}>
                                  <kbd className="px-2 py-0.5 text-xs bg-gray-800 rounded border border-gray-700 text-gray-400">
                                    {key}
                                  </kbd>
                                  {i < cmd.shortcut.split(' ').length - 1 && (
                                    <span className="text-gray-600">+</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filteredCommands.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Command className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No commands found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
                <span>IntelliWave ITIS</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
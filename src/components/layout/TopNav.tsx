'use client';

import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { Menu, Search, Bell, Zap } from 'lucide-react';

export function TopNav() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { toggleSidebar, getActiveProject } = useProjectStore();
  const activeProject = mounted ? getActiveProject() : null;

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/[0.06] bg-black/10 backdrop-blur-sm flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={16} />
        </button>

        {activeProject && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">/</span>
            <span className="text-sm font-medium text-white truncate max-w-[200px]">
              {activeProject.name}
            </span>
          </div>
        )}
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center gap-2 glass rounded-xl px-4 py-2 w-72">
        <Search size={14} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search projects..."
          className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none flex-1"
          aria-label="Search projects"
        />
        <kbd className="hidden lg:flex items-center text-[10px] text-gray-600 border border-gray-700/50 rounded px-1 py-0.5">
          ⌘K
        </kbd>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded-lg hover:bg-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </button>

        <div className="flex items-center gap-2 glass rounded-xl px-3 py-1.5 ml-1">
          <Zap size={12} className="text-indigo-400" />
          <span className="text-xs font-medium text-indigo-300">Gemini AI</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>
      </div>
    </header>
  );
}

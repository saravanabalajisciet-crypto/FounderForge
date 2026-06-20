'use client';

import { useEffect, useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import {
  Zap, Lightbulb, Image, Clock, Trash2,
  ChevronRight, LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  onNewIdea: () => void;
  onNewInspiration: () => void;
}

export function Sidebar({ onNewIdea, onNewInspiration }: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { projects, activeProjectId, setActiveProject, deleteProject } = useProjectStore();

  return (
    <motion.aside
      initial={{ x: -260, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -260, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-[260px] min-w-[260px] flex flex-col h-full border-r border-white/[0.06] bg-black/20"
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-base tracking-tight">FounderForge</span>
            <span className="text-indigo-400 font-bold text-base tracking-tight"> AI</span>
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-1.5 pl-10">Build smarter before you build bigger</p>
      </div>

      {/* New Project */}
      <div className="p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">New Project</p>

        <button
          onClick={onNewIdea}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all duration-150 group"
        >
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center group-hover:bg-indigo-500/25 transition-colors">
            <Lightbulb size={14} className="text-indigo-400" />
          </div>
          <span>Build From Idea</span>
          <ChevronRight size={14} className="ml-auto text-gray-600 group-hover:text-gray-400" />
        </button>

        <button
          onClick={onNewInspiration}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-all duration-150 group"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/25 transition-colors">
            <Image size={14} className="text-purple-400" />
          </div>
          <span>Inspiration Mode</span>
          <ChevronRight size={14} className="ml-auto text-gray-600 group-hover:text-gray-400" />
        </button>
      </div>

      <div className="mx-4 h-px bg-white/[0.05]" />

      {/* Project History */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center gap-2 px-2 mb-3">
          <Clock size={12} className="text-gray-500" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Projects</p>
        </div>

        {!mounted || projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center mb-3">
              <LayoutDashboard size={18} className="text-gray-600" />
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              No projects yet. Start by building from an idea or uploading inspiration.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-1">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="group relative"
                >
                  <button
                    onClick={() => setActiveProject(project.id)}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                      activeProjectId === project.id
                        ? 'bg-indigo-500/15 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                    aria-current={activeProjectId === project.id ? 'page' : undefined}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      project.mode === 'idea' ? 'bg-indigo-500/20' : 'bg-purple-500/20'
                    }`}>
                      {project.mode === 'idea'
                        ? <Lightbulb size={12} className="text-indigo-400" />
                        : <Image size={12} className="text-purple-400" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{project.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(project.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric'
                        })}
                      </p>
                    </div>
                    {activeProjectId === project.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    )}
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); deleteProject(project.id); }}
                    className="absolute right-2 top-2 w-6 h-6 rounded-lg hover:bg-red-500/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    aria-label={`Delete ${project.name}`}
                  >
                    <Trash2 size={11} className="text-red-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium">Builder</p>
            <p className="text-xs text-gray-500">Pro Plan</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>
      </div>
    </motion.aside>
  );
}

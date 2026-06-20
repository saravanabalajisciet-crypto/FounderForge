'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, TrendingUp, Plus, CheckCircle, ArrowRight } from 'lucide-react';
import type { ImprovementSuggestion } from '@/types';

interface ImprovementLoopProps {
  improvement: ImprovementSuggestion;
}

export function ImprovementLoop({ improvement }: ImprovementLoopProps) {
  const [view, setView] = useState<'before' | 'after'>('after');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Remove */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center">
              <Trash2 size={14} className="text-red-400" />
            </div>
            <h4 className="text-sm font-semibold text-red-400">Remove</h4>
            <span className="ml-auto text-xs text-gray-500">{improvement.toRemove.length}</span>
          </div>
          <div className="space-y-3">
            {improvement.toRemove.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                <p className="text-sm text-white font-medium mb-1">{item.feature}</p>
                <p className="text-xs text-gray-400">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improve */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-yellow-500/15 flex items-center justify-center">
              <TrendingUp size={14} className="text-yellow-400" />
            </div>
            <h4 className="text-sm font-semibold text-yellow-400">Improve</h4>
            <span className="ml-auto text-xs text-gray-500">{improvement.toImprove.length}</span>
          </div>
          <div className="space-y-3">
            {improvement.toImprove.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                <p className="text-sm text-white font-medium mb-1">{item.feature}</p>
                <p className="text-xs text-gray-400">{item.improvement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Plus size={14} className="text-emerald-400" />
            </div>
            <h4 className="text-sm font-semibold text-emerald-400">Add</h4>
            <span className="ml-auto text-xs text-gray-500">{improvement.toAdd.length}</span>
          </div>
          <div className="space-y-3">
            {improvement.toAdd.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-sm text-white font-medium mb-1">{item.feature}</p>
                <p className="text-xs text-gray-400">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimized MVP */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center">
            <CheckCircle size={14} className="text-indigo-400" />
          </div>
          <h4 className="text-sm font-semibold text-white">Optimized MVP</h4>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-medium border border-indigo-500/20">
            AI Recommended
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {improvement.optimizedMvp.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
              <CheckCircle size={13} className="text-indigo-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After Toggle */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-4 mb-5">
          <h4 className="text-sm font-semibold text-white">Blueprint Comparison</h4>
          <div className="flex glass rounded-xl overflow-hidden ml-auto border border-white/[0.06]">
            <button
              onClick={() => setView('before')}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                view === 'before' ? 'bg-red-500/20 text-red-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Original
            </button>
            <button
              onClick={() => setView('after')}
              className={`px-4 py-2 text-xs font-medium transition-colors ${
                view === 'after' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Improved
            </button>
          </div>
        </div>

        <motion.div
          key={view}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {view === 'before' ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                <p className="text-xs font-medium text-red-400 mb-2">Problem Statement</p>
                <p className="text-sm text-gray-300">{improvement.originalBlueprint.problemStatement}</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                <p className="text-xs font-medium text-red-400 mb-2">Original MVP Features</p>
                <ul className="space-y-1">
                  {improvement.originalBlueprint.mvpFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1 h-1 rounded-full bg-red-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-medium text-emerald-400">Refined Problem Statement</p>
                  <ArrowRight size={12} className="text-emerald-400" />
                </div>
                <p className="text-sm text-gray-300">{improvement.improvedBlueprint.problemStatement}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs font-medium text-emerald-400 mb-2">Improved MVP Features</p>
                <ul className="space-y-1">
                  {improvement.improvedBlueprint.mvpFeatures.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle size={11} className="text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-xs font-medium text-emerald-400 mb-2">Refined Unique Value</p>
                <p className="text-sm text-gray-300">{improvement.improvedBlueprint.uniqueValue}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

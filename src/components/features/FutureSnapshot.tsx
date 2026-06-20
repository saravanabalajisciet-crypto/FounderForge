'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Layout, Sparkles, Palette, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { FutureSnapshot as FutureSnapshotType } from '@/types';

interface FutureSnapshotProps {
  snapshot: FutureSnapshotType;
}

export function FutureSnapshot({ snapshot }: FutureSnapshotProps) {
  const [activeScreen, setActiveScreen] = useState(0);

  const screen = snapshot.screens[activeScreen];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* App Header */}
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles size={22} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1">{snapshot.appName}</h2>
              <p className="text-gray-400 text-sm italic">&ldquo;{snapshot.tagline}&rdquo;</p>
              <p className="text-gray-500 text-xs mt-2">{snapshot.colorScheme}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {snapshot.navigationStructure.map((nav, i) => (
              <span key={i} className="px-3 py-1.5 rounded-full glass text-xs text-gray-300 border border-white/[0.08]">
                {nav}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Phone Mockup + Screen Details */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Phone Mockup */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center">
          <div className="w-full max-w-[220px]">
            {/* Phone Frame */}
            <div className="relative bg-gray-900 rounded-[32px] p-3 shadow-2xl border-2 border-gray-700">
              {/* Notch */}
              <div className="w-20 h-5 bg-gray-900 rounded-full mx-auto mb-2 flex items-center justify-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-700" />
                <div className="w-10 h-1 rounded-full bg-gray-700" />
              </div>

              {/* Screen */}
              <div className="bg-gray-950 rounded-2xl overflow-hidden" style={{ minHeight: 380 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 space-y-2.5"
                  >
                    {/* Status Bar */}
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-gray-400">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-1.5 bg-gray-600 rounded-sm" />
                        <div className="w-1.5 h-1.5 bg-gray-600 rounded-sm" />
                      </div>
                    </div>

                    {/* Screen Title */}
                    <div className="text-[11px] font-bold text-white">{screen.name}</div>

                    {/* Mock Layout */}
                    {screen.components.map((comp, ci) => (
                      <div
                        key={ci}
                        className={`rounded-lg p-2 ${
                          ci === 0
                            ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 h-16'
                            : ci % 3 === 1
                            ? 'bg-white/[0.05] h-8'
                            : 'bg-white/[0.03] h-6'
                        }`}
                      >
                        <span className="text-[8px] text-gray-500 truncate block">{comp}</span>
                      </div>
                    ))}

                    {/* Bottom Nav */}
                    <div className="flex justify-around pt-1 border-t border-white/[0.05]">
                      {snapshot.navigationStructure.slice(0, 5).map((nav, ni) => (
                        <div key={ni} className={`flex flex-col items-center gap-0.5 ${ni === 0 ? 'text-indigo-400' : 'text-gray-600'}`}>
                          <div className={`w-3 h-3 rounded ${ni === 0 ? 'bg-indigo-500' : 'bg-gray-700'}`} />
                          <span className="text-[6px]">{nav.slice(0, 5)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home indicator */}
              <div className="w-24 h-1 bg-gray-600 rounded-full mx-auto mt-2" />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 mt-5">
            <button
              onClick={() => setActiveScreen(s => Math.max(0, s - 1))}
              disabled={activeScreen === 0}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 transition-all"
              aria-label="Previous screen"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {snapshot.screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreen(i)}
                  className={`rounded-full transition-all ${i === activeScreen ? 'w-5 h-1.5 bg-indigo-400' : 'w-1.5 h-1.5 bg-gray-600'}`}
                  aria-label={`Go to screen ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveScreen(s => Math.min(snapshot.screens.length - 1, s + 1))}
              disabled={activeScreen === snapshot.screens.length - 1}
              className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 transition-all"
              aria-label="Next screen"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Screen Details */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Layout size={13} className="text-indigo-400" />
                </div>
                <h4 className="text-sm font-semibold text-white">{screen.name}</h4>
                <span className="ml-auto text-[10px] text-gray-500">Screen {activeScreen + 1}/{snapshot.screens.length}</span>
              </div>

              <p className="text-gray-300 text-sm">{screen.description}</p>

              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">Layout Pattern</p>
                <p className="text-sm text-indigo-300 italic">{screen.layout}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">Components</p>
                <div className="space-y-1.5">
                  {screen.components.map((comp, ci) => (
                    <div key={ci} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                      {comp}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Screen Selector */}
          <div className="space-y-2">
            {snapshot.screens.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveScreen(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  activeScreen === i
                    ? 'bg-indigo-500/15 border border-indigo-500/30'
                    : 'glass glass-hover border border-transparent'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  activeScreen === i ? 'bg-indigo-500 text-white' : 'bg-white/[0.05] text-gray-500'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-medium ${activeScreen === i ? 'text-white' : 'text-gray-400'}`}>
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Widgets & Design Principles */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-pink-500/15 flex items-center justify-center">
              <Smartphone size={13} className="text-pink-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Key Widgets</h4>
          </div>
          <div className="space-y-2">
            {snapshot.keyWidgets.map((widget, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02]">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{widget}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-yellow-500/15 flex items-center justify-center">
              <Star size={13} className="text-yellow-400" />
            </div>
            <h4 className="text-sm font-semibold text-white">Design Principles</h4>
          </div>
          <div className="space-y-2">
            {snapshot.designPrinciples.map((principle, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02]">
                <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-400 text-[10px] font-bold">{i + 1}</span>
                </div>
                <span className="text-gray-300 text-sm">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

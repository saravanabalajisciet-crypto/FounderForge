'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, AlertCircle, Lightbulb, Star } from 'lucide-react';
import type { Persona } from '@/types';

interface PersonaFeedbackProps {
  personas: Persona[];
}

export function PersonaFeedback({ personas }: PersonaFeedbackProps) {
  const [activePersona, setActivePersona] = useState(0);
  const persona = personas[activePersona];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Persona Selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {personas.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivePersona(i)}
            className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 ${
              activePersona === i
                ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                : 'border-white/[0.06] glass text-gray-400 hover:text-white hover:border-white/[0.12]'
            }`}
            aria-pressed={activePersona === i}
          >
            <span className="text-2xl">{p.avatar}</span>
            <div className="text-left">
              <p className="text-xs font-semibold">{p.name}</p>
              <p className="text-[10px] text-gray-500">{p.role}</p>
            </div>
            <div className="flex ml-1">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  size={9}
                  className={si < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Active Persona Detail */}
      <motion.div
        key={activePersona}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        {/* Bio */}
        <div className="glass rounded-2xl p-5 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center text-3xl flex-shrink-0">
            {persona.avatar}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-base font-bold text-white">{persona.name}</h3>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 text-[10px] font-medium border border-indigo-500/25">
                {persona.role}
              </span>
              <span className="text-gray-500 text-xs">Age {persona.age}</span>
            </div>
            <p className="text-gray-400 text-sm">{persona.bio}</p>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star
                  key={si}
                  size={13}
                  className={si < persona.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
              ))}
              <span className="text-yellow-400 text-xs ml-1 font-medium">{persona.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Feedback Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Positive */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <ThumbsUp size={14} className="text-emerald-400" />
              </div>
              <h4 className="text-sm font-semibold text-emerald-400">Loves</h4>
            </div>
            <ul className="space-y-2.5">
              {(persona.positiveFeedback ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Negative */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center">
                <ThumbsDown size={14} className="text-red-400" />
              </div>
              <h4 className="text-sm font-semibold text-red-400">Dislikes</h4>
            </div>
            <ul className="space-y-2.5">
              {(persona.negativeFeedback ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Missing */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-yellow-500/15 flex items-center justify-center">
                <AlertCircle size={14} className="text-yellow-400" />
              </div>
              <h4 className="text-sm font-semibold text-yellow-400">Missing Features</h4>
            </div>
            <ul className="space-y-2.5">
              {(persona.missingFeatures ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <Lightbulb size={14} className="text-blue-400" />
              </div>
              <h4 className="text-sm font-semibold text-blue-400">Suggestions</h4>
            </div>
            <ul className="space-y-2.5">
              {persona.suggestions.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

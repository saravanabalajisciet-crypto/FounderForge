'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';

const EXAMPLES = [
  'Build a Student Travel Planner',
  'Build an AI Fitness Coach for Students',
  'Build a Food Delivery Platform for College Campuses',
  'Build a Peer-to-Peer Tutoring Marketplace',
  'Build a Micro-Investment App for Gen Z',
];

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  isLoading?: boolean;
}

export function IdeaInput({ onSubmit, isLoading = false }: IdeaInputProps) {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim() && !isLoading) {
      onSubmit(idea.trim());
    }
  };

  return (
    <div className="flex-1 overflow-y-auto grid-bg flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center mb-5 shadow-xl shadow-indigo-500/20">
            <Lightbulb size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Build From Idea</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Describe your product idea and FounderForge AI will generate a complete blueprint, architecture, database, APIs, user testing, and a future snapshot.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="glass rounded-2xl p-2">
            <textarea
              value={idea}
              onChange={e => setIdea(e.target.value)}
              placeholder="Build a Student Travel Planner that helps college students find affordable trips, split costs with friends, and discover student discounts..."
              className="w-full bg-transparent text-gray-100 placeholder-gray-600 text-sm leading-relaxed resize-none outline-none p-4 min-h-[120px]"
              aria-label="Product idea"
              disabled={isLoading}
            />
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="text-xs text-gray-600">{idea.length} / 500</span>
              <button
                type="submit"
                disabled={!idea.trim() || isLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-500/30 disabled:cursor-not-allowed text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-500/20"
              >
                {isLoading ? (
                  <>
                    <Sparkles size={15} className="animate-pulse" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Blueprint
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Examples */}
        <div className="mt-6">
          <p className="text-xs text-gray-600 font-medium uppercase tracking-wider mb-3">Try an example</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map(ex => (
              <button
                key={ex}
                onClick={() => setIdea(ex)}
                disabled={isLoading}
                className="px-3 py-2 rounded-xl glass glass-hover text-xs text-gray-400 hover:text-white transition-all"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

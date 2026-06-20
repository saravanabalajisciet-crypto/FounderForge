'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import type { GenerationStep } from '@/types';

interface Step {
  id: GenerationStep;
  label: string;
  description: string;
}

const STEPS: Step[] = [
  { id: 'blueprint',    label: 'Product Blueprint',     description: 'Defining problem, audience & features' },
  { id: 'architecture', label: 'Architecture Design',   description: 'Planning system components & flows' },
  { id: 'database',     label: 'Database Schema',        description: 'Designing tables & relationships' },
  { id: 'api',          label: 'API Specification',      description: 'Defining endpoints & contracts' },
  { id: 'personas',     label: 'User Personas',          description: 'Creating realistic user profiles' },
  { id: 'feedback',     label: 'Virtual Testing',        description: 'Simulating user feedback' },
  { id: 'improvement',  label: 'AI Improvement Loop',   description: 'Optimizing based on insights' },
  { id: 'snapshot',     label: 'Future Snapshot',        description: 'Visualizing the final product' },
];

const stepOrder = STEPS.map(s => s.id);

interface GenerationProgressProps {
  currentStep: GenerationStep;
}

export function GenerationProgress({ currentStep }: GenerationProgressProps) {
  const currentIndex = stepOrder.indexOf(currentStep as Exclude<GenerationStep, 'idle' | 'complete'>);

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">Generating your product plan…</h3>
      <div className="space-y-2">
        {STEPS.map((step, i) => {
          const isDone = currentIndex > i;
          const isActive = currentIndex === i;
          const isPending = currentIndex < i;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive ? 'bg-indigo-500/10 border border-indigo-500/20' : ''
              }`}
            >
              <div className="flex-shrink-0">
                {isDone ? (
                  <CheckCircle size={16} className="text-emerald-400" />
                ) : isActive ? (
                  <Loader2 size={16} className="text-indigo-400 animate-spin" />
                ) : (
                  <Circle size={16} className="text-gray-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium ${isDone ? 'text-emerald-400' : isActive ? 'text-indigo-300' : 'text-gray-600'}`}>
                  {step.label}
                </p>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-[10px] text-gray-500 mt-0.5"
                  >
                    {step.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

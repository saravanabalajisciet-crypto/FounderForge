'use client';

import { motion } from 'framer-motion';
import { Target, Users, Zap, Rocket, Code2, Star } from 'lucide-react';
import type { Blueprint } from '@/types';

interface BlueprintCardProps {
  blueprint: Blueprint;
}

export function BlueprintCard({ blueprint }: BlueprintCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Problem Statement */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
            <Target size={16} className="text-red-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Problem Statement</h3>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{blueprint.problemStatement}</p>
      </div>

      {/* Two Column */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Target Audience */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <Users size={16} className="text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Target Audience</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{blueprint.targetAudience}</p>
        </div>

        {/* Unique Value */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/15 flex items-center justify-center">
              <Star size={16} className="text-yellow-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Unique Value</h3>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{blueprint.uniqueValue}</p>
        </div>
      </div>

      {/* Core Features */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
            <Zap size={16} className="text-purple-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Core Features</h3>
          <span className="ml-auto text-xs text-gray-500">{blueprint.coreFeatures.length} features</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {blueprint.coreFeatures?.map((feature, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
              <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-[9px] font-bold">{i + 1}</span>
              </div>
              <span className="text-gray-300 text-xs leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MVP Features */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
            <Rocket size={16} className="text-emerald-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">MVP Features</h3>
          <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
            Launch Ready
          </span>
        </div>
        <div className="space-y-2">
          {blueprint.mvpFeatures?.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
            <Code2 size={16} className="text-cyan-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Recommended Tech Stack</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {blueprint.techStack?.map((tech, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

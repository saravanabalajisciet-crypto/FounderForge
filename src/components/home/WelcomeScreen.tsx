'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Image, ArrowRight, Zap, Users, GitBranch, Eye } from 'lucide-react';

interface WelcomeScreenProps {
  onBuildIdea: () => void;
  onInspiration: () => void;
}

const features = [
  { icon: GitBranch, label: 'Product Blueprint', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { icon: Zap, label: 'Architecture Design', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Users, label: 'Virtual User Testing', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { icon: Eye, label: 'Future Snapshot', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
];

const examples = [
  'Student Travel Planner',
  'AI Fitness Coach',
  'Food Delivery for Campuses',
  'Remote Team Collaboration',
  'Personal Finance Tracker',
];

export function WelcomeScreen({ onBuildIdea, onInspiration }: WelcomeScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto grid-bg">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
          >
            <Zap size={12} className="text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300">Powered by Gemini AI</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
          </motion.div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Build Smarter<br />
            <span className="gradient-text">Before You Build Bigger</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Transform your idea into a full product blueprint, validated by AI-simulated users, 
            complete with architecture, database design, and a future snapshot — all before writing a single line of code.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07 }}
                className={`flex items-center gap-2 ${f.bg} rounded-full px-4 py-2`}
              >
                <f.icon size={13} className={f.color} />
                <span className={`text-xs font-medium ${f.color}`}>{f.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {/* Build From Idea */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onBuildIdea}
            className="glass glass-hover rounded-2xl p-7 text-left group transition-all duration-300 border border-indigo-500/0 hover:border-indigo-500/20 hover:glow-purple"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Lightbulb size={22} className="text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                <ArrowRight size={15} className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">Build From Idea</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Describe your startup or app concept and let AI generate a complete product plan with architecture, database, APIs, and user validation.
            </p>

            <div className="space-y-1.5">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Examples</p>
              {examples.slice(0, 3).map((ex) => (
                <div key={ex} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-indigo-500" />
                  <span className="text-xs text-gray-500">{ex}</span>
                </div>
              ))}
            </div>
          </motion.button>

          {/* Inspiration Mode */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            onClick={onInspiration}
            className="glass glass-hover rounded-2xl p-7 text-left group transition-all duration-300 border border-purple-500/0 hover:border-purple-500/20"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Image size={22} className="text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <ArrowRight size={15} className="text-gray-500 group-hover:text-purple-400 transition-colors" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">Inspiration Mode</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Upload a screenshot of any existing app. AI extracts its structure, then you describe your niche twist to generate an improved product blueprint.
            </p>

            <div className="space-y-1.5">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Upload Screenshots of</p>
              {['Instagram', 'Spotify', 'Uber', 'Swiggy'].map((app) => (
                <div key={app} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-purple-500" />
                  <span className="text-xs text-gray-500">{app}</span>
                </div>
              ))}
            </div>
          </motion.button>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { value: '7', label: 'AI Modules', suffix: '+' },
            { value: '< 3', label: 'Minutes to Blueprint', suffix: 'min' },
            { value: '100%', label: 'AI Powered', suffix: '' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold gradient-text-blue">
                {stat.value}<span className="text-lg">{stat.suffix}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

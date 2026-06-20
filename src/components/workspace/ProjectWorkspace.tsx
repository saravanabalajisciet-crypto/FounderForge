'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch, Server, Database, Globe, Users, TrendingUp, Eye, Briefcase, BarChart3, Rocket,
  CheckCircle, Loader2, ChevronRight
} from 'lucide-react';
import type { Project, GenerationStep } from '@/types';
import { BlueprintCard } from '@/components/features/BlueprintCard';
import { ArchitectureVisualizer } from '@/components/features/ArchitectureVisualizer';
import { DatabaseSchema } from '@/components/features/DatabaseSchema';
import { ApiDesign } from '@/components/features/ApiDesign';
import { PersonaFeedback } from '@/components/features/PersonaFeedback';
import { CeoReview } from '@/components/features/CeoReview';
import { MarketAnalysis } from '@/components/features/MarketAnalysis';
import { ImprovementLoop } from '@/components/features/ImprovementLoop';
import { LaunchPreview } from '@/components/features/LaunchPreview';
import { FutureSnapshot } from '@/components/features/FutureSnapshot';
import { GenerationProgress } from '@/components/workspace/GenerationProgress';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  step: GenerationStep;
  color: string;
}

const TABS: Tab[] = [
  { id: 'launch',       label: 'Launch Preview',icon: Rocket,    step: 'launchPreview', color: 'text-cyan-400' },
  { id: 'blueprint',    label: 'Blueprint',     icon: GitBranch, step: 'blueprint',    color: 'text-indigo-400' },
  { id: 'architecture', label: 'Architecture',  icon: Server,    step: 'architecture', color: 'text-purple-400' },
  { id: 'database',     label: 'Database',      icon: Database,  step: 'database',     color: 'text-yellow-400' },
  { id: 'api',          label: 'API',            icon: Globe,     step: 'api',          color: 'text-green-400' },
  { id: 'personas',     label: 'User Testing',  icon: Users,     step: 'personas',     color: 'text-pink-400' },
  { id: 'ceoreview',    label: 'CEO Review',    icon: Briefcase, step: 'ceoReview',    color: 'text-red-400' },
  { id: 'market',       label: 'Market',        icon: BarChart3, step: 'marketAnalysis', color: 'text-blue-400' },
  { id: 'improvement',  label: 'AI Improve',    icon: TrendingUp,step: 'improvement',  color: 'text-orange-400' },
  { id: 'snapshot',     label: 'Snapshot',      icon: Eye,       step: 'snapshot',     color: 'text-emerald-400' },
];

const stepOrder: GenerationStep[] = [
  'blueprint', 'architecture', 'database', 'api',
  'personas', 'feedback', 'ceoReview', 'marketAnalysis', 'improvement', 'launchPreview', 'snapshot', 'complete'
];

function isStepComplete(project: Project, step: GenerationStep): boolean {
  const idx = stepOrder.indexOf(step);
  const currentIdx = stepOrder.indexOf(project.currentStep);
  return currentIdx > idx;
}

function isStepActive(project: Project, step: GenerationStep): boolean {
  return project.currentStep === step;
}

interface ProjectWorkspaceProps {
  project: Project;
}

export function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('launch');
  const isGenerating = project.currentStep !== 'complete' && project.currentStep !== 'idle';

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Project Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-white/[0.06] flex items-center gap-4">
        <div>
          <h2 className="text-base font-semibold text-white">{project.name}</h2>
          <p className="text-xs text-gray-500 capitalize">
            {project.mode === 'idea' ? '💡 Build From Idea' : '📸 Inspiration Mode'} ·{' '}
            {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
        {project.currentStep === 'complete' && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle size={12} className="text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">Complete</span>
          </div>
        )}
        {isGenerating && (
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <Loader2 size={12} className="text-indigo-400 animate-spin" />
            <span className="text-xs text-indigo-400 font-medium">Generating…</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left: Generation Progress or Tab Nav */}
        <div className="w-56 flex-shrink-0 border-r border-white/[0.06] overflow-y-auto p-4 space-y-2">
          {isGenerating ? (
            <GenerationProgress currentStep={project.currentStep} />
          ) : (
            <>
              <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider px-2 mb-3">Sections</p>
              {TABS.map(tab => {
                const done = isStepComplete(project, tab.step);
                const active = activeTab === tab.id;
                const hasData = getTabHasData(project, tab.id);
                if (!hasData && project.currentStep === 'complete') return null;

                return (
                  <button
                    key={tab.id}
                    onClick={() => hasData && setActiveTab(tab.id)}
                    disabled={!hasData}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                      active && hasData
                        ? 'bg-white/[0.08] text-white'
                        : hasData
                        ? 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                        : 'text-gray-700 cursor-not-allowed'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <tab.icon size={14} className={hasData ? tab.color : 'text-gray-700'} />
                    <span className="text-xs font-medium flex-1">{tab.label}</span>
                    {done && hasData && (
                      <CheckCircle size={11} className="text-emerald-400" />
                    )}
                    {isStepActive(project, tab.step) && (
                      <Loader2 size={11} className="text-indigo-400 animate-spin" />
                    )}
                    {!hasData && !isStepActive(project, tab.step) && (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Right: Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {isGenerating && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 flex items-center justify-center mb-5">
                <Loader2 size={28} className="text-indigo-400 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI is thinking…</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                FounderForge AI is generating your complete product plan. This usually takes 1–3 minutes.
              </p>
            </div>
          )}

          {!isGenerating && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'blueprint' && project.blueprint && (
                  <BlueprintCard blueprint={project.blueprint} />
                )}
                {activeTab === 'architecture' && project.architecture && (
                  <ArchitectureVisualizer architecture={project.architecture} />
                )}
                {activeTab === 'database' && project.database && (
                  <DatabaseSchema database={project.database} />
                )}
                {activeTab === 'api' && project.api && (
                  <ApiDesign api={project.api} />
                )}
                {activeTab === 'personas' && project.personas && (
                  <PersonaFeedback personas={project.personas} />
                )}
                {activeTab === 'ceoreview' && project.ceoReview && (
                  <CeoReview ceoReview={project.ceoReview} />
                )}
                {activeTab === 'market' && project.marketAnalysis && (
                  <MarketAnalysis marketAnalysis={project.marketAnalysis} />
                )}
                {activeTab === 'improvement' && project.improvement && (
                  <ImprovementLoop improvement={project.improvement} />
                )}
                {activeTab === 'launch' && project.launchPreview && (
                  <LaunchPreview launchPreview={project.launchPreview} />
                )}
                {activeTab === 'snapshot' && project.snapshot && (
                  <FutureSnapshot snapshot={project.snapshot} />
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

function getTabHasData(project: Project, tabId: string): boolean {
  switch (tabId) {
    case 'blueprint':    return !!project.blueprint;
    case 'architecture': return !!project.architecture;
    case 'database':     return !!project.database;
    case 'api':          return !!project.api;
    case 'personas':     return !!project.personas;
    case 'ceoreview':    return !!project.ceoReview;
    case 'market':       return !!project.marketAnalysis;
    case 'improvement':  return !!project.improvement;
    case 'launch':       return !!project.launchPreview;
    case 'snapshot':     return !!project.snapshot;
    default:             return false;
  }
}

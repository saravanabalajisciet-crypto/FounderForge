'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useProjectStore } from '@/store/projectStore';
import { useProjectGenerator } from '@/hooks/useProjectGenerator';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopNav } from '@/components/layout/TopNav';
import { WelcomeScreen } from '@/components/home/WelcomeScreen';
import { IdeaInput } from '@/components/workspace/IdeaInput';
import { InspirationInput } from '@/components/workspace/InspirationInput';
import { ProjectWorkspace } from '@/components/workspace/ProjectWorkspace';
import type { InspirationAnalysis } from '@/types';

type View = 'welcome' | 'idea' | 'inspiration';

export default function Home() {
  const [view, setView] = useState<View>('welcome');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client mount before reading persisted store
  useEffect(() => { setMounted(true); }, []);

  const { getActiveProject, sidebarOpen, setActiveProject } = useProjectStore();
  const { generateFromIdea, generateFromInspiration } = useProjectGenerator();

  const activeProject = mounted ? getActiveProject() : null;

  const handleIdeaSubmit = async (idea: string) => {
    setIsGenerating(true);
    setView('welcome');
    try {
      await generateFromIdea(idea);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInspirationSubmit = async (
    base64: string,
    mimeType: string,
    customPrompt: string,
    analysis: InspirationAnalysis
  ) => {
    setIsGenerating(true);
    setView('welcome');
    try {
      await generateFromInspiration(base64, mimeType, customPrompt, analysis);
    } finally {
      setIsGenerating(false);
    }
  };

  const goToIdea = () => { setActiveProject(null); setView('idea'); };
  const goToInspiration = () => { setActiveProject(null); setView('inspiration'); };

  const showProject = mounted && !!activeProject;
  const showIdea = !showProject && view === 'idea';
  const showInspiration = !showProject && view === 'inspiration';
  const showWelcome = !showProject && !showIdea && !showInspiration;

  // Render a minimal shell until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="h-screen flex overflow-hidden bg-[#020408]">
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="h-14 flex-shrink-0 border-b border-white/[0.06]" />
          <div className="flex-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-[#020408]">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar
            key="sidebar"
            onNewIdea={goToIdea}
            onNewInspiration={goToInspiration}
          />
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />

        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {showProject && (
              <ProjectWorkspace key={activeProject!.id} project={activeProject!} />
            )}
            {showIdea && (
              <IdeaInput key="idea" onSubmit={handleIdeaSubmit} isLoading={isGenerating} />
            )}
            {showInspiration && (
              <InspirationInput key="inspiration" onSubmit={handleInspirationSubmit} isLoading={isGenerating} />
            )}
            {showWelcome && (
              <WelcomeScreen key="welcome" onBuildIdea={goToIdea} onInspiration={goToInspiration} />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

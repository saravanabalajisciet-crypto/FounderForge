import { create } from 'zustand';
import type { Project, GenerationStep } from '@/types';

interface ProjectStore {
  projects: Project[];
  activeProjectId: string | null;
  sidebarOpen: boolean;

  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  setActiveProject: (id: string | null) => void;
  deleteProject: (id: string) => void;
  toggleSidebar: () => void;
  getActiveProject: () => Project | null;
  setStep: (id: string, step: GenerationStep) => void;
}

export const useProjectStore = create<ProjectStore>()(
  (set, get) => ({
    projects: [],
    activeProjectId: null,
    sidebarOpen: true,

    addProject: (project) =>
      set((state) => ({
        projects: [project, ...state.projects],
        activeProjectId: project.id,
      })),

    updateProject: (id, updates) =>
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        ),
      })),

    setActiveProject: (id) => set({ activeProjectId: id }),

    deleteProject: (id) =>
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        activeProjectId:
          state.activeProjectId === id ? null : state.activeProjectId,
      })),

    toggleSidebar: () =>
      set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    getActiveProject: () => {
      const state = get();
      return state.projects.find((p) => p.id === state.activeProjectId) ?? null;
    },

    setStep: (id, step) =>
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? { ...p, currentStep: step } : p
        ),
      })),
  })
);

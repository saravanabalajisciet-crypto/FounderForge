'use client';

import { useCallback } from 'react';
import { useProjectStore } from '@/store/projectStore';
import type { Blueprint, InspirationAnalysis, Project } from '@/types';

async function post<T>(url: string, body: object): Promise<T> {
  let lastError: Error | null = null;
  const maxRetries = 3;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        const errorMsg = err.error ?? 'Request failed';
        
        // Check if it's a quota error (429)
        if (res.status === 429 && attempt < maxRetries - 1) {
          const retryAfter = err.details?.[2]?.retryDelay 
            ? parseInt(err.details[2].retryDelay) * 1000 
            : (attempt + 1) * 2000; // exponential backoff
          
          console.log(`Quota exceeded. Retrying in ${retryAfter}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryAfter));
          continue;
        }
        
        throw new Error(errorMsg);
      }
      
      return res.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < maxRetries - 1) {
        const backoffTime = (attempt + 1) * 1000;
        console.log(`Request failed, retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }
  
  throw lastError || new Error('Request failed after retries');
}

export function useProjectGenerator() {
  const { addProject, updateProject, setStep } = useProjectStore();

  const generateFromIdea = useCallback(async (idea: string) => {
    const id = `proj_${Date.now()}`;
    const name = idea.length > 40 ? idea.slice(0, 37) + '…' : idea;

    const project: Project = {
      id,
      name,
      mode: 'idea',
      idea,
      currentStep: 'blueprint',
      createdAt: new Date().toISOString(),
    };
    addProject(project);

    try {
      // 1. Blueprint
      setStep(id, 'blueprint');
      const { blueprint } = await post<{ blueprint: Blueprint }>(
        '/api/generate/blueprint',
        { idea }
      );
      updateProject(id, { blueprint });

      // 2. Architecture
      setStep(id, 'architecture');
      const { architecture } = await post<{ architecture: Project['architecture'] }>(
        '/api/generate/architecture',
        { idea, blueprint }
      );
      updateProject(id, { architecture });

      // 3. Database
      setStep(id, 'database');
      const { database } = await post<{ database: Project['database'] }>(
        '/api/generate/database',
        { idea, blueprint }
      );
      updateProject(id, { database });

      // 4. API
      setStep(id, 'api');
      const { api } = await post<{ api: Project['api'] }>(
        '/api/generate/api',
        { idea, blueprint }
      );
      updateProject(id, { api });

      // 5. Personas
      setStep(id, 'personas');
      const { personas } = await post<{ personas: Project['personas'] }>(
        '/api/generate/personas',
        { idea, blueprint }
      );
      updateProject(id, { personas });

      // 6. Improvement (uses personas feedback)
      setStep(id, 'feedback');
      setStep(id, 'improvement');
      const { improvement } = await post<{ improvement: Project['improvement'] }>(
        '/api/generate/improvement',
        { idea, blueprint, personas }
      );
      updateProject(id, { improvement });

      // 7. CEO Review
      setStep(id, 'ceoReview');
      const feedbackSummary = personas
        ?.map((p) => `${p.name}: ${p.positiveFeedback[0] || ''} / Risk: ${p.negativeFeedback[0] || ''}`)
        .join('; ') || 'User feedback analyzed';
      const { ceoReview } = await post<{ ceoReview: Project['ceoReview'] }>(
        '/api/generate/ceoreview',
        { idea, blueprint, feedback: feedbackSummary }
      );
      updateProject(id, { ceoReview });

      // 8. Market Analysis
      setStep(id, 'marketAnalysis');
      const { marketAnalysis } = await post<{ marketAnalysis: Project['marketAnalysis'] }>(
        '/api/generate/marketanalysis',
        { idea, blueprint }
      );
      updateProject(id, { marketAnalysis });

      // 9. Launch Preview
      setStep(id, 'launchPreview');
      const improvedBlueprint = improvement?.improvedBlueprint ?? blueprint;
      const { launchPreview } = await post<{ launchPreview: Project['launchPreview'] }>(
        '/api/generate/launchpreview',
        { idea, blueprint: improvedBlueprint, improvement }
      );
      updateProject(id, { launchPreview });

      // 10. Snapshot (now called last)
      setStep(id, 'snapshot');
      const { snapshot } = await post<{ snapshot: Project['snapshot'] }>(
        '/api/generate/snapshot',
        { idea, improvedBlueprint }
      );
      updateProject(id, { snapshot });

      // Done
      setStep(id, 'complete');
    } catch (err) {
      console.error('Generation failed:', err);
      setStep(id, 'complete');
    }
  }, [addProject, updateProject, setStep]);

  const generateFromInspiration = useCallback(async (
    base64Image: string,
    mimeType: string,
    customPrompt: string,
    analysis: InspirationAnalysis
  ) => {
    const id = `proj_${Date.now()}`;
    const name = customPrompt.length > 40 ? customPrompt.slice(0, 37) + '…' : customPrompt;

    const project: Project = {
      id,
      name,
      mode: 'inspiration',
      customPrompt,
      inspirationAnalysis: analysis,
      currentStep: 'blueprint',
      createdAt: new Date().toISOString(),
    };
    addProject(project);

    try {
      // 1. Blueprint (inspired)
      setStep(id, 'blueprint');
      const { blueprint } = await post<{ blueprint: Blueprint }>(
        '/api/generate/blueprint',
        { mode: 'inspiration', analysis, customPrompt }
      );
      updateProject(id, { blueprint });

      // 2-7 same as idea flow
      setStep(id, 'architecture');
      const { architecture } = await post<{ architecture: Project['architecture'] }>(
        '/api/generate/architecture',
        { idea: customPrompt, blueprint }
      );
      updateProject(id, { architecture });

      setStep(id, 'database');
      const { database } = await post<{ database: Project['database'] }>(
        '/api/generate/database',
        { idea: customPrompt, blueprint }
      );
      updateProject(id, { database });

      setStep(id, 'api');
      const { api } = await post<{ api: Project['api'] }>(
        '/api/generate/api',
        { idea: customPrompt, blueprint }
      );
      updateProject(id, { api });

      setStep(id, 'personas');
      const { personas } = await post<{ personas: Project['personas'] }>(
        '/api/generate/personas',
        { idea: customPrompt, blueprint }
      );
      updateProject(id, { personas });

      setStep(id, 'improvement');
      const { improvement } = await post<{ improvement: Project['improvement'] }>(
        '/api/generate/improvement',
        { idea: customPrompt, blueprint, personas }
      );
      updateProject(id, { improvement });

      setStep(id, 'ceoReview');
      const feedbackSummary = personas
        ?.map((p) => `${p.name}: ${p.positiveFeedback[0] || ''} / Risk: ${p.negativeFeedback[0] || ''}`)
        .join('; ') || 'User feedback analyzed';
      const { ceoReview } = await post<{ ceoReview: Project['ceoReview'] }>(
        '/api/generate/ceoreview',
        { idea: customPrompt, blueprint, feedback: feedbackSummary }
      );
      updateProject(id, { ceoReview });

      setStep(id, 'marketAnalysis');
      const { marketAnalysis } = await post<{ marketAnalysis: Project['marketAnalysis'] }>(
        '/api/generate/marketanalysis',
        { idea: customPrompt, blueprint }
      );
      updateProject(id, { marketAnalysis });

      setStep(id, 'launchPreview');
      const improvedBlueprint = improvement?.improvedBlueprint ?? blueprint;
      const { launchPreview } = await post<{ launchPreview: Project['launchPreview'] }>(
        '/api/generate/launchpreview',
        { idea: customPrompt, blueprint: improvedBlueprint, improvement }
      );
      updateProject(id, { launchPreview });

      setStep(id, 'snapshot');
      const { snapshot } = await post<{ snapshot: Project['snapshot'] }>(
        '/api/generate/snapshot',
        { idea: customPrompt, improvedBlueprint }
      );
      updateProject(id, { snapshot });

      setStep(id, 'complete');
    } catch (err) {
      console.error('Inspiration generation failed:', err);
      setStep(id, 'complete');
    }
  }, [addProject, updateProject, setStep]);

  return { generateFromIdea, generateFromInspiration };
}

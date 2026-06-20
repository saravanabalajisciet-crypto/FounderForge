'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Upload, X, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import type { InspirationAnalysis } from '@/types';

interface InspirationInputProps {
  onSubmit: (base64: string, mimeType: string, customPrompt: string, analysis: InspirationAnalysis) => void;
  isLoading?: boolean;
}

const APP_EXAMPLES = ['Instagram', 'Spotify', 'Swiggy', 'Uber', 'Netflix', 'Airbnb', 'LinkedIn'];

export function InspirationInput({ onSubmit, isLoading = false }: InspirationInputProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<InspirationAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    const file = accepted[0];
    if (!file) return;
    setImageFile(file);
    setAnalysis(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    disabled: isLoading || analyzing,
  });

  const handleAnalyze = async () => {
    if (!imageFile || !imagePreview) return;
    setAnalyzing(true);
    setError(null);
    try {
      const base64 = imagePreview.split(',')[1];
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64Image: base64, mimeType: imageFile.type }),
      });
      if (!res.ok) throw new Error('Analysis failed');
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleGenerate = () => {
    if (!imageFile || !imagePreview || !analysis || !customPrompt.trim()) return;
    const base64 = imagePreview.split(',')[1];
    onSubmit(base64, imageFile.type, customPrompt.trim(), analysis);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
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
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 items-center justify-center mb-5 shadow-xl shadow-purple-500/20">
            <Image size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Inspiration Mode</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Upload a screenshot of any existing app. AI extracts its structure, then you describe your unique twist to generate a fresh product blueprint.
          </p>
        </div>

        <div className="space-y-4">
          {/* Drop Zone */}
          {!imagePreview ? (
            <div
              {...getRootProps()}
              className={`glass rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 border-2 border-dashed ${
                isDragActive
                  ? 'border-purple-500/60 bg-purple-500/10'
                  : 'border-white/[0.08] hover:border-purple-500/30 hover:bg-white/[0.03]'
              }`}
            >
              <input {...getInputProps()} aria-label="Upload screenshot" />
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 flex items-center justify-center mx-auto mb-4">
                <Upload size={22} className="text-purple-400" />
              </div>
              <p className="text-white font-medium mb-1">
                {isDragActive ? 'Drop it here!' : 'Drop a screenshot here'}
              </p>
              <p className="text-gray-500 text-sm">or click to browse — PNG, JPG, WEBP</p>
              <p className="text-gray-600 text-xs mt-3">Try screenshots of: {APP_EXAMPLES.join(' · ')}</p>
            </div>
          ) : (
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Image size={14} className="text-purple-400" />
                  <span className="text-sm text-gray-300">{imageFile?.name}</span>
                </div>
                <button
                  onClick={clearImage}
                  className="w-7 h-7 rounded-lg hover:bg-white/[0.08] flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex gap-4 p-4">
                <img
                  src={imagePreview}
                  alt="Uploaded screenshot"
                  className="w-32 h-32 object-cover rounded-xl border border-white/[0.08] flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-center">
                  {!analysis && !analyzing && (
                    <button
                      onClick={handleAnalyze}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-medium text-sm transition-all w-fit"
                    >
                      <Sparkles size={15} />
                      Analyze Screenshot
                    </button>
                  )}
                  {analyzing && (
                    <div className="flex items-center gap-3 text-purple-400">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">Analyzing with Gemini AI…</span>
                    </div>
                  )}
                  {analysis && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-xs text-emerald-400 font-medium">Analysis complete</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">{analysis.appCategory}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{analysis.productPurpose}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {analysis.coreFeatures.slice(0, 4).map((f, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] border border-purple-500/20">
                            {f}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Custom Prompt */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-2"
              >
                <div className="px-4 pt-3 pb-1">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Your twist on this app
                  </label>
                </div>
                <textarea
                  value={customPrompt}
                  onChange={e => setCustomPrompt(e.target.value)}
                  placeholder={`e.g. "Build ${analysis.appCategory} for college canteens" or "Build a niche version for remote workers"`}
                  className="w-full bg-transparent text-gray-100 placeholder-gray-600 text-sm leading-relaxed resize-none outline-none px-4 py-3 min-h-[80px]"
                  aria-label="Custom product direction"
                  disabled={isLoading}
                />
                <div className="flex items-center justify-end px-4 pb-3">
                  <button
                    onClick={handleGenerate}
                    disabled={!customPrompt.trim() || isLoading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:bg-purple-500/30 disabled:cursor-not-allowed text-white font-medium text-sm transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Generating…
                      </>
                    ) : (
                      <>
                        Generate Blueprint
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

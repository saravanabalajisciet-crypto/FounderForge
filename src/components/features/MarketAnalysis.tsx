'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, Target, Flame, Trophy, Lightbulb, Crosshair } from 'lucide-react';
import type { MarketAnalysis as MarketAnalysisType } from '@/types';

interface MarketAnalysisProps {
  marketAnalysis: MarketAnalysisType;
}

export function MarketAnalysis({ marketAnalysis }: MarketAnalysisProps) {
  const opportunityColor = marketAnalysis.opportunityScore >= 8 ? 'text-green-400' : 
                          marketAnalysis.opportunityScore >= 6 ? 'text-orange-400' : 
                          'text-red-400';

  const opportunityBg = marketAnalysis.opportunityScore >= 8 ? 'from-green-500 to-emerald-500' : 
                       marketAnalysis.opportunityScore >= 6 ? 'from-orange-500 to-yellow-500' : 
                       'from-red-500 to-pink-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Hero Opportunity Score */}
      <motion.div
        className="glass-premium rounded-3xl p-8 relative overflow-hidden glow-premium"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center glow-premium float-premium">
                  <Flame size={28} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Market Opportunity</p>
                  <h2 className="text-3xl font-black gradient-text-premium">Hot Market Alert</h2>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Our AI analyzed the competitive landscape and identified key market opportunities for this product.
              </p>
            </div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <div className={`text-6xl font-black ${opportunityColor} leading-none mb-2`}>
                {marketAnalysis.opportunityScore}
                <span className="text-3xl text-gray-500 ml-2">/10</span>
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < Math.floor(marketAnalysis.opportunityScore / 2) 
                        ? `bg-gradient-to-r ${opportunityBg}`
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {marketAnalysis.opportunityScore >= 8 ? 'Excellent' : 
                 marketAnalysis.opportunityScore >= 6 ? 'Good' : 'Moderate'} Opportunity
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Market Analysis Cards Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Competitors Card */}
        <motion.div
          className="glass-premium rounded-2xl p-6 card-premium relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center glow-premium">
                <Trophy size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">🏆 Competitors</h3>
                <p className="text-xs text-gray-500">Current Market Players</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {marketAnalysis.existingCompetitors.map((competitor, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-3 glass rounded-xl card-premium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {competitor.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-medium text-sm">{competitor}</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 pulse-premium" />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-3 glass rounded-xl">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Market Density</span>
                <span className="text-indigo-400 font-medium">
                  {marketAnalysis.existingCompetitors.length <= 3 ? 'Low' : 
                   marketAnalysis.existingCompetitors.length <= 5 ? 'Medium' : 'High'} Competition
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Market Gap Card */}
        <motion.div
          className="glass-premium rounded-2xl p-6 card-premium relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center glow-premium">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">💡 Market Gap</h3>
                <p className="text-xs text-gray-500">Opportunity Space</p>
              </div>
            </div>

            <div className="p-4 glass rounded-xl mb-4">
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {marketAnalysis.marketGap}
              </p>
              
              <div className="flex items-center gap-2">
                <Lightbulb size={14} className="text-blue-400" />
                <span className="text-xs text-blue-400 font-medium">Identified Opportunity</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <span className="text-xs text-gray-400">Gap Size</span>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-gray-800 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full" 
                    style={{width: `${(marketAnalysis.opportunityScore / 10) * 100}%`}}
                  />
                </div>
                <span className="text-xs text-blue-400 font-medium">
                  {Math.round((marketAnalysis.opportunityScore / 10) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Differentiation Card */}
        <motion.div
          className="glass-premium rounded-2xl p-6 card-premium relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-16 -mt-16" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-premium">
                <Crosshair size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">🎯 Differentiation</h3>
                <p className="text-xs text-gray-500">Competitive Edge</p>
              </div>
            </div>

            <div className="p-4 glass rounded-xl mb-4">
              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {marketAnalysis.differentiation}
              </p>
              
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-purple-400" />
                <span className="text-xs text-purple-400 font-medium">Unique Value Prop</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 glass rounded-xl">
                <div className="text-lg font-bold gradient-text-premium mb-1">
                  {marketAnalysis.existingCompetitors.length <= 3 ? 'High' : 
                   marketAnalysis.existingCompetitors.length <= 5 ? 'Med' : 'Low'}
                </div>
                <span className="text-xs text-gray-400">Differentiation</span>
              </div>
              <div className="text-center p-3 glass rounded-xl">
                <div className="text-lg font-bold gradient-text-premium mb-1">
                  {marketAnalysis.opportunityScore >= 7 ? 'Strong' : 
                   marketAnalysis.opportunityScore >= 5 ? 'Good' : 'Weak'}
                </div>
                <span className="text-xs text-gray-400">Position</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary Insight Card */}
      <motion.div
        className="glass-premium rounded-2xl p-6 border border-purple-500/20 glow-premium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-3">Market Reality Check</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Based on competitive analysis, this market shows {' '}
              {marketAnalysis.opportunityScore >= 7 ? 'strong potential' : 
               marketAnalysis.opportunityScore >= 5 ? 'moderate opportunity' : 'significant challenges'}
              {' '}for a new entrant. The identified gap provides a clear entry strategy, 
              but success will depend on execution and timing.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-xs text-gray-400">
                  {marketAnalysis.existingCompetitors.length} major competitors identified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-xs text-gray-400">
                  Market opportunity score: {marketAnalysis.opportunityScore}/10
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

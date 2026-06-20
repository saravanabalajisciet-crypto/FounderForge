'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Zap, Target, Star, User, Briefcase } from 'lucide-react';
import type { CeoReview as CeoReviewType } from '@/types';

interface CeoReviewProps {
  ceoReview: CeoReviewType;
}

// CEO Profile data (randomized for demo)
const ceoProfiles = [
  {
    name: "Sarah Chen",
    role: "Ex-Product Lead, Stripe",
    title: "Startup Advisor",
    avatar: "👩‍💼",
    background: "from-purple-500 to-pink-500"
  },
  {
    name: "Marcus Rodriguez", 
    role: "Former VP, Shopify",
    title: "Angel Investor",
    avatar: "👨‍💼",
    background: "from-blue-500 to-cyan-500"
  },
  {
    name: "Emily Zhang",
    role: "Ex-Director, Meta",
    title: "Product Strategist", 
    avatar: "👩‍🚀",
    background: "from-orange-500 to-red-500"
  }
];

export function CeoReview({ ceoReview }: CeoReviewProps) {
  const ceo = ceoProfiles[Math.floor(Math.random() * ceoProfiles.length)];
  
  const scoreColor = ceoReview.founderScore >= 8 ? 'text-green-400' : 
                     ceoReview.founderScore >= 6 ? 'text-orange-400' : 
                     'text-red-400';

  const scoreBg = ceoReview.founderScore >= 8 ? 'from-green-500/20 to-emerald-500/10' : 
                  ceoReview.founderScore >= 6 ? 'from-orange-500/20 to-yellow-500/10' : 
                  'from-red-500/20 to-pink-500/10';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Executive Header Card */}
      <motion.div
        className="glass-premium rounded-3xl p-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${scoreBg} opacity-50`} />
        <div className="relative">
          <div className="flex items-start gap-6">
            {/* CEO Avatar */}
            <motion.div
              className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${ceo.background} flex items-center justify-center text-3xl shadow-2xl ceo-avatar float-premium`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {ceo.avatar}
            </motion.div>
            
            {/* CEO Info */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-1">{ceo.name}</h3>
                <p className="text-purple-300 text-sm font-medium mb-1">{ceo.role}</p>
                <p className="text-gray-400 text-sm">{ceo.title}</p>
              </motion.div>
            </div>

            {/* Founder Score */}
            <motion.div
              className="text-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Founder Score</span>
              </div>
              <div className={`text-5xl font-black ${scoreColor} leading-none`}>
                {ceoReview.founderScore.toFixed(1)}
                <span className="text-2xl text-gray-400 ml-2 font-bold">/10</span>
              </div>
              <div className="flex items-center justify-end gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(ceoReview.founderScore / 2) ? scoreColor.replace('text-', 'text-') : 'text-gray-600'}
                    fill={i < Math.floor(ceoReview.founderScore / 2) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quote */}
          <motion.div
            className="mt-6 p-4 glass rounded-2xl border-l-4 border-purple-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-300 italic text-sm leading-relaxed">
              "Based on my experience scaling products at {ceo.role.split(',')[1]?.trim() || 'major tech companies'}, 
              here's my assessment of this startup opportunity..."
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Assessment Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* What I Like */}
        <motion.div
          className="glass-premium rounded-2xl p-6 card-premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center glow-premium">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-green-400">What I Like</h4>
              <p className="text-xs text-gray-500">Strengths & Opportunities</p>
            </div>
          </div>
          <div className="space-y-4">
            {ceoReview.whatILike.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 glass rounded-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Biggest Risks */}
        <motion.div
          className="glass-premium rounded-2xl p-6 card-premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center glow-premium">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-red-400">Biggest Risks</h4>
              <p className="text-xs text-gray-500">Challenges to Address</p>
            </div>
          </div>
          <div className="space-y-4">
            {ceoReview.biggestRisks.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 glass rounded-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MVP Recommendation */}
        <motion.div
          className="glass-premium rounded-2xl p-6 card-premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center glow-premium">
              <Target size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-blue-400">MVP Priority</h4>
              <p className="text-xs text-gray-500">Build This First</p>
            </div>
          </div>
          <div className="space-y-4">
            {ceoReview.mvpRecommendation.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-3 p-3 glass rounded-xl"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Growth Potential */}
        <motion.div
          className="glass-premium rounded-2xl p-6 card-premium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-premium">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-purple-400">Growth Outlook</h4>
              <p className="text-xs text-gray-500">Market Opportunity</p>
            </div>
          </div>
          <div className="p-4 glass rounded-xl">
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {ceoReview.growthPotential}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                  style={{width: `${ceoReview.founderScore * 10}%`}}
                />
              </div>
              <span className="text-xs text-purple-400 font-medium">
                {Math.round(ceoReview.founderScore * 10)}% potential
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Executive Summary */}
      <motion.div
        className="glass-premium rounded-2xl p-6 border border-purple-500/20 glow-premium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Briefcase size={20} className="text-purple-400" />
          <h4 className="text-lg font-bold text-white">Executive Summary</h4>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          This product has {ceoReview.founderScore >= 7 ? 'strong' : ceoReview.founderScore >= 5 ? 'moderate' : 'limited'} 
          {' '}potential for success. I recommend focusing on the MVP features above and addressing the key risks 
          before seeking Series A funding. The market opportunity is compelling, but execution will be critical.
        </p>
      </motion.div>
    </motion.div>
  );
}

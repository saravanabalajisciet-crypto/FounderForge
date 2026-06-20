'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Layout, Navigation, Zap, Grid3x3, ArrowRight, 
  ChevronLeft, ChevronRight, TrendingUp, Calendar, Users, 
  DollarSign, BarChart3, Target, Clock, Star, Heart,
  Play, Settings, Bell, Search, Plus, Filter, Rocket,
  CheckCircle, Download
} from 'lucide-react';
import type { LaunchPreview as LaunchPreviewType } from '@/types';

interface LaunchPreviewProps {
  launchPreview: LaunchPreviewType;
}

function getAppType(launchPreview: LaunchPreviewType): 'fitness' | 'travel' | 'freelancer' | 'investment' {
  const name = launchPreview.appName.toLowerCase();
  const tags = launchPreview.tagline.toLowerCase();
  
  if (name.includes('fit') || name.includes('health') || name.includes('workout') || tags.includes('fitness')) return 'fitness';
  if (name.includes('travel') || name.includes('trip') || tags.includes('travel')) return 'travel';
  if (name.includes('freelance') || name.includes('gig') || tags.includes('freelance')) return 'freelancer';
  if (name.includes('invest') || name.includes('money') || name.includes('portfolio') || tags.includes('invest')) return 'investment';
  
  return 'fitness'; // default
}

// Simplified mock components with dynamic app type detection
const FitnessProgressCard = () => (
  <motion.div 
    className="glass-premium rounded-2xl p-4 mb-3 card-premium"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-white font-semibold text-sm">Today's Progress</h3>
      <span className="text-xs gradient-text-premium font-bold">85%</span>
    </div>
    <div className="space-y-3">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">Steps</span>
        <span className="text-white font-medium">8,547 / 10,000</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <motion.div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full glow-premium"
          initial={{ width: 0 }}
          animate={{ width: '85%' }}
          transition={{ delay: 1, duration: 1.5 }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="text-center">
          <div className="text-purple-400 text-xs">🔥</div>
          <div className="text-xs text-gray-400">Streak</div>
        </div>
        <div className="text-center">
          <div className="text-orange-400 text-xs">⚡</div>
          <div className="text-xs text-gray-400">Energy</div>
        </div>
        <div className="text-center">
          <div className="text-green-400 text-xs">🎯</div>
          <div className="text-xs text-gray-400">Goals</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const FitnessWorkoutCard = () => (
  <motion.div 
    className="glass-premium rounded-2xl p-4 mb-3 card-premium"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center glow-premium">
        <Play size={16} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-white font-medium text-sm">Upper Body Blast</p>
        <p className="text-gray-400 text-xs">45 min • Intermediate</p>
      </div>
      <div className="text-right">
        <div className="text-orange-400 text-lg">🔥</div>
        <div className="text-xs text-gray-400">Popular</div>
      </div>
    </div>
    <div className="flex gap-2">
      <motion.button 
        className="btn-premium px-4 py-2 rounded-xl text-xs font-medium text-white flex-1 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play size={12} />
        Start Workout
      </motion.button>
      <motion.button 
        className="glass px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
        whileHover={{ scale: 1.05 }}
      >
        ❤️
      </motion.button>
    </div>
  </motion.div>
);

const TravelBudgetCard = () => (
  <motion.div 
    className="glass-premium rounded-2xl p-4 mb-3 card-premium"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-semibold text-sm">Trip Budget</h3>
        <span className="text-lg">✈️</span>
      </div>
      <DollarSign size={14} className="text-green-400" />
    </div>
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-400 text-xs">Spent</span>
        <span className="text-white font-medium text-sm">$1,247</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400 text-xs">Budget</span>
        <span className="text-gray-300 text-sm">$2,000</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <motion.div 
          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '62%' }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </div>
      <div className="grid grid-cols-3 gap-1 text-xs text-center">
        <div>
          <div className="text-blue-400">🏨</div>
          <div className="text-gray-400">Hotels</div>
        </div>
        <div>
          <div className="text-green-400">🍽️</div>
          <div className="text-gray-400">Food</div>
        </div>
        <div>
          <div className="text-purple-400">🎭</div>
          <div className="text-gray-400">Fun</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const FreelancerEarningsCard = () => (
  <motion.div 
    className="glass-premium rounded-2xl p-4 mb-3 card-premium"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-semibold text-sm">This Month</h3>
        <span className="text-lg">💰</span>
      </div>
      <TrendingUp size={14} className="text-green-400" />
    </div>
    <div className="space-y-3">
      <div className="text-2xl font-bold gradient-text-premium">$4,247</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs">+23%</span>
          <span className="text-gray-400 text-xs">vs last month</span>
        </div>
        <div className="text-xs text-gray-400">💎 Premium</div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="glass rounded-lg p-2 text-center">
          <div className="text-blue-400 font-bold">12</div>
          <div className="text-gray-400">Projects</div>
        </div>
        <div className="glass rounded-lg p-2 text-center">
          <div className="text-purple-400 font-bold">4.9</div>
          <div className="text-gray-400">Rating</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const InvestmentPortfolioCard = () => (
  <motion.div 
    className="glass-premium rounded-2xl p-4 mb-3 card-premium"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <h3 className="text-white font-semibold text-sm">Portfolio</h3>
        <span className="text-lg">📊</span>
      </div>
      <BarChart3 size={14} className="text-purple-400" />
    </div>
    <div className="space-y-3">
      <div className="text-2xl font-bold gradient-text-premium">$12,847</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs">+$247 today</span>
          <span className="text-gray-400 text-xs">+1.96%</span>
        </div>
        <div className="text-xs text-green-400">📈 Growing</div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Stocks</span>
          <span className="text-blue-400">65%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Crypto</span>
          <span className="text-purple-400">25%</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Cash</span>
          <span className="text-green-400">10%</span>
        </div>
      </div>
    </div>
  </motion.div>
);

// Enhanced Navigation Icons
const NavigationIcon = ({ icon, label, isActive }: { icon: React.ReactNode, label: string, isActive: boolean }) => (
  <motion.div 
    className="text-center"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <motion.div 
      className={`w-7 h-7 rounded-xl mx-auto mb-1 ${
        isActive 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 glow-premium' 
          : 'glass'
      } flex items-center justify-center`}
      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {icon}
    </motion.div>
    <span className={`text-xs ${isActive ? 'gradient-text-premium font-medium' : 'text-gray-400'}`}>
      {label}
    </span>
  </motion.div>
);

export function LaunchPreview({ launchPreview }: LaunchPreviewProps) {
  const [activeView, setActiveView] = useState<'overview' | 'flow'>('overview');
  const appType = getAppType(launchPreview);

  return (
    <div className="min-h-screen bg-black noise-premium">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Premium Hero Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 grid-premium opacity-20" />
          <div className="absolute inset-0 noise-premium" />
          <div className="relative p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center gap-3 mb-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center glow-premium-strong">
                  <Rocket size={32} className="text-white" />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-black gradient-text-premium mb-4 text-premium-large"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                {launchPreview.appName}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                "{launchPreview.tagline}"
              </motion.p>
              
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 glass-premium rounded-2xl glow-premium"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(34, 197, 94, 0.7)',
                      '0 0 0 10px rgba(34, 197, 94, 0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm gradient-text-premium font-semibold">Live MVP Preview</span>
                <span className="text-2xl">🚀</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center mb-8">
          <div className="glass-premium rounded-2xl p-1 flex">
            {[
              { id: 'overview', label: 'App Preview', icon: Smartphone },
              { id: 'flow', label: 'User Journey', icon: ArrowRight },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as typeof activeView)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon size={16} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-8 pb-16"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Phone Mockup */}
                <div className="lg:col-span-1">
                  <motion.div
                    className="sticky top-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="relative mx-auto max-w-sm">
                      {/* Phone Frame */}
                      <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl glow-premium-strong">
                        <div className="bg-black rounded-[2.5rem] overflow-hidden">
                          {/* Status Bar */}
                          <div className="bg-black px-6 py-2 flex justify-between items-center text-white text-xs">
                            <span>9:41</span>
                            <div className="flex items-center gap-1">
                              <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-white" />
                                <div className="w-1 h-1 rounded-full bg-white" />
                                <div className="w-1 h-1 rounded-full bg-gray-600" />
                              </div>
                              <span>100%</span>
                            </div>
                          </div>

                          {/* App Content */}
                          <div className="bg-black px-4 py-6 min-h-[600px]">
                            {/* Enhanced Header with Avatar and Notifications */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <motion.div 
                                  className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center glow-premium"
                                  animate={{ rotate: [0, 5, -5, 0] }}
                                  transition={{ duration: 4, repeat: Infinity }}
                                >
                                  <span className="text-xl">👋</span>
                                </motion.div>
                                <div>
                                  <h2 className="text-white text-lg font-bold">
                                    Good morning!
                                  </h2>
                                  <p className="text-gray-400 text-sm">Ready to achieve your goals?</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.div 
                                  className="w-10 h-10 rounded-xl glass flex items-center justify-center relative"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <Bell size={16} className="text-gray-400" />
                                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                                    <span className="text-xs text-white font-bold">3</span>
                                  </div>
                                </motion.div>
                                <motion.div 
                                  className="w-10 h-10 rounded-xl glass flex items-center justify-center"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  <Settings size={16} className="text-gray-400" />
                                </motion.div>
                              </div>
                            </div>

                            {/* Enhanced Search Bar */}
                            <motion.div 
                              className="glass-premium rounded-2xl px-4 py-3 flex items-center gap-3 mb-6 glow-premium"
                              whileHover={{ scale: 1.02 }}
                            >
                              <Search size={16} className="text-purple-400" />
                              <motion.span 
                                className="text-gray-400 text-sm flex-1"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                Search anything...
                              </motion.span>
                              <div className="flex items-center gap-2">
                                <Filter size={16} className="text-gray-400" />
                                <motion.div 
                                  className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                >
                                  <Zap size={12} className="text-white" />
                                </motion.div>
                              </div>
                            </motion.div>

                            {/* Dynamic Content Based on App Type */}
                            <div className="space-y-3">
                              <FitnessProgressCard />
                              <FitnessWorkoutCard />
                              {appType === 'travel' && <TravelBudgetCard />}
                              {appType === 'freelancer' && <FreelancerEarningsCard />}
                              {appType === 'investment' && <InvestmentPortfolioCard />}
                            </div>

                            {/* Enhanced Bottom Navigation */}
                            <div className="absolute bottom-0 left-0 right-0 glass-premium backdrop-blur-xl border-t border-purple-500/20">
                              <div className="flex justify-around py-4 px-2">
                                {launchPreview.navigationStructure.slice(0, 5).map((nav, i) => {
                                  const navIcons = [
                                    <Layout size={14} className={i === 0 ? "text-white" : "text-gray-400"} />,
                                    <BarChart3 size={14} className={i === 1 ? "text-white" : "text-gray-400"} />,
                                    <Calendar size={14} className={i === 2 ? "text-white" : "text-gray-400"} />,
                                    <Users size={14} className={i === 3 ? "text-white" : "text-gray-400"} />,
                                    <Settings size={14} className={i === 4 ? "text-white" : "text-gray-400"} />
                                  ];
                                  
                                  return (
                                    <NavigationIcon
                                      key={i}
                                      icon={navIcons[i]}
                                      label={nav.split(' ')[0]}
                                      isActive={i === 0}
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Feature Cards */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Key Features Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">Core Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {launchPreview.keyComponents.map((component, i) => (
                        <motion.div
                          key={i}
                          className="glass-premium rounded-2xl p-6 card-premium group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                              ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 
                               'from-orange-500 to-red-500', 'from-green-500 to-emerald-500'][i % 4]
                            } flex items-center justify-center`}>
                              {[<Zap size={18} />, <Target size={18} />, <BarChart3 size={18} />, <Star size={18} />][i % 4]}
                            </div>
                            <h4 className="text-white font-semibold">{component}</h4>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Premium {component.toLowerCase()} with real-time updates and intelligent insights.
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Dashboard Preview */}
                  {launchPreview.dashboardSections.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Dashboard Sections</h3>
                      <div className="glass-premium rounded-2xl p-6">
                        <div className="grid md:grid-cols-3 gap-4">
                          {launchPreview.dashboardSections.map((section, i) => (
                            <div key={i} className="text-center p-4 glass rounded-xl">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                                <BarChart3 size={20} className="text-white" />
                              </div>
                              <h4 className="text-white font-medium mb-2">{section}</h4>
                              <p className="text-gray-400 text-xs">Live analytics & insights</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'flow' && (
            <motion.div
              key="flow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-8 pb-16"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-12">User Journey</h3>
              <div className="space-y-6">
                {launchPreview.userJourney.map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {i + 1}
                      </div>
                      {i < launchPreview.userJourney.length - 1 && (
                        <div className="w-px h-16 bg-gradient-to-b from-purple-500 to-transparent mx-6 mt-4" />
                      )}
                    </div>
                    <div className="glass-premium rounded-2xl p-6 flex-1 card-premium">
                      <h4 className="text-white font-semibold mb-2">Step {i + 1}</h4>
                      <p className="text-gray-300 leading-relaxed">{step}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Call to Action */}
        <motion.div
          className="max-w-5xl mx-auto px-8 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div 
            className="glass-premium rounded-3xl p-8 md:p-12 text-center glow-premium-strong relative overflow-hidden border border-purple-500/20"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5" />
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -ml-20 -mt-20" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full -mr-20 -mb-20" />
            
            <div className="relative">
              <motion.div
                className="inline-flex items-center gap-3 mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-premium">
                  <Star size={32} className="text-white" />
                </div>
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-black gradient-text-premium mb-6">
                Ready to Build This Product?
              </h3>
              
              <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                This Launch Preview shows a realistic MVP with premium design patterns. 
                Use the complete architecture, database schema, and API documentation to start development immediately.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <motion.button 
                  className="btn-premium px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Rocket size={20} />
                  Start Development
                </motion.button>
                <motion.button 
                  className="glass-premium px-8 py-4 rounded-2xl font-semibold text-white hover:glass-hover flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  Export Documentation
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle size={16} className="text-green-400" />
                  Complete Architecture
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle size={16} className="text-green-400" />
                  Database Schema
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <CheckCircle size={16} className="text-green-400" />
                  API Documentation
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
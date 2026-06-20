'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lock, Globe } from 'lucide-react';
import type { ApiGroup } from '@/types';

interface ApiDesignProps {
  api: ApiGroup[];
}

const methodConfig = {
  GET:    { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  POST:   { bg: 'bg-blue-500/15',    text: 'text-blue-400',    border: 'border-blue-500/30' },
  PUT:    { bg: 'bg-yellow-500/15',  text: 'text-yellow-400',  border: 'border-yellow-500/30' },
  PATCH:  { bg: 'bg-orange-500/15',  text: 'text-orange-400',  border: 'border-orange-500/30' },
  DELETE: { bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/30' },
};

export function ApiDesign({ api }: ApiDesignProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set([api[0]?.group]));
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set());

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  const toggleEndpoint = (key: string) => {
    setExpandedEndpoints(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const totalEndpoints = api.reduce((sum, g) => sum + g.endpoints.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="glass rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
          <Globe size={18} className="text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">REST API Specification</h3>
          <p className="text-gray-400 text-xs mt-0.5">{api.length} groups · {totalEndpoints} endpoints</p>
        </div>
        <div className="ml-auto flex gap-2">
          {['GET', 'POST', 'PUT', 'DELETE'].map(m => {
            const cfg = methodConfig[m as keyof typeof methodConfig];
            return (
              <span key={m} className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                {m}
              </span>
            );
          })}
        </div>
      </div>

      {/* API Groups */}
      {api.map((group, gi) => (
        <motion.div
          key={group.group}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.05 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Group Header */}
          <button
            onClick={() => toggleGroup(group.group)}
            className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/[0.03] transition-colors"
            aria-expanded={expandedGroups.has(group.group)}
          >
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-400 text-[10px] font-bold">{group.endpoints.length}</span>
            </div>
            <span className="text-sm font-semibold text-white">{group.group}</span>
            <span className="text-xs text-gray-500 ml-1">endpoints</span>
            <ChevronDown
              size={16}
              className={`ml-auto text-gray-500 transition-transform ${expandedGroups.has(group.group) ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Endpoints */}
          <AnimatePresence>
            {expandedGroups.has(group.group) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2">
                  {group.endpoints.map((endpoint, ei) => {
                    const cfg = methodConfig[endpoint.method] || methodConfig.GET;
                    const key = `${gi}-${ei}`;
                    const isExpanded = expandedEndpoints.has(key);

                    return (
                      <div key={ei} className="rounded-xl border border-white/[0.05] overflow-hidden">
                        <button
                          onClick={() => toggleEndpoint(key)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-white/[0.03] transition-colors text-left"
                          aria-expanded={isExpanded}
                        >
                          <span className={`px-2 py-1 rounded text-[10px] font-bold font-mono min-w-[52px] text-center ${cfg.bg} ${cfg.text} border ${cfg.border}`}>
                            {endpoint.method}
                          </span>
                          <span className="font-mono text-xs text-indigo-300 flex-1">{endpoint.path}</span>
                          {endpoint.auth && (
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Lock size={11} />
                              <span className="text-[10px]">Auth</span>
                            </div>
                          )}
                          <ChevronDown
                            size={14}
                            className={`text-gray-600 transition-transform ml-2 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-3 bg-white/[0.015]">
                                <p className="text-gray-400 text-xs pt-3">{endpoint.description}</p>

                                {endpoint.requestBody && (
                                  <div>
                                    <p className="text-[10px] text-gray-500 mb-1.5 font-medium uppercase tracking-wide">Request Body</p>
                                    <pre className="bg-black/30 rounded-lg p-3 text-[11px] text-green-400 font-mono overflow-x-auto">
                                      {endpoint.requestBody}
                                    </pre>
                                  </div>
                                )}

                                {endpoint.responseExample && (
                                  <div>
                                    <p className="text-[10px] text-gray-500 mb-1.5 font-medium uppercase tracking-wide">Response</p>
                                    <pre className="bg-black/30 rounded-lg p-3 text-[11px] text-blue-400 font-mono overflow-x-auto">
                                      {endpoint.responseExample}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}

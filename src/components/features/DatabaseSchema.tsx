'use client';

import { motion } from 'framer-motion';
import { Database, Key, Link, Hash } from 'lucide-react';
import type { Database as DatabaseType } from '@/types';

interface DatabaseSchemaProps {
  database: DatabaseType;
}

const typeColors: Record<string, string> = {
  'UUID': 'text-yellow-400',
  'VARCHAR': 'text-blue-400',
  'TEXT': 'text-blue-400',
  'INTEGER': 'text-green-400',
  'INT': 'text-green-400',
  'BOOLEAN': 'text-purple-400',
  'TIMESTAMP': 'text-orange-400',
  'JSONB': 'text-pink-400',
  'DECIMAL': 'text-cyan-400',
  'FLOAT': 'text-cyan-400',
};

function getTypeColor(type: string): string {
  for (const [key, color] of Object.entries(typeColors)) {
    if (type.toUpperCase().includes(key)) return color;
  }
  return 'text-gray-400';
}

export function DatabaseSchema({ database }: DatabaseSchemaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Overview */}
      <div className="glass rounded-2xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
          <Database size={18} className="text-yellow-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white">{database.dbType} Database</h3>
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px] font-medium border border-yellow-500/20">
              {database.tables.length} tables
            </span>
          </div>
          <p className="text-gray-400 text-xs">{database.description}</p>
        </div>
      </div>

      {/* Tables */}
      <div className="grid md:grid-cols-2 gap-4">
        {database.tables.map((table, i) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Table Header */}
            <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-3 bg-yellow-500/5">
              <div className="w-6 h-6 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Database size={12} className="text-yellow-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white font-mono">{table.name}</span>
                <p className="text-[10px] text-gray-500">{table.description}</p>
              </div>
            </div>

            {/* Fields */}
            <div className="p-3 space-y-1">
              {table.fields.map((field, fi) => {
                const constraints = field.constraints ?? '';
                const fieldType = field.type ?? '';
                const fieldName = field.name ?? '';
                return (
                  <div key={fi} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors group">
                    {constraints.includes('PRIMARY') ? (
                      <Key size={11} className="text-yellow-400 flex-shrink-0" />
                    ) : fieldName.endsWith('_id') || fieldName.endsWith('Id') ? (
                      <Link size={11} className="text-blue-400 flex-shrink-0" />
                    ) : (
                      <Hash size={11} className="text-gray-600 flex-shrink-0" />
                    )}
                    <span className="font-mono text-xs text-gray-200 flex-1">{fieldName}</span>
                    <span className={`font-mono text-[10px] ${getTypeColor(fieldType)}`}>{fieldType}</span>
                    {constraints && (
                      <span className="text-[9px] text-gray-600 font-mono truncate max-w-[80px] hidden group-hover:block">
                        {constraints}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Relationships */}
            {(table.relationships ?? []).length > 0 && (
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-1">
                  {(table.relationships ?? []).map((rel, ri) => (
                    <span key={ri} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

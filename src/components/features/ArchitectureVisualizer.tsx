'use client';

import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import type { Architecture } from '@/types';

interface ArchitectureVisualizerProps {
  architecture: Architecture;
}

const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  user:     { bg: '#1a2035', border: '#60a5fa', text: '#93c5fd' },
  frontend: { bg: '#1a2035', border: '#818cf8', text: '#a5b4fc' },
  backend:  { bg: '#1a2035', border: '#34d399', text: '#6ee7b7' },
  database: { bg: '#1a2035', border: '#f59e0b', text: '#fcd34d' },
  service:  { bg: '#1a2035', border: '#c084fc', text: '#d8b4fe' },
  external: { bg: '#1a2035', border: '#fb7185', text: '#fca5a5' },
};

function buildLayout(nodes: Architecture['nodes']): { x: number; y: number }[] {
  const rows = [
    nodes.filter(n => n.type === 'user'),
    nodes.filter(n => n.type === 'frontend'),
    nodes.filter(n => n.type === 'service'),
    nodes.filter(n => n.type === 'backend'),
    nodes.filter(n => n.type === 'database' || n.type === 'external'),
  ].filter(r => r.length > 0);

  const positions: Record<string, { x: number; y: number }> = {};
  rows.forEach((row, rowIdx) => {
    row.forEach((node, colIdx) => {
      const colCount = row.length;
      const startX = -((colCount - 1) * 220) / 2;
      positions[node.id] = {
        x: startX + colIdx * 220,
        y: rowIdx * 160,
      };
    });
  });

  // Remaining nodes
  nodes.forEach(node => {
    if (!positions[node.id]) {
      positions[node.id] = { x: 0, y: rows.length * 160 };
    }
  });

  return nodes.map(n => positions[n.id]);
}

export function ArchitectureVisualizer({ architecture }: ArchitectureVisualizerProps) {
  const positions = buildLayout(architecture.nodes);

  const initialNodes: Node[] = useMemo(() => architecture.nodes.map((node, i) => {
    const colors = nodeColors[node.type] || nodeColors.service;
    return {
      id: node.id,
      position: positions[i],
      data: {
        label: (
          <div className="text-center px-2 py-1">
            <div style={{ color: colors.text }} className="font-semibold text-xs">{node.label}</div>
            <div className="text-[9px] text-gray-500 mt-0.5">
              {node.technologies.slice(0, 2).join(' · ')}
            </div>
          </div>
        ),
      },
      style: {
        background: colors.bg,
        border: `1.5px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '8px 12px',
        minWidth: 140,
        fontSize: '12px',
        boxShadow: `0 0 12px ${colors.border}30`,
      },
    };
  }), [architecture.nodes]);

  const initialEdges: Edge[] = useMemo(() => architecture.edges.map((edge, i) => ({
    id: `e-${i}`,
    source: edge.from,
    target: edge.to,
    label: edge.label,
    labelStyle: { fill: '#6b7280', fontSize: 9 },
    labelBgStyle: { fill: '#0f1219', fillOpacity: 0.85 },
    style: { stroke: '#818cf8', strokeWidth: 1.5, opacity: 0.7 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8', width: 12, height: 12 },
    animated: false,
  })), [architecture.edges]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* Description */}
      <div className="glass rounded-2xl p-5">
        <p className="text-gray-300 text-sm leading-relaxed">{architecture.description}</p>
      </div>

      {/* Flow Diagram */}
      <div className="glass rounded-2xl overflow-hidden" style={{ height: 480 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="#1e2535"
          />
          <Controls
            style={{ background: '#0f1219', border: '1px solid #1e2535', borderRadius: 8 }}
          />
          <MiniMap
            style={{ background: '#0a0d14', border: '1px solid #1e2535', borderRadius: 8 }}
            nodeColor={(n) => {
              const type = (n as Node).type ?? 'service';
              return nodeColors[type]?.border ?? '#818cf8';
            }}
          />
        </ReactFlow>
      </div>

      {/* Node Legend */}
      <div className="glass rounded-2xl p-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Component Details</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {architecture.nodes.map(node => {
            const colors = nodeColors[node.type] || nodeColors.service;
            return (
              <div key={node.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.border }} />
                  <span className="text-xs font-medium text-white">{node.label}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{node.description}</p>
                <div className="flex flex-wrap gap-1">
                  {node.technologies.map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[10px] text-gray-400">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Search, 
  FolderTree, 
  CircleDot, 
  Network, 
  History, 
  ChevronRight, 
  Info,
  Sparkles,
  Layers,
  Eye,
  Filter
} from 'lucide-react';
import { D3TaxonomyNode, SpeciesData } from '../types';
import { buildTaxonomyTreeFromSpecies, buildKnowledgeGraphFromSpecies, EVOLUTIONARY_PERIODS } from '../data/evolutionTreeData';

interface TaxonomyTreeViewProps {
  speciesList: SpeciesData[];
  onSelectSpecies: (species: SpeciesData) => void;
  selectedSpeciesId?: string;
}

type ViewMode = 'cladogram' | 'radial' | 'force' | 'timeline';

export const TaxonomyTreeView: React.FC<TaxonomyTreeViewProps> = ({
  speciesList,
  onSelectSpecies,
  selectedSpeciesId
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('cladogram');
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'flora' | 'fauna' | 'fungi'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
  const [maxDepth, setMaxDepth] = useState<number>(7); // 1: 界 to 7: 种

  // Filter species by domain if selected
  const filteredSpecies = useMemo(() => {
    if (selectedDomain === 'all') return speciesList;
    return speciesList.filter((s) => s.domain === selectedDomain);
  }, [speciesList, selectedDomain]);

  // Build raw tree data
  const rawTreeData = useMemo(() => {
    return buildTaxonomyTreeFromSpecies(filteredSpecies);
  }, [filteredSpecies]);

  // Force graph data
  const forceGraphData = useMemo(() => {
    return buildKnowledgeGraphFromSpecies(filteredSpecies);
  }, [filteredSpecies]);

  // Handle D3 Rendering
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    if (viewMode === 'timeline') return; // Timeline is rendered in React DOM

    const container = containerRef.current;
    const width = container.clientWidth || 1000;
    const height = Math.max(container.clientHeight || 750, 650);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawing

    // Setup SVG container & zoom behavior
    const g = svg.append('g').attr('class', 'main-group');

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // ==========================================
    // 1. CLADOGRAM / DENDROGRAM VIEW (支序系统树)
    // ==========================================
    if (viewMode === 'cladogram') {
      const root = d3.hierarchy<D3TaxonomyNode>(rawTreeData, (d) => {
        if (collapsedNodes.has(d.id)) return null;
        if (d.level > maxDepth) return null;
        return d.children;
      });

      // Calculate tree layout dimensions based on leaf count
      const leafCount = root.leaves().length;
      const treeHeight = Math.max(height - 80, leafCount * 28 + 120);
      const treeWidth = width - 360;

      const treeLayout = d3.tree<D3TaxonomyNode>()
        .size([treeHeight, treeWidth])
        .separation((a, b) => (a.parent === b.parent ? 1 : 1.4));

      treeLayout(root);

      // Center and fit
      const initialTransform = d3.zoomIdentity.translate(90, 40).scale(0.85);
      svg.call(zoom.transform, initialTransform);

      // Draw Links (horizontal curved branches)
      const linkGenerator = d3.linkHorizontal<any, any>()
        .x((d) => d.y)
        .y((d) => d.x);

      g.append('g')
        .attr('class', 'links')
        .selectAll('path')
        .data(root.links())
        .enter()
        .append('path')
        .attr('d', linkGenerator as any)
        .attr('fill', 'none')
        .attr('stroke', (d) => {
          if (searchQuery && (
            d.target.data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.target.data.scientificName?.toLowerCase().includes(searchQuery.toLowerCase())
          )) {
            return '#10B981'; // highlight
          }
          return '#334155';
        })
        .attr('stroke-width', (d) => {
          return Math.max(1.2, 4 - d.target.depth * 0.45);
        })
        .attr('stroke-opacity', 0.8);

      // Draw Nodes
      const nodes = g.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
        .attr('class', 'node-item cursor-pointer')
        .on('click', (event, d: any) => {
          event.stopPropagation();
          if (d.data.rank === 'species' && d.data.speciesData) {
            onSelectSpecies(d.data.speciesData);
          } else if (d.data.children && d.data.children.length > 0) {
            // Toggle collapse
            setCollapsedNodes((prev) => {
              const next = new Set(prev);
              if (next.has(d.data.id)) {
                next.delete(d.data.id);
              } else {
                next.add(d.data.id);
              }
              return next;
            });
          }
        })
        .on('mouseenter', (event, d: any) => {
          setHoveredNode(d.data);
        })
        .on('mouseleave', () => {
          setHoveredNode(null);
        });

      // Node circles
      nodes.append('circle')
        .attr('r', (d: any) => {
          if (d.data.rank === 'root') return 9;
          if (d.data.rank === 'kingdom') return 8;
          if (d.data.rank === 'species') return 5;
          return 6;
        })
        .attr('fill', (d: any) => {
          if (d.data.rank === 'species') {
            if (d.data.speciesData?.id === selectedSpeciesId) return '#F59E0B'; // Highlight selected
            return d.data.speciesData?.domain === 'flora' ? '#10B981' : d.data.speciesData?.domain === 'fungi' ? '#F59E0B' : '#3B82F6';
          }
          if (collapsedNodes.has(d.data.id)) return '#EF4444'; // Collapsed indicator
          return d.data.color || '#64748B';
        })
        .attr('stroke', '#0F172A')
        .attr('stroke-width', 2);

      // Node text labels
      nodes.append('text')
        .attr('dy', '0.32em')
        .attr('x', (d: any) => (d.children ? -12 : 12))
        .attr('text-anchor', (d: any) => (d.children ? 'end' : 'start'))
        .text((d: any) => {
          if (d.data.rank === 'species') {
            return `${d.data.name} (${d.data.scientificName || ''})`;
          }
          const countStr = d.data.count ? ` [${d.data.count}]` : '';
          return `${d.data.name}${countStr}`;
        })
        .attr('fill', (d: any) => {
          if (d.data.speciesData?.id === selectedSpeciesId) return '#FCD34D';
          if (d.data.rank === 'species') return '#E2E8F0';
          if (d.data.rank === 'kingdom') return '#38BDF8';
          if (d.data.rank === 'phylum') return '#34D399';
          return '#94A3B8';
        })
        .attr('font-size', (d: any) => {
          if (d.data.rank === 'root') return '14px';
          if (d.data.rank === 'kingdom') return '13px';
          if (d.data.rank === 'species') return '11.5px';
          return '11px';
        })
        .attr('font-weight', (d: any) => (d.data.rank === 'root' || d.data.rank === 'kingdom' || d.data.speciesData?.id === selectedSpeciesId ? 'bold' : 'normal'))
        .style('text-shadow', '0 1px 3px rgba(0,0,0,0.9)');
    }

    // ==========================================
    // 2. RADIAL PHYLOGENETIC TREE (径向系统发生树)
    // ==========================================
    else if (viewMode === 'radial') {
      const radius = Math.min(width, height) / 2 - 60;

      const root = d3.hierarchy<D3TaxonomyNode>(rawTreeData, (d) => {
        if (collapsedNodes.has(d.id)) return null;
        return d.children;
      });

      const cluster = d3.cluster<D3TaxonomyNode>()
        .size([360, radius])
        .separation((a, b) => (a.parent === b.parent ? 1 : 2));

      cluster(root);

      // Center the radial tree
      const initialTransform = d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85);
      svg.call(zoom.transform, initialTransform);

      // Radial Link generator
      const radialLink = d3.linkRadial<any, any>()
        .angle((d) => (d.x / 180) * Math.PI)
        .radius((d) => d.y);

      g.append('g')
        .attr('class', 'radial-links')
        .selectAll('path')
        .data(root.links())
        .enter()
        .append('path')
        .attr('d', radialLink as any)
        .attr('fill', 'none')
        .attr('stroke', '#334155')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', 0.7);

      // Radial Nodes
      const nodes = g.append('g')
        .attr('class', 'radial-nodes')
        .selectAll('g')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('transform', (d: any) => `rotate(${d.x - 90}) translate(${d.y},0)`)
        .attr('class', 'cursor-pointer')
        .on('click', (event, d: any) => {
          event.stopPropagation();
          if (d.data.rank === 'species' && d.data.speciesData) {
            onSelectSpecies(d.data.speciesData);
          }
        })
        .on('mouseenter', (event, d: any) => setHoveredNode(d.data))
        .on('mouseleave', () => setHoveredNode(null));

      nodes.append('circle')
        .attr('r', (d: any) => (d.data.rank === 'species' ? 4.5 : 6))
        .attr('fill', (d: any) => d.data.color || '#38BDF8')
        .attr('stroke', '#0F172A')
        .attr('stroke-width', 1.5);

      nodes.append('text')
        .attr('dy', '0.31em')
        .attr('x', (d: any) => (d.x < 180 === !d.children ? 8 : -8))
        .attr('text-anchor', (d: any) => (d.x < 180 === !d.children ? 'start' : 'end'))
        .attr('transform', (d: any) => (d.x >= 180 ? 'rotate(180)' : null))
        .text((d: any) => d.data.name)
        .attr('fill', '#CBD5E1')
        .attr('font-size', '10px')
        .style('text-shadow', '0 1px 3px rgba(0,0,0,0.8)');
    }

    // ==========================================
    // 3. FORCE-DIRECTED KNOWLEDGE GRAPH (力导向知识网络)
    // ==========================================
    else if (viewMode === 'force') {
      const nodesData = forceGraphData.nodes.map((d) => ({ ...d }));
      const linksData = forceGraphData.links.map((d) => ({ ...d }));

      const simulation = d3.forceSimulation<any>(nodesData)
        .force('link', d3.forceLink<any, any>(linksData).id((d) => d.id).distance(55))
        .force('charge', d3.forceManyBody().strength(-180))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius((d: any) => (d.val || 10) + 6));

      const initialTransform = d3.zoomIdentity.scale(0.85);
      svg.call(zoom.transform, initialTransform);

      const link = g.append('g')
        .selectAll('line')
        .data(linksData)
        .enter()
        .append('line')
        .attr('stroke', '#334155')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', 1.2);

      const node = g.append('g')
        .selectAll('g')
        .data(nodesData)
        .enter()
        .append('g')
        .attr('class', 'cursor-pointer')
        .call(
          d3.drag<any, any>()
            .on('start', (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on('drag', (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on('end', (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
        )
        .on('click', (event, d: any) => {
          if (d && d.species) {
            onSelectSpecies(d.species);
          }
        })
        .on('mouseenter', (event, d) => setHoveredNode(d))
        .on('mouseleave', () => setHoveredNode(null));

      node.append('circle')
        .attr('r', (d: any) => d.val || 10)
        .attr('fill', (d: any) => d.color || '#64748B')
        .attr('stroke', '#0F172A')
        .attr('stroke-width', 1.5);

      node.append('text')
        .text((d: any) => d.name)
        .attr('x', (d: any) => (d.val || 10) + 4)
        .attr('y', 3)
        .attr('fill', '#E2E8F0')
        .attr('font-size', '10.5px')
        .style('pointer-events', 'none')
        .style('text-shadow', '0 1px 3px rgba(0,0,0,0.8)');

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      });

      return () => {
        simulation.stop();
      };
    }
  }, [rawTreeData, forceGraphData, viewMode, collapsedNodes, maxDepth, searchQuery, selectedSpeciesId]);

  // Zoom control functions
  const handleZoom = (factor: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(250).call(d3.zoom<SVGSVGElement, unknown>().scaleBy as any, factor);
  };

  const handleResetZoom = () => {
    if (!svgRef.current || !containerRef.current) return;
    const svg = d3.select(svgRef.current);
    const width = containerRef.current.clientWidth || 1000;
    const height = containerRef.current.clientHeight || 700;
    const resetTransform = viewMode === 'radial' || viewMode === 'force'
      ? d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85)
      : d3.zoomIdentity.translate(90, 40).scale(0.85);
    svg.transition().duration(400).call(d3.zoom<SVGSVGElement, unknown>().transform as any, resetTransform);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-135px)] bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Visualizer Top Toolbar */}
      <div className="bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-20">
        {/* Left: View Modes */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-xs">
          <button
            id="view-cladogram-btn"
            onClick={() => setViewMode('cladogram')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              viewMode === 'cladogram' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>支序演化树</span>
          </button>

          <button
            id="view-radial-btn"
            onClick={() => setViewMode('radial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              viewMode === 'radial' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span>径向系统轮盘</span>
          </button>

          <button
            id="view-force-btn"
            onClick={() => setViewMode('force')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              viewMode === 'force' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>力导向知识网</span>
          </button>

          <button
            id="view-timeline-btn"
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              viewMode === 'timeline' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>地质演化年代轴</span>
          </button>
        </div>

        {/* Center: Domain Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden sm:inline">门类筛选:</span>
          <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition ${
                selectedDomain === 'all' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              全部 ({speciesList.length})
            </button>
            <button
              onClick={() => setSelectedDomain('flora')}
              className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition ${
                selectedDomain === 'flora' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              植物界
            </button>
            <button
              onClick={() => setSelectedDomain('fauna')}
              className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition ${
                selectedDomain === 'fauna' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              动物界
            </button>
            <button
              onClick={() => setSelectedDomain('fungi')}
              className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition ${
                selectedDomain === 'fungi' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              真菌界
            </button>
          </div>
        </div>

        {/* Right: Search & Zoom Controls */}
        <div className="flex items-center gap-2">
          {viewMode === 'cladogram' && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="在树中搜索物种..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-36 sm:w-48"
              />
            </div>
          )}

          {viewMode !== 'timeline' && (
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => handleZoom(1.25)}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                title="放大"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleZoom(0.8)}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                title="缩小"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1 rounded text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                title="居中重置"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div ref={containerRef} className="flex-1 w-full h-full relative overflow-hidden bg-slate-950">
        {viewMode !== 'timeline' ? (
          <>
            <svg ref={svgRef} className="w-full h-full block select-none cursor-grab active:cursor-grabbing" />

            {/* Tree Helper / Legend Panel */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs shadow-xl pointer-events-auto max-w-xs">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold mb-2">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>分类学图例与交互说明</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>植物界 (Plantae) - 裸子/被子植物等</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>动物界 (Animalia) - 脊索/节肢动物等</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>真菌界 (Fungi) - 子囊菌/担子菌等</span>
                </div>
                <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 leading-relaxed">
                  💡 点击末端物种节点可直接查看其详细分类档案；点击中间阶元可展开/折叠支系。
                </div>
              </div>
            </div>

            {/* Hover Tooltip Card */}
            {hoveredNode && (
              <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 shadow-2xl text-xs max-w-sm pointer-events-none transition-all">
                <div className="font-bold text-white text-sm flex items-center justify-between gap-2">
                  <span>{hoveredNode.name}</span>
                  {hoveredNode.rank && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 font-mono">
                      {hoveredNode.rank}
                    </span>
                  )}
                </div>
                {hoveredNode.scientificName && (
                  <div className="text-[11px] text-slate-400 italic mb-1.5">{hoveredNode.scientificName}</div>
                )}
                {hoveredNode.speciesData && (
                  <div className="space-y-1 mt-2 text-[11px] border-t border-slate-800 pt-2">
                    <div className="text-emerald-400 font-medium">{hoveredNode.speciesData.conservation}</div>
                    <div className="text-slate-300 line-clamp-2">{hoveredNode.speciesData.morphology}</div>
                    <div className="text-slate-400 text-[10px] flex items-center gap-1 mt-1">
                      <span>🏷️ {hoveredNode.speciesData.tags.slice(0, 3).join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* ==========================================
             4. TIMELINE VIEW (地质演化年代轴)
             ========================================== */
          <div className="w-full h-full overflow-y-auto p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 mb-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-400" />
                地球生命演化史与中国物种地质起源时间轴
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                理清自埃迪卡拉纪、寒武纪生命大爆发，到被子植物爆发与第四纪现代中国特有物种的演化支序脉络。
              </p>
            </div>

            <div className="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-8 space-y-8 pb-12">
              {EVOLUTIONARY_PERIODS.map((period, idx) => {
                // Find species matching this period
                const matchedSpecies = speciesList.filter(
                  (s) => s.geologicalPeriod.includes(period.period.split(' ')[0]) || s.geologicalPeriod.includes(period.era)
                );

                return (
                  <div key={idx} className="relative pl-6 sm:pl-8 group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 group-hover:bg-emerald-400 transition"></div>

                    {/* Timeline Card */}
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition shadow-lg space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
                            {period.era}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-white">{period.period}</h3>
                        </div>
                        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          ⏳ {period.timeRange}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{period.keyEvents}</p>

                      {/* Taxa Appeared */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                        <span className="text-xs text-slate-400">演化关键类群:</span>
                        {period.taxaAppeared.map((taxa, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs border border-slate-700/60"
                          >
                            {taxa}
                          </span>
                        ))}
                      </div>

                      {/* Associated Chinese Species in DB */}
                      {matchedSpecies.length > 0 && (
                        <div className="pt-2">
                          <div className="text-xs text-emerald-400 font-medium mb-1.5 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>数据库中此年代代表物种（点击查看档案）：</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {matchedSpecies.map((sp) => (
                              <button
                                key={sp.id}
                                onClick={() => onSelectSpecies(sp)}
                                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800/90 hover:bg-emerald-950 border border-slate-700 hover:border-emerald-600 rounded-lg text-xs text-slate-200 transition cursor-pointer"
                              >
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    sp.domain === 'flora' ? 'bg-emerald-400' : sp.domain === 'fungi' ? 'bg-amber-400' : 'bg-blue-400'
                                  }`}
                                ></span>
                                <span className="font-medium">{sp.chineseName}</span>
                                <span className="text-[10px] text-slate-400 italic">({sp.scientificName})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

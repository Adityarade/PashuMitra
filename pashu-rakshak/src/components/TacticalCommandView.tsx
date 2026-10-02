import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TelemetryNode } from '../types';

export const TacticalCommandView: React.FC = () => {
  const {
    telemetryNodes,
    ingestionPackets,
    pollNodes,
    setIsPingModalOpen,
    setSelectedPingNode,
    showToast,
  } = useApp();

  const [selectedRegion, setSelectedRegion] = useState<string>('All Hubs (6)');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('All Telemetry Ingress');
  const [isPolling, setIsPolling] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0'));
    };
    updateTime();
    const interval = setInterval(updateTime, 250);
    return () => clearInterval(interval);
  }, []);

  const handlePoll = () => {
    setIsPolling(true);
    pollNodes();
    setTimeout(() => {
      setIsPolling(false);
    }, 800);
  };

  const handleInspect = (node: TelemetryNode) => {
    setSelectedPingNode(node);
    setIsPingModalOpen(true);
  };

  const handlePing = (node: TelemetryNode) => {
    setSelectedPingNode(node);
    setIsPingModalOpen(true);
  };

  const filteredNodes = telemetryNodes.filter((node) => {
    if (selectedRegion === 'All Hubs (6)') return true;
    return node.region === selectedRegion;
  });

  return (
    <div className="w-full pb-16 pt-2">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-6 max-w-[1640px] mx-auto">
        {/* Top Flight Status Bar & Global Orchestration Banner */}
        <div className="w-full bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-slate-200 flex flex-col gap-4">
          {/* Upper Section: System Health Summary */}
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span className="text-[12px] text-emerald-900 uppercase tracking-wider font-extrabold">
                  GLOBAL INGESTION OPTIMAL
                </span>
              </div>
              <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                <span className="material-symbols-outlined text-[18px] text-teal-700">verified_user</span>
                <span>
                  Cluster Integrity: <strong className="text-slate-900 font-bold">99.98% SLA Active</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                <span className="material-symbols-outlined text-[18px] text-teal-800">hub</span>
                <span>
                  Active Clusters: <strong className="text-slate-900 font-bold">24 / 24 Operational</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                <span className="material-symbols-outlined text-[18px] text-teal-700">speed</span>
                <span>
                  Global Mean RTT: <strong className="text-slate-900 font-bold">28.4ms</strong>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
              <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1.5 text-slate-600 text-[11px] font-medium font-mono">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>UTC {utcTime || '14:02:18.904'}</span>
              </div>

              <button
                type="button"
                onClick={handlePoll}
                disabled={isPolling}
                className="px-4 py-1.5 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <span className={`material-symbols-outlined text-[18px] ${isPolling ? 'animate-spin' : ''}`}>
                  sync
                </span>
                <span>{isPolling ? 'Polling...' : 'Poll Nodes'}</span>
              </button>
            </div>
          </div>

          {/* Live Global Ingestion Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Active Edge Nodes
                </span>
                <span className="text-xl sm:text-2xl text-slate-900 font-extrabold tracking-tight font-mono">
                  148 <span className="text-xs text-slate-500 font-normal">/ 150 Ingestion</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">sensors</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Aggregate Bandwidth
                </span>
                <span className="text-xl sm:text-2xl text-slate-900 font-extrabold tracking-tight font-mono">
                  4.82 <span className="text-xs text-slate-500 font-normal">Gbps</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">lan</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Real-time Sync Rate
                </span>
                <span className="text-xl sm:text-2xl text-slate-900 font-extrabold tracking-tight font-mono">
                  12,450 <span className="text-xs text-slate-500 font-normal">pkt/sec</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">stacked_line_chart</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Mean Satellite RTT
                </span>
                <span className="text-xl sm:text-2xl text-slate-900 font-extrabold tracking-tight font-mono">
                  31.2 <span className="text-xs text-slate-500 font-normal">ms</span>
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">satellite_alt</span>
              </div>
            </div>
          </div>

          {/* Quick Operational Filter Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-1 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 mr-1 font-bold">
                Region:
              </span>
              {['All Hubs (6)', 'Americas', 'EMEA', 'APAC', 'Relay Shards'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRegion(r)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                <span className="material-symbols-outlined text-[16px] text-slate-500">network_ping</span>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Protocol:</span>
                <select
                  value={selectedProtocol}
                  onChange={(e) => setSelectedProtocol(e.target.value)}
                  className="bg-transparent text-xs text-slate-900 font-semibold focus:outline-none cursor-pointer"
                >
                  <option>All Telemetry Ingress</option>
                  <option>LoRaWAN Bio-Tags</option>
                  <option>MQTT-SN Edge Brokers</option>
                  <option>Cellular NB-IoT Direct</option>
                  <option>Starlink Low-Earth SAT</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                <span className="material-symbols-outlined text-[16px] text-slate-500">tune</span>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">Health:</span>
                <span className="text-xs text-slate-900 font-bold">100% Nominal</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Cluster Tactical Node Grid (3x2 Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNodes.map((node) => {
            const strokeDashoffset = Math.round(188.5 * (1 - node.qualityPercent / 100));

            return (
              <div
                key={node.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[11px] uppercase tracking-wider text-teal-800 font-bold">
                          {node.code}
                        </span>
                      </div>
                      <h3 className="text-[18px] text-slate-900 font-bold mt-0.5">{node.name}</h3>
                      <p className="text-[12px] text-slate-500">{node.subtext}</p>
                    </div>

                    <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-[11px] font-bold flex items-center gap-1 shrink-0">
                      <span className="material-symbols-outlined text-[14px]">router</span>
                      <span>{node.uplinkType}</span>
                    </span>
                  </div>

                  {/* Gauge & Sparkline Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mb-4">
                    {/* Circular Gauge */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                        <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 72 72">
                          <circle
                            cx="36"
                            cy="36"
                            r="30"
                            stroke="#e2e8f0"
                            strokeWidth="6"
                            fill="transparent"
                          ></circle>
                          <circle
                            cx="36"
                            cy="36"
                            r="30"
                            stroke="#0d9488"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray="188.5"
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                          ></circle>
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center text-center">
                          <span className="text-[16px] font-extrabold text-slate-900 leading-none font-mono">
                            {node.qualityPercent}
                            <span className="text-[10px] text-teal-700 font-bold">%</span>
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold tracking-tight">
                            QUALITY
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[11px] text-slate-500 uppercase font-semibold">Signal Power</span>
                        <span className="text-[15px] text-slate-900 font-bold font-mono">
                          {node.signalPowerDbm} dBm
                        </span>
                        <span className="text-[11px] text-teal-700 font-medium">{node.signalDesc}</span>
                      </div>
                    </div>

                    {/* Ping Sparkline */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center justify-between text-slate-500 mb-1 text-[11px]">
                        <span className="font-semibold uppercase">60s Ping History</span>
                        <span className="font-bold text-slate-900 font-mono">{node.avgPingMs}ms avg</span>
                      </div>

                      <div className="w-full h-10 bg-white rounded-lg p-1 border border-slate-200 flex items-end">
                        <svg className="w-full h-8 overflow-visible" viewBox="0 0 160 40">
                          <path
                            d="M0,28 Q20,34 40,24 T80,18 T120,26 T140,15 L160,22 L160,40 L0,40 Z"
                            fill="rgba(13, 148, 136, 0.15)"
                          ></path>
                          <path
                            d="M0,28 Q20,34 40,24 T80,18 T120,26 T140,15 L160,22"
                            fill="none"
                            stroke="#0d9488"
                            strokeWidth="2"
                            strokeLinecap="round"
                          ></path>
                          <circle cx="160" cy="22" r="3.5" fill="#0d9488" className="animate-pulse"></circle>
                        </svg>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-mono">
                        <span>min {node.minPingMs}ms</span>
                        <span>peak {node.peakPingMs}ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Metric Grid */}
                  <div className="grid grid-cols-4 gap-1.5 py-1 text-center mb-4">
                    <div className="bg-slate-50 border border-slate-200/70 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Loss</span>
                      <span className="text-[13px] font-bold text-slate-900 font-mono">{node.lossPercent}%</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/70 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Jitter</span>
                      <span className="text-[13px] font-bold text-slate-900 font-mono">{node.jitterMs}ms</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/70 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Stream</span>
                      <span className="text-[13px] font-bold text-slate-900 font-mono">{node.streamRateSec}/s</span>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/70 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-500 block uppercase font-medium">Uptime</span>
                      <span className="text-[13px] font-bold text-emerald-700 font-mono">{node.uptimePercent}%</span>
                    </div>
                  </div>

                  {/* Buffer Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center text-[11px] mb-1.5">
                      <span className="text-slate-600 font-medium">Edge Buffer Clearance &amp; Ingestion</span>
                      <span className="text-teal-800 font-bold">{node.bufferDesc}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-700 rounded-full transition-all duration-500 shadow-xs"
                        style={{ width: `${node.bufferPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Footer / Card Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px]">access_time</span>
                    <span>{node.lastSeenSec}s ago</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleInspect(node)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    >
                      Inspect Topology
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePing(node)}
                      className="px-2.5 py-1 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      Ping Test
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lower Section: Live Field Event Stream & Telemetry Inspector */}
        <div className="w-full bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <span className="material-symbols-outlined text-[20px]">terminal</span>
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-slate-900">
                  Global Synchronized Ingestion Stream
                </h4>
                <p className="text-[12px] text-slate-500">Live TLS 1.3 encrypted handshake ledger &amp; sat hops</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>LIVE STREAM (40 pkts/s)</span>
              </span>
              <button
                type="button"
                onClick={() => showToast('Filters Configured', 'Stream filtered to verified CRC payload packets.', 'filter_list', 'text-teal-400')}
                className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
            </div>
          </div>

          {/* Real-Time Ticker Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 text-[11px] uppercase tracking-wider bg-slate-50 border-y border-slate-200 font-semibold">
                  <th className="py-2.5 px-4 rounded-l-lg">Timestamp (UTC)</th>
                  <th className="py-2.5 px-4">Target Cluster</th>
                  <th className="py-2.5 px-4">Ingress Protocol</th>
                  <th className="py-2.5 px-4">Packet ID / Hash</th>
                  <th className="py-2.5 px-4">Latency</th>
                  <th className="py-2.5 px-4">Bio-Sensor Batch Payload</th>
                  <th className="py-2.5 px-4 text-right rounded-r-lg">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[12px]">
                {ingestionPackets.map((pkt) => (
                  <tr key={pkt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-500">{pkt.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-teal-800">{pkt.targetCluster}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-[11px]">
                        {pkt.protocol}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{pkt.packetHash}</td>
                    <td className="py-3 px-4 text-emerald-700 font-bold">{pkt.latencyMs} ms</td>
                    <td className="py-3 px-4 text-slate-800 font-sans text-xs">{pkt.payload}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                        {pkt.integrity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full py-4 border-t border-slate-200 text-slate-500 text-xs flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold uppercase tracking-wider text-teal-800">
              SECURE BIO-TELEMETRY FEED
            </span>
            <span>•</span>
            <span>Node Cluster v4.11-PROD</span>
            <span>•</span>
            <span>Packet Integrity 99.98%</span>
          </div>
          <div className="text-center md:text-right">
            © 2026 Bio-Security Incident Diagnostics &amp; Telemetry Command. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

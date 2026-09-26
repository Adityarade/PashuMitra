'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle, 
  MapPin, 
  Filter, 
  Download, 
  Sparkles, 
  BarChart3, 
  ArrowUpRight,
  TrendingDown,
  Building,
  Users
} from 'lucide-react';
import { DISTRICT_HEATMAP_DATA, DistrictHeatmapData } from '@bhashasetu/shared';
import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageHeatmap() {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictHeatmapData>(DISTRICT_HEATMAP_DATA[0]);

  const states = ['All', 'Jharkhand', 'Odisha', 'Tamil Nadu', 'Assam', 'Maharashtra'];

  const filteredDistricts = selectedState === 'All'
    ? DISTRICT_HEATMAP_DATA
    : DISTRICT_HEATMAP_DATA.filter((d) => d.state === selectedState);

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-black rounded-full uppercase tracking-wider">
                {t('platform.nep', 'National Education Policy 2020')}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black rounded-full uppercase tracking-wider">
                State & District Policy Engine
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t('admin.heatmap_title', 'National Vernacular Language-Gap Heatmap')}
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Real-time administrative telemetry mapping AI acoustic model accuracy, curriculum depth, and mother-tongue pedagogical deficits across India&apos;s 700+ districts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Exporting Official State Language-Gap Audit (PDF/CSV)...')}
              className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t('admin.export_report', 'Export Policy Report')}</span>
            </button>
          </div>
        </div>

        {/* National Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white">12.8 Lakh</div>
            <div className="text-xs text-slate-400 font-semibold mt-0.5">{t('admin.enrolled_students', 'Enrolled Vernacular Students')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">+34.8%</div>
            <div className="text-xs text-slate-400 font-semibold mt-0.5">{t('admin.comprehension_gain', 'Comprehension Gain (NEP)')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-orange-400">18,450 Hrs</div>
            <div className="text-xs text-slate-400 font-semibold mt-0.5">{t('admin.tribal_hours', 'Tribal Speech Corpus Hours')}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-400">14,750</div>
            <div className="text-xs text-slate-400 font-semibold mt-0.5">{t('admin.connected_schools', 'Connected Rural Schools')}</div>
          </div>
        </div>
      </div>

      {/* Filter and Heatmap View */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              District Priority Matrix & Model Coverage
            </h3>
          </div>

          {/* State Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 mr-1" />
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedState === st
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* District Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDistricts.map((item) => {
            const isCritical = item.priorityLevel === 'Critical';
            const isSelected = selectedDistrict.code === item.code;

            return (
              <div
                key={item.code}
                onClick={() => setSelectedDistrict(item)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-orange-500 bg-orange-50/40 shadow-md ring-2 ring-orange-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {item.state}
                    </span>
                    <h4 className="text-lg font-black text-slate-900">
                      {item.district}
                    </h4>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isCritical
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {item.priorityLevel} Gap ({item.lowResourceGapScore}%)
                  </span>
                </div>

                {/* Progress bars */}
                <div className="space-y-3 my-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                      <span>AI Model Accuracy</span>
                      <span className="font-bold text-slate-900">{item.aiModelConfidence}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.aiModelConfidence < 60 ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${item.aiModelConfidence}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                      <span>Curriculum Content Depth</span>
                      <span className="font-bold text-slate-900">{item.contentCompleteness}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          item.contentCompleteness < 60 ? 'bg-amber-500' : 'bg-sky-500'
                        }`}
                        style={{ width: `${item.contentCompleteness}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{item.totalSchools} Schools</span>
                  <span className="text-orange-600 font-bold flex items-center gap-1">
                    Inspect District <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected District Deep Dive */}
      {selectedDistrict && (
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block">
                Target Policy Focus: {selectedDistrict.state}
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                {selectedDistrict.district} District Action Plan
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700">
                Enrolled Students: <span className="text-orange-400">{selectedDistrict.enrolledStudents.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Automated AI Policy Interventions for {selectedDistrict.district}:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedDistrict.recommendedActions.map((action, idx) => (
                <div key={idx} className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-orange-500/20 text-orange-400 font-black text-xs flex items-center justify-center shrink-0 border border-orange-500/30">
                    0{idx + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client"
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import {
  FileText,
  Download,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  BarChart3,
  Loader2,
  Share2
} from 'lucide-react'

export default function GenerateReportPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('executive')
  const [timeRange, setTimeRange] = useState('30d')
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(true)

  const templates = [
    {
      id: 'executive',
      title: 'Executive Revenue & Cohort Digest',
      desc: 'High-level business KPIs, ARR growth velocity, customer retention rates, and churn metrics.',
      badge: 'Most Popular'
    },
    {
      id: 'performance',
      title: 'Database Health & Index Audit',
      desc: 'Table size breakdown, slow query profiling, missing index suggestions, and vacuum alerts.',
      badge: 'Technical'
    },
    {
      id: 'security',
      title: 'Data Privacy & Access Audit',
      desc: 'PII columns identification, table privilege verification, and connection anomaly logs.',
      badge: 'Compliance'
    },
  ]

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setReportGenerated(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col selection:bg-accent/30 selection:text-white">
      <Navbar activePage="Generate Report" />

      <main className="flex-1 px-6 lg:px-12 py-8 max-w-[1560px] w-full mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-accent" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-fg">
                Generate Reports
              </h1>
            </div>
            <p className="text-sm text-fg-2 mt-1">
              Produce executive-ready database reports with automated AI narrative summaries and charts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white px-5 py-2.5 text-sm font-semibold transition-all shadow-md shadow-accent/25 hover:shadow-accent/40 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Report</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Template Selector Grid */}
        <div>
          <h2 className="text-xs uppercase tracking-wider font-bold text-fg-3 mb-3">
            Select Report Template
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTemplate === tpl.id
                    ? 'bg-surface border-accent shadow-md shadow-accent/10 ring-1 ring-accent'
                    : 'bg-surface/50 border-border hover:bg-surface hover:border-border/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent bg-muted px-2 py-0.5 rounded">
                      {tpl.badge}
                    </span>
                    {selectedTemplate === tpl.id && (
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-fg mb-1.5">{tpl.title}</h3>
                  <p className="text-xs text-fg-2 leading-relaxed">{tpl.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-fg-3">
                  <span>SQLite Engine</span>
                  <span className="font-mono">Ready</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters & Options Row */}
        <div className="rounded-xl bg-surface border border-border p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-fg-2">Timeframe:</span>
            {['7d', '30d', '90d', 'YTD'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  timeRange === t
                    ? 'bg-accent text-white'
                    : 'bg-muted text-fg-2 hover:bg-[#383532] hover:text-fg'
                }`}
              >
                {t === '7d' ? 'Last 7 Days' : t === '30d' ? 'Last 30 Days' : t === '90d' ? 'Last Quarter' : 'Year to Date'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-fg-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="rounded accent-[#D97757]" />
              <span>Include AI Executive Narrative</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="rounded accent-[#D97757]" />
              <span>Include Performance Benchmarks</span>
            </label>
          </div>
        </div>

        {/* Report Preview Document */}
        {reportGenerated && (
          <div className="rounded-2xl bg-surface border border-border p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  Generated Document Preview
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-fg mt-1">
                  Executive Database Intelligence Report • Q3 2026
                </h3>
                <span className="text-xs text-fg-3">
                  Dataset: Production DB Snapshot • Analyzed 2.39M rows in 1.4s
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button className="flex items-center gap-1.5 rounded-lg bg-muted hover:bg-[#383532] text-fg px-3.5 py-2 text-xs font-semibold border border-border transition-colors">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* AI Summary Callout */}
            <div className="rounded-xl bg-muted p-4 sm:p-5 border border-border/80">
              <div className="flex items-center gap-2 text-xs font-bold text-accent mb-2">
                <Sparkles className="w-4 h-4" />
                <span>AI Executive Summary</span>
              </div>
              <p className="text-xs sm:text-sm text-fg-2 leading-relaxed">
                Over the past 30 days, total processed volume reached <strong className="text-fg">$284.5K</strong> (+18.4% MoM) driven by enterprise upgrades. Active users increased by 12.1% to 42,850. Database latency held steady at an average of 0.68ms with zero query timeout incidents. Recommendation: Add a composite index on <code className="text-accent bg-surface px-1.5 py-0.5 rounded">orders(user_id, created_at)</code> to preempt latency degradation as order count surpasses 1M.
              </p>
            </div>

            {/* Key Findings Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/60 border border-border">
                <span className="text-[11px] uppercase tracking-wider text-fg-3 font-semibold">Net Expansion</span>
                <span className="text-2xl font-black text-fg block mt-1">+31.2%</span>
                <span className="text-xs text-emerald-400 font-medium">Enterprise cohort outperforming</span>
              </div>
              <div className="p-4 rounded-xl bg-muted/60 border border-border">
                <span className="text-[11px] uppercase tracking-wider text-fg-3 font-semibold">Customer Churn</span>
                <span className="text-2xl font-black text-emerald-400 block mt-1">0.85%</span>
                <span className="text-xs text-fg-3">Lowest churn in 4 quarters</span>
              </div>
              <div className="p-4 rounded-xl bg-muted/60 border border-border">
                <span className="text-[11px] uppercase tracking-wider text-fg-3 font-semibold">Database Throughput</span>
                <span className="text-2xl font-black text-fg block mt-1">1,480 QPS</span>
                <span className="text-xs text-emerald-400 font-medium">Peak response &lt; 2.1ms</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

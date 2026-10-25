import Navbar from '@/components/Navbar'
import { Safari } from '@/components/safari-view'
import SocialProof, { AvatarGroup, Avatar, StarRating } from '@/components/social-proof'
import { ArrowRight, Database, Sparkles, ShieldCheck, Zap, Activity, BarChart3, PieChart, TrendingUp, TrendingDown } from 'lucide-react'
import React from 'react'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col selection:bg-accent/30 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 lg:px-12 xl:px-16 py-10 lg:py-16">
        <div className="max-w-[1560px] w-full mx-auto">
          {/* Hero Section Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">

            {/* Left: Hero Tagline & Headings (5 cols on desktop) */}
            <div className="lg:col-span-5 flex flex-col items-start gap-6 xl:gap-8">
              {/* Eyebrow Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-surface text-accent border border-border shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>The Local-First Data Intelligence Platform</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-text-primary leading-[1.1]">
                Instant database insights,{' '}
                <span className="text-accent">right on your desktop.</span>
              </h1>

              {/* Tagline Subtitle */}
              <p className="text-base sm:text-lg xl:text-xl text-text-secondary leading-relaxed max-w-xl">
                Explore schemas, run lightning-fast queries, and generate executive reports directly from your local SQLite, PostgreSQL, and MySQL databases with zero cloud latency and complete data privacy.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button className="flex items-center gap-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white px-6 py-3.5 text-sm xl:text-base font-semibold transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5">
                  <Database className="w-4 h-4 xl:w-5 xl:h-5" />
                  <span>Connect Database</span>
                  <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5" />
                </button>
                <button className="flex items-center gap-2 rounded-xl bg-surface hover:bg-[#383532] text-text-primary border border-border px-6 py-3.5 text-sm xl:text-base font-medium transition-all hover:-translate-y-0.5">
                  <span>Explore Schema</span>
                </button>
              </div>

              {/* Trust Rating Snippet */}
              <div className="flex items-center gap-3 pt-1">
                <AvatarGroup>
                  {[
                    { src: 'https://i.pravatar.cc/100?img=11', alt: 'Dev 1', name: 'Alex T. (Lead Architect)' },
                    { src: 'https://i.pravatar.cc/100?img=32', alt: 'Dev 2', name: 'Sarah C. (Staff Eng)' },
                    { src: 'https://i.pravatar.cc/100?img=33', alt: 'Dev 3', name: 'Michael R. (Data Eng)' },
                    { src: 'https://i.pravatar.cc/100?img=44', alt: 'Dev 4', name: 'Elena R. (Analytics Head)' },
                  ].map((a, i) => (
                    <Avatar key={i} src={a.src} alt={a.alt} name={a.name} className="w-8 h-8 border-border" />
                  ))}
                </AvatarGroup>
                <div className="flex flex-col">
                  <StarRating rating={5} />
                  <span className="text-xs text-text-tertiary font-medium">5.0 across all reviews</span>
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/80 w-full">
                <div className="flex items-center gap-2.5 text-xs xl:text-sm text-text-secondary font-medium">
                  <Zap className="w-4 h-4 text-accent shrink-0" />
                  <span>Sub-millisecond</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs xl:text-sm text-text-secondary font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Private</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs xl:text-sm text-text-secondary font-medium">
                  <Sparkles className="w-4 h-4 text-accent shrink-0" />
                  <span>AI Insights</span>
                </div>
              </div>
            </div>

            {/* Right: Safari Dashboard Preview (7 cols on desktop for a spacious view) */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end w-full">
              <div className="w-full max-w-2xl lg:max-w-none transition-transform duration-300 hover:scale-[1.008]">
                <Safari
                  url="datalens.local"
                  className="shadow-2xl shadow-black/60 border border-border rounded-2xl overflow-hidden"
                >
                  <div className="w-full h-full bg-sidebar p-5 xl:p-6 flex flex-col justify-between font-sans select-none">

                    {/* Analytics Dashboard Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-sm shadow-accent/50" />
                        <div>
                          <span className="font-bold text-text-primary text-sm xl:text-base block leading-tight">
                            Executive Data Analytics
                          </span>
                          <span className="text-[11px] xl:text-xs text-text-tertiary">SaaS Revenue & Customer Cohorts</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs px-3 py-1 rounded-lg bg-surface text-text-secondary border border-border font-medium">
                          Q3 2026 ▾
                        </span>
                        <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Live Data
                        </span>
                      </div>
                    </div>

                    {/* Window Content: 4 KPI Cards + 2 Sizable Charts */}
                    <div className="my-auto py-3 xl:py-4 space-y-3.5 xl:space-y-4">

                      {/* Business KPI Metrics Row */}
                      <div className="grid grid-cols-4 gap-2.5 xl:gap-3">
                        <div className="rounded-xl bg-surface p-3 xl:p-3.5 border border-border flex flex-col justify-between">
                          <span className="text-[11px] xl:text-xs text-text-tertiary uppercase tracking-wider font-medium">Total Revenue</span>
                          <span className="text-lg xl:text-2xl font-black text-text-primary mt-1">$284.5K</span>
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3.5 h-3.5" /> +18.4%
                          </span>
                        </div>

                        <div className="rounded-xl bg-surface p-3 xl:p-3.5 border border-border flex flex-col justify-between">
                          <span className="text-[11px] xl:text-xs text-text-tertiary uppercase tracking-wider font-medium">Active Users</span>
                          <span className="text-lg xl:text-2xl font-black text-text-primary mt-1">42,850</span>
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3.5 h-3.5" /> +12.1%
                          </span>
                        </div>

                        <div className="rounded-xl bg-surface p-3 xl:p-3.5 border border-border flex flex-col justify-between">
                          <span className="text-[11px] xl:text-xs text-text-tertiary uppercase tracking-wider font-medium">Conversion</span>
                          <span className="text-lg xl:text-2xl font-black text-accent mt-1">4.82%</span>
                          <span className="text-xs text-accent font-semibold flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3.5 h-3.5" /> +0.8%
                          </span>
                        </div>

                        <div className="rounded-xl bg-surface p-3 xl:p-3.5 border border-border flex flex-col justify-between">
                          <span className="text-[11px] xl:text-xs text-text-tertiary uppercase tracking-wider font-medium">Churn Rate</span>
                          <span className="text-lg xl:text-2xl font-black text-text-primary mt-1">0.85%</span>
                          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                            <TrendingDown className="w-3.5 h-3.5" /> -0.2%
                          </span>
                        </div>
                      </div>

                      {/* Analytics Charts Grid: Revenue Bar Chart + Segment Donut Chart */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xl:gap-3.5">

                        {/* 1. Bar Chart: Monthly Revenue Growth */}
                        <div className="rounded-xl bg-surface p-3.5 xl:p-4 border border-border flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="w-4 h-4 text-accent" />
                              <span className="text-xs xl:text-sm font-bold text-text-primary">
                                Revenue Growth ($K)
                              </span>
                            </div>
                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-mono font-bold">
                              YTD +142%
                            </span>
                          </div>

                          {/* Bars Graphic */}
                          <div className="h-28 xl:h-36 flex items-end gap-2 pt-3 pb-1 border-b border-border/60">
                            {[
                              { h: '38%', label: 'Jan', val: '$28k' },
                              { h: '48%', label: 'Feb', val: '$36k' },
                              { h: '56%', label: 'Mar', val: '$42k' },
                              { h: '68%', label: 'Apr', val: '$51k' },
                              { h: '80%', label: 'May', val: '$60k' },
                              { h: '73%', label: 'Jun', val: '$55k' },
                              { h: '90%', label: 'Jul', val: '$68k' },
                              { h: '100%', label: 'Aug', val: '$75k', isPeak: true },
                            ].map((b, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5 group">
                                <div className="w-full flex-1 flex items-end bg-[#262624] rounded-t-md p-0.5">
                                  <div
                                    style={{ height: b.h }}
                                    className={`w-full rounded-t-md transition-all duration-300 ${b.isPeak
                                      ? 'bg-gradient-to-t from-accent to-accent-hover shadow-md shadow-accent/50'
                                      : 'bg-accent/80 hover:bg-accent'
                                      }`}
                                  />
                                </div>
                                <span
                                  className={`text-[10px] xl:text-xs font-mono font-medium ${b.isPeak ? 'text-accent font-bold' : 'text-text-tertiary'
                                    }`}
                                >
                                  {b.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2 text-xs text-text-tertiary font-mono">
                            <span>Run Rate: $75k/mo</span>
                            <span className="text-emerald-400 font-semibold">Target: $320k</span>
                          </div>
                        </div>

                        {/* 2. Donut / Pie Chart: Revenue by Tier */}
                        <div className="rounded-xl bg-surface p-3.5 xl:p-4 border border-border flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <PieChart className="w-4 h-4 text-accent" />
                              <span className="text-xs xl:text-sm font-bold text-text-primary">
                                Revenue by Segment
                              </span>
                            </div>
                            <span className="text-xs text-text-tertiary font-medium">4 Tiers</span>
                          </div>

                          {/* Donut and Legend Row */}
                          <div className="flex items-center justify-around gap-4 my-auto py-2">
                            {/* SVG Donut */}
                            <div className="relative w-28 h-28 xl:w-32 xl:h-32 shrink-0">
                              <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
                                {/* Track */}
                                <circle cx="36" cy="36" r="26" fill="none" stroke="#262624" strokeWidth="9" />

                                {/* Segment 1: Enterprise (48%) length 78.4, offset 0 */}
                                <circle
                                  cx="36"
                                  cy="36"
                                  r="26"
                                  fill="none"
                                  stroke="#D97757"
                                  strokeWidth="9"
                                  strokeDasharray="76 163.36"
                                  strokeDashoffset="0"
                                />
                                {/* Segment 2: Professional (28%) length 45.7, offset -78.4 */}
                                <circle
                                  cx="36"
                                  cy="36"
                                  r="26"
                                  fill="none"
                                  stroke="#10B981"
                                  strokeWidth="9"
                                  strokeDasharray="43 163.36"
                                  strokeDashoffset="-78.4"
                                />
                                {/* Segment 3: Growth (16%) length 26.1, offset -124.1 */}
                                <circle
                                  cx="36"
                                  cy="36"
                                  r="26"
                                  fill="none"
                                  stroke="#38BDF8"
                                  strokeWidth="9"
                                  strokeDasharray="24 163.36"
                                  strokeDashoffset="-124.1"
                                />
                                {/* Segment 4: Starter (8%) length 13.0, offset -150.2 */}
                                <circle
                                  cx="36"
                                  cy="36"
                                  r="26"
                                  fill="none"
                                  stroke="#F59E0B"
                                  strokeWidth="9"
                                  strokeDasharray="10 163.36"
                                  strokeDashoffset="-150.2"
                                />
                              </svg>

                              {/* Center Label */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-sm xl:text-base font-black text-text-primary leading-none">
                                  $284k
                                </span>
                                <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-bold leading-none mt-1">
                                  ARR
                                </span>
                              </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-col gap-1.5 text-xs xl:text-sm">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#D97757] shrink-0" />
                                <span className="text-text-secondary font-medium">Enterprise</span>
                                <span className="ml-2 font-mono text-text-primary font-bold">48%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                                <span className="text-text-secondary font-medium">Pro Teams</span>
                                <span className="ml-2 font-mono text-text-primary font-bold">28%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shrink-0" />
                                <span className="text-text-secondary font-medium">Growth</span>
                                <span className="ml-2 font-mono text-text-primary font-bold">16%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] shrink-0" />
                                <span className="text-text-secondary font-medium">Starter</span>
                                <span className="ml-2 font-mono text-text-primary font-bold">8%</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 text-xs text-text-tertiary font-mono">
                            <span>Top: Enterprise ($136k)</span>
                            <span className="text-emerald-400 font-semibold">Expansion +31%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Safari Window Footer Status */}
                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-text-tertiary">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-accent" />
                        <span>Source: Production DB Analytics Pipeline</span>
                      </div>
                      <span className="text-emerald-400 font-semibold">● Retention 94.8%</span>
                    </div>

                  </div>
                </Safari>
              </div>
            </div>

          </div>

          {/* Social Proof Section */}
          <div className="pt-14 mt-10 border-t border-border/60 w-full">
            <SocialProof
              heading={
                <span className="text-base sm:text-lg text-text-secondary font-medium text-center">
                  Trusted by <span className="text-text-primary font-bold"> data engineers</span>, analysts and founders worldwide
                </span>
              }
            />
          </div>
        </div>
      </main>
    </div>
  )
}
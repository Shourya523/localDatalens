"use client"
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import {
  Database,
  Table as TableIcon,
  Search,
  RefreshCw,
  HardDrive,
  Cpu,
  Layers,
  CheckCircle2,
  Play,
  Copy,
  ExternalLink,
  ChevronRight,
  Filter,
  BarChart2
} from 'lucide-react'

interface DBTable {
  name: string
  rows: string
  columns: number
  size: string
  type: string
  primaryKey: string
  lastQueried: string
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTable, setSelectedTable] = useState('users')
  const [copiedQuery, setCopiedQuery] = useState(false)

  const tables: DBTable[] = [
    { name: 'users', rows: '42,850', columns: 12, size: '4.8 MB', type: 'Table', primaryKey: 'id', lastQueried: '2 mins ago' },
    { name: 'orders', rows: '284,520', columns: 16, size: '38.2 MB', type: 'Table', primaryKey: 'order_id', lastQueried: '4 mins ago' },
    { name: 'order_items', rows: '812,400', columns: 8, size: '45.1 MB', type: 'Table', primaryKey: 'item_id', lastQueried: '12 mins ago' },
    { name: 'products', rows: '1,420', columns: 10, size: '820 KB', type: 'Table', primaryKey: 'product_id', lastQueried: '1 hour ago' },
    { name: 'analytics_events', rows: '1,160,890', columns: 7, size: '92.4 MB', type: 'Table', primaryKey: 'event_id', lastQueried: '30 secs ago' },
    { name: 'user_sessions', rows: '94,200', columns: 6, size: '11.5 MB', type: 'Table', primaryKey: 'session_token', lastQueried: '15 mins ago' },
  ]

  const filteredTables = tables.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCopyQuery = (query: string) => {
    navigator.clipboard.writeText(query)
    setCopiedQuery(true)
    setTimeout(() => setCopiedQuery(false), 2000)
  }

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col selection:bg-accent/30 selection:text-white">
      <Navbar activePage="Dashboard" />

      <main className="flex-1 px-6 lg:px-12 py-8 max-w-[1560px] w-full mx-auto space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-fg">
                Database Dashboard
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Connected
              </span>
            </div>
            <p className="text-sm text-fg-2 mt-1">
              Active Connection: <span className="font-mono text-accent font-medium">ecommerce_production.sqlite</span> (SQLite 3.44 Local Engine)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-surface hover:bg-[#383532] text-fg border border-border px-4 py-2.5 text-xs sm:text-sm font-medium transition-all">
              <RefreshCw className="w-4 h-4 text-fg-3" />
              <span>Sync Schema</span>
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all shadow-md shadow-accent/20">
              <Play className="w-4 h-4 fill-current" />
              <span>Execute SQL</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-surface p-5 border border-border flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-fg-3 font-semibold">Total Records</span>
              <Database className="w-4 h-4 text-accent" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-fg tracking-tight">2,396,280</span>
              <p className="text-xs text-emerald-400 mt-1 font-medium">+14.2k indexed today</p>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-5 border border-border flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-fg-3 font-semibold">Tables & Views</span>
              <TableIcon className="w-4 h-4 text-accent" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-fg tracking-tight">6 Tables</span>
              <p className="text-xs text-fg-2 mt-1">42 total schema attributes</p>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-5 border border-border flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-fg-3 font-semibold">Avg Query Latency</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-emerald-400 tracking-tight font-mono">0.68ms</span>
              <p className="text-xs text-fg-2 mt-1">Zero network overhead</p>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-5 border border-border flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-fg-3 font-semibold">Local Storage</span>
              <HardDrive className="w-4 h-4 text-accent" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-fg tracking-tight">192.8 MB</span>
              <p className="text-xs text-fg-2 mt-1">WAL Journaling Active</p>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Tables List & Table Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tables List Panel (7 cols) */}
          <div className="lg:col-span-7 rounded-xl bg-surface border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-bold text-fg">Schema Tables</h2>
                <span className="text-xs font-mono bg-muted text-fg-2 px-2 py-0.5 rounded">
                  {filteredTables.length}
                </span>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" />
                <input
                  type="text"
                  placeholder="Filter tables..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-muted border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-fg placeholder:text-fg-3 focus:outline-none focus:border-accent w-full sm:w-48"
                />
              </div>
            </div>

            <div className="divide-y divide-border/60">
              {filteredTables.map((t) => (
                <div
                  key={t.name}
                  onClick={() => setSelectedTable(t.name)}
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                    selectedTable === t.name
                      ? 'bg-muted/80 border-l-4 border-l-accent'
                      : 'hover:bg-muted/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                      <TableIcon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-fg font-mono">{t.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-fg-3 font-semibold uppercase">
                          {t.type}
                        </span>
                      </div>
                      <span className="text-xs text-fg-3">
                        PK: <span className="font-mono text-fg-2">{t.primaryKey}</span> • {t.columns} columns
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-mono text-fg font-bold block">{t.rows}</span>
                      <span className="text-[11px] text-fg-3">{t.size}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-fg-3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Inspector & Query Preview Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Table Details Card */}
            <div className="rounded-xl bg-surface border border-border p-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h3 className="text-sm font-bold text-fg font-mono">
                    SELECT * FROM {selectedTable}
                  </h3>
                  <span className="text-xs text-fg-3">Preview Schema Inspection</span>
                </div>
                <button
                  onClick={() => handleCopyQuery(`SELECT * FROM ${selectedTable} LIMIT 50;`)}
                  className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium bg-muted px-2.5 py-1 rounded-lg border border-border transition-colors"
                >
                  {copiedQuery ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedQuery ? 'Copied' : 'Copy SQL'}</span>
                </button>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="bg-muted p-3 rounded-lg border border-border/80 overflow-x-auto text-fg-2">
                  <p className="text-emerald-400">-- Quick schema preview</p>
                  <p><span className="text-accent">CREATE TABLE</span> {selectedTable} (</p>
                  <p className="pl-4">id <span className="text-accent">INTEGER PRIMARY KEY</span>,</p>
                  <p className="pl-4">created_at <span className="text-accent">TIMESTAMP</span> DEFAULT CURRENT_TIMESTAMP,</p>
                  <p className="pl-4">metadata <span className="text-accent">JSON</span>,</p>
                  <p className="pl-4">status <span className="text-accent">TEXT</span> NOT NULL</p>
                  <p>);</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-fg-3">
                  <span>Engine: SQLite B-Tree Index</span>
                  <span className="text-emerald-400 font-semibold">Ready for Querying</span>
                </div>
              </div>
            </div>

            {/* Recent Queries Activity */}
            <div className="rounded-xl bg-surface border border-border p-5">
              <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-fg">Recent Queries</span>
                <span className="text-xs text-fg-3 font-mono">Auto-cached</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { q: 'SELECT count(*) FROM users WHERE active = 1', time: '0.42ms', status: '200 OK' },
                  { q: 'SELECT sum(total) FROM orders GROUP BY month', time: '1.18ms', status: '200 OK' },
                  { q: 'SELECT * FROM analytics_events LIMIT 100', time: '0.89ms', status: '200 OK' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-muted border border-border flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-fg-2 truncate">{item.q}</span>
                    <span className="text-emerald-400 shrink-0 text-[11px] font-bold">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

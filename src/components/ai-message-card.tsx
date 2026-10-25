"use client"

import React, { useState } from 'react'
import {
  Terminal,
  Copy,
  CheckCircle2,
  Play,
  Table as TableIcon,
  Sparkles,
  Database,
  ArrowRight
} from 'lucide-react'

export interface AIMessageData {
  id: string
  role: 'user' | 'assistant'
  content: string
  sql?: string
  resultRows?: Record<string, string | number>[]
  latency?: string
}

interface AIMessageCardProps {
  message: AIMessageData
  onRunQuery?: (sql: string) => void
}

export function AIMessageCard({ message, onRunQuery }: AIMessageCardProps) {
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [runSuccess, setRunSuccess] = useState(false)

  const handleCopy = () => {
    if (!message.sql) return
    navigator.clipboard.writeText(message.sql)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRun = () => {
    if (!message.sql) return
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
      setRunSuccess(true)
      onRunQuery?.(message.sql!)
      setTimeout(() => setRunSuccess(false), 2500)
    }, 600)
  }

  return (
    <div className="w-full rounded-2xl bg-surface border border-border/60 text-fg p-5 space-y-4 neo-shadow transition-all duration-300">
      {/* Narrative Text */}
      <div className="flex items-start gap-3">
        <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
        </div>
        <div className="text-sm leading-relaxed text-fg-2 pt-0.5">
          <p className="text-fg font-medium">{message.content}</p>
        </div>
      </div>

      {/* SQL Code Block */}
      {message.sql && (
        <div className="rounded-xl bg-muted/60 border border-border/80 overflow-hidden neo-shadow-inset-sm">
          {/* Header Bar */}
          <div className="px-4 py-2.5 border-b border-border/60 flex items-center justify-between bg-muted/90">
            <div className="flex items-center gap-2 text-xs font-mono text-fg-3">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span className="font-semibold text-fg">Generated SQL</span>
              {message.latency && (
                <span className="text-emerald-400 font-bold ml-2">● {message.latency}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-fg-2 hover:text-fg px-2.5 py-1 rounded-lg bg-surface border border-border/40 neo-shadow-sm active:neo-shadow-inset-sm transition-all"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 text-xs bg-accent hover:bg-accent-hover text-white px-3 py-1 rounded-lg font-semibold shadow-md shadow-accent/20 neo-shadow-sm active:neo-shadow-inset-sm transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <span>Executing...</span>
                ) : runSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Executed!</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Query</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Syntax code */}
          <pre className="p-4 text-xs font-mono text-fg-2 overflow-x-auto leading-relaxed">
            <code>{message.sql}</code>
          </pre>
        </div>
      )}

      {/* Results Table Preview */}
      {message.resultRows && message.resultRows.length > 0 && (
        <div className="rounded-xl border border-border/80 overflow-hidden bg-surface">
          <div className="px-4 py-2.5 bg-muted/60 border-b border-border/80 text-xs font-bold text-fg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TableIcon className="w-3.5 h-3.5 text-accent" />
              <span>Result Preview</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-fg-3">
                {message.resultRows.length} rows returned
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Status: 200 OK
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#1f1e1d] text-fg-3 uppercase font-mono tracking-wider border-b border-border">
                <tr>
                  {Object.keys(message.resultRows[0]).map((col) => (
                    <th key={col} className="px-4 py-2.5 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-mono">
                {message.resultRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/40 transition-colors">
                    {Object.values(row).map((val, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-2.5 text-fg">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIMessageCard

"use client"
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import { PromptInputBox } from '@/components/ai-prompt-box-neomorphism'
import { AIMessageCard, AIMessageData } from '@/components/ai-message-card'
import { Sparkles, ShieldCheck } from 'lucide-react'

export default function AskPage() {
  const [inputMessage, setInputMessage] = useState('')

  const samplePrompts = [
    "Who are the top 5 customers by total order volume this year?",
    "Show average order value grouped by customer tier",
    "Find users who signed up in the last 30 days without an order",
    "List slowest queries and tables without index on foreign keys"
  ]

  const [messages, setMessages] = useState<AIMessageData[]>([
    {
      id: '1',
      role: 'user',
      content: 'Who are our top 5 revenue-generating customers and how many orders did they place?'
    },
    {
      id: '2',
      role: 'assistant',
      content: 'Here is the SQL query analyzing the `users` and `orders` tables joined on `user_id`, aggregating completed order totals:',
      sql: `SELECT 
    u.id AS customer_id,
    u.name AS customer_name,
    u.email,
    COUNT(o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name, u.email
ORDER BY total_spent DESC
LIMIT 5;`,
      latency: '0.84ms',
      resultRows: [
        { customer_id: 1042, customer_name: 'Acme Global Corp', email: 'billing@acme.com', total_orders: 42, total_spent: '$38,450.00' },
        { customer_id: 884, customer_name: 'Nexus Dynamics', email: 'ops@nexusdyn.io', total_orders: 29, total_spent: '$29,120.50' },
        { customer_id: 2315, customer_name: 'HyperScale Labs', email: 'data@hyperscale.dev', total_orders: 34, total_spent: '$24,800.00' },
        { customer_id: 591, customer_name: 'Apex Robotics', email: 'eng@apexrobotics.co', total_orders: 18, total_spent: '$19,450.00' },
        { customer_id: 3108, customer_name: 'Quantum Cloud Ltd', email: 'admin@quantumcloud.net', total_orders: 21, total_spent: '$16,920.00' },
      ]
    }
  ])

  const handleSend = (text?: string) => {
    const query = typeof text === 'string' ? text : inputMessage
    if (!query.trim()) return

    const userMsg: AIMessageData = {
      id: Date.now().toString(),
      role: 'user',
      content: query
    }

    const lower = query.toLowerCase()
    let generatedSql = ''
    let rows: Record<string, string | number>[] = []

    if (lower.includes('customer') || lower.includes('revenue') || lower.includes('top')) {
      generatedSql = `SELECT 
    u.id AS customer_id,
    u.name AS customer_name,
    COUNT(o.order_id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY total_spent DESC
LIMIT 5;`
      rows = [
        { customer_id: 1042, customer_name: 'Acme Global Corp', total_orders: 42, total_spent: '$38,450.00' },
        { customer_id: 884, customer_name: 'Nexus Dynamics', total_orders: 29, total_spent: '$29,120.50' },
        { customer_id: 2315, customer_name: 'HyperScale Labs', total_orders: 34, total_spent: '$24,800.00' },
        { customer_id: 591, customer_name: 'Apex Robotics', total_orders: 18, total_spent: '$19,450.00' },
        { customer_id: 3108, customer_name: 'Quantum Cloud Ltd', total_orders: 21, total_spent: '$16,920.00' },
      ]
    } else if (lower.includes('slow') || lower.includes('index') || lower.includes('query')) {
      generatedSql = `SELECT 
    query_pattern,
    calls AS execution_count,
    ROUND(total_time_ms, 2) AS total_ms,
    ROUND(mean_time_ms, 3) AS avg_latency_ms,
    recommendation
FROM query_performance_log
WHERE mean_time_ms > 10.0
ORDER BY mean_time_ms DESC
LIMIT 4;`
      rows = [
        { query_pattern: 'SELECT * FROM orders WHERE user_id = ?', execution_count: 14820, total_ms: 1840.5, avg_latency_ms: '12.4ms', recommendation: 'CREATE INDEX idx_orders_user ON orders(user_id)' },
        { query_pattern: 'SELECT * FROM analytics_events WHERE created_at < ?', execution_count: 8420, total_ms: 994.2, avg_latency_ms: '11.8ms', recommendation: 'CREATE INDEX idx_events_created ON analytics_events(created_at)' },
        { query_pattern: 'SELECT sum(amount) FROM transactions GROUP BY category', execution_count: 3200, total_ms: 339.2, avg_latency_ms: '10.6ms', recommendation: 'Partial Index on status = completed' },
      ]
    } else if (lower.includes('user') || lower.includes('signup') || lower.includes('dormant') || lower.includes('churn')) {
      generatedSql = `SELECT 
    id AS user_id,
    name,
    email,
    created_at,
    DATEDIFF(NOW(), created_at) AS days_since_signup
FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders)
  AND created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC
LIMIT 5;`
      rows = [
        { user_id: 4210, name: 'Devon Vance', email: 'devon@vance.tech', created_at: '2026-10-22', days_since_signup: 4 },
        { user_id: 4188, name: 'Clara Silva', email: 'clara@silva.io', created_at: '2026-10-19', days_since_signup: 7 },
        { user_id: 4092, name: 'Tariq Johnson', email: 'tariq@johnson.dev', created_at: '2026-10-14', days_since_signup: 12 },
      ]
    } else {
      generatedSql = `SELECT 
    DATE_TRUNC('month', created_at) AS time_bucket,
    COUNT(*) AS total_records,
    ROUND(AVG(total_amount), 2) AS avg_value
FROM orders
WHERE created_at >= NOW() - INTERVAL '90 days'
GROUP BY 1
ORDER BY 1 DESC;`
      rows = [
        { time_bucket: '2026-10', total_records: 1420, avg_value: '$184.20' },
        { time_bucket: '2026-09', total_records: 1290, avg_value: '$178.50' },
        { time_bucket: '2026-08', total_records: 1115, avg_value: '$162.80' },
      ]
    }

    const aiMsg: AIMessageData = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Generated SQL query based on your local schema definition for "${query}":`,
      sql: generatedSql,
      latency: `${(Math.random() * 0.4 + 0.45).toFixed(2)}ms`,
      resultRows: rows
    }

    setMessages(prev => [...prev, userMsg, aiMsg])
    setInputMessage('')
  }

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col selection:bg-accent/30 selection:text-white">
      <Navbar activePage="Ask" />

      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 max-w-[1280px] w-full mx-auto flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-accent" />
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-fg">
                Ask AI Assistant
              </h1>
            </div>
            <p className="text-sm text-fg-2 mt-1">
              Ask natural language questions about your local database. Queries execute 100% on device.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-xs text-fg-2 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Local Privacy Mode
            </span>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="py-4 flex flex-wrap gap-2">
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInputMessage(prompt)}
              className="text-xs bg-surface hover:bg-[#383532] text-fg-2 hover:text-fg px-3 py-1.5 rounded-lg border border-border transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat History Container */}
        <div className="flex-1 space-y-6 py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {msg.role === 'user' ? (
                <div className="max-w-2xl rounded-2xl p-4 sm:p-5 bg-accent text-white font-medium text-sm sm:text-base rounded-br-sm shadow-md shadow-accent/20">
                  {msg.content}
                </div>
              ) : (
                <div className="w-full max-w-3xl">
                  {/* Imported AI Message Component */}
                  <AIMessageCard message={msg} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Neomorphic AI Prompt Input Box */}
        <div className="pt-4 pb-2 mt-auto">
          <PromptInputBox
            value={inputMessage}
            onValueChange={setInputMessage}
            onSend={(msg) => handleSend(msg)}
            placeholder="Ask anything about your database schema, users, or metrics..."
          />
          <div className="flex items-center justify-between text-[11px] text-fg-3 mt-2 px-3">
            <span>Press Enter to execute SQL query</span>
            <span>Schema: SQLite 3.44 • 6 Tables Synced</span>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"
import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import {
  Lock,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Database,
  CheckCircle2
} from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col selection:bg-accent/30 selection:text-white">
      <Navbar activePage="Login" />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-md w-full mx-auto space-y-6">

          {/* Form Card */}
          <div className="rounded-2xl bg-surface border border-border p-6 sm:p-8 shadow-2xl shadow-black/40 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 text-accent mb-1">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-fg">
                Unlock Workspace
              </h1>
              <p className="text-xs text-fg-2">
                Sign in to your local DataLens environment and secure database credentials.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h2 className="text-sm font-bold text-fg">Workspace Unlocked</h2>
                <p className="text-xs text-fg-2">
                  Session initialized. Redirecting to your local database dashboard...
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white px-4 py-2 text-xs font-semibold shadow-sm transition-all"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-fg-2 block">
                    Workspace Identifier / Email
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="architect@company.local"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-muted border border-border rounded-xl px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-3 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-fg-2 block">
                      Local Master Passkey
                    </label>
                    <span className="text-[11px] text-accent hover:underline cursor-pointer">
                      Reset vault key
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-muted border border-border rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-fg placeholder:text-fg-3 focus:outline-none focus:border-accent transition-colors font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-3 hover:text-fg transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white py-3 text-sm font-semibold transition-all shadow-md shadow-accent/25 hover:shadow-accent/40 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Authenticating Local Vault...' : 'Sign In'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Quick Demo Access */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
              <span className="text-fg-3">Looking to test features?</span>
              <Link
                href="/dashboard"
                className="text-accent hover:text-accent-hover font-semibold transition-colors flex items-center gap-1"
              >
                <span>Open Local Demo</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Privacy Guarantee Pill */}
          <div className="flex items-center justify-center gap-2 text-xs text-fg-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero cloud telemetry. Vault encrypted locally with AES-256-GCM.</span>
          </div>

        </div>
      </main>
    </div>
  )
}

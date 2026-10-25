"use client"
import React from 'react'
import Link from 'next/link'

export type NavItem = "Home" | "Dashboard" | "Ask" | "Generate Report" | "Login"

export interface NavbarProps {
    activePage?: NavItem | string
}

const navButtons: { name: NavItem; href: string }[] = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Ask", href: "/ask" },
    { name: "Generate Report", href: "/generate-report" },
]

export default function Navbar({ activePage = "Home" }: NavbarProps) {
    return (
        <div className="relative flex h-15 w-full items-center border-b border-[#3D3D3A] bg-[#1F1E1D] px-6 select-none z-50">

            <Link href="/" className="mr-auto text-xl font-semibold tracking-tight text-[#FAF9F5] hover:opacity-90 transition-opacity">
                Data<span className="text-[#D97757]">Lens</span>
            </Link>

            <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-[#3D3D3A] bg-[#292725] p-1">
                {navButtons.map((n) => {
                    const isActive = activePage.toLowerCase() === n.name.toLowerCase()
                    return (
                        <Link
                            key={n.name}
                            href={n.href}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "bg-[#D97757] text-white shadow-sm"
                                    : "text-[#B8B5AE] hover:bg-[#383532] hover:text-[#FAF9F5]"
                            }`}
                        >
                            {n.name}
                        </Link>
                    )
                })}
            </nav>

            <Link
                href="/login"
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activePage.toLowerCase() === "login"
                        ? "bg-[#c6613f] text-white ring-2 ring-[#D97757]"
                        : "bg-[#D97757] text-white shadow-sm hover:bg-[#c6613f]"
                }`}
            >
                Login
            </Link>

        </div>
    )
}
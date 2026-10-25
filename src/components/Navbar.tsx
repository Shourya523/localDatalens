"use client"
import React, { useState } from 'react'

export default function Navbar() {
    const navButtons = ["Home", "Dashboard", "Ask", "Generate Report"]
    const [navActive, isnavActive] = useState("Home")

    return (
        <div className="relative flex h-15 w-full items-center border-b border-[#3D3D3A] bg-[#1F1E1D] px-6">

            <h1 className="mr-auto text-xl font-semibold tracking-tight text-[#FAF9F5]">
                Data<span className="text-[#D97757]">Lens</span>
            </h1>
            <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-[#3D3D3A] bg-[#292725] p-1">

                {navButtons.map((n) => (
                    <button
                        key={n}
                        onClick={() => isnavActive(n)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${navActive === n
                            ? "bg-[#D97757] text-white shadow-sm"
                            : "text-[#B8B5AE] hover:bg-[#383532] hover:text-[#FAF9F5]"
                            }`}
                    >
                        {n}
                    </button>
                ))}

            </nav>
        </div>
    )
}
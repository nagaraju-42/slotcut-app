'use client'

import { MOCK_SALONS } from '@/lib/constants'
import { SalonCard } from '@/components/SalonCard'
import { Search, MapPin, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function StudentHomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSalons = MOCK_SALONS.filter((salon) =>
    salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    salon.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 py-4 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">SlotCut</h1>
            <p className="text-xs text-[#A0A0A0]">Book salon slots instantly</p>
          </div>
          <Link href="/owner/login" className="p-2 hover:bg-[#141414] rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-white" />
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-[#A0A0A0]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search salons..."
              className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F97316]"
            />
          </div>
        </div>

        {/* Location badge */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#A0A0A0]">
          <MapPin className="w-4 h-4 text-[#F97316]" />
          <span>Showing nearby salons</span>
        </div>

        {/* Salons grid */}
        {filteredSalons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#A0A0A0]">No salons found</p>
            <p className="text-xs text-[#666666] mt-1">Try a different search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        )}

        {/* Info section */}
        <div className="mt-12 bg-[#141414] border border-[#2A2A2A] rounded-lg p-6 text-center">
          <p className="text-sm text-white font-semibold mb-2">Quick & Easy Booking</p>
          <p className="text-xs text-[#A0A0A0]">
            Book your slot in 30 seconds. No account needed. Get instant confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}

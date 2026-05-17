'use client'

import { Salon } from '@/types'
import { Star, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface SalonCardProps {
  salon: Salon
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <Link href={`/student/${salon.id}`}>
      <div className="bg-[#141414] rounded-lg overflow-hidden hover:bg-[#1F1F1F] transition-colors active:bg-[#0A0A0A] cursor-pointer border border-[#2A2A2A]">
        {/* Image placeholder */}
        <div className="w-full h-32 bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
          <div className="text-white text-2xl font-bold opacity-50">{salon.name.charAt(0)}</div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-base mb-1">{salon.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-[#F97316] text-[#F97316]" />
            <span className="text-sm text-white font-medium">{salon.rating}</span>
            <span className="text-xs text-[#A0A0A0]">({salon.reviews})</span>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
            <span className="text-xs text-[#A0A0A0] line-clamp-1">{salon.address}</span>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
            <span className="text-xs text-[#A0A0A0]">Book now</span>
            <ChevronRight className="w-4 h-4 text-[#F97316]" />
          </div>
        </div>
      </div>
    </Link>
  )
}

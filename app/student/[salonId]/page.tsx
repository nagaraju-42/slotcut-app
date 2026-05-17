'use client'

import { MOCK_SALONS } from '@/lib/constants'
import { Star, MapPin, Clock, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function SalonDetailsPage() {
  const params = useParams()
  const salonId = params.salonId as string
  const salon = MOCK_SALONS.find((s) => s.id === salonId)

  if (!salon) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white">Salon not found</p>
      </div>
    )
  }

  const availableSlots = salon.slots.filter((s) => s.available).length

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 py-4 z-10">
        <Link href="/student/home">
          <button className="p-2 hover:bg-[#141414] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {/* Hero image */}
        <div className="w-full h-48 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-lg mb-6 flex items-center justify-center">
          <div className="text-white text-5xl font-bold opacity-50">{salon.name.charAt(0)}</div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">{salon.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#F97316] text-[#F97316]" />
            <span className="text-white font-semibold">{salon.rating}</span>
          </div>
          <span className="text-[#A0A0A0]">({salon.reviews} reviews)</span>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 mb-6 pb-6 border-b border-[#2A2A2A]">
          <MapPin className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
          <div>
            <p className="text-white font-medium">{salon.address}</p>
            <p className="text-sm text-[#A0A0A0] mt-1">
              {salon.opening_time} - {salon.closing_time}
            </p>
          </div>
        </div>

        {/* Available slots info */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[#F97316]" />
            <span className="text-white font-semibold">{availableSlots} slots available</span>
          </div>
          <p className="text-xs text-[#A0A0A0]">Booking opens in 30 seconds</p>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-3">Services</h2>
          <div className="space-y-2">
            {salon.services.map((service) => (
              <div key={service.id} className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white font-semibold">{service.name}</h3>
                    <p className="text-xs text-[#A0A0A0] mt-1">{service.description}</p>
                  </div>
                  <p className="text-[#F97316] font-bold text-lg">₹{service.price}</p>
                </div>
                <p className="text-xs text-[#A0A0A0] mt-2">{service.duration} minutes</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick features */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-[#F97316]">⚡</p>
            <p className="text-xs text-white font-semibold mt-2">30s Booking</p>
            <p className="text-xs text-[#A0A0A0] mt-1">No account needed</p>
          </div>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-[#F97316]">✓</p>
            <p className="text-xs text-white font-semibold mt-2">Instant Confirm</p>
            <p className="text-xs text-[#A0A0A0] mt-1">Get booking ID now</p>
          </div>
        </div>

        {/* CTA */}
        <Link href={`/student/${salon.id}/booking`} className="block">
          <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-bold py-4 rounded-lg text-lg transition-colors active:scale-95 sticky bottom-6">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  )
}

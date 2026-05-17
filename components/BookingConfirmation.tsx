'use client'

import { CheckCircle, Copy, Phone, Clock, Calendar } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface BookingConfirmationProps {
  booking_id: string
  salon_name: string
  service_name: string
  time: string
  phone: string
  name: string
}

export function BookingConfirmation({
  booking_id,
  salon_name,
  service_name,
  time,
  phone,
  name,
}: BookingConfirmationProps) {
  const [copied, setCopied] = useState(false)

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking_id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Success animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#F97316] rounded-full animate-ping opacity-20" />
            <CheckCircle className="w-16 h-16 text-[#F97316]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-2">Confirmed!</h1>
        <p className="text-[#A0A0A0] text-center mb-8">Your slot is booked</p>

        {/* Booking details card */}
        <div className="bg-[#141414] rounded-lg p-6 mb-6 border border-[#2A2A2A] space-y-4">
          {/* Booking ID */}
          <div className="border-b border-[#2A2A2A] pb-4">
            <p className="text-xs text-[#A0A0A0] uppercase tracking-wide mb-2">Booking ID</p>
            <div className="flex items-center gap-3 bg-[#0A0A0A] rounded p-3 border border-[#2A2A2A]">
              <code className="flex-1 font-mono text-white font-semibold text-lg tracking-wider">
                {booking_id}
              </code>
              <button
                onClick={copyBookingId}
                className="p-2 hover:bg-[#2A2A2A] rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-[#F97316]" />
              </button>
            </div>
            {copied && <p className="text-xs text-[#F97316] mt-2">Copied!</p>}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#A0A0A0] uppercase tracking-wide mb-1">Salon</p>
              <p className="text-white font-semibold">{salon_name}</p>
            </div>

            <div>
              <p className="text-xs text-[#A0A0A0] uppercase tracking-wide mb-1">Service</p>
              <p className="text-white font-semibold">{service_name}</p>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-3 h-3 text-[#F97316]" />
                  <p className="text-xs text-[#A0A0A0] uppercase tracking-wide">Today</p>
                </div>
                <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3 h-3 text-[#F97316]" />
                  <p className="text-xs text-[#A0A0A0] uppercase tracking-wide">Time</p>
                </div>
                <p className="text-white font-semibold">{time}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-3 h-3 text-[#F97316]" />
                <p className="text-xs text-[#A0A0A0] uppercase tracking-wide">Contact</p>
              </div>
              <p className="text-white font-semibold">{phone}</p>
              <p className="text-xs text-[#A0A0A0] mt-1">{name}</p>
            </div>
          </div>
        </div>

        {/* Info message */}
        <div className="bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg p-4 mb-6">
          <p className="text-sm text-[#A0A0A0]">
            <span className="text-white font-semibold">Show your booking ID</span> at the salon. A confirmation SMS will be sent to your phone.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/student/home" className="w-full">
            <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold py-4 rounded-lg transition-colors active:scale-95">
              Book Another Slot
            </button>
          </Link>
          <Link href="/student/bookings" className="w-full">
            <button className="w-full bg-[#141414] hover:bg-[#1F1F1F] text-white font-semibold py-4 rounded-lg border border-[#2A2A2A] transition-colors active:scale-95">
              View My Bookings
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

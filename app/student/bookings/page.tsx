'use client'

import { ArrowLeft, Calendar, Clock, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface StudentBooking {
  id: string
  booking_id: string
  salon_name: string
  service: string
  date: string
  time: string
  phone: string
  status: 'confirmed' | 'completed' | 'cancelled'
}

const MOCK_MY_BOOKINGS: StudentBooking[] = [
  {
    id: '1',
    booking_id: 'SC6K7Q8W9P',
    salon_name: 'Sharp Cuts',
    service: 'Haircut',
    date: new Date().toLocaleDateString(),
    time: '14:30',
    phone: '9876543210',
    status: 'confirmed',
  },
  {
    id: '2',
    booking_id: 'SC5M3N1L2K',
    salon_name: 'Barber Studio',
    service: 'Shave',
    date: new Date(Date.now() - 86400000).toLocaleDateString(),
    time: '10:00',
    phone: '9876543210',
    status: 'completed',
  },
]

export default function StudentBookingsPage() {
  const [bookings, setBookings] = useState<StudentBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBookings(MOCK_MY_BOOKINGS)
      setLoading(false)
    }, 500)
  }, [])

  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed')
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled')

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 py-4 z-10">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Link href="/student/home">
            <button className="p-2 hover:bg-[#141414] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-white">My Bookings</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-[#2A2A2A] rounded w-1/2 mb-3" />
                <div className="h-3 bg-[#2A2A2A] rounded w-full mb-2" />
                <div className="h-3 bg-[#2A2A2A] rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#A0A0A0] text-lg mb-2">No bookings yet</p>
            <p className="text-xs text-[#666666] mb-6">Start by booking your first salon appointment</p>
            <Link href="/student/home" className="inline-block">
              <button className="bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold px-6 py-3 rounded-lg transition-colors active:scale-95">
                Browse Salons
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Upcoming */}
            {upcomingBookings.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white uppercase mb-3 tracking-wide">Upcoming</h2>
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-[#141414] border-2 border-[#F97316] rounded-lg overflow-hidden hover:bg-[#1F1F1F] transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white font-bold text-lg">{booking.salon_name}</h3>
                            <p className="text-[#F97316] font-mono font-semibold text-xs mt-1">ID: {booking.booking_id}</p>
                          </div>
                          <span className="bg-green-500 text-black px-2 py-1 rounded text-xs font-semibold">Confirmed</span>
                        </div>

                        <p className="text-white font-medium mb-3">{booking.service}</p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-[#A0A0A0]">
                            <Calendar className="w-4 h-4 text-[#F97316]" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-2 text-[#A0A0A0]">
                            <Clock className="w-4 h-4 text-[#F97316]" />
                            {booking.time}
                          </div>
                          <div className="flex items-center gap-2 text-[#A0A0A0]">
                            <Phone className="w-4 h-4 text-[#F97316]" />
                            {booking.phone}
                          </div>
                        </div>

                        <p className="text-xs text-[#666666] mt-4">
                          Show your booking ID at the salon
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white uppercase mb-3 tracking-wide">Past</h2>
                <div className="space-y-3">
                  {pastBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-[#141414] border border-[#2A2A2A] rounded-lg overflow-hidden hover:bg-[#1F1F1F] transition-colors opacity-75"
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-white font-bold">{booking.salon_name}</h3>
                            <p className="text-[#A0A0A0] font-mono text-xs mt-1">ID: {booking.booking_id}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            booking.status === 'completed'
                              ? 'bg-blue-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}>
                            {booking.status === 'completed' ? 'Completed' : 'Cancelled'}
                          </span>
                        </div>

                        <p className="text-[#A0A0A0] font-medium mb-2">{booking.service}</p>

                        <div className="flex gap-4 text-xs text-[#666666]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* New booking CTA */}
        <Link href="/student/home" className="block mt-8">
          <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-bold py-4 rounded-lg transition-colors active:scale-95">
            Book Another Slot
          </button>
        </Link>
      </div>
    </div>
  )
}

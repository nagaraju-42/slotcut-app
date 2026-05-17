'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { LogOut, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const MOCK_BOOKINGS = [
  { id: 1, customer: 'Rahul S', service: 'Haircut', time: '10:00', status: 'confirmed' as const },
  { id: 2, customer: 'Arjun P', service: 'Shave', time: '10:30', status: 'confirmed' as const },
  { id: 3, customer: 'Vikram K', service: 'Beard Trim', time: '11:00', status: 'pending' as const },
  { id: 4, customer: 'Suresh M', service: 'Combo', time: '11:45', status: 'completed' as const },
  { id: 5, customer: 'Anil R', service: 'Haircut', time: '13:00', status: 'confirmed' as const },
]

const CHART_DATA = [
  { time: '9-10 AM', bookings: 2 },
  { time: '10-11 AM', bookings: 3 },
  { time: '11-12 PM', bookings: 2 },
  { time: '1-2 PM', bookings: 1 },
  { time: '2-3 PM', bookings: 0 },
  { time: '3-4 PM', bookings: 1 },
  { time: '4-5 PM', bookings: 2 },
]

export default function OwnerDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ownerPhone, setOwnerPhone] = useState('')

  useEffect(() => {
    const phone = localStorage.getItem('owner_phone')
    if (phone) {
      setOwnerPhone(phone)
      setIsAuthenticated(true)
    } else {
      router.push('/owner/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('owner_phone')
    router.push('/owner/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const confirmedCount = MOCK_BOOKINGS.filter((b) => b.status === 'confirmed').length
  const completedCount = MOCK_BOOKINGS.filter((b) => b.status === 'completed').length
  const totalRevenue = MOCK_BOOKINGS.length * 350

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 py-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-xs text-[#A0A0A0]">{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-[#141414] rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0] uppercase">Today Bookings</p>
              <TrendingUp className="w-4 h-4 text-[#F97316]" />
            </div>
            <p className="text-2xl font-bold text-white">{MOCK_BOOKINGS.length}</p>
            <p className="text-xs text-[#A0A0A0] mt-1">{confirmedCount} confirmed</p>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0] uppercase">Revenue</p>
              <TrendingUp className="w-4 h-4 text-[#F97316]" />
            </div>
            <p className="text-2xl font-bold text-white">₹{totalRevenue}</p>
            <p className="text-xs text-[#A0A0A0] mt-1">From {completedCount} completed</p>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0] uppercase">Pending</p>
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-white">{MOCK_BOOKINGS.filter((b) => b.status === 'pending').length}</p>
            <p className="text-xs text-[#A0A0A0] mt-1">Need confirmation</p>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#A0A0A0] uppercase">Completed</p>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-white">{completedCount}</p>
            <p className="text-xs text-[#A0A0A0] mt-1">Today so far</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 mb-6">
          <h2 className="text-white font-semibold mb-4">Booking Timeline</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis dataKey="time" stroke="#A0A0A0" style={{ fontSize: '12px' }} />
              <YAxis stroke="#A0A0A0" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '8px' }}
                labelStyle={{ color: '#FFF' }}
              />
              <Bar dataKey="bookings" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bookings list */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#2A2A2A]">
            <h2 className="text-white font-semibold">Today's Bookings</h2>
          </div>

          <div className="divide-y divide-[#2A2A2A]">
            {MOCK_BOOKINGS.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-[#0A0A0A] transition-colors active:bg-[#1F1F1F]">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-semibold">{booking.customer}</p>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500 text-black'
                          : booking.status === 'completed'
                          ? 'bg-blue-500 text-white'
                          : 'bg-yellow-500 text-black'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmed' : booking.status === 'completed' ? 'Done' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-[#A0A0A0]">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-white font-semibold justify-end">
                      <Clock className="w-4 h-4 text-[#F97316]" />
                      {booking.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-2">
          <Link href="/owner/dashboard/slots" className="block">
            <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold py-3 rounded-lg transition-colors active:scale-95">
              Manage Slots
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

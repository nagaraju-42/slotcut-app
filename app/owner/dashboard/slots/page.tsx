'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Plus, X, Check } from 'lucide-react'
import Link from 'next/link'
import { TIME_SLOTS } from '@/lib/constants'

interface SlotState {
  [key: string]: boolean
}

export default function SlotManagementPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [slots, setSlots] = useState<SlotState>({})
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const phone = localStorage.getItem('owner_phone')
    if (!phone) {
      router.push('/owner/login')
    } else {
      setIsAuthenticated(true)
      // Initialize slots
      const initialSlots: SlotState = {}
      TIME_SLOTS.forEach((time) => {
        initialSlots[time] = Math.random() > 0.3
      })
      setSlots(initialSlots)
    }
  }, [router])

  const toggleSlot = (time: string) => {
    setSlots((prev) => ({
      ...prev,
      [time]: !prev[time],
    }))
  }

  const enableAllSlots = () => {
    const newSlots: SlotState = {}
    TIME_SLOTS.forEach((time) => {
      newSlots[time] = true
    })
    setSlots(newSlots)
  }

  const disableAllSlots = () => {
    const newSlots: SlotState = {}
    TIME_SLOTS.forEach((time) => {
      newSlots[time] = false
    })
    setSlots(newSlots)
  }

  if (!isAuthenticated) {
    return null
  }

  const availableSlots = Object.values(slots).filter(Boolean).length
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 py-4 z-10">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link href="/owner/dashboard">
            <button className="p-2 hover:bg-[#141414] rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Manage Slots</h1>
            <p className="text-xs text-[#A0A0A0]">{new Date(selectedDate).toLocaleDateString('en-IN')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Info card */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white font-semibold">{availableSlots} slots available</p>
            <p className="text-sm text-[#A0A0A0]">{TIME_SLOTS.length - availableSlots} blocked</p>
          </div>
          <div className="w-full h-2 bg-[#2A2A2A] rounded overflow-hidden">
            <div
              className="h-full bg-[#F97316] transition-all"
              style={{ width: `${(availableSlots / TIME_SLOTS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Date picker */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#F97316]"
          />
          <p className="text-xs text-[#A0A0A0] mt-2">Slots will be synced across all devices</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={enableAllSlots}
            className="bg-green-500 bg-opacity-10 hover:bg-opacity-20 text-green-400 font-semibold py-3 rounded-lg border border-green-500 border-opacity-30 transition-colors active:scale-95 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Enable All
          </button>
          <button
            onClick={disableAllSlots}
            className="bg-red-500 bg-opacity-10 hover:bg-opacity-20 text-red-400 font-semibold py-3 rounded-lg border border-red-500 border-opacity-30 transition-colors active:scale-95 flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Disable All
          </button>
        </div>

        {/* Slots grid */}
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="p-4 border-b border-[#2A2A2A]">
            <h2 className="text-white font-semibold text-sm">Click to toggle slot availability</h2>
          </div>

          <div className="grid grid-cols-3 gap-2 p-4 sm:grid-cols-4">
            {TIME_SLOTS.map((time) => (
              <button
                key={time}
                onClick={() => toggleSlot(time)}
                className={`py-3 px-2 rounded-lg border-2 font-semibold transition-all active:scale-95 flex items-center justify-center gap-1 ${
                  slots[time]
                    ? 'bg-[#F97316] border-[#F97316] text-black'
                    : 'bg-[#0A0A0A] border-[#2A2A2A] text-[#666666] hover:border-[#3A3A3A]'
                }`}
              >
                <span className="text-sm">{time}</span>
                {slots[time] && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F97316] rounded" />
            <p className="text-sm text-[#A0A0A0]">Available</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2A2A2A] rounded" />
            <p className="text-sm text-[#A0A0A0]">Blocked</p>
          </div>
        </div>

        {/* Save button */}
        <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-bold py-4 rounded-lg mt-8 transition-colors active:scale-95">
          Save Changes
        </button>
      </div>
    </div>
  )
}

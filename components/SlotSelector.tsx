'use client'

import { Slot } from '@/types'
import { Grid } from 'lucide-react'

interface SlotSelectorProps {
  slots: Slot[]
  selected: string | null
  onSelect: (slotId: string) => void
}

export function SlotSelector({ slots, selected, onSelect }: SlotSelectorProps) {
  const availableSlots = slots.filter((s) => s.available)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-white">Select Time</h2>
        <span className="text-xs text-[#A0A0A0]">({availableSlots.length} available)</span>
      </div>

      {availableSlots.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#A0A0A0] text-sm">No available slots for today</p>
          <p className="text-xs text-[#666666] mt-1">Try tomorrow</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {availableSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => onSelect(slot.time)}
              className={`py-3 px-2 rounded-lg border transition-all active:scale-95 font-medium text-sm ${
                selected === slot.time
                  ? 'bg-[#F97316] border-[#F97316] text-black'
                  : 'bg-[#141414] border-[#2A2A2A] text-white hover:border-[#3A3A3A]'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { MOCK_SALONS, SERVICES } from '@/lib/constants'
import { ServiceSelector } from '@/components/ServiceSelector'
import { SlotSelector } from '@/components/SlotSelector'
import { BookingConfirmation } from '@/components/BookingConfirmation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

type Step = 'details' | 'service' | 'slot' | 'confirmation'

export default function BookingPage() {
  const params = useParams()
  const salonId = params.salonId as string
  const salon = MOCK_SALONS.find((s) => s.id === salonId)

  const [step, setStep] = useState<Step>('details')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [bookingId, setBookingId] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!salon) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white">Salon not found</p>
      </div>
    )
  }

  const handleDetailsSubmit = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number'

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setStep('service')
    }
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setStep('slot')
  }

  const handleSlotSelect = (slotTime: string) => {
    setSelectedSlot(slotTime)
    const id = `SC${Date.now().toString(36).toUpperCase()}`
    setBookingId(id)
    setStep('confirmation')
  }

  const selectedServiceObj = SERVICES.find((s) => s.id === selectedService)

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 bg-[#0A0A0A] border-b border-[#2A2A2A] px-4 py-4 z-10">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          {step !== 'confirmation' && (
            <Link href={`/student/${salonId}`}>
              <button className="p-2 hover:bg-[#141414] rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
            </Link>
          )}
          <h1 className="text-lg font-semibold text-white">{salon.name}</h1>
        </div>
      </div>

      {/* Progress indicator */}
      {step !== 'confirmation' && (
        <div className="bg-[#141414] px-4 py-3 border-b border-[#2A2A2A]">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <div className={`text-xs font-semibold px-2 py-1 rounded ${step === 'details' ? 'bg-[#F97316] text-black' : 'bg-[#2A2A2A] text-[#A0A0A0]'}`}>
                Your Info
              </div>
              <div className="flex-1 h-1 bg-[#2A2A2A] rounded">
                <div
                  className="h-full bg-[#F97316] rounded transition-all"
                  style={{
                    width: step === 'details' ? '33%' : step === 'service' ? '66%' : '100%',
                  }}
                />
              </div>
              <div className={`text-xs font-semibold px-2 py-1 rounded ${step === 'service' || step === 'slot' ? 'bg-[#F97316] text-black' : 'bg-[#2A2A2A] text-[#A0A0A0]'}`}>
                Service
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 pb-24">
        {step === 'details' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Your Details</h2>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F97316]"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F97316]"
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

          <button
              onClick={handleDetailsSubmit}
              className={`w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold py-4 rounded-lg transition-colors active:scale-95 mt-8`}
            >
              Continue
            </button>
          </div>
        )}

        {step === 'service' && (
          <div className="space-y-6">
            <ServiceSelector services={salon.services} selected={selectedService} onSelect={handleServiceSelect} />
          </div>
        )}

        {step === 'slot' && (
          <div className="space-y-6">
            <SlotSelector slots={salon.slots} selected={selectedSlot} onSelect={handleSlotSelect} />

            {selectedService && (
              <div className="bg-[#141414] rounded-lg p-4 border border-[#2A2A2A]">
                <p className="text-xs text-[#A0A0A0] uppercase tracking-wide mb-2">Selected Service</p>
                <p className="text-white font-semibold">{selectedServiceObj?.name}</p>
                <p className="text-sm text-[#A0A0A0] mt-1">{selectedServiceObj?.duration} min • ₹{selectedServiceObj?.price}</p>
              </div>
            )}
          </div>
        )}

        {step === 'confirmation' && selectedServiceObj && (
          <BookingConfirmation
            booking_id={bookingId}
            salon_name={salon.name}
            service_name={selectedServiceObj.name}
            time={selectedSlot || ''}
            phone={phone}
            name={name}
          />
        )}
      </div>
    </div>
  )
}

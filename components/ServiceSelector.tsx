'use client'

import { Service } from '@/types'
import { Clock, DollarSign } from 'lucide-react'

interface ServiceSelectorProps {
  services: Service[]
  selected: string | null
  onSelect: (serviceId: string) => void
}

export function ServiceSelector({ services, selected, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-white">Select Service</h2>
      <div className="space-y-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all active:scale-95 ${
              selected === service.id
                ? 'bg-[#F97316] border-[#F97316] text-black'
                : 'bg-[#141414] border-[#2A2A2A] text-white hover:border-[#3A3A3A]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="text-left">
                <h3 className="font-semibold text-base">{service.name}</h3>
                <p className={`text-sm ${selected === service.id ? 'text-black text-opacity-70' : 'text-[#A0A0A0]'}`}>
                  {service.description}
                </p>
              </div>
            </div>
            <div className={`flex gap-4 mt-3 text-xs font-medium ${selected === service.id ? 'text-black text-opacity-70' : 'text-[#A0A0A0]'}`}>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {service.duration}m
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {service.price}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

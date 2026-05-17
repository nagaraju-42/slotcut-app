'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'

export default function OwnerLoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    const newErrors: Record<string, string> = {}
    if (!phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^[0-9]{10}$/.test(phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number'
    if (!pin.trim()) newErrors.pin = 'PIN is required'
    else if (pin.length !== 4) newErrors.pin = 'PIN must be 4 digits'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      // Simulate API call - accept any 4-digit PIN for now
      setTimeout(() => {
        // Store auth state in localStorage
        localStorage.setItem('owner_phone', phone)
        router.push('/owner/dashboard')
        setIsLoading(false)
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#2A2A2A] px-4 py-4">
        <Link href="/student">
          <button className="p-2 hover:bg-[#141414] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316] rounded-lg mb-4">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-white">Owner Portal</h1>
            <p className="text-[#A0A0A0] text-sm mt-2">Manage your bookings</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                placeholder="9876543210"
                className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F97316] disabled:opacity-50"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">4-Digit PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.slice(0, 4))}
                disabled={isLoading}
                placeholder="••••"
                maxLength={4}
                className="w-full bg-[#141414] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#F97316] disabled:opacity-50 text-center tracking-widest"
              />
              {errors.pin && <p className="text-xs text-red-500 mt-1">{errors.pin}</p>}
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-[#F97316] hover:bg-[#EA580C] disabled:opacity-50 text-black font-semibold py-3 rounded-lg transition-colors active:scale-95 mt-6"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* Demo info */}
          <div className="mt-8 bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 text-center">
            <p className="text-xs text-[#A0A0A0] mb-2">Demo Credentials</p>
            <p className="text-sm text-white font-mono">9876543210 / 1234</p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[#A0A0A0] mt-8">
            For students: <Link href="/student" className="text-[#F97316] hover:underline">Book a slot</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

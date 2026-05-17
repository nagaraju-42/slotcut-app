'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ArrowRight, Zap, Lock, Clock } from 'lucide-react'
import Link from 'next/link'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/student/home')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-3xl mb-6 animate-bounce">
          <span className="text-white text-3xl font-bold">⚡</span>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">SlotCut</h1>
        <p className="text-lg text-[#A0A0A0] mb-12">Book salon slots in 30 seconds</p>

        {/* Feature cards */}
        <div className="space-y-3 mb-12">
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 flex items-start gap-3">
            <Zap className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Ultra Fast</p>
              <p className="text-xs text-[#A0A0A0]">No account needed</p>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Secure</p>
              <p className="text-xs text-[#A0A0A0]">Your data is protected</p>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#2A2A2A] rounded-lg p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#F97316] mt-1 flex-shrink-0" />
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Instant Confirmation</p>
              <p className="text-xs text-[#A0A0A0]">Get your booking ID now</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link href="/student/home" className="block">
            <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-black font-bold py-4 rounded-lg transition-colors active:scale-95 flex items-center justify-center gap-2">
              Book Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>

          <Link href="/owner/login" className="block">
            <button className="w-full bg-[#141414] hover:bg-[#1F1F1F] text-white font-bold py-4 rounded-lg border border-[#2A2A2A] transition-colors active:scale-95">
              Owner Login
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-[#666666] mt-8">Redirecting to app in 3 seconds...</p>
      </div>
    </div>
  )
}

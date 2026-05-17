'use client'

import { redirect } from 'next/navigation'

export default function StudentPage() {
  // Redirect to home to avoid matching the [salonId] catch-all
  redirect('/home')
}

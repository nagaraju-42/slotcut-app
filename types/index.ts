export interface Service {
  id: string
  name: string
  description: string
  duration: number // in minutes
  price: number
}

export interface Slot {
  id: string
  time: string // HH:mm format
  available: boolean
  barber?: string
}

export interface Salon {
  id: string
  name: string
  address: string
  rating: number
  reviews: number
  services: Service[]
  slots: Slot[]
  image?: string
  opening_time: string
  closing_time: string
}

export interface Booking {
  id: string
  booking_id: string // unique booking ID for customer reference
  customer_phone: string
  service_id: string
  salon_id: string
  slot_time: string
  booking_date: string
  status: 'confirmed' | 'completed' | 'cancelled'
  created_at: string
  barber?: string
}

export interface BookingFormData {
  phone: string
  name: string
  service_id: string
  slot_time: string
}

export interface OwnerDashboardData {
  today_bookings: Booking[]
  total_revenue: number
  completed_bookings: number
  pending_bookings: number
}

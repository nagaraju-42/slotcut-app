import { Salon, Service } from '@/types'

export const COLORS = {
  background: '#0A0A0A',
  card: '#141414',
  primary: '#F97316', // Saffron orange
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  border: '#2A2A2A',
}

export const SERVICES: Service[] = [
  {
    id: 'haircut',
    name: 'Haircut',
    description: 'Professional haircut with styling',
    duration: 30,
    price: 300,
  },
  {
    id: 'shave',
    name: 'Shave',
    description: 'Clean shave with premium products',
    duration: 20,
    price: 150,
  },
  {
    id: 'beard',
    name: 'Beard Trim',
    description: 'Beard styling and trimming',
    duration: 25,
    price: 200,
  },
  {
    id: 'combo',
    name: 'Combo (Cut + Shave)',
    description: 'Haircut with clean shave',
    duration: 45,
    price: 400,
  },
]

export const MOCK_SALONS: Salon[] = [
  {
    id: 'salon-1',
    name: 'Sharp Cuts',
    address: 'Near University Gate',
    rating: 4.8,
    reviews: 124,
    image: '/salon-1.jpg',
    opening_time: '09:00',
    closing_time: '20:00',
    services: SERVICES,
    slots: generateSlots(),
  },
  {
    id: 'salon-2',
    name: 'Barber Studio',
    address: 'College Road',
    rating: 4.6,
    reviews: 98,
    image: '/salon-2.jpg',
    opening_time: '10:00',
    closing_time: '21:00',
    services: SERVICES,
    slots: generateSlots(),
  },
  {
    id: 'salon-3',
    name: 'The Grooming Co',
    address: 'Downtown Market',
    rating: 4.7,
    reviews: 156,
    image: '/salon-3.jpg',
    opening_time: '09:30',
    closing_time: '20:30',
    services: SERVICES,
    slots: generateSlots(),
  },
]

function generateSlots() {
  const slots = []
  for (let hour = 9; hour < 21; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`
      slots.push({
        id: `slot-${time}`,
        time,
        available: Math.random() > 0.3, // 70% availability
      })
    }
  }
  return slots
}

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00',
]

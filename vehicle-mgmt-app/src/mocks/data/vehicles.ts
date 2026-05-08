export interface Vehicle {
  id: string
  licensePlate: string
  brand: string
  model: string
  year: number
  status: 'available' | 'in-use' | 'maintenance'
}

export const vehicles: Vehicle[] = [
  { id: '1', licensePlate: 'ABC-1234', brand: 'Toyota', model: 'Camry', year: 2021, status: 'available' },
  { id: '2', licensePlate: 'DEF-5678', brand: 'Honda', model: 'Civic', year: 2020, status: 'in-use' },
  { id: '3', licensePlate: 'GHI-9012', brand: 'Ford', model: 'Focus', year: 2019, status: 'maintenance' },
  { id: '4', licensePlate: 'JKL-3456', brand: 'Toyota', model: 'Corolla', year: 2022, status: 'available' },
  { id: '5', licensePlate: 'MNO-7890', brand: 'BMW', model: '3 Series', year: 2021, status: 'in-use' },
  { id: '6', licensePlate: 'PQR-2345', brand: 'Mercedes', model: 'C-Class', year: 2020, status: 'available' },
  { id: '7', licensePlate: 'STU-6789', brand: 'Hyundai', model: 'Elantra', year: 2023, status: 'in-use' },
  { id: '8', licensePlate: 'VWX-0123', brand: 'Nissan', model: 'Altima', year: 2019, status: 'maintenance' },
  { id: '9', licensePlate: 'YZA-4567', brand: 'Kia', model: 'Optima', year: 2022, status: 'available' },
  { id: '10', licensePlate: 'BCD-8901', brand: 'Mazda', model: 'Mazda6', year: 2021, status: 'in-use' },
]

export interface Client {
  id: string
  name: string
  phone?: string
  cpf?: string
  email?: string
  address?: string
  referredByClientId?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type ClientInput = Pick<Client, 'name' | 'phone' | 'cpf' | 'email' | 'address' | 'referredByClientId' | 'notes'>

import type { Client, ClientInput } from '../domain/client'

const STORAGE_KEY = 'apple-delivery:clients'

function readClients(): Client[] {
  const rawValue = window.localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return []
  }

  try {
    return JSON.parse(rawValue) as Client[]
  } catch {
    return []
  }
}

function writeClients(clients: Client[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
}

export const clientService = {
  list(): Client[] {
    return readClients().sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'))
  },

  save(input: ClientInput, id?: string): Client {
    const clients = readClients()
    const now = new Date().toISOString()
    const existing = id ? clients.find((client) => client.id === id) : undefined
    const client: Client = {
      id: existing?.id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      name: input.name.trim(),
      phone: input.phone.trim(),
      cpf: input.cpf.trim(),
      referredByClientId: input.referredByClientId || undefined,
      notes: input.notes?.trim() || undefined,
    }
    const nextClients = existing
      ? clients.map((item) => (item.id === existing.id ? client : item))
      : [...clients, client]

    writeClients(nextClients)

    return client
  },
}

import type { Client, ClientInput } from '../domain/client'
import { databaseService } from './database.service'
import { optionalText } from './entity-fields'

const COLLECTION = 'clients'

export const clientService = {
  async list(): Promise<Client[]> {
    const clients = await databaseService.list<Client>(COLLECTION)

    return clients.sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'))
  },

  async save(input: ClientInput, id?: string): Promise<Client> {
    const now = new Date().toISOString()
    const existing = id ? await databaseService.getById<Client>(COLLECTION, id) : null
    const client: Client = {
      id: existing?.id ?? id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      name: input.name.trim(),
      phone: optionalText(input.phone),
      cpf: optionalText(input.cpf),
      email: optionalText(input.email),
      address: optionalText(input.address),
      referredByClientId: optionalText(input.referredByClientId),
      notes: optionalText(input.notes),
    }

    await databaseService.save(COLLECTION, client.id, client)

    return client
  },
}

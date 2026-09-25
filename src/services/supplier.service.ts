import type { Supplier, SupplierInput } from '../domain/operations'
import { databaseService } from './database.service'
import { optionalText } from './entity-fields'

const COLLECTION = 'suppliers'

export const supplierService = {
  async list(): Promise<Supplier[]> {
    const suppliers = await databaseService.list<Supplier>(COLLECTION)

    return suppliers.sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'))
  },

  async save(input: SupplierInput, id?: string): Promise<Supplier> {
    const now = new Date().toISOString()
    const existing = id ? await databaseService.getById<Supplier>(COLLECTION, id) : null
    const supplier: Supplier = {
      id: existing?.id ?? id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      name: input.name.trim(),
      document: optionalText(input.document),
      phone: optionalText(input.phone),
      email: optionalText(input.email),
      notes: optionalText(input.notes),
    }

    await databaseService.save(COLLECTION, supplier.id, supplier)

    return supplier
  },
}

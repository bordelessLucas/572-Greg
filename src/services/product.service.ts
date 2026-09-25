import type { Product, ProductInput } from '../domain/operations'
import { databaseService } from './database.service'
import { optionalText } from './entity-fields'

const COLLECTION = 'products'

export const productService = {
  async list(): Promise<Product[]> {
    const products = await databaseService.list<Product>(COLLECTION)

    return products.sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'))
  },

  async save(input: ProductInput, id?: string): Promise<Product> {
    const now = new Date().toISOString()
    const existing = id ? await databaseService.getById<Product>(COLLECTION, id) : null
    const product: Product = {
      id: existing?.id ?? id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      name: input.name.trim(),
      description: optionalText(input.description),
      specifications: optionalText(input.specifications),
      serialNumber: optionalText(input.serialNumber),
      internalCode: optionalText(input.internalCode),
      condition: optionalText(input.condition),
      notes: optionalText(input.notes),
    }

    await databaseService.save(COLLECTION, product.id, product)

    return product
  },
}

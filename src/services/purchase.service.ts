import type { FinancialMovement, OperationItem, Purchase, PurchaseInput } from '../domain/operations'
import { databaseService } from './database.service'
import { financialMovementService } from './financial-movement.service'
import { optionalText } from './entity-fields'

const COLLECTION = 'purchases'

function normalizeItems(input: PurchaseInput): OperationItem[] {
  return input.items
    .filter((item) => item.description.trim() || item.productId)
    .map((item) => {
      const quantity = Number.isFinite(item.quantity) && item.quantity > 0 ? item.quantity : 1
      const unitValue = Number.isFinite(item.unitValue) && item.unitValue > 0 ? item.unitValue : 0

      return {
        productId: item.productId,
        description: item.description.trim(),
        quantity,
        unitValue,
        totalValue: quantity * unitValue,
      }
    })
}

export const purchaseService = {
  async list(): Promise<Purchase[]> {
    const purchases = await databaseService.list<Purchase>(COLLECTION)

    return purchases.sort((left, right) => right.purchaseDate.localeCompare(left.purchaseDate))
  },

  async save(input: PurchaseInput, id?: string): Promise<Purchase> {
    const now = new Date().toISOString()
    const existing = id ? await databaseService.getById<Purchase>(COLLECTION, id) : null
    const items = normalizeItems(input)
    const totalValue = items.reduce((total, item) => total + item.totalValue, 0)
    const purchase: Purchase = {
      id: existing?.id ?? id ?? crypto.randomUUID(),
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      supplierId: optionalText(input.supplierId),
      items,
      purchaseDate: input.purchaseDate,
      paymentMethod: input.paymentMethod,
      financialAccountId: optionalText(input.financialAccountId),
      totalValue,
      notes: optionalText(input.notes),
    }

    await databaseService.save(COLLECTION, purchase.id, purchase)

    const movement: FinancialMovement = {
      id: `purchase:${purchase.id}`,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      type: 'expense',
      amount: totalValue,
      date: input.purchaseDate,
      financialAccountId: optionalText(input.financialAccountId),
      category: 'Compra de produto',
      originType: 'purchase',
      originId: purchase.id,
      notes: purchase.notes,
    }

    await financialMovementService.save(movement)

    return purchase
  },
}

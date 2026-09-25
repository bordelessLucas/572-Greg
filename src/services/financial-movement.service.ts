import type { FinancialMovement } from '../domain/operations'
import { databaseService } from './database.service'

const COLLECTION = 'financialMovements'

export const financialMovementService = {
  async save(movement: FinancialMovement): Promise<void> {
    await databaseService.save(COLLECTION, movement.id, movement)
  },
}

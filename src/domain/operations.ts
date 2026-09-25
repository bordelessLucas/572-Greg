export type PaymentMethod = 'pix' | 'pixInstallments' | 'card' | 'cash' | 'transfer' | 'other'

export type InstallmentStatus = 'pending' | 'paid' | 'overdue' | 'canceled'

export interface AuditFields {
  id: string
  createdAt: string
  updatedAt: string
}

export interface Supplier extends AuditFields {
  name: string
  document?: string
  phone?: string
  email?: string
  notes?: string
}

export type SupplierInput = Pick<Supplier, 'name' | 'document' | 'phone' | 'email' | 'notes'>

export interface Product extends AuditFields {
  name: string
  description?: string
  specifications?: string
  serialNumber?: string
  internalCode?: string
  condition?: string
  notes?: string
}

export type ProductInput = Pick<Product, 'name' | 'description' | 'specifications' | 'serialNumber' | 'internalCode' | 'condition' | 'notes'>

export interface FinancialAccount extends AuditFields {
  name: string
  type?: string
  active: boolean
}

export interface OperationItem {
  productId: string
  description: string
  quantity: number
  unitValue: number
  totalValue: number
}

export type OperationItemInput = Pick<OperationItem, 'productId' | 'description' | 'quantity' | 'unitValue'>

export interface Purchase extends AuditFields {
  supplierId?: string
  items: OperationItem[]
  purchaseDate: string
  paymentMethod?: PaymentMethod
  financialAccountId?: string
  totalValue: number
  notes?: string
}

export interface PurchaseInput {
  supplierId?: string
  items: OperationItemInput[]
  purchaseDate: string
  paymentMethod?: PaymentMethod
  financialAccountId?: string
  notes?: string
}

export interface Sale extends AuditFields {
  clientId?: string
  items: OperationItem[]
  saleDate: string
  paymentMethod?: PaymentMethod
  financialAccountId?: string
  totalValue: number
  upfrontAmount: number
  installmentCount: number
  status: 'draft' | 'confirmed' | 'canceled'
  notes?: string
}

export interface Installment extends AuditFields {
  saleId: string
  clientId?: string
  amount: number
  dueDate: string
  paidAmount: number
  paidAt?: string
  status: InstallmentStatus
}

export interface FinancialMovement extends AuditFields {
  type: 'income' | 'expense'
  amount: number
  date: string
  financialAccountId?: string
  category?: string
  originType: 'purchase' | 'sale' | 'installment' | 'expense' | 'adjustment'
  originId?: string
  notes?: string
}

export interface DocumentTemplate extends AuditFields {
  name: string
  type: 'contract' | 'receipt' | 'other'
  content: string
  variables: string[]
  active: boolean
}

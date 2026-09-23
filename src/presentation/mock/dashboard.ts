import type { LucideIcon } from 'lucide-react'
import { Box, CreditCard, ReceiptText, ShoppingCart } from 'lucide-react'

export interface Metric {
  label: string
  value: string
  change: string
  trend: 'up' | 'attention'
  icon: LucideIcon
}

export interface Sale {
  product: string
  detail: string
  client: string
  code: string
  value: string
  payment: string
  status: 'Pago' | 'Em andamento' | 'Pendente'
}

export interface Task {
  title: string
  due: string
  priority: 'today' | 'soon'
}

export const metrics: Metric[] = [
  { label: 'Vendas (mês)', value: 'R$ 87.340', change: '+18,4%', trend: 'up', icon: ShoppingCart },
  { label: 'Lucro bruto', value: 'R$ 19.280', change: '+12,7%', trend: 'up', icon: ReceiptText },
  { label: 'A receber', value: 'R$ 31.800', change: '+5,2%', trend: 'attention', icon: CreditCard },
  { label: 'Estoque (custo)', value: 'R$ 74.250', change: '+3,1%', trend: 'up', icon: Box },
]

export const sales: Sale[] = [
  {
    product: 'iPhone 16 Pro Max',
    detail: '256 GB · Titânio Preto',
    client: 'Carlos Silva',
    code: '#1028',
    value: 'R$ 7.900',
    payment: 'PIX (6x)',
    status: 'Em andamento',
  },
  {
    product: 'MacBook Air M3',
    detail: '256 GB · Cinza-espacial',
    client: 'Mariana Costa',
    code: '#1027',
    value: 'R$ 8.499',
    payment: 'PIX',
    status: 'Pago',
  },
  {
    product: 'iPad Air M2',
    detail: '256 GB · Azul',
    client: 'João Pereira',
    code: '#1026',
    value: 'R$ 4.699',
    payment: 'Cartão',
    status: 'Pago',
  },
  {
    product: 'Apple Watch Series 9',
    detail: '45 mm · Meia-noite',
    client: 'Ana Souza',
    code: '#1025',
    value: 'R$ 2.899',
    payment: 'PIX (3x)',
    status: 'Pendente',
  },
]

export const tasks: Task[] = [
  { title: 'Cobrar parcela de Carlos Silva', due: 'Venceu ontem', priority: 'today' },
  { title: 'Enviar contrato para Mariana', due: 'Hoje', priority: 'today' },
  { title: 'Confirmar pagamento do fornecedor', due: 'Hoje', priority: 'today' },
  { title: 'Separar iPhone 15 para entrega', due: 'Amanhã', priority: 'soon' },
  { title: 'Revisar estoque de acessórios', due: 'Amanhã', priority: 'soon' },
]

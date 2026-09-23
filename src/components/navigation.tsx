import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Bell,
  Box,
  BriefcaseBusiness,
  ChevronDown,
  CreditCard,
  FileText,
  Home,
  ReceiptText,
  Settings,
  ShoppingBag,
  Truck,
  Users,
  WalletCards,
} from 'lucide-react'
import { Button, SearchField, Typography } from './ui'

export interface NavigationItem {
  label: string
  icon: LucideIcon
  active?: boolean
}

const navigationItems: NavigationItem[] = [
  { label: 'Visão Geral', icon: Home, active: true },
  { label: 'Compras', icon: ShoppingBag },
  { label: 'Estoque', icon: Box },
  { label: 'Vendas', icon: CreditCard },
  { label: 'Clientes', icon: Users },
  { label: 'Fornecedores', icon: Truck },
  { label: 'Financeiro', icon: BarChart3 },
  { label: 'Recebimentos', icon: WalletCards },
  { label: 'Documentos', icon: FileText },
  { label: 'Relatórios', icon: ReceiptText },
  { label: 'Configurações', icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <div className="window-controls" aria-hidden="true">
        <span className="window-controls__dot window-controls__dot--close" />
        <span className="window-controls__dot window-controls__dot--minimize" />
        <span className="window-controls__dot window-controls__dot--zoom" />
      </div>

      <div className="brand">
        <span className="brand__mark" aria-hidden="true">
          AD
        </span>
        <div>
          <Typography as="p" variant="title">
            Apple Delivery
          </Typography>
          <Typography as="p" variant="caption">
            Gestão comercial
          </Typography>
        </div>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item) => (
          <a className="sidebar__link" data-active={item.active ? 'true' : undefined} href="#dashboard" key={item.label}>
            <item.icon size={18} aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="assistant-card">
        <span className="assistant-card__spark" aria-hidden="true" />
        <Typography as="p" variant="title">
          Apple Intelligence
        </Typography>
        <Typography as="p" variant="caption">
          Pesquise clientes, produtos e parcelas sem sair do fluxo.
        </Typography>
      </div>
    </aside>
  )
}

interface TopbarProps {
  onOpenQuickAction: () => void
}

export function Topbar({ onOpenQuickAction }: TopbarProps) {
  return (
    <header className="topbar">
      <SearchField placeholder="Pergunte ou registre alguma coisa..." />
      <div className="topbar__actions">
        <Button variant="ghost" iconLeft={Bell} iconOnly>
          Notificações
        </Button>
        <Button variant="secondary" iconLeft={BriefcaseBusiness} onClick={onOpenQuickAction}>
          Nova operação
        </Button>
        <button className="profile-menu" type="button">
          <span className="profile-menu__avatar">G</span>
          <span>
            <strong>Gustavo</strong>
            <small>Apple Delivery</small>
          </span>
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

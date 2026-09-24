import type { LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Apple,
  BarChart3,
  Bell,
  Bot,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  MessageCircle,
  PackageSearch,
  Plug,
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
  description: string
  icon: LucideIcon
  href: string
  active?: boolean
  // Guia interno de priorização. Não renderizar na UI do cliente.
  stage?: 'mvp' | 'next' | 'future'
}

interface NavigationGroup {
  label: string
  items: NavigationItem[]
}

const navigationGroups: NavigationGroup[] = [
  {
    label: 'Painel',
    items: [
      {
        label: 'Dashboard',
        description: 'Visão diária',
        icon: Home,
        href: '#dashboard',
        active: true,
        stage: 'mvp',
      },
    ],
  },
  {
    label: 'Operação',
    items: [
      { label: 'Clientes', description: 'Cadastro e histórico', icon: Users, href: '#clientes', stage: 'mvp' },
      { label: 'Fornecedores', description: 'Origem das compras', icon: Truck, href: '#fornecedores', stage: 'mvp' },
      { label: 'Produtos', description: 'Modelos e especificações', icon: PackageSearch, href: '#produtos', stage: 'mvp' },
      { label: 'Compras', description: 'Entrada de produtos', icon: ShoppingBag, href: '#compras', stage: 'mvp' },
      { label: 'Vendas', description: 'Venda e parcelamento', icon: CreditCard, href: '#vendas', stage: 'mvp' },
    ],
  },
  {
    label: 'Financeiro',
    items: [
      { label: 'Financeiro', description: 'Resumo do negócio', icon: BarChart3, href: '#financeiro', stage: 'mvp' },
      { label: 'Contas a receber', description: 'Parcelas de clientes', icon: WalletCards, href: '#contas-a-receber', stage: 'mvp' },
      { label: 'Contas a pagar', description: 'Obrigações e despesas', icon: ReceiptText, href: '#contas-a-pagar', stage: 'next' },
      { label: 'Fluxo de caixa', description: 'Previsto x realizado', icon: DollarSign, href: '#fluxo-de-caixa', stage: 'next' },
    ],
  },
  {
    label: 'Documentos',
    items: [
      { label: 'Documentos', description: 'Contratos e PDFs', icon: FileText, href: '#documentos', stage: 'next' },
      { label: 'Cobranças', description: 'Pendências PIX', icon: MessageCircle, href: '#cobrancas', stage: 'next' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { label: 'Configurações', description: 'Empresa e categorias', icon: Settings, href: '#configuracoes', stage: 'mvp' },
      { label: 'Automações IA', description: 'Lançamento assistido', icon: Bot, href: '#automacoes-ia', stage: 'future' },
      { label: 'Integrações', description: 'Banco e assinatura', icon: Plug, href: '#integracoes', stage: 'future' },
    ],
  },
]

interface SidebarProps {
  activeHref?: string
}

export function Sidebar({ activeHref = '#dashboard' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => window.localStorage.getItem('apple-delivery:sidebar') === 'collapsed')

  useEffect(() => {
    const sidebarState = collapsed ? 'collapsed' : 'expanded'

    document.documentElement.dataset.sidebar = sidebarState
    window.localStorage.setItem('apple-delivery:sidebar', sidebarState)

    return () => {
      delete document.documentElement.dataset.sidebar
    }
  }, [collapsed])

  return (
    <aside className={['sidebar', collapsed ? 'sidebar--collapsed' : ''].filter(Boolean).join(' ')} aria-label="Navegação principal">
      <div className="sidebar__fixed">
        <div className="sidebar__chrome">
          <div className="window-controls" aria-hidden="true">
            <span className="window-controls__dot window-controls__dot--close" />
            <span className="window-controls__dot window-controls__dot--minimize" />
            <span className="window-controls__dot window-controls__dot--zoom" />
          </div>
          <button
            className="sidebar__toggle"
            type="button"
            aria-label={collapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
            aria-pressed={collapsed}
            onClick={() => setCollapsed((current) => !current)}
          >
            {collapsed ? <ChevronsRight size={16} aria-hidden="true" /> : <ChevronsLeft size={16} aria-hidden="true" />}
          </button>
        </div>

        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <Apple size={24} strokeWidth={2.2} />
          </span>
          <div>
            <Typography as="p" variant="title">
              Apple Delivery
            </Typography>
            <Typography as="p" variant="caption">
              Gestão interna
            </Typography>
          </div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {navigationGroups.map((group) => (
          <section className="sidebar__group" key={group.label}>
            <h2 className="sidebar__group-title">{group.label}</h2>
            <div className="sidebar__group-list">
              {group.items.map((item) => (
                <a
                  className="sidebar__link"
                  data-active={item.href === activeHref || (!activeHref && item.active) ? 'true' : undefined}
                  data-stage={item.stage}
                  href={item.href}
                  key={item.label}
                >
                  <item.icon size={18} aria-hidden="true" />
                  <span className="sidebar__link-copy">
                    <span className="sidebar__link-label">{item.label}</span>
                    <span className="sidebar__link-description">{item.description}</span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </nav>

      <div className="assistant-card">
        <Typography as="p" variant="title">
          Busca operacional
        </Typography>
        <Typography as="p" variant="caption">
          Encontre clientes, produtos, parcelas e documentos sem trocar de contexto.
        </Typography>
      </div>
    </aside>
  )
}

export function Topbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="topbar">
      <SearchField placeholder="Buscar cliente, venda, parcela ou produto..." />
      <div className="topbar__actions">
        <div className="topbar-popover">
          <Button
            variant="ghost"
            iconLeft={Bell}
            iconOnly
            aria-label="Abrir notificações"
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen((current) => !current)
              setProfileOpen(false)
            }}
          >
            Notificações
          </Button>
          {notificationsOpen ? (
            <div className="topbar-menu topbar-menu--notifications">
              <Typography as="p" variant="title">
                Notificações
              </Typography>
              <Typography variant="caption">Nenhuma notificação no momento.</Typography>
            </div>
          ) : null}
        </div>

        <div className="topbar-popover">
          <button
            className="profile-menu"
            type="button"
            aria-label="Abrir menu do perfil"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((current) => !current)
              setNotificationsOpen(false)
            }}
          >
            <span className="profile-menu__avatar">G</span>
            <span>
              <strong>Gustavo</strong>
              <small>Uso interno</small>
            </span>
            <ChevronDown size={16} aria-hidden="true" />
          </button>
          {profileOpen ? (
            <div className="topbar-menu topbar-menu--profile">
              <div className="profile-summary">
                <span className="profile-menu__avatar">G</span>
                <span>
                  <strong>Gustavo</strong>
                  <small>Administrador</small>
                </span>
              </div>
              <button type="button" onClick={() => { window.location.hash = 'configuracoes' }}>
                Configurações
              </button>
              <button type="button" onClick={() => { window.location.hash = 'dashboard' }}>
                Voltar ao dashboard
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}

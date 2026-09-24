import { ArrowRight, CheckCircle2, FileText, ReceiptText, WalletCards } from 'lucide-react'
import { useState } from 'react'
import { Sidebar, Topbar } from '../../components/navigation'
import {
  Badge,
  Button,
  Card,
  Drawer,
  DropdownMenu,
  SegmentedControl,
  StatusCheckbox,
  Table,
  Typography,
} from '../../components/ui'
import { metrics, sales, tasks, type Sale } from '../mock/dashboard'

type ViewMode = 'hoje' | 'semana' | 'mes'

const saleColumns = [
  {
    key: 'product',
    header: 'Produto',
    render: (sale: Sale) => (
      <span className="product-cell">
        <span className="product-cell__thumb" aria-hidden="true" />
        <span>
          <strong>{sale.product}</strong>
          <small>{sale.detail}</small>
        </span>
      </span>
    ),
  },
  {
    key: 'client',
    header: 'Cliente',
    render: (sale: Sale) => (
      <>
        <strong>{sale.client}</strong>
        <small>{sale.code}</small>
      </>
    ),
  },
  {
    key: 'value',
    header: 'Valor',
    align: 'right' as const,
    render: (sale: Sale) => sale.value,
  },
  {
    key: 'payment',
    header: 'Pagamento',
    render: (sale: Sale) => sale.payment,
  },
  {
    key: 'status',
    header: 'Status',
    render: (sale: Sale) => (
      <Badge tone={sale.status === 'Pago' ? 'success' : sale.status === 'Pendente' ? 'danger' : 'warning'}>
        {sale.status}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: '',
    align: 'right' as const,
    render: () => (
      <DropdownMenu
        label="Ações da venda"
        items={[
          { label: 'Visualizar' },
          { label: 'Editar' },
          { label: 'Excluir', tone: 'danger' },
        ]}
      />
    ),
  },
]

const operationalFlow = [
  { label: 'Venda registrada', value: '4 hoje', icon: CheckCircle2 },
  { label: 'Recebimentos', value: 'R$ 31.800', icon: WalletCards },
  { label: 'PDFs preparados', value: '3 documentos', icon: FileText },
  { label: 'Cobranças', value: '5 pendências', icon: ReceiptText },
]

export function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('mes')

  return (
    <div className="app-frame" id="dashboard">
      <Sidebar activeHref="#dashboard" />
      <div className="workspace">
        <Topbar />

        <main className="dashboard">
          <section className="dashboard__header">
            <div>
              <Typography as="h1" variant="pageTitle">
                Bom dia, Gustavo.
              </Typography>
              <Typography variant="secondary">Aqui está o resumo da sua revenda Apple hoje.</Typography>
            </div>
            <div className="dashboard__date">
              <strong>Segunda-feira, 15 de setembro de 2025</strong>
              <span>Grandes resultados nascem de uma boa organização.</span>
            </div>
          </section>

          <section className="metric-grid" aria-label="Resumo operacional">
            {metrics.map((metric) => (
              <Card className="metric-card" key={metric.label}>
                <span className="metric-card__icon" data-tone={metric.trend}>
                  <metric.icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <Typography variant="secondary">{metric.label}</Typography>
                  <strong>{metric.value}</strong>
                  <small data-tone={metric.trend}>+ {metric.change.replace('+', '')}</small>
                </div>
                <span className="sparkline" data-tone={metric.trend} aria-hidden="true" />
              </Card>
            ))}
          </section>

          <section className="dashboard-grid">
            <Card className="daily-panel">
              <div className="section-heading">
                <div>
                  <Typography as="h2" variant="sectionTitle">
                    Atalhos de operação
                  </Typography>
                  <Typography variant="caption">Comece pelos registros que alimentam o financeiro.</Typography>
                </div>
              </div>
              <div className="daily-actions">
                <Button iconRight={ArrowRight} onClick={() => { window.location.hash = 'vendas' }}>
                  Nova venda
                </Button>
                <Button variant="outline" iconRight={ArrowRight} onClick={() => { window.location.hash = 'compras' }}>
                  Nova compra
                </Button>
                <Button variant="outline" iconRight={ArrowRight} onClick={() => { window.location.hash = 'clientes' }}>
                  Novo cliente
                </Button>
              </div>
              <dl className="daily-summary">
                <div>
                  <dt>Próximo passo</dt>
                  <dd>Consolidar clientes e vendas reais</dd>
                </div>
                <div>
                  <dt>Fonte dos números</dt>
                  <dd>Mock até conectar os módulos</dd>
                </div>
              </dl>
            </Card>

            <Drawer title="Minhas tarefas">
              <div className="drawer__toolbar">
                <Badge tone="warning">5</Badge>
                <Button variant="ghost" iconRight={ArrowRight}>
                  Ver todas
                </Button>
              </div>
              <ul className="task-list">
                {tasks.map((task) => (
                  <li key={task.title}>
                    <StatusCheckbox label={task.title} />
                    <span data-priority={task.priority}>{task.due}</span>
                  </li>
                ))}
              </ul>
            </Drawer>
          </section>

          <section className="flow-strip" aria-label="Fluxo operacional">
            {operationalFlow.map((item) => (
              <div className="flow-strip__item" key={item.label}>
                <span className="flow-strip__icon">
                  <item.icon size={17} aria-hidden="true" />
                </span>
                <span>
                  <strong>{item.value}</strong>
                  <small>{item.label}</small>
                </span>
              </div>
            ))}
          </section>

          <section className="operations-grid">
            <Card className="table-card">
              <div className="section-heading">
                <Typography as="h2" variant="sectionTitle">
                  Últimas vendas
                </Typography>
                <Button variant="ghost" iconRight={ArrowRight}>
                  Ver todas
                </Button>
              </div>

              <Table
                columns={saleColumns}
                emptyDescription="As vendas confirmadas aparecerão aqui com cliente, produto, pagamento e status."
                emptyTitle="Nenhuma venda registrada"
                getRowKey={(sale) => sale.code}
                rows={sales}
              />
            </Card>

            <aside className="insights-column">
              <Card className="finance-card">
                <div className="section-heading">
                  <Typography as="h2" variant="sectionTitle">
                    Recebimentos do mês
                  </Typography>
                  <SegmentedControl
                    label="Período"
                    value={viewMode}
                    onChange={setViewMode}
                    options={[
                      { label: 'Hoje', value: 'hoje' },
                      { label: 'Semana', value: 'semana' },
                      { label: 'Mês', value: 'mes' },
                    ]}
                  />
                </div>
                <div className="finance-card__body">
                  <div className="progress-ring" aria-label="62 por cento recebido">
                    <strong>62%</strong>
                    <span>recebido</span>
                  </div>
                  <dl>
                    <div>
                      <dt>Recebido</dt>
                      <dd>R$ 55.540</dd>
                    </div>
                    <div>
                      <dt>A receber</dt>
                      <dd>R$ 31.800</dd>
                    </div>
                    <div>
                      <dt>Total</dt>
                      <dd>R$ 87.340</dd>
                    </div>
                  </dl>
                </div>
              </Card>
            </aside>
          </section>
        </main>
      </div>
    </div>
  )
}

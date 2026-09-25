import { ArrowRight, Bell, CheckCircle2, FileText, ListChecks, Plus, ReceiptText, ShoppingBag, ShoppingCart, UserPlus, WalletCards } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Sidebar, Topbar } from '../../components/navigation'
import {
  Badge,
  Button,
  Card,
  DropdownMenu,
  Modal,
  SegmentedControl,
  Table,
  TextInput,
  Typography,
} from '../../components/ui'
import { metrics, sales, tasks as mockTasks, type Sale, type Task } from '../mock/dashboard'

type ViewMode = 'hoje' | 'semana' | 'mes'
type ActivityTab = 'tasks' | 'notifications'
type DashboardTask = Task & { id: string; done: boolean }

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
        label="Acoes da venda"
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
  { label: 'Cobrancas', value: '5 pendencias', icon: ReceiptText },
]

const notifications = [
  {
    id: 'late-payment',
    title: 'Parcela em atraso',
    description: 'Carlos Silva aparece como pendencia no painel de cobrancas.',
    unread: true,
  },
]

const initialTasks: DashboardTask[] = mockTasks.map((task, index) => ({
  ...task,
  id: `task-${index}`,
  done: false,
}))

export function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('mes')
  const [activityTab, setActivityTab] = useState<ActivityTab>('tasks')
  const [dashboardTasks, setDashboardTasks] = useState<DashboardTask[]>(initialTasks)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [doneModalOpen, setDoneModalOpen] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDue, setNewTaskDue] = useState('')

  const pendingTasks = dashboardTasks.filter((task) => !task.done)
  const doneTasks = dashboardTasks.filter((task) => task.done)
  const unreadNotifications = notifications.filter((notification) => notification.unread).length

  const toggleTask = (taskId: string) => {
    setDashboardTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
    )
  }

  const handleCreateTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!newTaskTitle.trim()) {
      return
    }

    setDashboardTasks((current) => [
      {
        id: crypto.randomUUID(),
        title: newTaskTitle.trim(),
        due: newTaskDue.trim() || 'Sem prazo',
        priority: 'soon',
        done: false,
      },
      ...current,
    ])
    setNewTaskTitle('')
    setNewTaskDue('')
    setTaskModalOpen(false)
    setActivityTab('tasks')
  }

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
              <Typography variant="secondary">Aqui esta o resumo da sua revenda Apple hoje.</Typography>
            </div>
            <div className="dashboard__date">
              <strong>Segunda-feira, 15 de setembro de 2025</strong>
              <span>Grandes resultados nascem de uma boa organizacao.</span>
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
                    Atalhos de operacao
                  </Typography>
                  <Typography variant="caption">Comece pelos registros que alimentam o financeiro.</Typography>
                </div>
              </div>
              <div className="daily-actions" aria-label="Atalhos de operacao">
                <button className="quick-action" type="button" onClick={() => { window.location.hash = 'vendas' }}>
                  <span className="quick-action__icon">
                    <ShoppingCart size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Registrar venda</strong>
                    <small>Cliente, produto e parcelas</small>
                  </span>
                </button>
                <button className="quick-action" type="button" onClick={() => { window.location.hash = 'compras' }}>
                  <span className="quick-action__icon">
                    <ShoppingBag size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Registrar compra</strong>
                    <small>Fornecedor, itens e custo</small>
                  </span>
                </button>
                <button className="quick-action" type="button" onClick={() => { window.location.hash = 'clientes' }}>
                  <span className="quick-action__icon">
                    <UserPlus size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Cadastrar cliente</strong>
                    <small>Dados para venda e contrato</small>
                  </span>
                </button>
              </div>
            </Card>

            <Card className="activity-panel">
              <div className="activity-tabs" role="tablist" aria-label="Tarefas e notificacoes">
                <button
                  className="activity-tab"
                  type="button"
                  role="tab"
                  aria-selected={activityTab === 'tasks'}
                  onClick={() => setActivityTab('tasks')}
                >
                  <ListChecks size={16} aria-hidden="true" />
                  Tarefas
                  <span>{pendingTasks.length}</span>
                </button>
                <button
                  className="activity-tab"
                  type="button"
                  role="tab"
                  aria-selected={activityTab === 'notifications'}
                  onClick={() => setActivityTab('notifications')}
                >
                  <Bell size={16} aria-hidden="true" />
                  Notificacoes
                  {unreadNotifications > 0 ? <span>{unreadNotifications}</span> : null}
                </button>
              </div>

              {activityTab === 'tasks' ? (
                <>
                  <div className="activity-toolbar">
                    <Badge tone="warning">{pendingTasks.length} pendentes</Badge>
                    <div>
                      <Button variant="ghost" onClick={() => setDoneModalOpen(true)}>
                        Feitas
                      </Button>
                      <Button variant="outline" iconLeft={Plus} onClick={() => setTaskModalOpen(true)}>
                        Nova
                      </Button>
                    </div>
                  </div>
                  <div className="drawer__scroll" tabIndex={0} aria-label="Lista de tarefas pendentes">
                    <ul className="task-list">
                      {pendingTasks.map((task) => (
                        <li key={task.id}>
                          <label className="task-check">
                            <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                            <span>
                              <strong>{task.title}</strong>
                              <small data-priority={task.priority}>{task.due}</small>
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="drawer__scroll" tabIndex={0} aria-label="Lista de notificacoes">
                  <ul className="notification-list">
                    {notifications.map((notification) => (
                      <li key={notification.id} data-unread={notification.unread ? 'true' : undefined}>
                        <strong>{notification.title}</strong>
                        <small>{notification.description}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>

            <Modal open={taskModalOpen} title="Nova tarefa" onClose={() => setTaskModalOpen(false)}>
              <form className="client-form" onSubmit={handleCreateTask}>
                <TextInput
                  label="Tarefa"
                  value={newTaskTitle}
                  onChange={(event) => setNewTaskTitle(event.target.value)}
                  placeholder="Ex: Conferir pagamento do fornecedor"
                  required
                />
                <TextInput
                  label="Prazo"
                  value={newTaskDue}
                  onChange={(event) => setNewTaskDue(event.target.value)}
                  placeholder="Hoje, amanha ou uma data combinada"
                />
                <div className="client-form__actions">
                  <Button type="submit" iconLeft={Plus}>
                    Criar tarefa
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setTaskModalOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </Modal>

            <Modal open={doneModalOpen} title="Tarefas feitas" onClose={() => setDoneModalOpen(false)}>
              <div className="done-task-list">
                {doneTasks.length ? (
                  doneTasks.map((task) => (
                    <button key={task.id} type="button" onClick={() => toggleTask(task.id)}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>
                        <strong>{task.title}</strong>
                        <small>{task.due}</small>
                      </span>
                    </button>
                  ))
                ) : (
                  <Typography variant="caption">Nenhuma tarefa concluida ainda.</Typography>
                )}
              </div>
            </Modal>
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
                  Ultimas vendas
                </Typography>
                <Button variant="ghost" iconRight={ArrowRight}>
                  Ver todas
                </Button>
              </div>

              <Table
                columns={saleColumns}
                emptyDescription="As vendas confirmadas aparecerao aqui com cliente, produto, pagamento e status."
                emptyTitle="Nenhuma venda registrada"
                getRowKey={(sale) => sale.code}
                rows={sales}
              />
            </Card>

            <aside className="insights-column">
              <Card className="finance-card">
                <div className="section-heading">
                  <Typography as="h2" variant="sectionTitle">
                    Recebimentos do mes
                  </Typography>
                  <SegmentedControl
                    label="Periodo"
                    value={viewMode}
                    onChange={setViewMode}
                    options={[
                      { label: 'Hoje', value: 'hoje' },
                      { label: 'Semana', value: 'semana' },
                      { label: 'Mes', value: 'mes' },
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

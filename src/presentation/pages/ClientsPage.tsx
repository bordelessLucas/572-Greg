import { ArrowRight, IdCard, Pencil, Phone, Save, User } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Sidebar, Topbar } from '../../components/navigation'
import { Button, Card, Modal, Table, TextInput, Typography } from '../../components/ui'
import type { Client, ClientInput } from '../../domain/client'
import { clientService } from '../../services/client.service'

const emptyForm: ClientInput = {
  name: '',
  phone: '',
  cpf: '',
  referredByClientId: '',
  notes: '',
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(() => clientService.list())
  const [form, setForm] = useState<ClientInput>(emptyForm)
  const [editingId, setEditingId] = useState<string | undefined>()
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return clients
    }

    return clients.filter((client) =>
      [client.name, client.phone, client.cpf].some((value) => value.toLowerCase().includes(normalizedQuery)),
    )
  }, [clients, query])

  const referralCount = clients.filter((client) => client.referredByClientId).length
  const availableReferrers = clients.filter((client) => client.id !== editingId)

  const updateField = (field: keyof ClientInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(undefined)
    setError('')
  }

  const openCreateModal = () => {
    resetForm()
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    resetForm()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim() || !form.phone.trim() || !form.cpf.trim()) {
      setError('Preencha nome, telefone e CPF para salvar o cliente.')
      return
    }

    if (availableReferrers.length > 0 && !form.referredByClientId) {
      setError('Selecione o cliente que fez a indicação.')
      return
    }

    clientService.save(form, editingId)
    setClients(clientService.list())
    closeModal()
  }

  const editClient = (client: Client) => {
    setEditingId(client.id)
    setForm({
      name: client.name,
      phone: client.phone,
      cpf: client.cpf,
      referredByClientId: client.referredByClientId ?? '',
      notes: client.notes ?? '',
    })
    setError('')
    setModalOpen(true)
  }

  const clientColumns = [
    {
      key: 'name',
      header: 'Cliente',
      render: (client: Client) => (
        <>
          <strong>{client.name}</strong>
          <small>{client.notes || 'Sem observações'}</small>
        </>
      ),
    },
    {
      key: 'phone',
      header: 'Telefone',
      render: (client: Client) => client.phone,
    },
    {
      key: 'cpf',
      header: 'CPF',
      render: (client: Client) => client.cpf,
    },
    {
      key: 'referral',
      header: 'Indicação',
      render: (client: Client) => {
        const referrer = clients.find((item) => item.id === client.referredByClientId)

        return referrer ? referrer.name : 'Cadastro inicial'
      },
    },
    {
      key: 'actions',
      header: '',
      align: 'right' as const,
      render: (client: Client) => (
        <Button variant="ghost" iconLeft={Pencil} onClick={() => editClient(client)}>
          Editar
        </Button>
      ),
    },
  ]

  return (
    <div className="app-frame" id="clientes">
      <Sidebar activeHref="#clientes" />
      <div className="workspace">
        <Topbar />

        <main className="clients-page">
          <section className="clients-header">
            <div>
              <Typography as="h1" variant="pageTitle">
                Clientes
              </Typography>
              <Typography variant="secondary">
                Cadastre clientes com dados suficientes para vendas, parcelas, contratos e indicações.
              </Typography>
            </div>
            <div className="clients-header__actions">
              <Button iconRight={ArrowRight} onClick={openCreateModal}>
                Novo cliente
              </Button>
              <Button variant="outline" iconRight={ArrowRight} onClick={() => { window.location.hash = 'vendas' }}>
                Criar venda
              </Button>
            </div>
          </section>

          <section className="clients-metrics" aria-label="Resumo de clientes">
            <Card className="module-metric">
              <Typography variant="caption">Clientes cadastrados</Typography>
              <strong data-tone="accent">{clients.length}</strong>
            </Card>
            <Card className="module-metric">
              <Typography variant="caption">Com indicação</Typography>
              <strong data-tone="success">{referralCount}</strong>
            </Card>
          </section>

          <section className="clients-layout">
            <Card className="clients-table-card">
              <div className="section-heading">
                <div>
                  <Typography as="h2" variant="sectionTitle">
                    Base de clientes
                  </Typography>
                  <Typography variant="caption">Lista persistida neste navegador até conectar o banco definitivo.</Typography>
                </div>
              </div>

              <TextInput
                label="Buscar cliente"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nome, telefone ou CPF"
              />

              <Table
                columns={clientColumns}
                emptyDescription="Cadastre o primeiro cliente para liberar vendas, parcelas, contratos e indicações."
                emptyTitle="Nenhum cliente cadastrado"
                getRowKey={(client) => client.id}
                rows={filteredClients}
              />
            </Card>
          </section>
        </main>
      </div>

      <Modal open={modalOpen} title={editingId ? 'Editar cliente' : 'Novo cliente'} onClose={closeModal}>
        <form className="client-form" noValidate onSubmit={handleSubmit}>
          <Typography variant="caption">Esses dados serão reutilizados em vendas, cobranças e contratos.</Typography>
          <TextInput
            label="Nome completo"
            icon={User}
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
          />
          <TextInput
            label="Telefone"
            icon={Phone}
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            placeholder="(11) 99999-0000"
            required
          />
          <TextInput
            label="CPF"
            icon={IdCard}
            value={form.cpf}
            onChange={(event) => updateField('cpf', event.target.value)}
            placeholder="000.000.000-00"
            required
          />

          <label className="field" htmlFor="referred-by">
            <span className="field__label">Indicado por</span>
            <span className="field__control field__control--select">
              <select
                id="referred-by"
                value={form.referredByClientId}
                onChange={(event) => updateField('referredByClientId', event.target.value)}
                required={availableReferrers.length > 0}
                disabled={availableReferrers.length === 0}
              >
                <option value="">
                  {availableReferrers.length > 0 ? 'Selecione um cliente' : 'Primeiro cliente da base'}
                </option>
                {availableReferrers.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </span>
            <span className="field__message">
              {availableReferrers.length > 0
                ? 'Obrigatório para registrar a origem da indicação.'
                : 'Após o primeiro cadastro, este campo passa a ser obrigatório.'}
            </span>
          </label>

          <label className="field" htmlFor="client-notes">
            <span className="field__label">Observações</span>
            <span className="field__control field__control--textarea">
              <textarea
                id="client-notes"
                value={form.notes}
                onChange={(event) => updateField('notes', event.target.value)}
                placeholder="Preferências, histórico ou contexto comercial"
              />
            </span>
          </label>

          {error ? <span className="field__message field__message--error">{error}</span> : null}

          <div className="client-form__actions">
            <Button type="submit" iconLeft={Save}>
              {editingId ? 'Salvar alterações' : 'Salvar cliente'}
            </Button>
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

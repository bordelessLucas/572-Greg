import { ArrowRight, IdCard, Mail, MapPin, Pencil, Phone, Save, User } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Sidebar, Topbar } from '../../components/navigation'
import { Button, Card, Modal, Table, TextInput, Typography } from '../../components/ui'
import type { Client, ClientInput } from '../../domain/client'
import { clientService } from '../../services/client.service'

const emptyForm: ClientInput = {
  name: '',
  phone: '',
  cpf: '',
  email: '',
  address: '',
  referredByClientId: '',
  notes: '',
}

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [form, setForm] = useState<ClientInput>(emptyForm)
  const [editingId, setEditingId] = useState<string | undefined>()
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const loadClients = async () => {
    setLoading(true)
    setLoadError('')

    try {
      setClients(await clientService.list())
    } catch {
      setLoadError('Nao foi possivel carregar os clientes do Firestore.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadTask = window.setTimeout(() => {
      void loadClients()
    }, 0)

    return () => window.clearTimeout(loadTask)
  }, [])

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return clients
    }

    return clients.filter((client) =>
      [client.name, client.phone, client.cpf, client.email].some((value) =>
        value?.toLowerCase().includes(normalizedQuery),
      ),
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setError('Preencha pelo menos o nome para salvar o cliente.')
      return
    }

    setSaving(true)
    setError('')

    try {
      await clientService.save(form, editingId)
      await loadClients()
      closeModal()
    } catch {
      setError('Nao foi possivel salvar o cliente no Firestore.')
    } finally {
      setSaving(false)
    }
  }

  const editClient = (client: Client) => {
    setEditingId(client.id)
    setForm({
      name: client.name,
      phone: client.phone ?? '',
      cpf: client.cpf ?? '',
      email: client.email ?? '',
      address: client.address ?? '',
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
          <small>{client.notes || client.email || 'Dados adicionais opcionais'}</small>
        </>
      ),
    },
    {
      key: 'phone',
      header: 'Telefone',
      render: (client: Client) => client.phone || 'Opcional',
    },
    {
      key: 'cpf',
      header: 'CPF',
      render: (client: Client) => client.cpf || 'Opcional',
    },
    {
      key: 'referral',
      header: 'Indicacao',
      render: (client: Client) => {
        const referrer = clients.find((item) => item.id === client.referredByClientId)

        return referrer ? referrer.name : 'Sem indicacao'
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
                Cadastre clientes com dados suficientes para vendas, parcelas, contratos e indicacoes.
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
              <Typography variant="caption">Com indicacao</Typography>
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
                  <Typography variant="caption">Lista persistida no Firestore para uso do administrador.</Typography>
                </div>
              </div>

              {loadError ? <span className="field__message field__message--error">{loadError}</span> : null}

              <TextInput
                label="Buscar cliente"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nome, telefone, CPF ou email"
              />

              <Table
                columns={clientColumns}
                emptyDescription={loading ? 'Carregando clientes...' : 'Cadastre o primeiro cliente para liberar vendas, parcelas, contratos e indicacoes.'}
                emptyTitle={loading ? 'Carregando base' : 'Nenhum cliente cadastrado'}
                getRowKey={(client) => client.id}
                rows={loading ? [] : filteredClients}
              />
            </Card>
          </section>
        </main>
      </div>

      <Modal open={modalOpen} title={editingId ? 'Editar cliente' : 'Novo cliente'} onClose={closeModal}>
        <form className="client-form" noValidate onSubmit={handleSubmit}>
          <Typography variant="caption">Dados extras ficam opcionais ate a validacao final com o cliente.</Typography>
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
          />
          <TextInput
            label="CPF"
            icon={IdCard}
            value={form.cpf}
            onChange={(event) => updateField('cpf', event.target.value)}
            placeholder="000.000.000-00"
          />
          <TextInput
            label="Email"
            icon={Mail}
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="cliente@email.com"
          />

          <label className="field" htmlFor="referred-by">
            <span className="field__label">Indicado por</span>
            <span className="field__control field__control--select">
              <select
                id="referred-by"
                value={form.referredByClientId}
                onChange={(event) => updateField('referredByClientId', event.target.value)}
                disabled={availableReferrers.length === 0}
              >
                <option value="">
                  {availableReferrers.length > 0 ? 'Selecione se houver indicacao' : 'Sem outros clientes na base'}
                </option>
                {availableReferrers.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </span>
            <span className="field__message">Opcional para registrar a origem da indicacao.</span>
          </label>

          <label className="field" htmlFor="client-address">
            <span className="field__label">Endereco</span>
            <span className="field__control field__control--textarea">
              <MapPin size={16} aria-hidden="true" />
              <textarea
                id="client-address"
                value={form.address}
                onChange={(event) => updateField('address', event.target.value)}
                placeholder="Endereco usado futuramente em contratos ou entregas"
              />
            </span>
          </label>

          <label className="field" htmlFor="client-notes">
            <span className="field__label">Observacoes</span>
            <span className="field__control field__control--textarea">
              <textarea
                id="client-notes"
                value={form.notes}
                onChange={(event) => updateField('notes', event.target.value)}
                placeholder="Preferencias, historico ou contexto comercial"
              />
            </span>
          </label>

          {error ? <span className="field__message field__message--error">{error}</span> : null}

          <div className="client-form__actions">
            <Button type="submit" iconLeft={Save} loading={saving}>
              {editingId ? 'Salvar alteracoes' : 'Salvar cliente'}
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

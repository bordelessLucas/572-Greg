import { ArrowRight, Building2, FileText, Mail, Pencil, Phone, Save } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Sidebar, Topbar } from '../../components/navigation'
import { Button, Card, Modal, Table, TextInput, Typography } from '../../components/ui'
import type { Supplier, SupplierInput } from '../../domain/operations'
import { supplierService } from '../../services/supplier.service'

const emptyForm: SupplierInput = {
  name: '',
  document: '',
  phone: '',
  email: '',
  notes: '',
}

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [form, setForm] = useState<SupplierInput>(emptyForm)
  const [editingId, setEditingId] = useState<string | undefined>()
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const loadSuppliers = async () => {
    setLoading(true)
    setLoadError('')

    try {
      setSuppliers(await supplierService.list())
    } catch {
      setLoadError('Nao foi possivel carregar os fornecedores do Firestore.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadTask = window.setTimeout(() => {
      void loadSuppliers()
    }, 0)

    return () => window.clearTimeout(loadTask)
  }, [])

  const filteredSuppliers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return suppliers
    }

    return suppliers.filter((supplier) =>
      [supplier.name, supplier.document, supplier.phone, supplier.email].some((value) =>
        value?.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [suppliers, query])

  const updateField = (field: keyof SupplierInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(undefined)
    setError('')
  }

  const closeModal = () => {
    setModalOpen(false)
    resetForm()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.name.trim()) {
      setError('Preencha pelo menos o nome para salvar o fornecedor.')
      return
    }

    setSaving(true)
    setError('')

    try {
      await supplierService.save(form, editingId)
      await loadSuppliers()
      closeModal()
    } catch {
      setError('Nao foi possivel salvar o fornecedor no Firestore.')
    } finally {
      setSaving(false)
    }
  }

  const editSupplier = (supplier: Supplier) => {
    setEditingId(supplier.id)
    setForm({
      name: supplier.name,
      document: supplier.document ?? '',
      phone: supplier.phone ?? '',
      email: supplier.email ?? '',
      notes: supplier.notes ?? '',
    })
    setError('')
    setModalOpen(true)
  }

  const supplierColumns = [
    {
      key: 'name',
      header: 'Fornecedor',
      render: (supplier: Supplier) => (
        <>
          <strong>{supplier.name}</strong>
          <small>{supplier.notes || supplier.email || 'Dados adicionais opcionais'}</small>
        </>
      ),
    },
    {
      key: 'document',
      header: 'Documento',
      render: (supplier: Supplier) => supplier.document || 'Opcional',
    },
    {
      key: 'phone',
      header: 'Telefone',
      render: (supplier: Supplier) => supplier.phone || 'Opcional',
    },
    {
      key: 'actions',
      header: '',
      align: 'right' as const,
      render: (supplier: Supplier) => (
        <Button variant="ghost" iconLeft={Pencil} onClick={() => editSupplier(supplier)}>
          Editar
        </Button>
      ),
    },
  ]

  return (
    <div className="app-frame" id="fornecedores">
      <Sidebar activeHref="#fornecedores" />
      <div className="workspace">
        <Topbar />

        <main className="clients-page">
          <section className="clients-header">
            <div>
              <Typography as="h1" variant="pageTitle">
                Fornecedores
              </Typography>
              <Typography variant="secondary">
                Cadastre origens de compra para reaproveitar em compras, produtos e historico financeiro.
              </Typography>
            </div>
            <div className="clients-header__actions">
              <Button iconRight={ArrowRight} onClick={() => setModalOpen(true)}>
                Novo fornecedor
              </Button>
            </div>
          </section>

          <section className="clients-metrics" aria-label="Resumo de fornecedores">
            <Card className="module-metric">
              <Typography variant="caption">Fornecedores cadastrados</Typography>
              <strong data-tone="accent">{suppliers.length}</strong>
            </Card>
            <Card className="module-metric">
              <Typography variant="caption">Base para</Typography>
              <strong data-tone="success">Compras</strong>
            </Card>
          </section>

          <section className="clients-layout">
            <Card className="clients-table-card">
              <div className="section-heading">
                <div>
                  <Typography as="h2" variant="sectionTitle">
                    Base de fornecedores
                  </Typography>
                  <Typography variant="caption">Dados opcionais ate a validacao final com o cliente.</Typography>
                </div>
              </div>

              {loadError ? <span className="field__message field__message--error">{loadError}</span> : null}

              <TextInput
                label="Buscar fornecedor"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nome, documento, telefone ou email"
              />

              <Table
                columns={supplierColumns}
                emptyDescription={loading ? 'Carregando fornecedores...' : 'Cadastre fornecedores para associar compras e custos.'}
                emptyTitle={loading ? 'Carregando base' : 'Nenhum fornecedor cadastrado'}
                getRowKey={(supplier) => supplier.id}
                rows={loading ? [] : filteredSuppliers}
              />
            </Card>
          </section>
        </main>
      </div>

      <Modal open={modalOpen} title={editingId ? 'Editar fornecedor' : 'Novo fornecedor'} onClose={closeModal}>
        <form className="client-form" noValidate onSubmit={handleSubmit}>
          <Typography variant="caption">O nome e suficiente para comecar; o restante pode ser completado depois.</Typography>
          <TextInput label="Nome" icon={Building2} value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
          <TextInput label="Documento" icon={FileText} value={form.document} onChange={(event) => updateField('document', event.target.value)} placeholder="CPF, CNPJ ou identificador" />
          <TextInput label="Telefone" icon={Phone} value={form.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="(11) 99999-0000" />
          <TextInput label="Email" icon={Mail} value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="fornecedor@email.com" />

          <label className="field" htmlFor="supplier-notes">
            <span className="field__label">Observacoes</span>
            <span className="field__control field__control--textarea">
              <textarea id="supplier-notes" value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Confiabilidade, prazos, condicoes ou contexto de compra" />
            </span>
          </label>

          {error ? <span className="field__message field__message--error">{error}</span> : null}

          <div className="client-form__actions">
            <Button type="submit" iconLeft={Save} loading={saving}>
              {editingId ? 'Salvar alteracoes' : 'Salvar fornecedor'}
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

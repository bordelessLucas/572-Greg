import { ArrowRight, CalendarDays, Plus, Save, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Sidebar, Topbar } from '../../components/navigation'
import { Button, Card, Modal, Table, TextInput, Typography } from '../../components/ui'
import type { OperationItemInput, Product, Purchase, PurchaseInput, Supplier } from '../../domain/operations'
import { productService } from '../../services/product.service'
import { purchaseService } from '../../services/purchase.service'
import { supplierService } from '../../services/supplier.service'

const paymentLabels = {
  pix: 'PIX',
  pixInstallments: 'PIX parcelado',
  card: 'Cartao',
  cash: 'Dinheiro',
  transfer: 'Transferencia',
  other: 'Outro',
} as const

const emptyItem: OperationItemInput = {
  productId: '',
  description: '',
  quantity: 1,
  unitValue: 0,
}

const emptyForm: PurchaseInput = {
  supplierId: '',
  items: [emptyItem],
  purchaseDate: new Date().toISOString().slice(0, 10),
  paymentMethod: 'pix',
  financialAccountId: '',
  notes: '',
}

function currency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(value)
}

export function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<PurchaseInput>(emptyForm)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setLoadError('')

    try {
      const [nextPurchases, nextSuppliers, nextProducts] = await Promise.all([
        purchaseService.list(),
        supplierService.list(),
        productService.list(),
      ])

      setPurchases(nextPurchases)
      setSuppliers(nextSuppliers)
      setProducts(nextProducts)
    } catch {
      setLoadError('Nao foi possivel carregar compras, fornecedores ou produtos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadTask = window.setTimeout(() => {
      void loadData()
    }, 0)

    return () => window.clearTimeout(loadTask)
  }, [])

  const filteredPurchases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return purchases
    }

    return purchases.filter((purchase) => {
      const supplier = suppliers.find((item) => item.id === purchase.supplierId)
      const itemText = purchase.items.map((item) => item.description).join(' ')

      return [supplier?.name, itemText, purchase.notes].some((value) => value?.toLowerCase().includes(normalizedQuery))
    })
  }, [purchases, query, suppliers])

  const totalPurchased = purchases.reduce((total, purchase) => total + purchase.totalValue, 0)
  const itemsTotal = form.items.reduce((total, item) => {
    const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 0
    const unitValue = Number(item.unitValue) > 0 ? Number(item.unitValue) : 0

    return total + quantity * unitValue
  }, 0)

  const resetForm = () => {
    setForm({ ...emptyForm, items: [{ ...emptyItem }], purchaseDate: new Date().toISOString().slice(0, 10) })
    setError('')
  }

  const closeModal = () => {
    setModalOpen(false)
    resetForm()
  }

  const updateItem = (index: number, nextItem: Partial<OperationItemInput>) => {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...nextItem } : item)),
    }))
  }

  const selectProduct = (index: number, productId: string) => {
    const product = products.find((item) => item.id === productId)

    updateItem(index, {
      productId,
      description: product ? product.name : '',
    })
  }

  const addItem = () => {
    setForm((current) => ({ ...current, items: [...current.items, { ...emptyItem }] }))
  }

  const removeItem = (index: number) => {
    setForm((current) => ({
      ...current,
      items: current.items.length === 1 ? current.items : current.items.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validItems = form.items.filter((item) => item.productId || item.description.trim())

    if (validItems.length === 0) {
      setError('Adicione pelo menos um produto para registrar a compra.')
      return
    }

    setSaving(true)
    setError('')

    try {
      await purchaseService.save({ ...form, items: validItems })
      await loadData()
      closeModal()
    } catch {
      setError('Nao foi possivel salvar a compra no Firestore.')
    } finally {
      setSaving(false)
    }
  }

  const purchaseColumns = [
    {
      key: 'purchase',
      header: 'Compra',
      render: (purchase: Purchase) => {
        const supplier = suppliers.find((item) => item.id === purchase.supplierId)
        const firstItem = purchase.items[0]

        return (
          <>
            <strong>{firstItem?.description || 'Compra sem descricao'}</strong>
            <small>{supplier?.name || 'Fornecedor opcional'} · {purchase.items.length} item(ns)</small>
          </>
        )
      },
    },
    {
      key: 'date',
      header: 'Data',
      render: (purchase: Purchase) => new Date(`${purchase.purchaseDate}T00:00:00`).toLocaleDateString('pt-BR'),
    },
    {
      key: 'payment',
      header: 'Pagamento',
      render: (purchase: Purchase) => purchase.paymentMethod ? paymentLabels[purchase.paymentMethod] : 'Opcional',
    },
    {
      key: 'total',
      header: 'Total',
      align: 'right' as const,
      render: (purchase: Purchase) => currency(purchase.totalValue),
    },
  ]

  return (
    <div className="app-frame" id="compras">
      <Sidebar activeHref="#compras" />
      <div className="workspace">
        <Topbar />

        <main className="clients-page">
          <section className="clients-header">
            <div>
              <Typography as="h1" variant="pageTitle">
                Compras
              </Typography>
              <Typography variant="secondary">
                Registre entradas de produtos com fornecedor, itens, custo e saida financeira derivada.
              </Typography>
            </div>
            <div className="clients-header__actions">
              <Button iconRight={ArrowRight} onClick={() => setModalOpen(true)}>
                Nova compra
              </Button>
            </div>
          </section>

          <section className="clients-metrics" aria-label="Resumo de compras">
            <Card className="module-metric">
              <Typography variant="caption">Compras registradas</Typography>
              <strong data-tone="accent">{purchases.length}</strong>
            </Card>
            <Card className="module-metric">
              <Typography variant="caption">Custo registrado</Typography>
              <strong data-tone="warning">{currency(totalPurchased)}</strong>
            </Card>
          </section>

          <section className="clients-layout">
            <Card className="clients-table-card">
              <div className="section-heading">
                <div>
                  <Typography as="h2" variant="sectionTitle">
                    Historico de compras
                  </Typography>
                  <Typography variant="caption">Cada compra confirmada cria uma movimentacao financeira de saida.</Typography>
                </div>
              </div>

              {loadError ? <span className="field__message field__message--error">{loadError}</span> : null}

              <TextInput
                label="Buscar compra"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Fornecedor, produto ou observacao"
              />

              <Table
                columns={purchaseColumns}
                emptyDescription={loading ? 'Carregando compras...' : 'Registre a primeira compra para iniciar o historico de custos.'}
                emptyTitle={loading ? 'Carregando base' : 'Nenhuma compra registrada'}
                getRowKey={(purchase) => purchase.id}
                rows={loading ? [] : filteredPurchases}
              />
            </Card>
          </section>
        </main>
      </div>

      <Modal open={modalOpen} title="Nova compra" onClose={closeModal}>
        <form className="client-form" noValidate onSubmit={handleSubmit}>
          <Typography variant="caption">Use multiplos itens quando uma compra trouxer mais de um produto.</Typography>

          <label className="field" htmlFor="purchase-supplier">
            <span className="field__label">Fornecedor</span>
            <span className="field__control field__control--select">
              <select id="purchase-supplier" value={form.supplierId} onChange={(event) => setForm((current) => ({ ...current, supplierId: event.target.value }))}>
                <option value="">Fornecedor opcional</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </span>
          </label>

          <TextInput
            label="Data da compra"
            icon={CalendarDays}
            type="date"
            value={form.purchaseDate}
            onChange={(event) => setForm((current) => ({ ...current, purchaseDate: event.target.value }))}
            required
          />

          <label className="field" htmlFor="purchase-payment">
            <span className="field__label">Forma de pagamento</span>
            <span className="field__control field__control--select">
              <select id="purchase-payment" value={form.paymentMethod} onChange={(event) => setForm((current) => ({ ...current, paymentMethod: event.target.value as PurchaseInput['paymentMethod'] }))}>
                {Object.entries(paymentLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </span>
          </label>

          <div className="purchase-items">
            {form.items.map((item, index) => (
              <div className="purchase-item" key={index}>
                <label className="field" htmlFor={`purchase-product-${index}`}>
                  <span className="field__label">Produto</span>
                  <span className="field__control field__control--select">
                    <select id={`purchase-product-${index}`} value={item.productId} onChange={(event) => selectProduct(index, event.target.value)}>
                      <option value="">Produto opcional</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                  </span>
                </label>
                <TextInput label="Descricao" value={item.description} onChange={(event) => updateItem(index, { description: event.target.value })} placeholder="Produto comprado" />
                <TextInput label="Qtd." type="number" min="1" value={item.quantity} onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })} />
                <TextInput label="Custo unitario" type="number" min="0" step="0.01" value={item.unitValue} onChange={(event) => updateItem(index, { unitValue: Number(event.target.value) })} />
                <Button type="button" variant="ghost" iconLeft={Trash2} iconOnly onClick={() => removeItem(index)}>
                  Remover item
                </Button>
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" iconLeft={Plus} onClick={addItem}>
            Adicionar item
          </Button>

          <label className="field" htmlFor="purchase-notes">
            <span className="field__label">Observacoes</span>
            <span className="field__control field__control--textarea">
              <textarea id="purchase-notes" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} placeholder="Comprovante, combinados, condicoes ou contexto da compra" />
            </span>
          </label>

          <Card className="module-metric">
            <Typography variant="caption">Total da compra</Typography>
            <strong data-tone="accent">{currency(itemsTotal)}</strong>
          </Card>

          {error ? <span className="field__message field__message--error">{error}</span> : null}

          <div className="client-form__actions">
            <Button type="submit" iconLeft={Save} loading={saving}>
              Salvar compra
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

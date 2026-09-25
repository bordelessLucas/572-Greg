import { ArrowRight, Barcode, Boxes, FileText, Pencil, Save, Smartphone } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Sidebar, Topbar } from '../../components/navigation'
import { Button, Card, Modal, Table, TextInput, Typography } from '../../components/ui'
import type { Product, ProductInput } from '../../domain/operations'
import { productService } from '../../services/product.service'

const emptyForm: ProductInput = {
  name: '',
  description: '',
  specifications: '',
  serialNumber: '',
  internalCode: '',
  condition: '',
  notes: '',
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductInput>(emptyForm)
  const [editingId, setEditingId] = useState<string | undefined>()
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const loadProducts = async () => {
    setLoading(true)
    setLoadError('')

    try {
      setProducts(await productService.list())
    } catch {
      setLoadError('Nao foi possivel carregar os produtos do Firestore.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadTask = window.setTimeout(() => {
      void loadProducts()
    }, 0)

    return () => window.clearTimeout(loadTask)
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return products
    }

    return products.filter((product) =>
      [product.name, product.description, product.specifications, product.internalCode, product.serialNumber].some((value) =>
        value?.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [products, query])

  const updateField = (field: keyof ProductInput, value: string) => {
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
      setError('Preencha pelo menos o nome para salvar o produto.')
      return
    }

    setSaving(true)
    setError('')

    try {
      await productService.save(form, editingId)
      await loadProducts()
      closeModal()
    } catch {
      setError('Nao foi possivel salvar o produto no Firestore.')
    } finally {
      setSaving(false)
    }
  }

  const editProduct = (product: Product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      description: product.description ?? '',
      specifications: product.specifications ?? '',
      serialNumber: product.serialNumber ?? '',
      internalCode: product.internalCode ?? '',
      condition: product.condition ?? '',
      notes: product.notes ?? '',
    })
    setError('')
    setModalOpen(true)
  }

  const productColumns = [
    {
      key: 'name',
      header: 'Produto',
      render: (product: Product) => (
        <>
          <strong>{product.name}</strong>
          <small>{product.specifications || product.description || 'Especificacoes opcionais'}</small>
        </>
      ),
    },
    {
      key: 'code',
      header: 'Codigo',
      render: (product: Product) => product.internalCode || 'Opcional',
    },
    {
      key: 'serial',
      header: 'Serie',
      render: (product: Product) => product.serialNumber || 'Validar depois',
    },
    {
      key: 'actions',
      header: '',
      align: 'right' as const,
      render: (product: Product) => (
        <Button variant="ghost" iconLeft={Pencil} onClick={() => editProduct(product)}>
          Editar
        </Button>
      ),
    },
  ]

  return (
    <div className="app-frame" id="produtos">
      <Sidebar activeHref="#produtos" />
      <div className="workspace">
        <Topbar />

        <main className="clients-page">
          <section className="clients-header">
            <div>
              <Typography as="h1" variant="pageTitle">
                Produtos
              </Typography>
              <Typography variant="secondary">
                Cadastre modelos e especificacoes para compras, vendas, documentos e historico.
              </Typography>
            </div>
            <div className="clients-header__actions">
              <Button iconRight={ArrowRight} onClick={() => setModalOpen(true)}>
                Novo produto
              </Button>
            </div>
          </section>

          <section className="clients-metrics" aria-label="Resumo de produtos">
            <Card className="module-metric">
              <Typography variant="caption">Produtos cadastrados</Typography>
              <strong data-tone="accent">{products.length}</strong>
            </Card>
            <Card className="module-metric">
              <Typography variant="caption">Numero de serie</Typography>
              <strong data-tone="warning">Opcional</strong>
            </Card>
          </section>

          <section className="clients-layout">
            <Card className="clients-table-card">
              <div className="section-heading">
                <div>
                  <Typography as="h2" variant="sectionTitle">
                    Base de produtos
                  </Typography>
                  <Typography variant="caption">Produtos podem ser refinados conforme o cliente validar campos obrigatorios.</Typography>
                </div>
              </div>

              {loadError ? <span className="field__message field__message--error">{loadError}</span> : null}

              <TextInput
                label="Buscar produto"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Modelo, especificacao, codigo ou serie"
              />

              <Table
                columns={productColumns}
                emptyDescription={loading ? 'Carregando produtos...' : 'Cadastre produtos para usar em compras e vendas.'}
                emptyTitle={loading ? 'Carregando base' : 'Nenhum produto cadastrado'}
                getRowKey={(product) => product.id}
                rows={loading ? [] : filteredProducts}
              />
            </Card>
          </section>
        </main>
      </div>

      <Modal open={modalOpen} title={editingId ? 'Editar produto' : 'Novo produto'} onClose={closeModal}>
        <form className="client-form" noValidate onSubmit={handleSubmit}>
          <Typography variant="caption">Numero de serie e codigo interno ficam opcionais ate validacao com o cliente.</Typography>
          <TextInput label="Nome do produto" icon={Smartphone} value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="iPhone 16 Pro Max" required />
          <TextInput label="Descricao" icon={FileText} value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Linha, cor, armazenamento ou contexto comercial" />
          <TextInput label="Especificacoes" icon={Boxes} value={form.specifications} onChange={(event) => updateField('specifications', event.target.value)} placeholder="256 GB, titanium, garantia, acessorios" />
          <TextInput label="Codigo interno" icon={Barcode} value={form.internalCode} onChange={(event) => updateField('internalCode', event.target.value)} placeholder="Opcional" />
          <TextInput label="Numero de serie" icon={Barcode} value={form.serialNumber} onChange={(event) => updateField('serialNumber', event.target.value)} placeholder="Validar necessidade depois" />
          <TextInput label="Estado" value={form.condition} onChange={(event) => updateField('condition', event.target.value)} placeholder="Novo, usado, vitrine ou outro" />

          <label className="field" htmlFor="product-notes">
            <span className="field__label">Observacoes</span>
            <span className="field__control field__control--textarea">
              <textarea id="product-notes" value={form.notes} onChange={(event) => updateField('notes', event.target.value)} placeholder="Historico, observacoes comerciais ou detalhes para contrato" />
            </span>
          </label>

          {error ? <span className="field__message field__message--error">{error}</span> : null}

          <div className="client-form__actions">
            <Button type="submit" iconLeft={Save} loading={saving}>
              {editingId ? 'Salvar alteracoes' : 'Salvar produto'}
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

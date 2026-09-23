# Arquitetura recomendada

## Stack atual

O projeto usa:

- Vite.
- React.
- TypeScript.
- Firebase SDK.
- `lucide-react`.
- CSS global com tokens semânticos.
- Playwright para validação visual.

Não troque a stack sem uma razão concreta.

## Separação de camadas

Use a arquitetura abaixo no frontend:

```text
src/
  components/        Componentes puros e reutilizáveis.
  domain/            Tipos, regras de domínio, contratos, enums, e value objects.
  presentation/      Páginas, layouts, hooks de tela, e mock visual.
  services/          Integrações externas e SDKs.
```

Regras:

- Componentes de UI não chamam Firebase diretamente.
- Páginas não contêm regras de negócio pesadas.
- Hooks de apresentação coordenam estado de tela.
- Serviços isolam Firebase, Autentique, PDF, IA, e integrações.
- Tipos de domínio não dependem de React.

## Serviços previstos

Serviços iniciais:

- `auth.service.ts`
- `database.service.ts`
- `storage.service.ts`
- `firebase.ts`

Serviços futuros:

- `purchase.service.ts`
- `product.service.ts`
- `customer.service.ts`
- `supplier.service.ts`
- `sale.service.ts`
- `finance.service.ts`
- `document.service.ts`
- `pdf.service.ts`
- `signature.service.ts`
- `collection.service.ts`
- `ai-entry.service.ts`
- `bank-import.service.ts`

Não crie integrações reais antes de confirmar escopo, credenciais, custos, permissões, e regras de negócio.

## Domínio inicial

O domínio deve representar:

- Compra.
- Produto.
- Cliente.
- Fornecedor.
- Venda.
- Pagamento.
- Parcela.
- Conta financeira.
- Movimentação financeira.
- Despesa.
- Documento.
- Template de documento.
- Assinatura.
- Cobrança.
- Usuário.

## Persistência

Firebase pode ser usado para autenticação, Firestore, e Storage.

Antes de modelar coleções definitivas, valide:

- Campos obrigatórios.
- Relacionamentos.
- Volume esperado.
- Consultas principais.
- Regras de permissão.
- Necessidade de histórico e auditoria.

## Integrações

Integrações devem ficar atrás de interfaces de serviço.

Não exponha SDKs externos em componentes React.

Integrações previstas:

- Firebase.
- Autentique.
- PDF.
- IA.
- Voz.
- Bancos ou extratos.
- Canal de cobrança.

## Auditoria e rastreabilidade

Operações comerciais e financeiras precisam de histórico suficiente para responder:

- Quem comprou.
- De quem comprou.
- Quem vendeu.
- Para quem vendeu.
- Qual valor foi usado.
- Qual forma de pagamento foi usada.
- Qual conta financeira foi usada.
- Quais parcelas existem.
- Quais documentos foram gerados.
- Qual o status da assinatura.

Não permita alterações silenciosas em dados comerciais relevantes.

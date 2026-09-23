# Modelo inicial de dados

Este modelo é uma proposta inicial. Ele separa requisitos confirmados de campos a confirmar.

## Entidades principais

### Cliente

Uso: vendas, documentos, cobranças, pagamentos, e histórico.

Campos a confirmar:

- Nome.
- Documento.
- Telefone.
- E-mail.
- Endereço.
- Observações.

### Fornecedor

Uso: compras e histórico de origem dos produtos.

Campos a confirmar:

- Nome.
- Documento.
- Telefone.
- E-mail.
- Observações.

### Produto

Uso: compra, venda, documentos, estoque, e histórico.

Campos confirmados:

- Nome.
- Descrição.
- Especificações.
- Informações de compra.
- Informações de venda.
- Histórico de operações.

Campos a confirmar:

- Número de série.
- Código interno.
- Quantidade disponível.
- Custo médio.
- Histórico de preço.
- Estado do produto.

### Compra

Uso: entrada de produto e movimentação financeira.

Campos confirmados:

- Fornecedor.
- Produto.
- Especificações.
- Valor da compra.
- Forma de pagamento.
- Conta usada no pagamento.
- Informações da operação.

Campos a confirmar:

- Data da compra.
- Quantidade.
- Custo unitário.
- Custo total.
- Observações.
- Comprovantes.

### Venda

Uso: venda, pagamento, documento, contas a receber, e cobrança.

Campos confirmados:

- Cliente.
- Produto.
- Valor da venda.
- Forma de pagamento.
- Informações de recebimento.

Campos derivados:

- Parcelas.
- Conta a receber.
- Movimentação financeira.
- Documento.
- PDF.
- Status de assinatura.

### Pagamento

Uso: compras e vendas.

Campos confirmados:

- Forma de pagamento.
- Valor total.
- Valor recebido.
- Valor pendente.
- Situação.

Campos para parcelamento:

- Quantidade de parcelas.
- Valor de cada parcela.
- Vencimentos.
- Situação de cada parcela.

### Parcela

Uso: contas a receber, cobrança, e fluxo de caixa.

Campos confirmados:

- Valor.
- Vencimento.
- Situação.
- Recebido.
- Pendente.
- Atrasado.

Campos a confirmar:

- Data de recebimento.
- Conta de destino.
- Comprovante.
- Observações.

### Conta financeira

Uso: origem e destino de movimentações.

Campos a confirmar:

- Nome.
- Tipo.
- Saldo inicial.
- Ativa ou inativa.

Tipos possíveis:

- Conta bancária.
- Caixa.
- Carteira.
- Outra conta usada pela empresa.

### Movimentação financeira

Uso: fluxo de caixa, entradas, saídas, despesas, compras, e vendas.

Campos iniciais:

- Tipo: entrada ou saída.
- Valor.
- Data.
- Conta financeira.
- Categoria.
- Origem: compra, venda, despesa, parcela, ou ajuste.
- Observações.

### Despesa

Uso: financeiro e fluxo de caixa.

Campos confirmados:

- Descrição.
- Valor.
- Categoria.

Categorias sugeridas:

- Operacional.
- Administrativo.
- Fornecedor.
- Impostos.
- Pessoal.
- Outros.

### Documento

Uso: recibos, contratos, PDF, Autentique, e histórico.

Campos iniciais:

- Tipo.
- Venda relacionada.
- Cliente.
- Produto.
- Template usado.
- Conteúdo renderizado.
- PDF.
- Status.

### Template de documento

Uso: recibos, contratos, e outros documentos comerciais.

Campos iniciais:

- Nome.
- Tipo.
- Conteúdo.
- Variáveis aceitas.
- Ativo ou inativo.

Variáveis conceituais:

```text
{{cliente_nome}}
{{cliente_documento}}
{{produto}}
{{valor_venda}}
{{forma_pagamento}}
{{data}}
```

### Assinatura

Uso: integração com Autentique.

Campos a confirmar:

- Documento.
- Provedor.
- Link.
- Status.
- Data de envio.
- Data de assinatura.
- Erro de envio.

Status possíveis:

- Pendente.
- Visualizado.
- Assinado.
- Cancelado.

### Cobrança

Uso: acompanhamento de parcelas e lembretes.

Campos iniciais:

- Cliente.
- Parcela.
- Venda.
- Vencimento.
- Status.
- Canal.
- Mensagem preparada.

Canal a confirmar:

- E-mail.
- WhatsApp.
- Outro canal.

## Relações principais

```text
Fornecedor -> Compra
Compra -> Produto
Cliente -> Venda
Produto -> Venda
Venda -> Pagamento
Pagamento -> Parcela
Venda -> Documento
Documento -> Assinatura
Parcela -> Cobrança
Compra -> Movimentação financeira
Venda -> Movimentação financeira
Despesa -> Movimentação financeira
Movimentação financeira -> Conta financeira
```

## Regra de qualidade dos dados

Campos essenciais devem impedir a conclusão de operações críticas. Campos úteis, mas não essenciais, devem aparecer como pendências ou indicadores de cadastro incompleto.

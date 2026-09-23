# Fluxos principais

## Compra

Fluxo inicial:

```text
Fornecedor
-> Produto
-> Valor e forma de pagamento
-> Conta de origem
-> Registro financeiro
```

Resultado esperado:

- A compra fica registrada.
- O produto recebe histórico.
- O fornecedor fica associado.
- A movimentação financeira de saída é criada.

## Venda

Fluxo inicial:

```text
Cliente
-> Produto
-> Valor
-> Forma de pagamento
-> Parcelamento, se houver
-> Contas a receber
-> Documento automático
-> PDF
-> Assinatura
-> Acompanhamento financeiro
```

Resultado esperado:

- A venda fica registrada.
- O cliente fica associado.
- O produto fica associado.
- O financeiro recebe a operação.
- Parcelas são criadas quando a venda não é paga à vista.
- O documento usa dados já cadastrados.

## Financeiro

Fluxo de entrada:

```text
Venda ou recebimento de parcela
-> Conta financeira
-> Movimentação de entrada
-> Fluxo de caixa
```

Fluxo de saída:

```text
Compra ou despesa
-> Conta financeira
-> Movimentação de saída
-> Fluxo de caixa
```

## Documento

Fluxo desejado:

```text
Venda confirmada
-> Seleção de template
-> Preenchimento automático
-> Revisão
-> PDF
-> Assinatura, se aplicável
```

O usuário não deve abrir Canva, copiar dados, exportar PDF manualmente, renomear arquivo, ou subir arquivo novamente em outro sistema.

## Assinatura

Fluxo futuro com Autentique:

```text
PDF gerado
-> Envio ao Autentique
-> Solicitação de assinatura
-> Link salvo
-> Status acompanhado
```

Valide API, custos, permissões, e limitações antes da implementação.

## Cobrança

Fluxo inicial:

```text
Parcela criada
-> Monitoramento de vencimento
-> Destaque de pendências
-> Mensagem preparada
-> Confirmação do usuário
-> Envio manual ou integração futura
```

Não assuma envio automático por WhatsApp.

## IA para lançamento

Fluxo futuro:

```text
Usuário escreve ou fala a operação
-> IA interpreta
-> Sistema estrutura os dados
-> Usuário revisa
-> Usuário confirma
-> Sistema grava os registros
```

A IA nunca deve salvar movimentações financeiras relevantes sem confirmação do usuário.

## Integração bancária

Fluxo futuro:

```text
Importação de movimentações
-> Sugestão de categoria ou vínculo
-> Revisão do usuário
-> Conciliação
-> Fluxo de caixa atualizado
```

Trate integração bancária como item a avaliar. Não assuma API disponível.

# Automações e IA

## Objetivo

Reduzir digitação manual e transformar linguagem natural em registros estruturados.

## Possibilidade técnica

O usuário pode escrever ou falar uma mensagem como:

```text
Comprei determinado produto do fornecedor X por R$ Y, paguei via PIX pela conta Z e vendi para o cliente A por R$ B em três parcelas.
```

A IA pode interpretar a mensagem e preencher campos de compra, venda, produto, cliente, pagamento, parcelas, e financeiro.

## Regra obrigatória

A IA não deve salvar movimentações financeiras relevantes sem confirmação do usuário.

## Fluxo recomendado

```text
Entrada por texto ou voz
-> Interpretação pela IA
-> Dados estruturados
-> Revisão do usuário
-> Confirmação
-> Gravação
```

## Pontos a confirmar

- Se a IA entra no MVP.
- Quais tipos de operação a IA deve entender primeiro.
- Se entrada por voz é necessária.
- Quais campos a IA pode sugerir.
- Quais campos sempre exigem confirmação manual.

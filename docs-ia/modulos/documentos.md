# Documentos

## Objetivo

Eliminar edição manual de recibos e contratos no Canva.

## Escopo confirmado

O sistema deve gerar documentos usando:

- Dados do cliente.
- Dados do produto.
- Valor.
- Forma de pagamento.
- Condições comerciais.
- Demais informações cadastradas.

## Templates

Templates devem permitir variáveis como:

```text
{{cliente_nome}}
{{cliente_documento}}
{{produto}}
{{valor_venda}}
{{forma_pagamento}}
{{data}}
```

## PDF

O documento deve ser convertido ou disponibilizado em PDF sem exigir edição manual.

## Pontos a confirmar

- Modelos atuais de contrato.
- Modelos atuais de recibo.
- Variáveis obrigatórias.
- Necessidade de pré-visualização.
- Se o usuário pode editar texto antes de gerar PDF.

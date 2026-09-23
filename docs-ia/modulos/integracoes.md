# Integrações

## Autentique

Integração desejada:

```text
Venda
-> Gerar documento
-> Gerar PDF
-> Enviar ao Autentique
-> Solicitar assinatura
```

Pontos a validar:

- Disponibilidade da API.
- Custos.
- Permissões.
- Limites.
- Status disponíveis.
- Webhooks.
- Armazenamento de link de assinatura.

## Banco

Integração bancária é um item a avaliar.

Objetivo desejado:

- Visualizar entradas.
- Visualizar saídas.
- Importar movimentações.
- Permitir categorização.
- Permitir vínculo com compras, vendas, despesas, e parcelas.

Alternativas:

- Open Finance.
- Provedor de integração bancária.
- Importação de extrato.
- OFX.
- CSV.

Não assuma que o banco usado pelo cliente possui API disponível.

## Cobrança

Canais possíveis:

- E-mail.
- WhatsApp.
- Outro canal.

Não implemente envio automático sem validação do canal.

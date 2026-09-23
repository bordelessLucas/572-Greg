# Contexto do projeto

## Visão geral

Greg é um sistema web de gestão comercial e financeira para uma empresa que trabalha com revenda de produtos Apple. O produto não é um e-commerce público. O produto deve funcionar como uma ferramenta operacional diária para compras, produtos, clientes, fornecedores, vendas, financeiro, documentos, assinaturas, cobranças, e dashboard administrativo.

## Operação atual

O cliente hoje executa grande parte da operação de forma manual.

O processo atual usa:

- Excel para controle de compras.
- Excel para controle de vendas.
- Excel para gastos da empresa.
- Excel para fluxo de caixa.
- Canva para editar contratos e recibos.
- Exportação manual de documentos para PDF.
- Autentique para assinatura.
- Acompanhamento manual das informações financeiras.
- Cobrança manual de clientes que pagam parcelado via PIX.

O cliente considera o processo atual manual, trabalhoso, visualmente fraco, pouco automatizado, sujeito a dados incompletos, e dependente de preenchimento repetido.

## Objetivo do produto

Criar uma plataforma que centralize o fluxo:

```text
Compra -> Produto -> Venda -> Cliente -> Pagamento -> Financeiro -> Documento -> Assinatura -> Cobrança
```

O sistema deve registrar uma informação uma vez e reutilizar essa informação nos módulos relacionados.

Uma venda registrada deve alimentar:

- Histórico de vendas.
- Contas a receber.
- Fluxo de caixa.
- Documento ou recibo.
- Dados do cliente.
- Acompanhamento de parcelas.
- Informações financeiras da operação.

## Problema central

O projeto existe para substituir um fluxo manual baseado em Excel, Canva, PDF, Autentique, e cobranças manuais. A prioridade é reduzir trabalho manual, evitar dados duplicados, impedir campos importantes vazios, e dar visibilidade diária à operação.

## Referências visuais analisadas

As imagens enviadas pelo cliente na raiz do projeto mostram duas direções compatíveis:

- Um dashboard claro com sidebar macOS, busca superior, cards de métricas, hero escuro, tarefas, tabela de vendas, e resumo financeiro.
- Uma apresentação de sistema comercial com accent laranja, sidebar escura, cards compactos, gráficos simples, atividade recente, e telas responsivas.

Características incorporadas ao frontend atual:

- Sidebar inspirada em macOS.
- Topbar com busca central.
- Accent laranja.
- Superfícies neutras.
- Cards compactos de métricas.
- Tabela comercial para vendas.
- Lista de tarefas e pendências.
- Área financeira com recebimentos.
- Visual Apple-inspired sem copiar Apple.

## Limites atuais

Não assumir nesta fase:

- Emissão de nota fiscal.
- Controle de estoque avançado.
- Integração específica com banco.
- WhatsApp automático.
- Gateway de pagamento.
- PIX automático.
- Boleto.
- CRM complexo.
- Aplicativo mobile.
- Múltiplas empresas.
- Múltiplas filiais.
- IA tomando decisões financeiras.
- Regras contábeis específicas.
- Integrações não citadas pelo cliente.

Esses pontos só entram no escopo após confirmação.

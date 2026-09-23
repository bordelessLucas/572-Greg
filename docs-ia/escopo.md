# Escopo do sistema

## Requisitos confirmados

O sistema deve centralizar compras, produtos, clientes, fornecedores, vendas, financeiro, documentos, assinaturas, cobranças, e dashboard.

O sistema deve reduzir o uso manual de Excel, Canva, PDF, Autentique, e cobranças manuais.

O sistema deve permitir registrar compras com:

- Fornecedor.
- Produto.
- Especificações do produto.
- Valor da compra.
- Forma de pagamento.
- Conta usada no pagamento.
- Informações relacionadas à operação.

O sistema deve permitir cadastrar produtos com:

- Nome.
- Descrição.
- Especificações.
- Informações usadas na compra.
- Informações usadas na venda.
- Histórico de operações relacionadas.

O sistema deve manter uma base centralizada de clientes e fornecedores.

O sistema deve permitir registrar vendas com:

- Cliente.
- Produto vendido.
- Valor da venda.
- Forma de pagamento.
- Informações de recebimento.

O sistema deve acompanhar pagamentos, especialmente PIX e PIX parcelado.

Para pagamentos parcelados, o sistema deve representar:

- Valor total.
- Quantidade de parcelas.
- Valor de cada parcela.
- Vencimentos.
- Situação de cada parcela.
- Valor recebido.
- Valor pendente.
- Valor atrasado.

O sistema deve gerar recibos, contratos, ou documentos comerciais a partir dos dados da venda.

O sistema deve gerar ou disponibilizar PDF sem exigir edição manual no Canva.

O sistema deve substituir ou melhorar controles financeiros feitos em Excel.

O sistema deve permitir registrar despesas da empresa.

O sistema deve mostrar fluxo de caixa com entradas e saídas.

O sistema deve gerar contas a receber para vendas não pagas integralmente no ato.

O sistema deve ajudar a controlar cobranças de parcelas próximas do vencimento, vencendo hoje, ou atrasadas.

O sistema deve validar campos obrigatórios e impedir operações críticas com dados essenciais ausentes.

O sistema deve associar movimentações a contas financeiras.

## Sugestões diretamente relacionadas

Estas sugestões ajudam a reduzir trabalho manual, mas precisam ser validadas quando virarem implementação:

- Registrar data da compra.
- Registrar observações da compra.
- Anexar comprovantes.
- Registrar quantidade, custo unitário, e custo total.
- Controlar estoque.
- Controlar quantidade disponível.
- Calcular custo médio.
- Guardar histórico de preço.
- Registrar número de série.
- Registrar código interno.
- Categorizar despesas por operacional, administrativo, fornecedor, impostos, pessoal, e outros.
- Preparar mensagens de cobrança automaticamente.
- Usar IA para transformar texto ou voz em dados estruturados.
- Importar extrato bancário por OFX ou CSV.

## Integrações futuras

Estas integrações são possibilidades técnicas ou requisitos desejados. Não implemente sem validação:

- API do Autentique.
- Link e status de assinatura.
- Integração bancária por Open Finance ou provedor.
- Envio automático por WhatsApp.
- Entrada por voz.
- Assistente de IA para lançamentos.

## Pontos a confirmar com o cliente

- Quais campos são obrigatórios em cliente, fornecedor, produto, compra, venda, e documento.
- Se o cliente precisa controlar estoque por unidade, número de série, ou apenas histórico comercial.
- Se existe mais de uma conta financeira.
- Quais formas de pagamento além de PIX e PIX parcelado devem entrar no MVP.
- Quais modelos de contrato e recibo existem hoje.
- Quais variáveis cada documento precisa receber.
- Se a assinatura no Autentique é obrigatória no MVP ou entra após a geração de PDF.
- Qual canal deve ser usado para cobrança.
- Qual banco o cliente usa e se há extrato exportável.
- Quais relatórios são indispensáveis no primeiro uso real.
- Se haverá usuários com permissões diferentes.
- Se há necessidade de anexos, comprovantes, ou documentos relacionados a compras e vendas.

## MVP recomendado

O MVP deve substituir a operação manual principal com o menor conjunto útil:

1. Autenticação básica.
2. Dashboard operacional.
3. Cadastro de clientes.
4. Cadastro de fornecedores.
5. Cadastro de produtos.
6. Cadastro de contas financeiras.
7. Registro de compras.
8. Registro de vendas.
9. Parcelamento e contas a receber.
10. Registro de despesas.
11. Fluxo de caixa.
12. Geração de documento a partir da venda.
13. Geração de PDF.
14. Painel de cobranças pendentes.

Autentique, IA, voz, WhatsApp, e integração bancária podem vir depois, a menos que o cliente priorize uma dessas frentes.

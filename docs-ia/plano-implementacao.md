# Plano macro de implementacao

Este plano parte do estado atual do repositorio e dos documentos em `docs-ia`.
O criterio principal e: cada entrega deve reduzir retrabalho real, gerar dados que
alimentam os proximos modulos e evitar dependencia externa cedo demais.

## Estado atual auditado

- Stack ativa: Vite, React, TypeScript, Firebase SDK, `lucide-react`, CSS global e oxlint.
- Build e lint passam com sucesso.
- Firebase esta configurado para Auth, Firestore e Storage.
- Autenticacao existe como service, mas as rotas/telas ainda nao protegem o dashboard por sessao real.
- Dashboard existe com mock de vendas, tarefas e indicadores.
- Navegacao lateral cobre todos os modulos previstos.
- Paginas de modulo existem como paginas informativas, nao como fluxos persistidos.
- Clientes e o unico modulo com CRUD visual, mas persiste em `localStorage`.
- O service generico de Firestore existe, mas ainda nao foi usado nos modulos de negocio.
- Existem dois arquivos nao versionados na raiz que parecem insumos externos: contrato PDF e planilha de controle.

## Decisoes validadas

- O MVP tera um unico usuario administrador.
- Nao havera criacao publica de cadastro. A tela publica deve permitir apenas login de administrador existente.
- Qualquer criacao/troca/recuperacao de acesso deve ser tratada como configuracao interna do sistema ou operacao manual no Firebase nesta fase.
- Campos obrigatorios ainda nao foram fechados com o cliente; ate la, os cadastros devem ser flexiveis e validar apenas o minimo para identificar registros.
- Numero de serie por unidade nao entra como obrigatorio agora.
- Contas financeiras e formas de pagamento serao usadas para organizar e documentar o negocio, sem depender de integracoes reais de banco ou pagamento.
- Compras e vendas podem ter multiplos produtos.
- Parcelamento entra no MVP.
- Atrasos devem aparecer no painel inicial como pendencias de facil acesso.
- Recebimento parcial so faz sentido como parte de uma venda com entrada e restante parcelado/acordado; nao deve existir "entrada solta" sem acordo do restante.
- Modelos de contrato/recibo e variaveis devem ser extraidos da planilha disponibilizada na raiz do projeto.
- Cobrancas serao internas para o dono da loja no MVP; automacao por WhatsApp fica fora do escopo atual, mas deve existir area futura de configuracao de automacoes.
- Autentique, banco, WhatsApp e IA ficam apos o MVP operacional, com espaco de configuracao preparado quando fizer sentido.

## Principios de implementacao

1. Persistencia antes de automacao.
   Pro: evita construir compras, vendas e financeiro em cima de mocks ou `localStorage`.

2. Cadastros base antes de transacoes.
   Pro: vendas e compras dependem de clientes, fornecedores, produtos, contas financeiras e formas de pagamento.

3. Transacoes geram derivados.
   Pro: uma venda deve criar parcelas, contas a receber, movimentacoes e documento preparado sem redigitacao.

4. Dashboard sempre derivado de dados reais.
   Pro: remove o risco de uma tela bonita esconder que a operacao ainda nao esta conectada.

5. Integracoes ficam atras de interfaces e entram depois de validar credenciais, custo e regras.
   Pro: Autentique, banco, WhatsApp e IA nao bloqueiam o MVP util.

6. Cada fase deve terminar com build, lint e smoke visual.
   Pro: mantem a base demonstravel e evita acumulo de regressao.

## Fase 0 - Fundacao tecnica de produto

Objetivo: transformar a casca atual em base segura para dados reais.

Issues sugeridas:

- Criar contratos de dominio para cliente, fornecedor, produto, compra, venda, pagamento, parcela, conta financeira, movimentacao, despesa, documento e template.
- Definir nomes de colecoes Firestore, campos obrigatorios minimos e campos derivados.
- Criar camada de repository/service por entidade, usando `database.service.ts` por baixo.
- Migrar `clientService` de `localStorage` para Firestore com loading, erro e empty state.
- Proteger dashboard e modulos por estado de autenticacao real.
- Simplificar premissas de acesso para um unico admin no MVP.
- Remover auto cadastro publico e deixar o fluxo de acesso como configuracao interna.
- Criar fixtures/dev seed opcionais para demonstracao local sem depender da planilha.

Pronto quando:

- Cliente cadastrado aparece apos reload e em outro navegador autenticado.
- Dashboard nao abre sem login.
- Build e lint continuam passando.

Pendencias externas:

- Confirmar se ja existe projeto Firebase definitivo e regras desejadas de acesso para um admin.

## Fase 1 - Cadastros base operacionais

Objetivo: criar os dados reutilizaveis para compras, vendas, documentos e financeiro.

Issues sugeridas:

- Implementar fornecedores: listagem, criacao, edicao, busca e prevencao simples de duplicidade.
- Implementar produtos: modelo, especificacoes, serial/codigo opcional, estado, observacoes e historico basico.
- Implementar configuracoes operacionais: contas financeiras, categorias, formas de pagamento e dados da empresa.
- Revisar cliente: campos minimos para contrato/cobranca, endereco/e-mail se confirmados, indicador sem obrigatoriedade artificial quando nao existir.
- Manter campos extras opcionais ate a validacao com o cliente.
- Adicionar componentes reutilizaveis para formulario de entidade, toolbar de tabela, status e confirmacao.

Pronto quando:

- Compra e venda conseguem selecionar cliente, fornecedor, produto, conta financeira e forma de pagamento reais.
- Dados obrigatorios estao coerentes com o MVP validado.

Pendencias externas:

- Campos obrigatorios de cliente, fornecedor e produto.
- Dados legais da empresa para documentos.

## Fase 2 - Compras e saidas financeiras

Objetivo: substituir o controle manual inicial de compras e alimentar produto/financeiro.

Issues sugeridas:

- Implementar registro de compra com fornecedor, produto, data, valor, forma de pagamento e conta de origem.
- Permitir multiplos produtos na compra desde o primeiro desenho do dominio.
- Criar movimentacao financeira de saida ao confirmar compra paga.
- Registrar compra no historico do produto.
- Preparar suporte a comprovante como campo/estrutura, mesmo que upload venha depois.
- Criar tela de compras com tabela, filtros por periodo e fornecedor, e detalhes.

Pronto quando:

- Uma compra salva cria uma saida financeira rastreavel.
- Produto mostra origem/custo/historico suficiente para venda futura.

Pendencias externas:

- Compras parceladas entram no MVP?
- Comprovante e obrigatorio?
- Estoque bloqueia venda ou apenas informa disponibilidade?

## Fase 3 - Vendas, parcelas e contas a receber

Objetivo: implementar o fluxo central do negocio.

Issues sugeridas:

- Implementar criacao de venda com cliente, produto, data, valor, forma de pagamento, entrada e parcelas.
- Permitir multiplos produtos por venda desde o primeiro desenho do dominio.
- Gerar parcelas automaticamente a partir da venda.
- Criar conta a receber para valores pendentes.
- Criar movimentacao de entrada para valor recebido no ato.
- Permitir marcar parcela como paga, atrasada ou pendente.
- Bloquear recebimento parcial solto quando nao houver acordo para o restante.
- Calcular valor recebido, pendente, atrasado e lucro bruto.
- Atualizar tela de vendas, contas a receber e dashboard para dados reais.

Pronto quando:

- Uma venda parcelada gera parcelas e aparece em contas a receber.
- Ao marcar parcela como paga, financeiro e dashboard refletem a mudanca.

Pendencias externas:

- Regras de atraso e tolerancia.
- Ha desconto, comissao, cancelamento ou status de venda no MVP?

## Fase 4 - Financeiro e fluxo de caixa

Objetivo: substituir as leituras financeiras principais do Excel.

Issues sugeridas:

- Implementar despesas avulsas.
- Criar tela financeira com entradas, saidas, saldo, lucro e filtros por periodo.
- Implementar fluxo de caixa previsto x realizado.
- Implementar contas a pagar simples para despesas e compromissos manuais.
- Criar categorias financeiras configuraveis ou seedadas para organizacao interna.
- Consolidar dashboard com indicadores derivados do financeiro.

Pronto quando:

- O usuario consegue responder quanto vendeu, recebeu, esta pendente, gastou e lucrou no periodo.

Pendencias externas:

- Categorias financeiras oficiais.
- Periodo padrao de analise.
- Existe fechamento mensal?
- Pro-labore e contabilidade entram como categorias simples ou fluxo proprio?

## Fase 5 - Documentos e PDF

Objetivo: reduzir uso de Canva e exportacao manual.

Issues sugeridas:

- Implementar templates de documento com variaveis.
- Extrair os modelos e variaveis iniciais da planilha da raiz antes de implementar o motor final.
- Criar motor simples de preenchimento: venda + cliente + produto + pagamento.
- Criar pre-visualizacao editavel ou somente revisavel, conforme decisao.
- Gerar PDF e salvar referencia do documento.
- Vincular documento gerado a venda.
- Preparar interface futura para assinatura, sem depender de Autentique ainda.

Pronto quando:

- Uma venda gera contrato/recibo com dados reais e PDF acessivel.

Pendencias externas:

- Se usuario pode editar texto antes do PDF.
- Padrao de numeracao e assinatura visual.

## Fase 6 - Cobrancas operacionais

Objetivo: reduzir acompanhamento manual de PIX parcelado.

Issues sugeridas:

- Criar painel de parcelas proximas, vencendo hoje e atrasadas.
- Criar gerador de mensagem de cobranca com tom profissional para uso interno do dono.
- Criar acao de copiar mensagem e/ou abrir WhatsApp manualmente.
- Registrar historico simples de cobranca feita.
- Exibir pendencias no dashboard.
- Preparar area futura de configuracao de automacoes de WhatsApp sem envio automatico no MVP.

Pronto quando:

- O usuario sabe quem cobrar hoje e consegue preparar a mensagem sem redigitar dados.

Pendencias externas:

- Tom das mensagens.
- Dias antes/depois para alerta.
- Necessidade de aprovacao manual por mensagem.

## Fase 7 - Integracoes e automacoes futuras

Objetivo: adicionar automacao sem comprometer a confiabilidade do financeiro.

Issues sugeridas:

- Autentique: mapear API, custos, webhooks, status e erro.
- Banco: avaliar OFX/CSV antes de API/Open Finance.
- IA texto: criar rascunho estruturado com revisao obrigatoria antes de salvar.
- Voz: implementar apenas se a entrada por texto provar valor.
- WhatsApp automatico: nao implementar sem validar regras, consentimento e provedor.
- Area de configuracao de automacoes pode aparecer antes, mas as automacoes reais entram depois do MVP.

Pronto quando:

- Cada integracao tiver interface propria, logs de erro e fallback manual.

Pendencias externas:

- Credenciais e contrato Autentique.
- Banco usado e formato exportavel.
- Politica/canal de WhatsApp.
- Prioridade real de IA no MVP.

## Organizacao recomendada de issues

Labels:

- `P0 MVP`
- `P1 Next`
- `Future`
- `Backend/Firebase`
- `Frontend/UI`
- `Domain`
- `External validation`
- `Blocked`
- `Smoke test`

Formato de issue:

```text
Contexto
Objetivo
Escopo
Fora de escopo
Dados envolvidos
Fluxo esperado
Critérios de aceite
Dependencias
Pendencias externas
Teste/validacao
```

## Ordem recomendada imediata

1. Resolver Fase 0.
2. Implementar fornecedores, produtos e configuracoes.
3. Implementar compras.
4. Implementar vendas + parcelas + contas a receber.
5. Trocar dashboard mockado por dados reais.
6. Implementar financeiro e fluxo de caixa.
7. Implementar documentos/PDF.
8. Implementar cobrancas.
9. Avaliar integracoes e IA.

Esta ordem evita bloqueios porque cada fase produz os dados que a proxima precisa.
Tambem preserva o MVP util: mesmo sem Autentique, banco, WhatsApp automatico ou IA,
o sistema ja substitui partes centrais de Excel, Canva e cobrancas manuais.

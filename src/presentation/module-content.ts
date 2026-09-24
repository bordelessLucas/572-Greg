export type ModuleStage = 'mvp' | 'next' | 'future'

export interface ModuleContent {
  id: string
  title: string
  shortTitle: string
  stage: ModuleStage
  summary: string
  objective: string
  scope: string[]
  automations?: string[]
  openQuestions?: string[]
  actions: string[]
  metrics: Array<{ label: string; value: string; tone?: 'accent' | 'success' | 'warning' | 'neutral' }>
}

export const modules: ModuleContent[] = [
  {
    id: 'clientes',
    title: 'Clientes',
    shortTitle: 'Clientes',
    stage: 'mvp',
    summary: 'Base central para vendas, contratos, cobranças, parcelas e histórico comercial.',
    objective: 'Cadastrar e consultar clientes sem depender da planilha, mantendo dados mínimos confiáveis.',
    scope: ['Nome completo', 'Telefone', 'CPF', 'Histórico de vendas', 'Vínculo com contratos e parcelas', 'Cliente indicador quando existir'],
    openQuestions: ['CPF será obrigatório para todos os clientes?', 'Endereço entra agora ou apenas no contrato?', 'Quais campos mínimos permitem gerar contrato?'],
    actions: ['Novo cliente', 'Importar da planilha', 'Ver indicações'],
    metrics: [
      { label: 'Campos essenciais', value: '3', tone: 'accent' },
      { label: 'Usado em', value: 'Vendas', tone: 'success' },
      { label: 'Prioridade', value: 'P0', tone: 'warning' },
    ],
  },
  {
    id: 'fornecedores',
    title: 'Fornecedores',
    shortTitle: 'Fornecedores',
    stage: 'mvp',
    summary: 'Cadastro dos fornecedores recorrentes para compras e cotações.',
    objective: 'Evitar fornecedores duplicados e permitir selecionar a origem de compras e orçamentos.',
    scope: ['Nome', 'Código', 'Telefone opcional', 'Edição posterior', 'Seleção em compras', 'Seleção em orçamentos'],
    openQuestions: ['Fornecedor pode ser pessoa física?', 'Código deve ser manual ou automático?', 'Haverá histórico financeiro por fornecedor?'],
    actions: ['Novo fornecedor', 'Criar fornecedores padrão', 'Revisar duplicados'],
    metrics: [
      { label: 'Base inicial', value: '15-20', tone: 'accent' },
      { label: 'Telefone', value: 'Opcional', tone: 'neutral' },
      { label: 'Prioridade', value: 'P0', tone: 'warning' },
    ],
  },
  {
    id: 'produtos',
    title: 'Produtos',
    shortTitle: 'Produtos',
    stage: 'mvp',
    summary: 'Descrição flexível dos equipamentos vendidos, comprados ou orçados.',
    objective: 'Registrar especificações sem forçar campos que não se aplicam a todos os produtos Apple.',
    scope: ['Modelo', 'Linha', 'Chip', 'Polegadas', 'RAM', 'SSD/armazenamento', 'Cor', 'Número de série quando existir'],
    openQuestions: ['Número de série será obrigatório em quais casos?', 'Acessórios entram no mesmo cadastro?', 'Produtos usados precisam de estado de conservação?'],
    actions: ['Novo produto', 'Criar variação', 'Ver histórico de preço'],
    metrics: [
      { label: 'Modelo', value: 'Flexível', tone: 'success' },
      { label: 'Estoque', value: 'Simples', tone: 'neutral' },
      { label: 'Prioridade', value: 'P0', tone: 'warning' },
    ],
  },
  {
    id: 'compras',
    title: 'Compras',
    shortTitle: 'Compras',
    stage: 'mvp',
    summary: 'Registro da entrada de produto e do custo usado para calcular lucro.',
    objective: 'Registrar compras mesmo antes da venda, mantendo fornecedor, produto, data e custo.',
    scope: ['Produto', 'Número de série quando houver', 'Data da compra', 'Fornecedor', 'Valor da compra', 'Observações'],
    automations: ['Associar fornecedor à compra', 'Atualizar histórico do produto', 'Preparar saída financeira quando aplicável'],
    openQuestions: ['Compras podem ter vários produtos?', 'Compras parceladas entram no MVP?', 'Comprovante é obrigatório?'],
    actions: ['Nova compra', 'Vincular produto', 'Anexar comprovante'],
    metrics: [
      { label: 'Pode existir sem venda', value: 'Sim', tone: 'success' },
      { label: 'Base do lucro', value: 'Custo', tone: 'accent' },
      { label: 'Prioridade', value: 'P0', tone: 'warning' },
    ],
  },
  {
    id: 'vendas',
    title: 'Vendas',
    shortTitle: 'Vendas',
    stage: 'mvp',
    summary: 'Fluxo principal para registrar cliente, produto, pagamento, parcelas e contrato.',
    objective: 'Transformar cada operação comercial em registros financeiros e documentos reaproveitáveis.',
    scope: ['Cliente', 'Produto', 'Data da venda', 'Valor da venda', 'Entrada', 'Quantidade de parcelas', 'Lucro', 'Bairro/local de entrega', 'Status do contrato', 'Cliente indicador'],
    automations: ['Gerar parcelas', 'Calcular lucro', 'Preparar contrato', 'Atualizar contas a receber'],
    openQuestions: ['Venda pode ter múltiplos produtos?', 'Cancelamento precisa entrar agora?', 'Desconto e comissão existem?'],
    actions: ['Nova venda', 'Gerar parcelas', 'Converter orçamento'],
    metrics: [
      { label: 'Gera parcelas', value: 'Sim', tone: 'success' },
      { label: 'Contrato', value: 'Depois', tone: 'neutral' },
      { label: 'Prioridade', value: 'P0', tone: 'warning' },
    ],
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    shortTitle: 'Financeiro',
    stage: 'mvp',
    summary: 'Centro de leitura financeira: vendido, recebido, pendente, gastos e lucro.',
    objective: 'Substituir as visões financeiras da planilha com dados derivados das operações.',
    scope: ['Gastos', 'Compras', 'Recebimentos', 'Lucro', 'Movimentações', 'Análise mensal'],
    openQuestions: ['Qual período padrão abre primeiro?', 'Existe fechamento mensal?', 'Quais contas financeiras entram no MVP?'],
    actions: ['Ver mês atual', 'Registrar gasto', 'Conferir pendências'],
    metrics: [
      { label: 'Fonte', value: 'Derivada', tone: 'success' },
      { label: 'Gráficos', value: 'Úteis', tone: 'neutral' },
      { label: 'Prioridade', value: 'P0/P1', tone: 'warning' },
    ],
  },
  {
    id: 'contas-a-receber',
    title: 'Contas a receber',
    shortTitle: 'Receber',
    stage: 'mvp',
    summary: 'Controle das parcelas futuras, pagas, pendentes e vencidas.',
    objective: 'Gerar recebimentos automaticamente a partir das vendas parceladas.',
    scope: ['Venda', 'Cliente', 'Número da parcela', 'Valor', 'Vencimento', 'Status', 'Data de pagamento', 'Conta de recebimento'],
    automations: ['Criar parcelas pela venda', 'Atualizar status ao receber', 'Refletir valores no realizado', 'Destacar atrasos'],
    openQuestions: ['Recebimento parcial é permitido?', 'Qual tolerância para atraso?', 'Pagamento antecipado muda vencimento?'],
    actions: ['Ver vencidas', 'Marcar como paga', 'Registrar antecipado'],
    metrics: [
      { label: 'Status', value: '3', tone: 'accent' },
      { label: 'Fluxo crítico', value: 'Sim', tone: 'success' },
      { label: 'Prioridade', value: 'P0', tone: 'warning' },
    ],
  },
  {
    id: 'contas-a-pagar',
    title: 'Contas a pagar',
    shortTitle: 'Pagar',
    stage: 'next',
    summary: 'Obrigações financeiras vindas de compras, despesas e lançamentos manuais.',
    objective: 'Controlar vencimentos e pagamentos da empresa sem criar um financeiro complexo demais.',
    scope: ['Vencimento', 'Categoria', 'Conta de pagamento', 'Status', 'Comprovante', 'Observações'],
    openQuestions: ['Compras geram contas a pagar?', 'Despesas recorrentes entram agora?', 'Avisos de vencimento são necessários?'],
    actions: ['Nova conta', 'Ver próximas', 'Registrar pagamento'],
    metrics: [
      { label: 'Fase', value: 'Após vendas', tone: 'neutral' },
      { label: 'Origem', value: 'Despesa', tone: 'accent' },
      { label: 'Prioridade', value: 'P1', tone: 'warning' },
    ],
  },
  {
    id: 'fluxo-de-caixa',
    title: 'Fluxo de caixa',
    shortTitle: 'Caixa',
    stage: 'next',
    summary: 'Leitura mensal de entradas, saídas, saldo e previsões.',
    objective: 'Responder quanto entrou, quanto saiu, quanto está previsto e qual é o saldo por período.',
    scope: ['Entradas', 'Saídas', 'Saldo', 'Contas futuras', 'Recebimentos futuros', 'Despesas por categoria', 'Evolução por período'],
    openQuestions: ['Previsões entram no saldo ou ficam separadas?', 'Quais períodos são mais usados?', 'Categorias já são fixas?'],
    actions: ['Ver previsto', 'Ver realizado', 'Filtrar mês'],
    metrics: [
      { label: 'Previsto', value: 'Sim', tone: 'accent' },
      { label: 'Realizado', value: 'Sim', tone: 'success' },
      { label: 'Prioridade', value: 'P1', tone: 'warning' },
    ],
  },
  {
    id: 'documentos',
    title: 'Documentos',
    shortTitle: 'Documentos',
    stage: 'next',
    summary: 'Geração de contratos e PDFs a partir da venda, sem edição manual no Canva.',
    objective: 'Preencher documentos com dados já cadastrados e gerar PDF final.',
    scope: ['Dados do cliente', 'Produto', 'Valor', 'Forma de pagamento', 'Condições comerciais', 'Parcelas dinâmicas', 'Template'],
    automations: ['Preencher variáveis', 'Gerar PDF', 'Registrar status do contrato'],
    openQuestions: ['O usuário pode editar texto antes do PDF?', 'Quais modelos entram primeiro?', 'Quais variáveis são obrigatórias?'],
    actions: ['Novo template', 'Gerar PDF', 'Pré-visualizar contrato'],
    metrics: [
      { label: 'Canva', value: 'Substituir', tone: 'accent' },
      { label: 'Assinatura', value: 'Futuro', tone: 'neutral' },
      { label: 'Prioridade', value: 'P1', tone: 'warning' },
    ],
  },
  {
    id: 'cobrancas',
    title: 'Cobranças',
    shortTitle: 'Cobranças',
    stage: 'next',
    summary: 'Acompanhamento das parcelas próximas, vencendo hoje ou atrasadas.',
    objective: 'Ajudar o dono a cobrar clientes parcelados via PIX sem automação arriscada.',
    scope: ['Parcela próxima', 'Parcela vencendo hoje', 'Parcela atrasada', 'Mensagem preparada', 'Aprovação manual'],
    automations: ['Destacar pendências', 'Preparar mensagem', 'Abrir WhatsApp quando houver telefone'],
    openQuestions: ['Quantos dias antes avisar?', 'Qual tom da mensagem?', 'Cobrança sempre precisa aprovação?'],
    actions: ['Ver atrasadas', 'Preparar mensagem', 'Abrir WhatsApp'],
    metrics: [
      { label: 'Envio automático', value: 'Não', tone: 'neutral' },
      { label: 'PIX parcelado', value: 'Foco', tone: 'accent' },
      { label: 'Prioridade', value: 'P1', tone: 'warning' },
    ],
  },
  {
    id: 'configuracoes',
    title: 'Configurações',
    shortTitle: 'Configurações',
    stage: 'mvp',
    summary: 'Parâmetros da operação: empresa, categorias, formas de pagamento e templates.',
    objective: 'Centralizar ajustes simples sem criar gestão complexa de usuários.',
    scope: ['Dados da empresa', 'Contas financeiras', 'Categorias financeiras', 'Formas de pagamento', 'Templates', 'Preferências de cobrança'],
    openQuestions: ['Quais dados legais da empresa entram no contrato?', 'Categorias são fixas ou editáveis?', 'Numeração de documentos será automática?'],
    actions: ['Editar empresa', 'Gerenciar categorias', 'Configurar pagamentos'],
    metrics: [
      { label: 'Usuários', value: '1 admin', tone: 'success' },
      { label: 'RBAC', value: 'Não', tone: 'neutral' },
      { label: 'Prioridade', value: 'P0', tone: 'warning' },
    ],
  },
  {
    id: 'automacoes-ia',
    title: 'Automações IA',
    shortTitle: 'IA',
    stage: 'future',
    summary: 'Entrada assistida por texto ou voz para reduzir digitação manual.',
    objective: 'Interpretar uma operação descrita em linguagem natural e preencher campos para revisão.',
    scope: ['Entrada por texto', 'Entrada por voz futura', 'Interpretação', 'Dados estruturados', 'Revisão do usuário', 'Confirmação antes de gravar'],
    openQuestions: ['IA entra no MVP?', 'Quais operações ela entende primeiro?', 'Quais campos sempre exigem confirmação?'],
    actions: ['Rascunhar lançamento', 'Revisar sugestão', 'Confirmar gravação'],
    metrics: [
      { label: 'Grava sem revisar', value: 'Nunca', tone: 'warning' },
      { label: 'Fase', value: 'Futuro', tone: 'neutral' },
      { label: 'Prioridade', value: 'FUT', tone: 'neutral' },
    ],
  },
  {
    id: 'integracoes',
    title: 'Integrações',
    shortTitle: 'Integrações',
    stage: 'future',
    summary: 'Avaliação de banco, assinatura eletrônica e canais de cobrança.',
    objective: 'Preparar o sistema para integrações futuras sem bloquear o MVP.',
    scope: ['Autentique', 'Banco/Open Finance', 'Importação OFX/CSV', 'WhatsApp manual', 'Webhooks futuros', 'Armazenamento de links'],
    openQuestions: ['Qual banco será usado?', 'API do Autentique está disponível?', 'Qual custo das integrações?', 'WhatsApp será apenas atalho ou automação futura?'],
    actions: ['Mapear credenciais', 'Avaliar API', 'Importar extrato'],
    metrics: [
      { label: 'Implementar agora', value: 'Não', tone: 'neutral' },
      { label: 'Arquitetura', value: 'Preparar', tone: 'accent' },
      { label: 'Prioridade', value: 'FUT', tone: 'neutral' },
    ],
  },
]

export function getModuleById(id: string): ModuleContent | undefined {
  return modules.find((module) => module.id === id)
}

# Design system

## Direção visual

A interface deve parecer um software empresarial que poderia existir no ecossistema Apple. O visual deve transmitir tecnologia, simplicidade, confiança, organização, e acabamento premium.

O produto não deve parecer:

- Landing page.
- Template SaaS genérico.
- Painel Bootstrap.
- Dashboard colorido de startup.
- ERP antigo.
- Cópia literal do iOS ou da Apple.

Use Apple Human Interface Guidelines, Apple Store, macOS, e aplicativos nativos Apple como inspiração. Não copie assets, logotipos, composições, ou layouts proprietários.

## Referências do cliente

As imagens na raiz do projeto devem influenciar:

- Estrutura de navegação.
- Sidebar.
- Densidade de informação.
- Cards de métricas.
- Tabelas.
- Cabeçalhos.
- Busca.
- Tarefas e pendências.
- Área financeira.
- Accent laranja.

Preserve a lógica estrutural das referências e modernize o acabamento.

## Tokens semânticos

Use tokens semânticos. Não espalhe valores HEX pelo código.

Tokens base:

```text
background
backgroundSoft
surface
surfaceSecondary
surfaceElevated
surfaceDark
textPrimary
textSecondary
textMuted
textInverse
border
borderStrong
accent
accentHover
accentSoft
success
warning
danger
shadowSm
shadowMd
shadowFloating
radiusInput
radiusCard
radiusModal
duration
```

Paleta inicial:

```text
Background: #F5F5F7
Surface: #FFFFFF
Surface secondary: #F9F9FB
Text primary: #1D1D1F
Text secondary: #6E6E73
Text muted: #86868B
Border: rgba(0, 0, 0, 0.08)
Accent: #FF6A1A
Success: #23855F
Warning: #C46819
Danger: #C9342F
```

O accent laranja vem das referências do cliente. Use uma única cor de destaque dominante.

## Tipografia

Use a stack:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
```

Não baixe SF Pro. Não use Google Fonts.

Escala inicial:

```text
Display: 40px a 48px
Page title: 28px a 32px
Section title: 20px a 24px
Card title: 15px a 17px
Body: 14px a 16px
Secondary: 13px a 14px
Caption: 12px a 13px
```

Não use letter-spacing negativo. Evite títulos gigantes dentro de dashboards.

## Espaçamento

Use uma escala baseada em:

```text
4
8
12
16
20
24
32
40
48
64
```

Dashboards devem ser densos o suficiente para operação diária, mas organizados e fáceis de escanear.

## Bordas e raio

Use raio moderado:

```text
Inputs: 8px a 10px
Buttons: 8px a 10px
Cards: 10px a 12px
Modais: 16px a 20px
Popovers: 12px a 16px
```

Não transforme todos os componentes em pills. Reserve pills para badges, filtros, estados, e segmented controls.

## Sombras

Use sombras discretas:

```text
sm: 0 1px 2px rgba(0, 0, 0, 0.04)
md: 0 4px 16px rgba(0, 0, 0, 0.06)
floating: 0 12px 40px rgba(0, 0, 0, 0.12)
```

Use sombras fortes somente em elementos elevados.

## Liquid Glass

Use transparência, blur, e `backdrop-filter` somente em:

- Sidebar.
- Topbar.
- Toolbars.
- Popovers.
- Modais.
- Floating controls.

Não aplique glassmorphism no conteúdo principal.

## Ícones

Use a biblioteca existente do projeto. Se não existir, use `lucide-react`.

Não use emojis como ícones de interface.

Não desenhe SVG manual quando houver um ícone equivalente.

## Componentes base

Componentes necessários:

- `Button`
- `Input`
- `Select`
- `SearchField`
- `Typography`
- `Card`
- `Badge`
- `StatusBadge`
- `SegmentedControl`
- `Modal`
- `Drawer`
- `Table`
- `DropdownMenu`
- `EmptyState`
- `Skeleton`
- `Sidebar`
- `Topbar`

Todos os componentes interativos devem ter estados:

- Default.
- Hover.
- Active.
- Focus visible.
- Disabled.
- Loading, quando fizer sentido.

Hover não deve deslocar o layout.

## Tabelas

Use tabelas profissionais para dados comerciais:

- Produtos.
- Vendas.
- Clientes.
- Compras.
- Parcelas.
- Despesas.
- Contas a pagar.
- Contas a receber.
- Documentos.

Tabelas devem ter cabeçalho, hover, ações, empty state, loading, alinhamento numérico, truncamento controlado, e responsividade.

## Responsividade

Prioridade:

1. Desktop `1440px`.
2. Desktop `1280px`.
3. Notebook `1024px`.
4. Tablet `768px`.

Mobile deve continuar funcional, mas o design desktop tem prioridade.

Em telas menores:

- Recolha ou compacte a sidebar.
- Transforme navegação em trilho horizontal ou menu.
- Controle overflow em tabelas.
- Preserve ações essenciais.

## Acessibilidade

Implemente:

- `focus-visible`.
- Contraste adequado.
- Labels visíveis.
- `aria-label` em icon buttons.
- Navegação por teclado.
- Estados disabled claros.
- Mensagens de erro acessíveis.

Não use somente cor para indicar status.

## Checklist visual

Antes de considerar uma tela concluída, verifique:

- Hierarquia.
- Alinhamento.
- Espaçamento.
- Tipografia.
- Cores.
- Bordas.
- Sombras.
- Estados.
- Responsividade.
- Acessibilidade.
- Overflow.
- Tabelas.
- Menus.
- Modais.
- Consistência com tokens.

O build passando não conclui uma tela. Rode o app, gere screenshots quando Playwright estiver disponível, revise visualmente, e faça uma rodada de refinamento.

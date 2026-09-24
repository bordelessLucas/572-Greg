import { ArrowRight, CheckCircle2, CircleHelp, Clock3, ListChecks, Plus } from 'lucide-react'
import { Sidebar, Topbar } from '../../components/navigation'
import { Badge, Button, Card, Typography } from '../../components/ui'
import type { ModuleContent, ModuleStage } from '../module-content'

interface ModulePageProps {
  module: ModuleContent
}

const stageCopy: Record<ModuleStage, { label: string; tone: 'accent' | 'warning' | 'neutral'; description: string }> = {
  mvp: {
    label: 'MVP',
    tone: 'accent',
    description: 'Entra na fundação do sistema e deve virar fluxo persistido primeiro.',
  },
  next: {
    label: 'Próxima fase',
    tone: 'warning',
    description: 'Depende da base operacional ou financeira estar funcionando.',
  },
  future: {
    label: 'Futuro',
    tone: 'neutral',
    description: 'Mapeado no escopo, mas não deve bloquear a entrega inicial.',
  },
}

const metricTones = {
  accent: 'accent',
  success: 'success',
  warning: 'warning',
  neutral: 'neutral',
} as const

export function ModulePage({ module }: ModulePageProps) {
  const stage = stageCopy[module.stage]

  return (
    <div className="app-frame" id={module.id}>
      <Sidebar activeHref={`#${module.id}`} />
      <div className="workspace">
        <Topbar />

        <main className="module-page">
          <section className="module-hero">
            <div className="module-hero__copy">
              <Badge tone={stage.tone}>{stage.label}</Badge>
              <Typography as="h1" variant="pageTitle">
                {module.title}
              </Typography>
              <Typography variant="secondary">{module.summary}</Typography>
            </div>
            <Card className="module-stage-card">
              <Typography as="h2" variant="sectionTitle">
                Estado do módulo
              </Typography>
              <Typography variant="caption">{stage.description}</Typography>
              <Button iconLeft={Plus}>
                {module.actions[0]}
              </Button>
            </Card>
          </section>

          <section className="module-metrics" aria-label={`Indicadores de ${module.title}`}>
            {module.metrics.map((metric) => (
              <Card className="module-metric" key={metric.label}>
                <Typography variant="caption">{metric.label}</Typography>
                <strong data-tone={metricTones[metric.tone ?? 'neutral']}>{metric.value}</strong>
              </Card>
            ))}
          </section>

          <section className="module-grid">
            <Card className="module-card module-card--wide">
              <div className="module-card__heading">
                <CheckCircle2 size={18} aria-hidden="true" />
                <Typography as="h2" variant="sectionTitle">
                  Objetivo
                </Typography>
              </div>
              <Typography variant="body">{module.objective}</Typography>
            </Card>

            <Card className="module-card">
              <div className="module-card__heading">
                <ListChecks size={18} aria-hidden="true" />
                <Typography as="h2" variant="sectionTitle">
                  Escopo do módulo
                </Typography>
              </div>
              <ul className="module-list">
                {module.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card className="module-card">
              <div className="module-card__heading">
                <Clock3 size={18} aria-hidden="true" />
                <Typography as="h2" variant="sectionTitle">
                  Automações e derivações
                </Typography>
              </div>
              {module.automations?.length ? (
                <ul className="module-list">
                  {module.automations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <Typography variant="caption">Sem automação obrigatória definida para a primeira entrega.</Typography>
              )}
            </Card>

            <Card className="module-card">
              <div className="module-card__heading">
                <CircleHelp size={18} aria-hidden="true" />
                <Typography as="h2" variant="sectionTitle">
                  Pontos a confirmar
                </Typography>
              </div>
              <ul className="module-list module-list--muted">
                {(module.openQuestions ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>

            <Card className="module-card module-card--actions">
              <div className="module-card__heading">
                <ArrowRight size={18} aria-hidden="true" />
                <Typography as="h2" variant="sectionTitle">
                  Ações previstas
                </Typography>
              </div>
              <div className="module-actions">
                {module.actions.map((action, index) => (
                  <Button key={action} variant={index === 0 ? 'primary' : 'outline'} iconRight={ArrowRight}>
                    {action}
                  </Button>
                ))}
              </div>
            </Card>
          </section>
        </main>
      </div>

    </div>
  )
}

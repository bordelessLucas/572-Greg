import { ArrowLeft, ShieldCheck, UserCog } from 'lucide-react'
import { Sidebar, Topbar } from '../../components/navigation'
import { Badge, Button, Card, Typography } from '../../components/ui'

interface RegisterPageProps {
  onBackDashboard: () => void
}

export function RegisterPage({ onBackDashboard }: RegisterPageProps) {
  return (
    <div className="app-frame" id="register">
      <Sidebar activeHref="#configuracoes" />
      <div className="workspace">
        <Topbar />

        <main className="module-page">
          <section className="module-hero">
            <div className="module-hero__copy">
              <Badge tone="accent">Configuracoes</Badge>
              <Typography as="h1" variant="pageTitle">
                Acesso do administrador
              </Typography>
              <Typography variant="secondary">
                O sistema e privado. Novos acessos nao podem ser criados pela tela publica de login.
              </Typography>
            </div>
            <Card className="module-stage-card">
              <Typography as="h2" variant="sectionTitle">
                Regra atual
              </Typography>
              <Typography variant="caption">
                MVP com um unico admin. Criacao, troca ou recuperacao de acesso deve ser tratada como configuracao interna.
              </Typography>
              <Button iconLeft={ArrowLeft} onClick={onBackDashboard}>
                Voltar ao dashboard
              </Button>
            </Card>
          </section>

          <section className="module-grid">
            <Card className="module-card">
              <div className="module-card__heading">
                <ShieldCheck size={18} aria-hidden="true" />
                <Typography as="h2" variant="sectionTitle">
                  O que esta fechado
                </Typography>
              </div>
              <ul className="module-list">
                <li>Login publico apenas para administrador existente.</li>
                <li>Nao existe auto cadastro para usuarios externos.</li>
                <li>Modulos internos so abrem apos sessao autenticada.</li>
              </ul>
            </Card>

            <Card className="module-card">
              <div className="module-card__heading">
                <UserCog size={18} aria-hidden="true" />
                <Typography as="h2" variant="sectionTitle">
                  Proxima evolucao
                </Typography>
              </div>
              <ul className="module-list module-list--muted">
                <li>Adicionar tela interna em Configuracoes para trocar email/senha do admin.</li>
                <li>Se o cliente pedir, avaliar multiplos usuarios apos o MVP.</li>
                <li>Regras Firestore devem permitir dados apenas para usuario autenticado.</li>
              </ul>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}

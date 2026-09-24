import { Building2, Mail, Phone, User } from 'lucide-react'
import { Button, SelectField, TextInput, Typography } from '../../components/ui'

interface RegisterPageProps {
  onBackLogin: () => void
  onEnterDashboard: () => void
}

export function RegisterPage({ onBackLogin, onEnterDashboard }: RegisterPageProps) {
  return (
    <main className="auth-page auth-page--wide">
      <section className="auth-panel auth-panel--register" aria-labelledby="register-title">
        <div className="auth-brand">
          <span className="brand__mark" aria-hidden="true">
            GA
          </span>
          <div>
            <Typography as="p" variant="title">
              Gestão Apple
            </Typography>
            <Typography as="p" variant="caption">
              Acesso interno
            </Typography>
          </div>
        </div>

        <div className="auth-copy">
          <Typography as="h1" variant="pageTitle" className="auth-title" id="register-title">
            Configure o acesso do dono.
          </Typography>
          <Typography variant="secondary">
            Dados mínimos para preparar a gestão interna da revenda.
          </Typography>
        </div>

        <form className="register-grid">
          <TextInput label="Nome do dono" icon={User} placeholder="Gustavo Rehavia" required />
          <TextInput label="Email de acesso" icon={Mail} type="email" placeholder="gustavo@empresa.com" required />
          <TextInput label="Nome da revenda" icon={Building2} placeholder="Gestão Apple" required />
          <TextInput label="Telefone" icon={Phone} placeholder="(11) 99999-0000" required />
          <SelectField
            label="Perfil inicial"
            options={[
              { label: 'Administrador', value: 'admin' },
              { label: 'Financeiro', value: 'finance' },
              { label: 'Operação', value: 'operations' },
            ]}
          />
          <SelectField
            label="Unidade"
            options={[
              { label: 'Matriz', value: 'main' },
              { label: 'Loja', value: 'store' },
              { label: 'Escritório', value: 'office' },
            ]}
          />
        </form>

        <div className="register-actions">
          <Button variant="ghost" onClick={onBackLogin}>
            Voltar
          </Button>
          <Button onClick={onEnterDashboard}>Criar acesso</Button>
        </div>
      </section>
    </main>
  )
}

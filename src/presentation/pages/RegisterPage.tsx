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
            AD
          </span>
          <div>
            <Typography as="p" variant="title">
              Apple Delivery
            </Typography>
            <Typography as="p" variant="caption">
              Cadastro comercial
            </Typography>
          </div>
        </div>

        <div className="auth-copy">
          <Typography as="h1" variant="pageTitle" className="auth-title" id="register-title">
            Configure o acesso inicial.
          </Typography>
          <Typography variant="secondary">
            Dados mínimos para preparar a área operacional da revenda.
          </Typography>
        </div>

        <form className="register-grid">
          <TextInput label="Nome responsável" icon={User} placeholder="Gustavo Rehavia" required />
          <TextInput label="Email corporativo" icon={Mail} type="email" placeholder="gustavo@empresa.com" required />
          <TextInput label="Empresa" icon={Building2} placeholder="Apple Delivery" required />
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
          <Button onClick={onEnterDashboard}>Criar conta</Button>
        </div>
      </section>
    </main>
  )
}

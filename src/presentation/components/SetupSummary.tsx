import type { AppSetupSummary } from '../../domain/app-setup'

interface SetupSummaryProps {
  setup: AppSetupSummary
}

export function SetupSummary({ setup }: SetupSummaryProps) {
  return (
    <main className="app-shell">
      <section className="setup-panel" aria-labelledby="setup-title">
        <div className="setup-eyebrow">{setup.platform}</div>
        <h1 id="setup-title">Greg</h1>
        <p>
          Base inicial configurada com {setup.framework}, {setup.language} estrito
          e Firebase isolado na camada de services.
        </p>

        <dl className="setup-grid">
          <div>
            <dt>Projeto Firebase</dt>
            <dd>{setup.firebaseProjectId}</dd>
          </div>
          <div>
            <dt>Recursos</dt>
            <dd>{setup.firebaseFeatures.join(', ')}</dd>
          </div>
        </dl>
      </section>
    </main>
  )
}

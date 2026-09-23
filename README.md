# Greg

Projeto Web inicializado com Vite, React e TypeScript estrito.

## Scripts

- `npm run dev`: inicia o servidor local.
- `npm run build`: valida TypeScript e gera o build.
- `npm run lint`: executa o lint configurado pelo template.

## Firebase

As credenciais locais ficam em `.env` usando o prefixo `VITE_`. A inicializacao
do SDK esta isolada em `src/services/firebase.ts`, e chamadas de Auth,
Firestore e Storage devem passar pelos services em `src/services/`.

## Contexto de produto

Leia `docs-ia/README.md` antes de implementar novas telas, fluxos, dados,
integracoes ou automacoes. A pasta `docs-ia/` concentra escopo, design system,
arquitetura, modelo de dados, fluxos, roadmap e documentacao por modulo.

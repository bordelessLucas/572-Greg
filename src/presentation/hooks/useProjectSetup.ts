import { useMemo } from 'react'
import type { AppSetupSummary } from '../../domain/app-setup'

export function useProjectSetup(): AppSetupSummary {
  return useMemo(
    () => ({
      platform: 'web',
      framework: 'React',
      language: 'TypeScript',
      firebaseProjectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      firebaseFeatures: ['app', 'analytics', 'auth', 'firestore', 'storage'],
    }),
    [],
  )
}

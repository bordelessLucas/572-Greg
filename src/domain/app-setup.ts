export type FirebaseFeature = 'app' | 'analytics' | 'auth' | 'firestore' | 'storage'

export interface AppSetupSummary {
  platform: 'web'
  framework: 'React'
  language: 'TypeScript'
  firebaseProjectId: string
  firebaseFeatures: FirebaseFeature[]
}

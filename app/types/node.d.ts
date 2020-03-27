declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly APP_TITLE: string
    readonly AUTHOR_NAME: string
    readonly FIREBASE_API_KEY: string
    readonly FIREBASE_AUTH_DOMAIN: string
    readonly FIREBASE_DATABASE_URL: string
    readonly FIREBASE_PROJECT_ID: string
    readonly FIREBASE_STORAGE_BUCKET: string
    readonly FIREBASE_MESSAGING_SENDER_ID: string
    readonly FIREBASE_APP_ID: string
    readonly FIREBASE_MEASUREMENT_ID: string
  }
}

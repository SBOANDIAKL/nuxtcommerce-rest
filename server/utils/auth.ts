import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, anonymous } from 'better-auth/plugins'

import * as schema from '../db/schema/index'
import { db } from './db'

export const auth = betterAuth({
  database: drizzleAdapter(db(), {
    provider: 'pg', // or "mysql", "sqlite"
    schema,
  }),
  baseURL: getBaseURL(),
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  plugins: [anonymous(), admin()],
})

function getBaseURL() {
  let baseURL = process.env.BETTER_AUTH_URL
  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin
    }
    catch (e) {}
  }
  return baseURL
}

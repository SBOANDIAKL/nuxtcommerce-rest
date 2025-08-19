import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { admin, anonymous } from 'better-auth/plugins'

import * as schema from '../db/schema/index'
import { db } from './db'

let _auth: ReturnType<typeof betterAuth>
export function auth() {
  if (!_auth) {
    _auth = betterAuth({
      database: drizzleAdapter(db(), {
        provider: 'pg',
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
  }
  return _auth
}

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

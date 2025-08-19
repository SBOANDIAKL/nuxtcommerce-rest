import type { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from '../db/schema/index'
import 'dotenv/config'

let db_instance: NodePgDatabase<typeof schema> | null = null

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
})
export function db() {
  if (!db_instance) {
    db_instance = drizzle({ client: pool, schema, casing: 'snake_case' })
  }
  return db_instance
}

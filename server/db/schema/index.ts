import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth'

export * from './auth'

// Enums
export const orderStatus = [
  'pending',
  'paid',
  'picking',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
] as const

// CREATE TABLE Products (
//     product_id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     category VARCHAR(255),
//     brand VARCHAR(255),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );

export const category = pgTable('category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const brand = pgTable('brand', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  imageUrl: text('image_url'),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  images: text('images').array(),
  brand: integer('brand').references(() => brand.id),
  status: text('status').notNull().default('draft'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const productCategory = pgTable('product_category', {
  product: integer('product').references(() => product.id),
  category: integer('category').references(() => category.id),
})

export const variant = pgTable('variant', {
  id: serial('id').primaryKey(),
  product: integer('product').references(() => product.id),
  sku: text('sku').notNull().unique(),
  mrp: integer('mrp').notNull(),
  sellingPrice: integer('selling_price').notNull(),
  stockQuantity: integer('stock_quantity').notNull(),
  images: jsonb('images').array().$type<{
    url: string
    color: string
    size: string
  }>(),
  attributes: jsonb('attributes').default({}),
  weight: integer('weight'),
  barcode: text('barcode'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const paymentStatus = [
  'pending',
  'paid',
  'failed',
  'refunded',
] as const

export const order = pgTable('order', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => user.id),
  totalAmount: integer('total_amount').notNull(),
  status: text('status', { enum: orderStatus }).notNull().default('pending'),
  shippingCost: integer('shipping_cost').notNull().default(0),
  taxAmount: integer('tax_amount').notNull().default(0),
  paymentStatus: text('payment_status', { enum: paymentStatus }).notNull().default('pending'),
  shippingAddressSnapshot: jsonb('shipping_address_snapshot'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const orderItem = pgTable('order_item', {
  id: serial('id').primaryKey(),
  // name of the product
  name: text('name').notNull(),
  orderId: integer('order_id').references(() => order.id),
  variantId: integer('variant_id').references(() => variant.id, { onDelete: 'set null' }),
  variantSnapshot: jsonb('variant_snapshot').notNull(),
  quantity: integer('quantity').notNull(),
  mrp: integer('mrp').notNull(),
  sellingPrice: integer('selling_price').notNull(),
})

export const address = pgTable('address', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => user.id),
  addressLine1: text('address_line1').notNull(),
  addressLine2: text('address_line2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
  phone: text('phone'),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})
export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => user.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const cartItem = pgTable('cart_item', {
  id: serial('id').primaryKey(),
  cartId: integer('cart_id').references(() => cart.id),
  variantId: integer('variant_id').references(() => variant.id),
  quantity: integer('quantity').notNull(),
  selectedAttributes: jsonb('selected_attributes').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

// Wishlist
export const wishlist = pgTable('wishlist', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => user.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const wishlistItem = pgTable('wishlist_item', {
  id: serial('id').primaryKey(),
  wishlistId: integer('wishlist_id').references(() => wishlist.id),
  productId: integer('product_id').references(() => product.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

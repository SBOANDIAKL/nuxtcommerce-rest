import { integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { user } from './auth'

export * from './auth'

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
  description: text('description'),
})

export const brand = pgTable('brand', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  imageUrl: text('image_url'),
  description: text('description'),
})

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  images: text('images').array(),
  brand: integer('brand').references(() => brand.id),
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
  sku: text('sku').notNull(),
  mrp: integer('mrp').notNull(),
  sellingPrice: integer('selling_price').notNull(),
  stockQuantity: integer('stock_quantity').notNull(),
  images: jsonb('images').array().$type<{
    url: string
    color: string
    size: string
  }>(),
  attributes: jsonb('attributes').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().$onUpdate(() => new Date()),
})

export const order = pgTable('order', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => user.id),
  totalAmount: integer('total_amount').notNull(),
  status: text('status').notNull(),
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
  price: integer('price').notNull(),
})

export const address = pgTable('address', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => user.id),
  addressLine1: text('address_line1').notNull(),
  addressLine2: text('address_line2'),
  city: text('city').notNull(),
  state: text('state').notNull(),
})

// CREATE TABLE ShippingMethods (
//     method_id INT PRIMARY KEY AUTO_INCREMENT,
//     method_name VARCHAR(255) NOT NULL,
//     cost DECIMAL(10, 2) NOT NULL,
//     estimated_delivery_days INT
// );

// CREATE TABLE Payments (
//     payment_id INT PRIMARY KEY AUTO_INCREMENT,
//     order_id INT NOT NULL,
//     payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     amount DECIMAL(10, 2) NOT NULL,
//     payment_method VARCHAR(50) NOT NULL, -- e.g., 'credit_card', 'paypal'
//     transaction_id VARCHAR(255) UNIQUE,
//     status VARCHAR(50) NOT NULL, -- e.g., 'completed', 'failed', 'refunded'
//     FOREIGN KEY (order_id) REFERENCES Orders(order_id)
// );

// CREATE TABLE Reviews (
//     review_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT NOT NULL,
//     user_id INT NOT NULL,
//     rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
//     comment TEXT,
//     review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (product_id) REFERENCES Products(product_id),
//     FOREIGN KEY (user_id) REFERENCES Users(user_id)
// );

export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => user.id),
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

# StockPilot product requirements document

**Version:** 1.0 (MVP)
**Product:** Single-location inventory and sales management system
**Backend:** Node.js, Express, PostgreSQL, raw SQL (`pg`)
**Authentication:** JWT and bcrypt
**Currency:** NGN

> This document describes the proposed MVP API contract, not a verified inventory of routes already implemented in the repository.

## 1. Overview

StockPilot helps small businesses manage products, suppliers, stock movements, customers, sales, and reports from one system.

### Problems

- Stock is often tracked in notebooks or spreadsheets.
- Businesses discover shortages too late.
- Sales records and inventory balances can disagree.
- Owners struggle to review revenue and inventory performance.

### MVP scope

- One business and one location.
- Two roles: `admin` and `staff`.
- Product and category management.
- Supplier and customer records.
- Audited stock receipts and adjustments.
- Sales that deduct stock atomically.
- Basic reporting and low-stock monitoring.
- Manual payment method recording, without a payment gateway.

### Out of scope

Multiple warehouses, purchase orders, payment gateway integration, full accounting, and advanced returns/refunds.

## 2. Roles and permissions

| Capability | Admin | Staff |
|---|---|---|
| Login and view own profile | Yes | Yes |
| Create and manage staff | Yes | No |
| Create/edit/archive categories | Yes | No |
| View categories | Yes | Yes |
| Create/edit/archive products | Yes | No |
| View products | Yes | Yes |
| Manage suppliers | Yes | No |
| View suppliers | Yes | Yes |
| Receive or adjust stock | Yes | No |
| View stock | Yes | Yes |
| Create/update customers | Yes | Yes |
| Record and view sales | Yes | Yes |
| Void sales | Yes | No |
| View dashboard and reports | Yes | No |

**Security rules:** Authentication must run before authorization. Public registration must not permit users to select `admin`; staff creation should be admin-controlled. Keep the database default role as `staff`. The admin seed script must explicitly insert role `admin`. Existing seeded staff records need a verified manual role update; `ON CONFLICT DO NOTHING` does not promote them.

## 3. Data model

Nine planned tables:

| Table | Purpose |
|---|---|
| `users` | Staff/admin identities and status |
| `categories` | Product categories |
| `products` | SKU, category, prices, current stock, reorder level |
| `suppliers` | Supplier contact details |
| `product_suppliers` | Many-to-many product/supplier links |
| `customers` | Optional customer records |
| `sales` | Sale header, cashier, customer, total, status, payment method |
| `sale_items` | Product, quantity, historical unit price and subtotal |
| `stock_movements` | Auditable stock changes, reasons, actor, references |

Use UUID primary keys. A category has many products; a sale has many sale items; products have many stock movements; products and suppliers have a many-to-many relationship.

**Inventory invariant:** Current stock must never become negative. Every change to stock must have a corresponding `stock_movements` entry committed in the same database transaction. `quantity_change` cannot be zero.

## 4. API conventions

**Base path:** `/api/v1`
**Protected request:** `Authorization: Bearer <token>`
**Content type:** `application/json`

Status codes: `200` success, `201` created, `400` invalid request, `401` unauthenticated, `403` forbidden, `404` not found, `409` conflict, `422` business validation error, `500` server error.

Example error:

```json
{
  "success": false,
  "message": "Insufficient stock",
  "details": { "available": 5, "requested": 10 }
}
```

All inputs must be validated. Use parameterized SQL, whitelist sortable fields, and never expose password hashes or internal database errors.

## 5. Endpoint catalog

### 5.1 Authentication (5)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/register` | Admin | Create staff account |
| POST | `/api/login` | Public | Obtain JWT |
| GET | `/api/me` | apienticated | Current user |
| PATCH | `/api/change-password` | Authenticated | Change own password |
| POST | `/api/logout` | Authenticated | End client session |

Example registration:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "StrongPassword123!"
}
```

Role is assigned server-side as `staff`.

Example login request:

```json
{ "email": "john@example.com", "password": "StrongPassword123!" }
```

Example response:

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user-uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "staff"
  }
}
```

With stateless JWTs, logout only discards the client token unless token revocation or session tracking is added.

### 5.2 User management (5)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/users` | Admin | List staff |
| GET | `/users/:id` | Admin | User details |
| PATCH | `/users/:id` | Admin | Update staff details |
| PATCH | `/users/:id/status` | Admin | Activate/deactivate |
<!-- | DELETE | `/users/:id` | Admin | Soft-delete/deactivate account | -->

Avoid hard deletion when historical sales refer to the user. Disabled accounts must not continue to authenticate or use previously issued tokens if the server checks current account status.

### 5.3 Categories (5)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/categories` | Admin | Create category |
| GET | `/categories` | Admin, Staff | List categories |
| GET | `/categories/:id` | Admin, Staff | Category details |
| PATCH | `/categories/:id` | Admin | Edit category |
| DELETE | `/categories/:id` | Admin | Delete category if permitted |

Example create:

```json
{ "name": "Electronics", "description": "Electronic devices and accessories" }
```

Category names must be unique and nonempty. Do not delete a category with products without a defined reassignment policy.

### 5.4 Products (6)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/products` | Admin | Create product |
| GET | `/products` | Admin, Staff | List/filter products |
| GET | `/products/:id` | Admin, Staff | Product details |
| PATCH | `/products/:id` | Admin | Update metadata/prices |
| DELETE | `/products/:id` | Admin | Archive product |
| GET | `/products/low-stock` | Admin, Staff | Low-stock products |

Example create:

```json
{
  "name": "Samsung Galaxy A15",
  "sku": "SAM-A15-001",
  "categoryId": "category-uuid",
  "description": "Samsung smartphone",
  "costPrice": 150000,
  "sellingPrice": 185000,
  "reorderLevel": 5
}
```

New products start with zero stock; opening stock is received via inventory. SKU is unique, prices cannot be negative, and ordinary product updates cannot directly change stock quantity. Archive products that have sales history.

**Routing note:** Declare `/products/low-stock` before `/products/:id` to avoid interpreting `low-stock` as an ID.

### 5.5 Suppliers (7)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/suppliers` | Admin | Create supplier |
| GET | `/suppliers` | Admin, Staff | List suppliers |
| GET | `/suppliers/:id` | Admin, Staff | Supplier details |
| PATCH | `/suppliers/:id` | Admin | Update supplier |
| DELETE | `/suppliers/:id` | Admin | Archive supplier |
| POST | `/products/:id/suppliers` | Admin | Associate supplier with product |
| DELETE | `/products/:id/suppliers/:supplierId` | Admin | Remove association |

Example create:

```json
{
  "name": "ABC Wholesale Ltd",
  "email": "sales@abc.example",
  "phone": "08012345678",
  "address": "Lagos, Nigeria"
}
```

### 5.6 Inventory (6)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/inventory` | Admin, Staff | Current balances |
| GET | `/inventory/low-stock` | Admin, Staff | Low-stock items |
| POST | `/inventory/stock-in` | Admin | Receive stock |
| POST | `/inventory/adjustments` | Admin | Adjust stock |
| GET | `/inventory/movements` | Admin | Movement history |
| GET | `/inventory/movements/:productId` | Admin | Product movements |

Stock receipt:

```json
{
  "productId": "product-uuid",
  "quantity": 20,
  "reason": "New supplier delivery"
}
```

Stock adjustment:

```json
{
  "productId": "product-uuid",
  "quantityChange": -3,
  "reason": "Three damaged units"
}
```

Stock-in quantity must be positive. Adjustment quantity must be nonzero and cannot make stock negative. Write stock balance and movement within one transaction; record actor and timestamp. Use row locking or a conditional atomic update for concurrency safety.

### 5.7 Customers (5)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/customers` | Admin, Staff | Create customer |
| GET | `/customers` | Admin, Staff | List customers |
| GET | `/customers/:id` | Admin, Staff | Customer details |
| PATCH | `/customers/:id` | Admin, Staff | Update customer |
| DELETE | `/customers/:id` | Admin | Archive customer |

Example create:

```json
{ "name": "Jane Doe", "email": "jane@example.com", "phone": "08012345678" }
```

Walk-in sales may omit `customerId`.

### 5.8 Sales (5)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/sales` | Admin, Staff | Record sale |
| GET | `/sales` | Admin, Staff | List sales |
| GET | `/sales/:id` | Admin, Staff | Sale details |
| GET | `/sales/:id/receipt` | Admin, Staff | Receipt data |
| POST | `/sales/:id/void` | Admin | Void sale and restore stock |

Example sale:

```json
{
  "customerId": "customer-uuid",
  "items": [
    { "productId": "product-uuid-1", "quantity": 2 },
    { "productId": "product-uuid-2", "quantity": 1 }
  ],
  "paymentMethod": "cash"
}
```

**Sale transaction rules:**

1. Begin PostgreSQL transaction.
2. Lock relevant product rows in a consistent order.
3. Validate active products and sufficient stock.
4. Read prices from the database; do not trust client totals.
5. Insert sale and sale items, preserving unit prices at time of sale.
6. Deduct stock and write corresponding negative stock movements.
7. Commit; roll back all operations if any step fails.

Voiding a sale must restore quantities exactly once, create reversing movements, retain history, and mark the sale voided. The MVP does not implement partial refunds.

### 5.9 Dashboard and reports (5)

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/dashboard/summary` | Admin | Overview metrics |
| GET | `/reports/sales` | Admin | Sales report |
| GET | `/reports/top-products` | Admin | Best-selling products |
| GET | `/reports/low-stock` | Admin | Low-stock report |
| GET | `/reports/inventory-value` | Admin | Inventory valuation |

Example dashboard response (illustrative figures):

```json
{
  "totalProducts": 120,
  "totalCustomers": 45,
  "totalSales": 230,
  "totalRevenue": 2500000,
  "lowStockProducts": 8,
  "inventoryValue": 4200000
}
```

Exclude voided sales from revenue. For MVP, value stock using current cost price times current quantity; this is not FIFO or weighted-average accounting.

### 5.10 Search and filtering (query parameters, no additional endpoints)

```http
GET /api/v1/products?search=samsung
GET /api/v1/products?categoryId=uuid
GET /api/v1/products?sortBy=price&order=asc
GET /api/v1/sales?startDate=2026-11-01&endDate=2026-11-16
GET /api/v1/products?page=1&limit=20
```

Validate pagination, dates, and sort keys. The product `sortBy=price` example must map to an actual allowed column such as `selling_price`.

## 6. Endpoint count

| Module | Count |
|---|---:|
| Authentication | 5 |
| Users | 5 |
| Categories | 5 |
| Products | 6 |
| Suppliers | 7 |
| Inventory | 6 |
| Customers | 5 |
| Sales | 5 |
| Dashboard and reports | 5 |
| **Total** | **49** |

## 7. Implementation roadmap

| Phase | Work | Status based on conversation |
|---|---|---|
| 1 | Database schema and connection | Reported complete |
| 2 | Admin seed | Implemented; verify existing role and argument fix |
| 3 | Registration and login | Reported complete |
| 4 | Authentication/authorization | In progress |
| 5 | User management | Pending |
| 6 | Categories CRUD | Pending |
| 7 | Products CRUD | Pending |
| 8 | Suppliers | Pending |
| 9 | Inventory | Pending |
| 10 | Customers | Pending |
| 11 | Sales | Pending |
| 12 | Dashboard/reports | Pending |
| 13 | Testing/API docs | Pending |
| 14 | Frontend | Pending |

These statuses are not based on a fresh repository inspection.

## 8. Acceptance criteria

- [ ] Staff cannot use admin-only endpoints.
- [ ] Public input cannot grant admin privileges.
- [ ] Admin seed creates an admin, not a staff account.
- [ ] Disabled users cannot continue accessing protected routes.
- [ ] Category names and SKUs are unique.
- [ ] Products cannot have negative stock.
- [ ] Every stock change is auditable.
- [ ] Concurrent sales cannot oversell inventory.
- [ ] Failed sales do not change inventory or persist partial records.
- [ ] Sale items preserve historical selling prices.
- [ ] Voids restore stock exactly once.
- [ ] Archived records do not break historical sales.
- [ ] Reports handle voided sales correctly.
- [ ] SQL is parameterized and inputs are validated.
- [ ] Authentication, authorization, inventory, and sales have automated tests.

## 9. Immediate next steps

1. Verify the admin's role in PostgreSQL and correct the seed script's extra parameter.
2. Confirm authentication middleware attaches a trusted `req.user` with current role and account status.
3. Test `401` for unauthenticated requests and `403` for staff on admin routes.
4. Implement user management, then category CRUD.

Keep the initial release focused. More advanced modules can follow once inventory and sales transactions are reliable.

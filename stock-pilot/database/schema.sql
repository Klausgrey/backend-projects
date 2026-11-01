-- Active: 1791226795682@@127.0.0.1@5432@stock_pilot
create DATABASE stock_pilot

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'staff',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_user_role CHECK (role IN ('admin', 'staff'))
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    category_id UUID NOT NULL REFERENCES categories (id),
    name VARCHAR(150) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE, -- product unique identifier
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    low_stock_threshold INT NOT NULL DEFAULT 5,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ---
    CONSTRAINT check_product_price CHECK (price >= 0),
    CONSTRAINT check_stock_quantity CHECK (stock_quantity >= 0),
    CONSTRAINT check_low_stock_threshold CHECK (low_stock_threshold >= 0)
);

CREATE TABLE IF NOT EXISTS suppliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_suppliers (
    product_id UUID NOT NULL REFERENCES products (id),
    supplier_id UUID NOT NULL REFERENCES suppliers (id),
    PRIMARY KEY (product_id, supplier_id)
);

CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    customer_id UUID REFERENCES customers (id),
    created_by UUID NOT NULL REFERENCES users (id),
    total_amount NUMERIC(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    cancelled_at TIMESTAMPTZ,
    ----
    CONSTRAINT check_sale_amount CHECK (total_amount >= 0),
    CONSTRAINT check_sale_status CHECK (
        status IN ('completed', 'cancelled')
    )
);

CREATE TABLE IF NOT EXISTS sale_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sale_id UUID NOT NULL REFERENCES sales (id),
    product_id UUID NOT NULL REFERENCES products (id),
    quantity INT NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL,
    CONSTRAINT check_sale_quantity CHECK (quantity > 0),
    CONSTRAINT check_unit_price CHECK (unit_price >= 0),
    CONSTRAINT check_subtotal CHECK (subtotal >= 0),
    CONSTRAINT unique_sale_product UNIQUE (sale_id, product_id)
);

CREATE TABLE IF NOT EXISTS stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    product_id UUID NOT NULL REFERENCES products (id),
    performed_by UUID NOT NULL REFERENCES users (id),
    sale_item_id UUID REFERENCES sale_items (id),
    supplier_id UUID REFERENCES suppliers (id),
    movement_type VARCHAR(20) NOT NULL,
    quantity_change INT NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_movement_type CHECK (
        movement_type IN (
            'initial',
            'restock',
            'sale',
            'adjustment',
            'cancellation'
        )
    ),
    CONSTRAINT check_quantity_change CHECK (quantity_change != 0)
);
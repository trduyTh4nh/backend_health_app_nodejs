-- người dùng
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    role INTEGER
);

-- bệnh viện
CREATE TABLE hospital (
    id_hospital SERIAL PRIMARY KEY,
    name VARCHAR (200) NOT NULL,
    address VARCHAR(200),
    phone CHAR(12),
    craete_date TIMESTAMP,
    contact_information VARCHAR(200)
)

-- hãng thuốc
CREATE TABLE brand (
    id_brand SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    phone char(12),
    email VARCHAR(100),
    description VARCHAR(500),
    representative VARCHAR(50) NOT NULL, -- người đại diện
    website VARCHAR(200)
)

-- loại thuốc
CREATE TABLE drug_category (
    id_drug SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    create_date TIMESTAMP
)

-- hồ sơ
CREATE TABLE profile (
    id_resume SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    height INTEGER,
    weight NUMERIC(5, 2),
    age INTEGER,
    gender INTEGER,
    address VARCHAR(200),
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
)

-- thông báo
CREATE TABLE notification(
    id_notify SERIAL PRIMARY KEY,
    content VARCHAR(400) NOT NULL,
    TIME TIMESTAMP NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
)

-- đơn thuốc 
CREATE TABLE drug_application(
    id SERIAL PRIMARY KEY,
    created_date TIMESTAMP,
    doctor_name VARCHAR(50),
    status VARCHAR(20),
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
)

-- thuốc
CREATE TABLE drug (
    id_drug SERIAL PRIMARY KEY,
    name VARCHAR(100),
    ingredient VARCHAR(200),
    indication VARCHAR(200),
    containdication VARCHAR(200),
    uses VARCHAR(500), -- cách dùng, 
    side_effect VARCHAR(500), -- tác dụng phụ
    production_date TIMESTAMP, -- ngày sản xuất
    price NUMERIC(10, 2) NOT NULL,
    description VARCHAR(500),
    code VARCHAR(100),
    unit VARCHAR(50), -- đơn vị
    id_brand INTEGER NOT NULL, -- id hãng thuốc 
    id_cate INTEGER NOT NULL, -- id loại thuốc
    FOREIGN KEY (id_brand) REFERENCES brand(id_brand),
    FOREIGN KEY (id_cate) REFERENCES drug_category(id_drug)
)
-- giỏ thuốc

CREATE TABLE drug_cart (
    id_cart SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    create_date TIMESTAMP NOT NULL,
    total_price NUMERIC(10, 2) NOT NULL,
    id_user INTEGER NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
)


-- cart detail
CREATE TABLE cart_detail (
    id_cart_detail SERIAL PRIMARY KEY,
    id_drug INTEGER NOT NULL,
    id_cart INTEGER NOT NULL,
    date_add TIMESTAMP NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (id_cart) REFERENCES drug_cart(id_cart),
    FOREIGN KEY (id_drug) REFERENCES drug(id_drug)
);

-- Đơn thuốc chi tiết
CREATE TABLE drug_application_detail (
    id_app_detail SERIAL PRIMARY KEY,
    id_drug INTEGER NOT NULL,
    id_drug_application INTEGER NOT NULL,
    note VARCHAR(200), -- ghi chú của chi tiết đơn thuốc,
    time_to_use TIMESTAMP NOT NULL,
    quantity_used INTEGER ,
    FOREIGN KEY (id_drug) REFERENCES drug(id_drug),
    FOREIGN KEY (id_drug_application) REFERENCES drug_application(id)
);
-- Lịch uống thuốc 
CREATE TABLE schedule (
    id_schedule SERIAL PRIMARY KEY,
    id_drug_application INTEGER NOT NULL,
    id_user INTEGER NOT NULL,
    status BOOLEAN,
    FOREIGN KEY (id_drug_application) REFERENCES drug_application(id),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
)


-- Chi tiết lịch uống thuốc
CREATE TABLE schedule_detail (
    id_schedule_detail SERIAL PRIMARY KEY,
    id_app_detail INTEGER NOT NULL,
    id_schedule INTEGER NOT NULL,
    status BOOLEAN,
    quantity_used INTEGER,
    FOREIGN KEY (id_app_detail) REFERENCES drug_application_detail(id_app_detail),
    FOREIGN KEY (id_schedule) REFERENCES schedule(id_schedule)
)

-- hóa đơn
CREATE TABLE invoice (
    id_invoice SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    creaet_date TIMESTAMP,
    total_price NUMERIC(10, 2) NOT NULL,
    status BOOLEAN,
    notes VARCHAR(500),
    FOREIGN KEY (id_user) REFERENCES users(id_user) 
)

-- chi tiết hóa đơn 
CREATE TABLE invoice_detail (
    id_invoice_detail SERIAL PRIMARY KEY,
    id_drug INTEGER NOT NULL,
    quantity INTEGER,
    notes VARCHAR(100),
    id_invoice INTEGER NOT NULL,
    FOREIGN KEY (id_invoice) REFERENCES invoice(id_invoice)
)

-- Thanh toán 
CREATE TABLE payment (
    id_payment SERIAL PRIMARY KEY,
    date_pay TIMESTAMP,
    id_invoice INTEGER NOT NULL,
    status BOOLEAN,
    notes VARCHAR(300),
    total_money NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (id_invoice) REFERENCES invoice (id_invoice)
)

DELETE FROM users WHERE email = 'tttranduy999@gmail.com'

DELETE FROM users WHERE email = 'quangrain2014@gmail.com'



SELECT * FROM users WHERE email = 'quangrain2014@gmail.com'


SELECT * FROM profile


SELECT * FROM invoice
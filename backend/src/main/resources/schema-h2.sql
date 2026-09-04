-- Sarovar SmartStay H2 In-Memory Schema & Initial Seed
-- For zero-friction execution & demo

-- 1. Roles
INSERT INTO roles (id, name) VALUES (1, 'ROLE_ADMIN') ON CONFLICT DO NOTHING;
INSERT INTO roles (id, name) VALUES (2, 'ROLE_RECEPTIONIST') ON CONFLICT DO NOTHING;
INSERT INTO roles (id, name) VALUES (3, 'ROLE_RESTAURANT_STAFF') ON CONFLICT DO NOTHING;
INSERT INTO roles (id, name) VALUES (4, 'ROLE_HOUSEKEEPING') ON CONFLICT DO NOTHING;
INSERT INTO roles (id, name) VALUES (5, 'ROLE_CUSTOMER') ON CONFLICT DO NOTHING;

-- 2. Users (Passwords: Admin@123, Reception@123, Restaurant@123, House@123, Customer@123)
-- BCrypt encoded hash: $2a$10$8.UnVuG9HHg7ke1xH04xO08d9TjK/0rZ0zN0YlV7j.Z9cK/g1.wye or $2a$10$7R.x7V0rJ3kG9LzW2qR1.e5m8sN7bV6cX5yZ4wV3uT2sR1qP0oN9m
INSERT INTO users (id, username, email, password, full_name, phone, active) VALUES
(1, 'admin', 'admin@sarovar.com', '$2a$10$8.UnVuG9HHg7ke1xH04xO08d9TjK/0rZ0zN0YlV7j.Z9cK/g1.wye', 'Rajesh Sharma (Admin)', '+91 9823011223', TRUE),
(2, 'reception', 'reception@sarovar.com', '$2a$10$8.UnVuG9HHg7ke1xH04xO08d9TjK/0rZ0zN0YlV7j.Z9cK/g1.wye', 'Priya Patel (Receptionist)', '+91 9823022334', TRUE),
(3, 'restaurant', 'restaurant@sarovar.com', '$2a$10$8.UnVuG9HHg7ke1xH04xO08d9TjK/0rZ0zN0YlV7j.Z9cK/g1.wye', 'Vikram Singh (Head Chef)', '+91 9823033445', TRUE),
(4, 'housekeeping', 'housekeeping@sarovar.com', '$2a$10$8.UnVuG9HHg7ke1xH04xO08d9TjK/0rZ0zN0YlV7j.Z9cK/g1.wye', 'Sunita Jadhav (Housekeeping Lead)', '+91 9823044556', TRUE),
(5, 'customer', 'customer@sarovar.com', '$2a$10$8.UnVuG9HHg7ke1xH04xO08d9TjK/0rZ0zN0YlV7j.Z9cK/g1.wye', 'Amit Kumar (Valued Guest)', '+91 9823055667', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)
ON CONFLICT DO NOTHING;

-- 3. Room Types
INSERT INTO room_types (id, name, description, base_price, capacity, bed_type, amenities) VALUES
(1, 'Standard Room', 'Comfortable AC room with essentials for business travelers in Boisar MIDC.', 2500.00, 2, 'Queen Bed', 'AC, High-Speed WiFi, LED TV, Intercom, Work Desk'),
(2, 'Deluxe Room', 'Spacious AC room with garden/city view and premium toiletries.', 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV, Mini Fridge, Tea/Coffee Maker, Room Service'),
(3, 'Premium Room', 'Luxury accommodation featuring plush seating, bath tub and MIDC view.', 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV, Mini Bar, Safe, Bathtub, Express Laundry'),
(4, 'Family Room', 'Interconnected spacious room suitable for families visiting Boisar.', 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 LED TVs, Dining Table, Extra Wardrobe, Kids Amenities'),
(5, 'Executive Suite', 'Top-tier luxury suite with separate living area, balcony and VIP hospitality.', 7500.00, 3, 'King Bed', 'AC, Premium WiFi, Jacuzzi, Balcony, Private Dining, Complimentary Breakfast')
ON CONFLICT DO NOTHING;

-- 4. Rooms (35 Rooms)
INSERT INTO rooms (id, room_number, floor, room_type_id, price_per_night, capacity, bed_type, amenities, status, housekeeping_status) VALUES
(1, '101', 1, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'AVAILABLE', 'CLEAN'),
(2, '102', 1, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'OCCUPIED', 'DIRTY'),
(3, '103', 1, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'AVAILABLE', 'CLEAN'),
(4, '104', 1, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV, Mini Fridge', 'RESERVED', 'CLEAN'),
(5, '105', 1, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV, Mini Fridge', 'AVAILABLE', 'CLEAN'),
(6, '106', 1, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'CLEANING', 'CLEANING'),
(7, '107', 1, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV, Bathtub', 'OCCUPIED', 'DIRTY'),
(8, '108', 1, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV, Bathtub', 'AVAILABLE', 'CLEAN'),
(9, '109', 1, 4, 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 TVs, Dining Table', 'AVAILABLE', 'CLEAN'),
(10, '110', 1, 5, 7500.00, 3, 'King Bed', 'AC, WiFi, Jacuzzi, Balcony', 'RESERVED', 'CLEAN'),
(11, '201', 2, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'AVAILABLE', 'CLEAN'),
(12, '202', 2, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'OCCUPIED', 'DIRTY'),
(13, '203', 2, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'AVAILABLE', 'CLEAN'),
(14, '204', 2, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV, Mini Fridge', 'AVAILABLE', 'CLEAN'),
(15, '205', 2, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'OCCUPIED', 'DIRTY'),
(16, '206', 2, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV', 'MAINTENANCE', 'INSPECTION'),
(17, '207', 2, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV', 'AVAILABLE', 'CLEAN'),
(18, '208', 2, 4, 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 TVs', 'OCCUPIED', 'DIRTY'),
(19, '209', 2, 4, 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 TVs', 'AVAILABLE', 'CLEAN'),
(20, '210', 2, 5, 7500.00, 3, 'King Bed', 'AC, WiFi, Jacuzzi, Balcony', 'AVAILABLE', 'CLEAN'),
(21, '301', 3, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'AVAILABLE', 'CLEAN'),
(22, '302', 3, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'AVAILABLE', 'CLEAN'),
(23, '303', 3, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'OCCUPIED', 'DIRTY'),
(24, '304', 3, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'AVAILABLE', 'CLEAN'),
(25, '305', 3, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'RESERVED', 'CLEAN'),
(26, '306', 3, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV', 'AVAILABLE', 'CLEAN'),
(27, '307', 3, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV', 'OCCUPIED', 'DIRTY'),
(28, '308', 3, 4, 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 TVs', 'AVAILABLE', 'CLEAN'),
(29, '309', 3, 4, 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 TVs', 'AVAILABLE', 'CLEAN'),
(30, '310', 3, 5, 7500.00, 3, 'King Bed', 'AC, WiFi, Jacuzzi, Balcony', 'OCCUPIED', 'DIRTY'),
(31, '401', 4, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'AVAILABLE', 'CLEAN'),
(32, '402', 4, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'AVAILABLE', 'CLEAN'),
(33, '403', 4, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV', 'AVAILABLE', 'CLEAN'),
(34, '404', 4, 4, 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 TVs', 'AVAILABLE', 'CLEAN'),
(35, '405', 4, 5, 7500.00, 3, 'King Bed', 'AC, WiFi, Jacuzzi, Balcony', 'AVAILABLE', 'CLEAN')
ON CONFLICT DO NOTHING;

-- 5. Customers
INSERT INTO customers (id, user_id, name, email, phone, address, id_type, id_number, number_of_visits, total_spending) VALUES
(1, 5, 'Amit Kumar', 'customer@sarovar.com', '+91 9823055667', 'Flat 402, Green Enclave, Boisar East', 'Aadhar Card', '7845-1234-9988', 5, 24500.00),
(2, NULL, 'Rohan Mehta', 'rohan.mehta@gmail.com', '+91 9811223344', 'MIDC Tarapur Industrial Area, Boisar', 'Driving License', 'MH04-2021-00987', 3, 15200.00),
(3, NULL, 'Snape Sen', 'snape.sen@tata.com', '+91 9877665544', 'Tata Steel Plant Quarter, Boisar', 'Passport', 'Z8901234', 8, 48000.00)
ON CONFLICT DO NOTHING;

-- 6. Employees
INSERT INTO employees (id, employee_code, name, designation, department, phone, email, joining_date, shift, status) VALUES
(1, 'EMP-101', 'Rajesh Sharma', 'General Manager', 'Management', '+91 9823011223', 'admin@sarovar.com', '2020-01-15', 'Morning', 'ACTIVE'),
(2, 'EMP-102', 'Priya Patel', 'Head Receptionist', 'Reception', '+91 9823022334', 'reception@sarovar.com', '2021-03-10', 'Morning', 'ACTIVE'),
(3, 'EMP-103', 'Vikram Singh', 'Executive Head Chef', 'Kitchen', '+91 9823033445', 'restaurant@sarovar.com', '2019-11-20', 'Morning', 'ACTIVE'),
(4, 'EMP-104', 'Sunita Jadhav', 'Housekeeping Lead', 'Housekeeping', '+91 9823044556', 'housekeeping@sarovar.com', '2021-02-18', 'Morning', 'ACTIVE'),
(5, 'EMP-105', 'Ganesh Thorat', 'Senior Electrician', 'Maintenance', '+91 9823066554', 'ganesh.maint@sarovar.com', '2021-09-12', 'Rotational', 'ACTIVE'),
(6, 'EMP-106', 'Mahesh Shinde', 'Security Chief', 'Security', '+91 9823011122', 'security@sarovar.com', '2020-04-05', 'Rotational', 'ACTIVE')
ON CONFLICT DO NOTHING;

-- 7. Menu Categories
INSERT INTO menu_categories (id, name, description) VALUES
(1, 'Starters', 'Crispy vegetarian starters & tandoori delights'),
(2, 'Chinese Rice & Noodles', 'Authentic Hakka, Schezwan & Gravy Noodles'),
(3, 'Pizza', 'Freshly baked veg pizzas with mozzarella'),
(4, 'Cold Beverages', 'Chass, Lassi, Soft Drinks & Mocktails'),
(5, 'Juices (Seasonal)', 'Freshly squeezed fruit juices'),
(6, 'Milk Shakes', 'Thick fruit & chocolate shakes'),
(7, 'Ice Cream', 'Scoops, Sundaes & Kulfi'),
(8, 'Punjabi Dishes', 'Rich gravy curries & dal specials'),
(9, 'Punjabi Special', 'Sarovar signature Paneer & Kaju dishes'),
(10, 'Hot Beverages', 'Tea, Filter Coffee, Nescafe & Milk'),
(11, 'Snacks & South Indian', 'Idli, Dosa, Vada, Upma & Misal'),
(12, 'Uttappa & Pav Bhaji', 'Ghee Uttappa & Special Pav Bhaji'),
(13, 'Tandoori Roti & Soups', 'Fresh Naan, Paratha, Roti & Hot Soups')
ON CONFLICT DO NOTHING;

-- 8. Menu Items (Extracted from Sarovar Pure Veg Menu)
INSERT INTO menu_items (id, name, category_id, price, description, is_available, preparation_time_minutes, is_vegetarian) VALUES
(1, 'Paneer Tikka Fry', 1, 200.00, 'Marinated paneer cubes pan-fried with spices', TRUE, 20, TRUE),
(2, 'Hara Bhara Kabab', 1, 200.00, 'Spinach & green pea fried patties served with green chutney', TRUE, 15, TRUE),
(3, 'Veg Manchurian', 1, 190.00, 'Crispy vegetable dumplings in spicy garlic soy sauce', TRUE, 18, TRUE),
(4, 'Paneer Chilly', 1, 200.00, 'Indo-Chinese paneer tossed with capsicum & green chillies', TRUE, 20, TRUE),
(5, 'Veg Hakka Noodles', 2, 190.00, 'Wok-tossed noodles with shredded fresh vegetables', TRUE, 15, TRUE),
(6, 'Veg Schezwan Noodles', 2, 195.00, 'Spicy wok-tossed noodles in signature Schezwan sauce', TRUE, 15, TRUE),
(7, 'Veg Pizza', 3, 140.00, 'Classic 8-inch pizza topped with capsicum, onion & tomato', TRUE, 20, TRUE),
(8, 'Cheese Pizza', 3, 160.00, 'Loaded double mozzarella cheese pizza', TRUE, 20, TRUE),
(9, 'Chass (Butter Milk)', 4, 32.00, 'Chilled spiced buttermilk with roasted cumin & coriander', TRUE, 5, TRUE),
(10, 'Mango Lassi', 4, 75.00, 'Thick sweet lassi blended with Alphonso mango pulp', TRUE, 5, TRUE),
(11, 'Cold Coffee', 6, 100.00, 'Rich chilled espresso blended with thick milk & ice cream', TRUE, 10, TRUE),
(12, 'Dal Tadka', 8, 130.00, 'Lentils tempered twice with double ghee garlic tadka', TRUE, 15, TRUE),
(13, 'Paneer Tikka Masala', 9, 182.00, 'Chargrilled paneer tikka cooked in rich tomato butter gravy', TRUE, 20, TRUE),
(14, 'Paneer Butter Masala', 9, 180.00, 'Rich velvety paneer curry with extra butter and cream', TRUE, 20, TRUE),
(15, 'Kaju Curry', 9, 175.00, 'Whole roasted cashews simmered in rich golden gravy', TRUE, 20, TRUE),
(16, 'Special Masala Tea', 10, 35.00, 'Brewed with cardamom, ginger & fresh milk', TRUE, 5, TRUE),
(17, 'Masala Dosa', 11, 90.00, 'Crispy dosa filled with spiced potato onion bhaji', TRUE, 15, TRUE),
(18, 'Pav Bhaji', 12, 140.00, 'Boisar special spiced mashed veg curry with buttered pav', TRUE, 15, TRUE),
(19, 'Punjabi Lunch Thali', 12, 183.00, 'Complete thali: 2 Roti, Paneer Subzi, Veg Subzi, Dal, Rice, Sweet & Papad', TRUE, 20, TRUE),
(20, 'Butter Naan', 13, 45.00, 'Leavened tandoori bread brushed with butter', TRUE, 10, TRUE)
ON CONFLICT DO NOTHING;

-- 9. Inventory Items
INSERT INTO inventory (id, item_code, item_name, category, current_quantity, unit, minimum_stock_level, supplier, cost_per_unit, last_restocked, status) VALUES
(1, 'INV-101', 'Fresh Paneer', 'Dairy', 5.50, 'kg', 12.00, 'Boisar Dairy Farm', 320.00, CURRENT_DATE, 'CRITICAL'),
(2, 'INV-102', 'Basmati Rice', 'Provisions', 85.00, 'kg', 30.00, 'Sarovar Wholesalers Palghar', 110.00, CURRENT_DATE, 'NORMAL'),
(3, 'INV-103', 'Full Cream Milk', 'Dairy', 18.00, 'liters', 25.00, 'Amul Dairy Boisar Center', 66.00, CURRENT_DATE, 'LOW'),
(4, 'INV-104', 'Amul Butter', 'Dairy', 4.00, 'kg', 10.00, 'Amul Dairy Boisar Center', 540.00, CURRENT_DATE, 'LOW'),
(5, 'INV-105', 'Fresh Tomatoes', 'Vegetables', 9.00, 'kg', 20.00, 'Boisar Sabzi Mandi', 40.00, CURRENT_DATE, 'LOW')
ON CONFLICT DO NOTHING;

-- 10. Security Logs
INSERT INTO security_logs (id, username, action, ip_address, status, risk_score, details, created_at) VALUES
(1, 'admin', 'USER_LOGIN', '192.168.1.10', 'SUCCESS', 0, 'Admin session authenticated successfully', CURRENT_TIMESTAMP),
(2, 'reception', 'USER_LOGIN', '192.168.1.12', 'SUCCESS', 0, 'Front desk staff login', CURRENT_TIMESTAMP),
(3, 'unknown_user', 'FAILED_LOGIN_ATTEMPT', '203.0.113.45', 'SUSPICIOUS', 85, 'Rate limit triggered - 3 consecutive failures', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

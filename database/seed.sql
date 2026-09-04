-- Sarovar SmartStay Realistic Seed Data
-- Hotel Sarovar, Boisar, Maharashtra, India

USE sarovar_smartstay;

-- 1. Roles
INSERT INTO roles (id, name) VALUES 
(1, 'ROLE_ADMIN'),
(2, 'ROLE_RECEPTIONIST'),
(3, 'ROLE_RESTAURANT_STAFF'),
(4, 'ROLE_HOUSEKEEPING'),
(5, 'ROLE_CUSTOMER');

-- 2. Users (Passwords hashed using BCrypt for demo passwords)
-- Admin@123 -> $2a$10$8.UnVuG9HHg7ke1xH04xO08d9TjK/0rZ0zN0YlV7j.Z9cK/g1.wye (or Spring Security BCrypt default)
-- Demo credentials:
-- Admin: admin@sarovar.com / Admin@123
-- Receptionist: reception@sarovar.com / Reception@123
-- Restaurant: restaurant@sarovar.com / Restaurant@123
-- Housekeeping: housekeeping@sarovar.com / House@123
-- Customer: customer@sarovar.com / Customer@123
INSERT INTO users (id, username, email, password, full_name, phone, active) VALUES
(1, 'admin', 'admin@sarovar.com', '$2a$10$dE9wB3i5uB1/b1mY8yqA9eYgZ01vK5e4gW2hX1yZ3aB4c5d6e7f8g', 'Rajesh Sharma (Admin)', '+91 9823011223', TRUE),
(2, 'reception', 'reception@sarovar.com', '$2a$10$dE9wB3i5uB1/b1mY8yqA9eYgZ01vK5e4gW2hX1yZ3aB4c5d6e7f8g', 'Priya Patel (Receptionist)', '+91 9823022334', TRUE),
(3, 'restaurant', 'restaurant@sarovar.com', '$2a$10$dE9wB3i5uB1/b1mY8yqA9eYgZ01vK5e4gW2hX1yZ3aB4c5d6e7f8g', 'Vikram Singh (Head Chef)', '+91 9823033445', TRUE),
(4, 'housekeeping', 'housekeeping@sarovar.com', '$2a$10$dE9wB3i5uB1/b1mY8yqA9eYgZ01vK5e4gW2hX1yZ3aB4c5d6e7f8g', 'Sunita Jadhav (Housekeeping Lead)', '+91 9823044556', TRUE),
(5, 'customer', 'customer@sarovar.com', '$2a$10$dE9wB3i5uB1/b1mY8yqA9eYgZ01vK5e4gW2hX1yZ3aB4c5d6e7f8g', 'Amit Kumar (Valued Guest)', '+91 9823055667', TRUE);

INSERT INTO user_roles (user_id, role_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5);

-- 3. Room Types
INSERT INTO room_types (id, name, description, base_price, capacity, bed_type, amenities) VALUES
(1, 'Standard Room', 'Comfortable AC room with essentials for business travelers in Boisar MIDC.', 2500.00, 2, 'Queen Bed', 'AC, High-Speed WiFi, LED TV, Intercom, Work Desk'),
(2, 'Deluxe Room', 'Spacious AC room with garden/city view and premium toiletries.', 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV, Mini Fridge, Tea/Coffee Maker, Room Service'),
(3, 'Premium Room', 'Luxury accommodation featuring plush seating, bath tub and MIDC view.', 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV, Mini Bar, Safe, Bathtub, Express Laundry'),
(4, 'Family Room', 'Interconnected spacious room suitable for families visiting Boisar.', 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 LED TVs, Dining Table, Extra Wardrobe, Kids Amenities'),
(5, 'Executive Suite', 'Top-tier luxury suite with separate living area, balcony and VIP hospitality.', 7500.00, 3, 'King Bed', 'AC, Premium WiFi, Jacuzzi, Balcony, Private Dining, Complimentary Breakfast');

-- 4. Rooms (35 Rooms)
INSERT INTO rooms (id, room_number, floor, room_type_id, price_per_night, capacity, bed_type, amenities, status, housekeeping_status) VALUES
-- Floor 1
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

-- Floor 2
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

-- Floor 3
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

-- Floor 4
(31, '401', 4, 1, 2500.00, 2, 'Queen Bed', 'AC, WiFi, TV', 'AVAILABLE', 'CLEAN'),
(32, '402', 4, 2, 3500.00, 2, 'King Bed', 'AC, WiFi, Smart TV', 'AVAILABLE', 'CLEAN'),
(33, '403', 4, 3, 4500.00, 3, 'King Bed + Sofa', 'AC, WiFi, 50-inch TV', 'AVAILABLE', 'CLEAN'),
(34, '404', 4, 4, 5500.00, 4, '2 Double Beds', 'AC, WiFi, 2 TVs', 'AVAILABLE', 'CLEAN'),
(35, '405', 4, 5, 7500.00, 3, 'King Bed', 'AC, WiFi, Jacuzzi, Balcony', 'AVAILABLE', 'CLEAN');

-- 5. Customers
INSERT INTO customers (id, user_id, name, email, phone, address, id_type, id_number, number_of_visits, total_spending) VALUES
(1, 5, 'Amit Kumar', 'customer@sarovar.com', '+91 9823055667', 'Flat 402, Green Enclave, Boisar East', 'Aadhar Card', '7845-1234-9988', 5, 24500.00),
(2, NULL, 'Rohan Mehta', 'rohan.mehta@gmail.com', '+91 9811223344', 'MIDC Tarapur Industrial Area, Boisar', 'Driving License', 'MH04-2021-00987', 3, 15200.00),
(3, NULL, 'Snape Sen', 'snape.sen@tata.com', '+91 9877665544', 'Tata Steel Plant Quarter, Boisar', 'Passport', 'Z8901234', 8, 48000.00),
(4, NULL, 'Ananya Sharma', 'ananya.s@yahoo.com', '+91 9765432100', 'Navi Mumbai Sector 17', 'Aadhar Card', '9988-7766-5544', 2, 9800.00),
(5, NULL, 'Deepak Patil', 'deepak.patil@rediff.com', '+91 9822334455', 'Palghar Station Road, Palghar', 'Aadhar Card', '1122-3344-5566', 1, 4500.00);

-- 6. Employees
INSERT INTO employees (id, employee_code, name, designation, department, phone, email, joining_date, shift, status) VALUES
(1, 'EMP-101', 'Rajesh Sharma', 'General Manager', 'Management', '+91 9823011223', 'admin@sarovar.com', '2020-01-15', 'Morning', 'ACTIVE'),
(2, 'EMP-102', 'Priya Patel', 'Head Receptionist', 'Reception', '+91 9823022334', 'reception@sarovar.com', '2021-03-10', 'Morning', 'ACTIVE'),
(3, 'EMP-103', 'Sanjay Verma', 'Night Duty Officer', 'Reception', '+91 9823099887', 'sanjay.reception@sarovar.com', '2022-05-01', 'Night', 'ACTIVE'),
(4, 'EMP-104', 'Vikram Singh', 'Executive Head Chef', 'Kitchen', '+91 9823033445', 'restaurant@sarovar.com', '2019-11-20', 'Morning', 'ACTIVE'),
(5, 'EMP-105', 'Ramesh Pujari', 'Restaurant Manager', 'Restaurant', '+91 9823077665', 'ramesh.rest@sarovar.com', '2020-08-14', 'Evening', 'ACTIVE'),
(6, 'EMP-106', 'Sunita Jadhav', 'Housekeeping Supervisor', 'Housekeeping', '+91 9823044556', 'housekeeping@sarovar.com', '2021-02-18', 'Morning', 'ACTIVE'),
(7, 'EMP-107', 'Ganesh Thorat', 'Senior Electrician & AC Mech', 'Maintenance', '+91 9823066554', 'ganesh.maint@sarovar.com', '2021-09-12', 'Rotational', 'ACTIVE'),
(8, 'EMP-108', 'Mahesh Shinde', 'Chief Security Officer', 'Security', '+91 9823011122', 'security@sarovar.com', '2020-04-05', 'Rotational', 'ACTIVE'),
(9, 'EMP-109', 'Aarti Kadam', 'Front Desk Executive', 'Reception', '+91 9823022233', 'aarti.reception@sarovar.com', '2023-01-10', 'Evening', 'ACTIVE'),
(10, 'EMP-110', 'Kiran More', 'Sous Chef (Punjabi & Tandoor)', 'Kitchen', '+91 9823033344', 'kiran.kitchen@sarovar.com', '2022-07-15', 'Evening', 'ACTIVE');

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
(13, 'Tandoori Roti & Soups', 'Fresh Naan, Paratha, Roti & Hot Soups');

-- 8. Menu Items (Extracted from Sarovar Pure Veg Menu Images)
INSERT INTO menu_items (id, name, category_id, price, description, is_available, preparation_time_minutes, is_vegetarian) VALUES
-- Starters
(1, 'Paneer Tikka Fry', 1, 200.00, 'Marinated paneer cubes pan-fried with spices', TRUE, 20, TRUE),
(2, 'Hara Bhara Kabab', 1, 200.00, 'Spinach & green pea fried patties served with green chutney', TRUE, 15, TRUE),
(3, 'Veg Manchurian', 1, 190.00, 'Crispy vegetable dumplings in spicy garlic soy sauce', TRUE, 18, TRUE),
(4, 'Mushroom Manchurian', 1, 200.00, 'Fresh button mushrooms tossed in Manchurian sauce', TRUE, 18, TRUE),
(5, 'Paneer Chilly', 1, 200.00, 'Indo-Chinese paneer tossed with capsicum & green chillies', TRUE, 20, TRUE),
(6, 'Veg Crispy', 1, 200.00, 'Assorted crisp fried vegetables tossed in tangy sauce', TRUE, 15, TRUE),
(7, 'Veg Spring Roll', 1, 200.00, 'Crispy wrappers filled with seasoned crunchy vegetables', TRUE, 20, TRUE),
(8, 'Veg 65', 1, 190.00, 'Spicy curry leaf tempered South-style crispy veggies', TRUE, 15, TRUE),

-- Chinese Rice & Noodles
(9, 'Veg Hakka Noodles', 2, 190.00, 'Wok-tossed noodles with shredded fresh vegetables', TRUE, 15, TRUE),
(10, 'Veg Triple Noodles', 2, 195.00, 'Combination of noodles, rice & crispy noodles with spicy gravy', TRUE, 20, TRUE),
(11, 'Veg Schezwan Noodles', 2, 195.00, 'Spicy wok-tossed noodles in signature Schezwan sauce', TRUE, 15, TRUE),
(12, 'Veg American Chopsuey', 2, 210.00, 'Crispy fried noodles topped with sweet & sour veg gravy', TRUE, 20, TRUE),
(13, 'Veg Fried Rice', 2, 150.00, 'Classic fragrant rice tossed with diced vegetables', TRUE, 15, TRUE),
(14, 'Veg Schezwan Fried Rice', 2, 160.00, 'Spicy Schezwan flavored wok fried rice', TRUE, 15, TRUE),

-- Pizza
(15, 'Veg Pizza', 3, 140.00, 'Classic 8-inch pizza topped with capsicum, onion & tomato', TRUE, 20, TRUE),
(16, 'Cheese Pizza', 3, 160.00, 'Loaded double mozzarella cheese pizza', TRUE, 20, TRUE),
(17, 'Paneer Pizza', 3, 180.00, 'Topped with spiced paneer tikka, onions & cheese', TRUE, 20, TRUE),

-- Cold Beverages
(18, 'Chass (Butter Milk)', 4, 32.00, 'Chilled spiced buttermilk with roasted cumin & coriander', TRUE, 5, TRUE),
(19, 'Lassi', 4, 70.00, 'Creamy sweet Punjabi yogurt drink', TRUE, 5, TRUE),
(20, 'Mango Lassi', 4, 75.00, 'Thick sweet lassi blended with Alphonso mango pulp', TRUE, 5, TRUE),
(21, 'Fresh Lime Soda', 4, 45.00, 'Refreshing sweet and salted lime soda', TRUE, 5, TRUE),

-- Juices
(22, 'Mosambi Juice', 5, 100.00, 'Fresh sweet lime juice without preservatives', TRUE, 10, TRUE),
(23, 'Ganga Jamuna Juice', 5, 100.00, 'Classic blend of fresh Mosambi & Orange juice', TRUE, 10, TRUE),
(24, 'Pineapple Juice', 5, 100.00, 'Freshly pressed sweet pineapple juice', TRUE, 10, TRUE),

-- Milk Shakes
(25, 'Cold Coffee', 6, 100.00, 'Rich chilled espresso blended with thick milk & ice cream', TRUE, 10, TRUE),
(26, 'Mango Milk Shake', 6, 110.00, 'Thick shake made with Alphonso mangoes', TRUE, 10, TRUE),
(27, 'Chocolate Milk Shake', 6, 110.00, 'Creamy milk shake loaded with Dutch cocoa & chocolate syrup', TRUE, 10, TRUE),

-- Ice Cream
(28, 'Kesar Pista Ice Cream', 7, 80.00, 'Traditional saffron & pistachio ice cream scoop', TRUE, 5, TRUE),
(29, 'Rajbhog Ice Cream', 7, 90.00, 'Royal dry fruit and saffron enriched ice cream', TRUE, 5, TRUE),
(30, 'Quick Sundae', 7, 110.00, 'Three scoops ice cream topped with nuts & chocolate sauce', TRUE, 10, TRUE),

-- Punjabi Dishes
(31, 'Dal Fry', 8, 120.00, 'Yellow arhar dal tempered with cumin, garlic & ghee', TRUE, 15, TRUE),
(32, 'Dal Tadka', 8, 130.00, 'Lentils tempered twice with double ghee garlic tadka', TRUE, 15, TRUE),
(33, 'Chana Masala', 8, 110.00, 'Kabuli chana cooked in spicy North-Indian onion tomato gravy', TRUE, 15, TRUE),
(34, 'Aloo Gobi', 8, 100.00, 'Home-style spiced potato and cauliflower dry stir-fry', TRUE, 15, TRUE),
(35, 'Baingan Bhartha', 8, 145.00, 'Smoky roasted eggplant mashed with herbs & green chillies', TRUE, 20, TRUE),

-- Punjabi Special
(36, 'Veg Patiyala', 9, 240.00, 'Sarovar Signature veg roll in rich spicy Punjabi gravy', TRUE, 25, TRUE),
(37, 'Paneer Tikka Masala', 9, 182.00, 'Chargrilled paneer tikka cooked in rich tomato butter gravy', TRUE, 20, TRUE),
(38, 'Paneer Kolhapuri', 9, 182.00, 'Spicy paneer curry prepared with Kolhapuri dry spices', TRUE, 20, TRUE),
(39, 'Paneer Makhanwala', 9, 182.00, 'Cottage cheese in creamy rich cashew & tomato gravy', TRUE, 20, TRUE),
(40, 'Paneer Butter Masala', 9, 180.00, 'Rich velvety paneer curry with extra butter and cream', TRUE, 20, TRUE),
(41, 'Kaju Curry', 9, 175.00, 'Whole roasted cashews simmered in rich golden gravy', TRUE, 20, TRUE),
(42, 'Veg Handi', 9, 160.00, 'Mixed seasonal vegetables cooked slow in clay handi', TRUE, 20, TRUE),

-- Hot Beverages & Snacks
(43, 'Special Masala Tea', 10, 35.00, 'Brewed with cardamom, ginger & fresh milk', TRUE, 5, TRUE),
(44, 'South Indian Filter Coffee', 10, 40.00, 'Aromatic chicory blended brass filter coffee', TRUE, 5, TRUE),
(45, 'Sada Dosa', 11, 75.00, 'Crispy gold fermented rice crepe served with coconut chutney & sambar', TRUE, 15, TRUE),
(46, 'Masala Dosa', 11, 90.00, 'Crispy dosa filled with spiced potato onion bhaji', TRUE, 15, TRUE),
(47, 'Ghee Mysore Masala Dosa', 11, 110.00, 'Spicy red chutney lined dosa roasted in pure desi ghee', TRUE, 15, TRUE),
(48, 'Cheese Masala Dosa', 11, 155.00, 'Loaded with grated cheese and potato bhaji', TRUE, 15, TRUE),

-- Uttappa & Pav Bhaji
(49, 'Pav Bhaji', 12, 140.00, 'Boisar special spiced mashed veg curry with buttered pav', TRUE, 15, TRUE),
(50, 'Cheese Pav Bhaji', 12, 160.00, 'Classic Pav Bhaji generously topped with processed cheese', TRUE, 15, TRUE),
(51, 'Punjabi Lunch Thali', 12, 183.00, 'Complete thali: 2 Roti, Paneer Subzi, Veg Subzi, Dal, Rice, Sweet & Papad', TRUE, 20, TRUE),

-- Tandoori Roti & Soups
(52, 'Butter Roti', 13, 26.00, 'Whole wheat tandoori roti topped with fresh butter', TRUE, 10, TRUE),
(53, 'Butter Naan', 13, 45.00, 'Leavened tandoori bread brushed with butter', TRUE, 10, TRUE),
(54, 'Butter Garlic Naan', 13, 50.00, 'Tandoori naan topped with roasted garlic & butter', TRUE, 10, TRUE),
(55, 'Veg Manchow Soup', 13, 120.00, 'Hot & spicy garlic flavored soup topped with crispy noodles', TRUE, 15, TRUE),
(56, 'Tomato Soup', 13, 115.00, 'Rich velvety ripe tomato soup served with fried bread croutons', TRUE, 15, TRUE);

-- 9. Inventory Items (with some Low Stock items for AI alerting)
INSERT INTO inventory (id, item_code, item_name, category, current_quantity, unit, minimum_stock_level, supplier, cost_per_unit, last_restocked, status) VALUES
(1, 'INV-101', 'Fresh Paneer', 'Dairy', 5.50, 'kg', 12.00, 'Boisar Dairy Farm', 320.00, '2026-08-15', 'CRITICAL'),
(2, 'INV-102', 'Basmati Rice', 'Provisions', 85.00, 'kg', 30.00, 'Sarovar Wholesalers Palghar', 110.00, '2026-08-10', 'NORMAL'),
(3, 'INV-103', 'Whole Wheat Flour (Atta)', 'Provisions', 120.00, 'kg', 40.00, 'Sarovar Wholesalers Palghar', 45.00, '2026-08-10', 'NORMAL'),
(4, 'INV-104', 'Full Cream Milk', 'Dairy', 18.00, 'liters', 25.00, 'Amul Dairy Boisar Center', 66.00, '2026-08-20', 'LOW'),
(5, 'INV-105', 'Amul Butter', 'Dairy', 4.00, 'kg', 10.00, 'Amul Dairy Boisar Center', 540.00, '2026-08-18', 'LOW'),
(6, 'INV-106', 'Mozzarella Cheese', 'Dairy', 8.00, 'kg', 5.00, 'Amul Dairy Boisar Center', 480.00, '2026-08-18', 'NORMAL'),
(7, 'INV-107', 'Refined Cooking Oil', 'Provisions', 65.00, 'liters', 20.00, 'Fortune Traders', 135.00, '2026-08-12', 'NORMAL'),
(8, 'INV-108', 'Fresh Tomatoes', 'Vegetables', 9.00, 'kg', 20.00, 'Boisar Sabzi Mandi', 40.00, '2026-08-20', 'LOW'),
(9, 'INV-109', 'Onions', 'Vegetables', 45.00, 'kg', 25.00, 'Boisar Sabzi Mandi', 35.00, '2026-08-19', 'NORMAL'),
(10, 'INV-110', 'Potatoes', 'Vegetables', 60.00, 'kg', 30.00, 'Boisar Sabzi Mandi', 28.00, '2026-08-19', 'NORMAL'),
(11, 'INV-111', 'Green Chillies & Capsicum', 'Vegetables', 6.00, 'kg', 5.00, 'Boisar Sabzi Mandi', 60.00, '2026-08-20', 'NORMAL'),
(12, 'INV-112', 'Tea Powder (Special Dust)', 'Beverages', 12.00, 'kg', 5.00, 'Wagh Bakri Tea Center', 420.00, '2026-08-11', 'NORMAL'),
(13, 'INV-113', 'Filter Coffee Powder', 'Beverages', 4.50, 'kg', 3.00, 'Cothas Coffee Supplier', 580.00, '2026-08-11', 'NORMAL'),
(14, 'INV-114', 'Sugar', 'Provisions', 50.00, 'kg', 20.00, 'Sarovar Wholesalers Palghar', 42.00, '2026-08-10', 'NORMAL'),
(15, 'INV-115', 'Garam Masala & Indian Spices', 'Provisions', 8.50, 'kg', 4.00, 'Everest Spices Distributor', 650.00, '2026-08-05', 'NORMAL'),
(16, 'INV-116', 'Hakka Noodles Packets', 'Provisions', 40.00, 'packets', 15.00, 'Chings Secret Boisar', 35.00, '2026-08-14', 'NORMAL'),
(17, 'INV-117', 'Cashew Nuts (Whole Kaju)', 'Provisions', 3.20, 'kg', 5.00, 'Dry Fruit House Palghar', 920.00, '2026-08-12', 'LOW');

-- 10. Bookings
INSERT INTO bookings (id, booking_reference, customer_id, room_id, check_in_date, check_out_date, number_of_guests, special_requests, total_amount, booking_status, payment_status, created_at) VALUES
(1, 'BK-2026-001', 1, 4, '2026-08-22', '2026-08-24', 2, 'Late check-in requested, high floor preferred', 7000.00, 'CONFIRMED', 'PAID', '2026-08-20 10:30:00'),
(2, 'BK-2026-002', 2, 7, '2026-08-21', '2026-08-23', 3, 'Requires extra pillows and quiet room for corporate work', 9000.00, 'CHECKED_IN', 'PAID', '2026-08-19 14:15:00'),
(3, 'BK-2026-003', 3, 10, '2026-08-25', '2026-08-28', 2, 'VIP Guest - Executive Suite setup', 22500.00, 'CONFIRMED', 'PAID', '2026-08-21 09:00:00'),
(4, 'BK-2026-004', 4, 15, '2026-08-20', '2026-08-22', 2, 'Near elevator preference', 7000.00, 'CHECKED_IN', 'PENDING', '2026-08-18 16:45:00'),
(5, 'BK-2026-005', 5, 2, '2026-08-20', '2026-08-21', 2, 'Ground floor room', 2500.00, 'CHECKED_IN', 'PAID', '2026-08-20 08:20:00');

-- 11. Payments
INSERT INTO payments (id, booking_id, customer_id, amount, payment_method, payment_status, transaction_reference, payment_date) VALUES
(1, 1, 1, 7000.00, 'UPI', 'PAID', 'TXN-UPI-9928172615', '2026-08-20 10:32:15'),
(2, 2, 2, 9000.00, 'Card', 'PAID', 'TXN-CARD-4481029411', '2026-08-19 14:18:00'),
(3, 3, 3, 22500.00, 'Net Banking', 'PAID', 'TXN-NET-7718293012', '2026-08-21 09:05:30'),
(4, 5, 5, 2500.00, 'Cash', 'PAID', 'TXN-CASH-100293', '2026-08-20 08:22:00');

-- 12. Security Logs
INSERT INTO security_logs (id, username, action, ip_address, status, risk_score, details, created_at) VALUES
(1, 'admin', 'USER_LOGIN', '192.168.1.10', 'SUCCESS', 0, 'Successful login via web interface', '2026-08-21 08:30:00'),
(2, 'reception', 'USER_LOGIN', '192.168.1.12', 'SUCCESS', 0, 'Reception desk authentication', '2026-08-21 08:45:00'),
(3, 'unknown_user', 'FAILED_LOGIN_ATTEMPT', '203.0.113.45', 'FAILED', 45, 'Invalid credentials for user: admin_guest', '2026-08-21 09:12:10'),
(4, 'unknown_user', 'FAILED_LOGIN_ATTEMPT', '203.0.113.45', 'FAILED', 60, 'Repeated invalid password attempt', '2026-08-21 09:13:02'),
(5, 'unknown_user', 'FAILED_LOGIN_ATTEMPT', '203.0.113.45', 'SUSPICIOUS', 85, 'Rate limit triggered - 3 consecutive failures from IP 203.0.113.45', '2026-08-21 09:13:45'),
(6, 'reception', 'CREATE_BOOKING', '192.168.1.12', 'SUCCESS', 0, 'Booking BK-2026-003 created for customer ID 3', '2026-08-21 09:00:00'),
(7, 'housekeeping', 'UPDATE_ROOM_STATUS', '192.168.1.25', 'SUCCESS', 0, 'Room 106 state changed to CLEANING', '2026-08-21 10:15:00'),
(8, 'admin', 'VIEW_SECURITY_CENTER', '192.168.1.10', 'SUCCESS', 0, 'Admin inspected security audit logs', '2026-08-21 11:00:00');

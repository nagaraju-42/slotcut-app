-- Insert sample owner
INSERT INTO users (phone_number, pin_hash, user_type, name, email)
VALUES ('9876543210', '$2a$10$N9qo8ucoInH.R9h27SmIH.e9TFYTZxGxKh.OiX8XCdJvqhJ.QqQBe', 'OWNER', 'Priya Salon', 'owner@slotcut.com');

-- Insert sample students
INSERT INTO users (phone_number, pin_hash, user_type, name, email) VALUES
('9123456789', '$2a$10$N9qo8ucoInH.R9h27SmIH.e9TFYTZxGxKh.OiX8XCdJvqhJ.QqQBe', 'STUDENT', 'Arjun Verma', 'arjun@example.com'),
('9234567890', '$2a$10$N9qo8ucoInH.R9h27SmIH.e9TFYTZxGxKh.OiX8XCdJvqhJ.QqQBe', 'STUDENT', 'Neha Singh', 'neha@example.com'),
('9345678901', '$2a$10$N9qo8ucoInH.R9h27SmIH.e9TFYTZxGxKh.OiX8XCdJvqhJ.QqQBe', 'STUDENT', 'Rahul Patel', 'rahul@example.com');

-- Get owner ID for inserting salons
WITH owner AS (SELECT id FROM users WHERE phone_number = '9876543210' LIMIT 1)
INSERT INTO salons (owner_id, name, address, city, latitude, longitude, rating, opening_time, closing_time, phone, bio, image_url)
SELECT 
    owner.id,
    'Elite Hair Studio',
    '123 Main Street, Near Metro Station',
    'Delhi',
    28.6139,
    77.2090,
    4.8,
    '10:00',
    '20:00',
    '9876543210',
    'Premium hair salon with experienced stylists',
    'https://images.unsplash.com/photo-1633492154602-e2bdb56396ff?w=400'
FROM owner;

-- Get salon ID and insert services
WITH salon AS (SELECT id FROM salons WHERE name = 'Elite Hair Studio' LIMIT 1)
INSERT INTO services (salon_id, name, description, duration_minutes, price)
SELECT 
    salon.id,
    service.name,
    service.description,
    service.duration_minutes,
    service.price
FROM salon,
LATERAL (VALUES
    ('Haircut', 'Professional haircut with styling', 30, 400.00),
    ('Hair Wash & Dry', 'Relaxing hair wash with blow dry', 20, 250.00),
    ('Hair Color', 'Full head color treatment', 90, 1200.00),
    ('Beard Grooming', 'Beard trim and shaping', 20, 300.00),
    ('Hair Spa', 'Deep conditioning hair spa', 45, 600.00)
) AS service(name, description, duration_minutes, price);

-- Insert booking slots for today and next 7 days
WITH salon AS (SELECT id FROM salons WHERE name = 'Elite Hair Studio' LIMIT 1),
service AS (SELECT id FROM services WHERE salon_id = (SELECT id FROM salons WHERE name = 'Elite Hair Studio' LIMIT 1) LIMIT 1)
INSERT INTO booking_slots (salon_id, service_id, slot_date, start_time, end_time, is_available)
SELECT 
    salon.id,
    service.id,
    (CURRENT_DATE + interval '1 day' * generate_series(0, 6))::date,
    slots.start_time,
    slots.end_time,
    true
FROM salon, service,
LATERAL (VALUES
    ('10:00', '10:30'),
    ('10:30', '11:00'),
    ('11:00', '11:30'),
    ('11:30', '12:00'),
    ('12:00', '12:30'),
    ('14:00', '14:30'),
    ('14:30', '15:00'),
    ('15:00', '15:30'),
    ('15:30', '16:00'),
    ('16:00', '16:30'),
    ('17:00', '17:30'),
    ('18:00', '18:30')
) AS slots(start_time, end_time);

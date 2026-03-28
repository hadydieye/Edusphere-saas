-- Update a student for testing the Parent Portal
UPDATE students 
SET guardian_phone = '600000000', 
    guardian_password = 'password123'
WHERE id IN (SELECT id FROM students LIMIT 1);

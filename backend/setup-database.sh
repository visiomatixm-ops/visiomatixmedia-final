#!/bin/bash

echo "🔧 Setting up MySQL database for Internship Backend..."

# Connect to MySQL Docker container and run setup commands
docker exec -i mysql-container mysql -u root -pMySQL123 << 'EOF'
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS visiomatix_db;

-- Use the database
USE visiomatix_db;

-- Create applications table for job applications
CREATE TABLE IF NOT EXISTS applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    position VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    resume VARCHAR(255),
    schools JSON,
    colleges JSON,
    experiences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create internship_applications table for internship applications
CREATE TABLE IF NOT EXISTS internship_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(255) NOT NULL,
    duration VARCHAR(100),
    location VARCHAR(100),
    eligibility VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    resume VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Show created tables
SHOW TABLES;

-- Show table structures
DESCRIBE applications;
DESCRIBE internship_applications;

SELECT '✅ Database and tables created successfully!' AS status;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo "📊 Tables created:"
    echo "   - applications (for job applications)"
    echo "   - internship_applications (for internship applications)"
else
    echo "❌ Database setup failed!"
    exit 1
fi
# Internship Backend Deployment Guide

This guide provides step-by-step instructions to set up and run the Internship Backend Application for Visiomatix Media Pvt. Ltd.

## 📋 Prerequisites

Before deploying the backend, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL Server** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/mysql/)
- **Git** (for cloning the repository)

## 🗂️ Project Structure

```
backend/
├── .env                    # Environment variables
├── db.js                   # Database connection
├── package.json            # Dependencies and scripts
├── package-lock.json       # Lock file for dependencies
├── server.js              # Main application file
└── uploads/               # Directory for uploaded files
```

## 🚀 Quick Start

### Immediate Fix for Current Issues

If you're getting MySQL connection errors, here's a quick fix:

```bash
# 1. Check MySQL status
sudo systemctl status mysql

# 2. Start MySQL if needed
sudo systemctl start mysql

# 3. Set MySQL root password (if not set)
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password123';
FLUSH PRIVILEGES;
EXIT;

# 4. Update .env file
echo "DB_PASSWORD=password123" >> .env

# 5. Create database
mysql -u root -p -e "CREATE DATABASE visiomatix_db;"

# 6. Run without PM2 for now
npm start
```

### Step 1: Clone and Navigate to Backend Directory

```bash
# Navigate to the backend directory
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required dependencies:
- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `multer` - File upload handling
- `mysql2` - MySQL database driver
- `nodemailer` - Email sending

### Step 3: Set Up Environment Variables

Update the `.env` file with your configuration:

```env
# Email Configuration (Gmail SMTP)
COMPANY_EMAIL=your-company-email@gmail.com
COMPANY_PASS=your-app-password
OFFICE_EMAIL=hr@visiomatix.com

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=visiomatix_db
```

**Important Notes:**
- Use Gmail App Passwords for `COMPANY_PASS` (not your regular password)
- Enable 2-factor authentication on Gmail and generate an app password
- Update email addresses to your actual company emails

### Step 4: Set Up MySQL Database

#### Option A: Using MySQL Command Line

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE visiomatix_db;

# Create tables
USE visiomatix_db;

-- Job applications table
CREATE TABLE applications (
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

-- Internship applications table
CREATE TABLE internship_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    position VARCHAR(255) NOT NULL,
    duration VARCHAR(100),
    location VARCHAR(100),
    eligibility VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    resume VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exit MySQL
EXIT;
```

#### Option B: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Create a new schema named `visiomatix_db`
4. Execute the SQL statements above in a new query tab

### Step 5: Start the Application

#### Quick Start (Development)

```bash
# Simple development startup
npm start
```

The application will start on `http://localhost:5000`

#### Production Mode (Recommended)

#### Production Mode (Recommended)

##### Option A: Using PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# For Linux/macOS:
# If using package manager (Ubuntu/Debian):
sudo apt update && sudo apt install nodejs npm
sudo npm install -g pm2

# For Arch Linux/Manjaro:
sudo pacman -S pm2

# If permission denied with npm global install:
# Option 1: Use npx (recommended)
npx pm2 start server.js --name "internship-backend"

# Option 2: Install locally in project
npm install pm2 --save-dev
npx pm2 start server.js --name "internship-backend"

# Option 3: Use sudo with npm
sudo npm install -g pm2

# If not found in repositories, use AUR:
# yay -S pm2  # (if you have yay installed)

# For other systems, use npm:
sudo npm install -g pm2

# Start with PM2
pm2 start server.js --name "internship-backend"

# Check status
pm2 status

# View logs
pm2 logs internship-backend

# Restart application
pm2 restart internship-backend

# Stop application
pm2 stop internship-backend
```

##### Option B: Using Node.js Directly

```bash
# Run in background
npm start &

# Or use nohup
nohup npm start > output.log 2>&1 &

# Check if running
ps aux | grep node

# Kill process (replace PID)
kill -9 <PID>
```

##### Option C: Using Screen/Tmux

```bash
# Install screen
sudo apt install screen  # Ubuntu/Debian
# or
sudo pacman -S screen    # Arch Linux

# Start new screen session
screen -S internship-backend

# Run the application
npm start

# Detach from screen (Ctrl+A, D)
# Reattach later
screen -r internship-backend
```

### Step 6: Verify Installation

1. **Check Console Output:**
   ```
   ✅ Connected to MySQL Database
   🚀 Server running on http://localhost:5000
   ```

2. **Test API Endpoints:**
   ```bash
   # Test health check
   curl http://localhost:5000

   # Test internship application endpoint
   curl -X POST http://localhost:5000/api/apply-internship \
     -F "position=Frontend Developer Intern" \
     -F "duration=3-6 months" \
     -F "location=Pune" \
     -F "eligibility=BE" \
     -F "email=test@example.com"
   ```

## 🔧 Configuration Details

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `COMPANY_EMAIL` | Gmail address for sending emails | `hr@visiomatix.com` |
| `COMPANY_PASS` | Gmail App Password | `abcd-efgh-ijkl-mnop` |
| `OFFICE_EMAIL` | HR/Office email for notifications | `office@visiomatix.com` |
| `DB_HOST` | MySQL server host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `password123` |
| `DB_NAME` | Database name | `visiomatix_db` |

### API Endpoints

#### Job Applications
- **POST** `/api/apply` - Submit job application with resume

#### Internship Applications
- **POST** `/api/apply-internship` - Submit internship application

### File Upload Configuration

- **Upload Directory:** `./uploads/`
- **Allowed File Types:** PDF, DOC, DOCX
- **Max File Size:** 10MB (configurable in server.js)

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```
❌ Database connection failed: Error: Access denied for user 'root'@'localhost'
```

**Solution:**
- Verify MySQL credentials in `.env`
- Ensure MySQL service is running
- Grant proper permissions to the database user

#### 2. Email Sending Failed
```
❌ Email Error: Invalid login credentials
```

**Solution:**
- Generate Gmail App Password
- Update `COMPANY_PASS` in `.env`
- Enable less secure app access (not recommended) or use OAuth2

#### 3. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
- Change port in `server.js`: `app.listen(5001, ...)`
- Or kill the process using the port: `lsof -ti:5000 | xargs kill -9`

#### 4. PM2 Installation Issues
```
bash: pm2: command not found
```

**Solution:**
```bash
# For Arch Linux/Manjaro:
sudo pacman -Syu  # Update package database
sudo pacman -S pm2

# If still not found, use npm:
sudo npm install -g pm2

# Verify installation:
pm2 --version
```

#### 5. MySQL Connection Issues
```
❌ Database connection failed: Error: Access denied for user 'root'@'172.17.0.1'
```

**Solution:**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL if not running
sudo systemctl start mysql

# Login to MySQL and set password
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
EXIT;

# Update .env file with the password
DB_PASSWORD=your_password

# If running in Docker/container, use host networking or correct IP
DB_HOST=127.0.0.1  # or host.docker.internal for Docker
```

#### 6. PM2 Permission Issues
```
Error: EACCES: permission denied, mkdir '/usr/lib/node_modules/pm2'
```

**Solution:**
```bash
# Use npx instead of global install
npx pm2 start server.js --name "internship-backend"

# Or install locally
npm install pm2 --save-dev
npx pm2 start server.js --name "internship-backend"

# Or fix npm permissions (not recommended)
sudo chown -R $(whoami) ~/.npm
```

#### 7. ES Module Warning
```
[MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file is not specified
```

**Solution:**
Add to `package.json`:
```json
{
  "type": "module"
}
```

#### 8. CORS Issues
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- CORS is already configured in `server.js`
- Ensure frontend is running on a different port (e.g., React dev server on 3000)

### Database Issues

#### Reset Database
```bash
# Drop and recreate database
mysql -u root -p -e "DROP DATABASE visiomatix_db; CREATE DATABASE visiomatix_db;"

# Re-run the table creation SQL
```

#### Check Database Connection
```javascript
// Add this to server.js temporarily for debugging
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit if DB connection fails
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});
```

## 📊 Monitoring and Logs

### Application Logs
- Console output shows connection status and errors
- Email sending confirmations
- File upload success/failure messages

### Database Logs
```bash
# Check MySQL error logs
tail -f /var/log/mysql/error.log
```

### PM2 Monitoring (if using PM2)
```bash
# View application status
pm2 status

# View logs
pm2 logs internship-backend

# Restart application
pm2 restart internship-backend

# Stop application
pm2 stop internship-backend
```

## 🔒 Security Considerations

1. **Environment Variables:** Never commit `.env` file to version control
2. **Database Credentials:** Use strong passwords and limit user privileges
3. **File Uploads:** Validate file types and sizes to prevent malicious uploads
4. **CORS:** Configure appropriate origins for production
5. **Rate Limiting:** Consider implementing rate limiting for API endpoints

## 🚀 Production Deployment

### Using Docker (Recommended)

```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t internship-backend .
docker run -p 5000:5000 --env-file .env internship-backend
```

### Using Nginx (Reverse Proxy)

```nginx
# nginx.conf
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📞 Support

For issues or questions:
- Check the console logs for error messages
- Verify all prerequisites are installed
- Ensure environment variables are correctly set
- Test database connectivity manually

## 📝 API Documentation

### POST /api/apply-internship

Submit an internship application.

**Request Body (FormData):**
- `position` (string): Internship position title
- `duration` (string): Internship duration
- `location` (string): Work location
- `eligibility` (string): Educational qualification
- `email` (string): Applicant's email
- `resume` (file): Resume file (PDF/DOC/DOCX)

**Response:**
```json
{
  "success": true,
  "message": "Internship application submitted successfully!"
}
```

---

**Last Updated:** November 21, 2025
**Version:** 1.0.0
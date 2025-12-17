
# Project Setup Guide

This guide provides step-by-step instructions for setting up the Visiomatix project ecosystem, which consists of a Spring Boot backend, a main React frontend (Visiomatix), and an agent dashboard frontend.

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Java 17 or higher** (for the backend)
- **Node.js 18 or higher** (for the frontends)
- **npm** (comes with Node.js)
- **Maven 3.6+** (for building the backend)
- **Git** (for cloning repositories if needed)

## Project Structure

```
Visiomatix-final-setup/
├── Visiomatix/          # Main React frontend
├── agent-frontend/      # Agent dashboard React frontend
├── visiomatix.chat/     # Spring Boot backend
├── logs/                # Application logs
└── Project-Setup-Guide.md
```

## Backend Setup (visiomatix.chat)

1. **Navigate to the backend directory:**
   ```bash
   cd visiomatix.chat/chat
   ```

2. **Install dependencies and build:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080` by default.

4. **Database Configuration:**
   - The application uses H2 database by default
   - Check `application.properties` for database settings
   - Database files are stored in the project directory

## Main Frontend Setup (Visiomatix)

1. **Navigate to the main frontend directory:**
   ```bash
   cd Visiomatix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

## Agent Frontend Setup (agent-frontend)

1. **Navigate to the agent frontend directory:**
   ```bash
   cd agent-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The agent dashboard will be available at `http://localhost:5174` (or the next available port).

4. **Build for production:**
   ```bash
   npm run build
   ```

## Running the Full Application

1. **Start the backend first:**
   ```bash
   cd visiomatix.chat/chat
   mvn spring-boot:run
   ```

2. **Start the main frontend (in a new terminal):**
   ```bash
   cd Visiomatix
   npm run dev
   ```

3. **Start the agent frontend (in a new terminal):**
   ```bash
   cd agent-frontend
   npm run dev
   ```

## API Endpoints

The backend provides REST APIs for:
- User management and authentication
- Chat sessions and messaging
- Admin panel functionality
- File uploads and media management

Check the API documentation in `visiomatix.chat/API_Endpoint_Guide.md` for detailed endpoint information.

## Environment Configuration

### Backend Environment Variables
Create a `.env` file in `visiomatix.chat/chat/src/main/resources/` if needed:
```
SPRING_PROFILES_ACTIVE=development
JWT_SECRET=your-secret-key
DATABASE_URL=jdbc:h2:./data/chatdb
```

### Frontend Environment Variables
Create `.env` files in both frontend directories:
```
# Visiomatix/.env
VITE_API_BASE_URL=http://localhost:8080/api

# agent-frontend/.env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

## Development Workflow

1. **Backend Development:**
   - Make changes in `visiomatix.chat/chat/src/main/java/`
   - Run `mvn compile` to check for compilation errors
   - Use `mvn spring-boot:run` to start with hot reload

2. **Frontend Development:**
   - Use `npm run dev` for development with hot reload
   - Use `npm run build` to create production builds
   - Use `npm run lint` to check code quality

## Testing

### Backend Testing
```bash
cd visiomatix.chat/chat
mvn test
```

### Frontend Testing
```bash
# Visiomatix
cd Visiomatix
npm run build  # TypeScript compilation check

# agent-frontend
cd agent-frontend
npm run build  # TypeScript compilation check
```

## Deployment

### Backend Deployment
```bash
cd visiomatix.chat/chat
mvn clean package -DskipTests
java -jar target/chat-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
Both frontends can be deployed to static hosting services like Netlify, Vercel, or AWS S3.

For Visiomatix:
```bash
cd Visiomatix
npm run build
# Deploy the 'dist' folder
```

For agent-frontend:
```bash
cd agent-frontend
npm run build
# Deploy the 'dist' folder
```

## Troubleshooting

### Common Issues

1. **Port conflicts:**
   - Backend: Change `server.port` in `application.properties`
   - Main frontend: Vite will automatically use the next available port
   - Agent frontend: Vite will automatically use the next available port

2. **Database connection issues:**
   - Ensure H2 database files are not locked by another process
   - Check file permissions in the project directory

3. **CORS errors:**
   - Backend CORS configuration is in `SecurityConfig.java`
   - Ensure frontend URLs are whitelisted

4. **WebSocket connection issues:**
   - Ensure the backend is running and WebSocket endpoint is accessible
   - Check firewall settings for WebSocket ports

### Logs
- Backend logs: `visiomatix.chat/chat/logs/`
- Frontend logs: Browser developer console

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Production Server Setup

This section covers deploying the Visiomatix ecosystem to a production server, including backend, frontend, and chat widget integration.

### Server Requirements

- **Ubuntu 20.04+ or CentOS 7+** (Linux server)
- **Java 17+** installed
- **Node.js 18+** installed
- **Nginx** or **Apache** web server
- **SSL certificate** (Let's Encrypt recommended)
- **Domain name** pointing to server IP
- **Firewall configured** (ports 80, 443, 8080)

### Backend Deployment (Spring Boot)

1. **Prepare the server:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Java 17
   sudo apt install openjdk-17-jdk -y

   # Install Maven
   sudo apt install maven -y

   # Create application directory
   sudo mkdir -p /opt/visiomatix
   sudo chown -R $USER:$USER /opt/visiomatix
   ```

2. **Deploy backend application:**
   ```bash
   # Copy backend files to server
   scp -r visiomatix.chat user@your-server:/opt/visiomatix/

   # Navigate to backend directory
   cd /opt/visiomatix/visiomatix.chat/chat

   # Build the application
   mvn clean package -DskipTests

   # Create systemd service
   sudo nano /etc/systemd/system/visiomatix-backend.service
   ```

3. **Create systemd service file:**
   ```ini
   [Unit]
   Description=Visiomatix Chat Backend
   After=network.target

   [Service]
   Type=simple
   User=visiomatix
   WorkingDirectory=/opt/visiomatix/visiomatix.chat/chat
   ExecStart=/usr/bin/java -jar target/chat-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

4. **Configure production properties:**
   ```bash
   # Create production properties file
   sudo nano /opt/visiomatix/visiomatix.chat/chat/src/main/resources/application-production.properties
   ```

   Add the following configuration:
   ```properties
   # Production Database Configuration
   spring.datasource.url=jdbc:h2:file:/opt/visiomatix/data/chatdb;DB_CLOSE_ON_EXIT=FALSE
   spring.datasource.driver-class-name=org.h2.Driver
   spring.jpa.hibernate.ddl-auto=update

   # Server Configuration
   server.port=8080
   server.address=127.0.0.1

   # JWT Configuration
   jwt.secret=your-production-jwt-secret-key-here
   jwt.expiration=86400000

   # CORS Configuration for production domains
   app.cors.allowed-origins=https://yourdomain.com,https://agent.yourdomain.com,https://chat.yourdomain.com

   # Logging
   logging.level.com.visiomatix=INFO
   logging.file.name=/opt/visiomatix/logs/visiomatix.log
   ```

5. **Start the backend service:**
   ```bash
   # Reload systemd and start service
   sudo systemctl daemon-reload
   sudo systemctl enable visiomatix-backend
   sudo systemctl start visiomatix-backend

   # Check status
   sudo systemctl status visiomatix-backend
   ```

### Frontend Deployment (Main Website)

1. **Build the main frontend:**
   ```bash
   cd Visiomatix

   # Create production environment file
   echo "VITE_API_BASE_URL=https://api.yourdomain.com" > .env.production

   # Build for production
   npm run build
   ```

2. **Deploy to web server:**
   ```bash
   # Copy build files to Nginx
   sudo mkdir -p /var/www/visiomatix
   sudo cp -r dist/* /var/www/visiomatix/

   # Set proper permissions
   sudo chown -R www-data:www-data /var/www/visiomatix
   ```

3. **Configure Nginx for main site:**
   ```bash
   sudo nano /etc/nginx/sites-available/visiomatix
   ```

   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       # Redirect HTTP to HTTPS
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name yourdomain.com www.yourdomain.com;

       # SSL configuration
       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header Referrer-Policy "no-referrer-when-downgrade" always;
       add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

       # Root directory
       root /var/www/visiomatix;
       index index.html;

       # Handle client-side routing
       location / {
           try_files $uri $uri/ /index.html;
       }

       # API proxy to backend
       location /api/ {
           proxy_pass http://127.0.0.1:8080/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }

       # WebSocket proxy
       location /ws/ {
           proxy_pass http://127.0.0.1:8080/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

### Agent Dashboard Deployment

1. **Build the agent frontend:**
   ```bash
   cd agent-frontend

   # Create production environment file
   cat > .env.production << EOF
   VITE_API_BASE_URL=https://api.yourdomain.com
   VITE_WS_URL=wss://api.yourdomain.com/ws
   EOF

   # Build for production
   npm run build
   ```

2. **Deploy agent dashboard:**
   ```bash
   # Create directory for agent dashboard
   sudo mkdir -p /var/www/agent.yourdomain.com
   sudo cp -r dist/* /var/www/agent.yourdomain.com/
   sudo chown -R www-data:www-data /var/www/agent.yourdomain.com
   ```

3. **Configure Nginx for agent dashboard:**
   ```bash
   sudo nano /etc/nginx/sites-available/agent.yourdomain.com
   ```

   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name agent.yourdomain.com;

       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name agent.yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-XSS-Protection "1; mode=block" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header Referrer-Policy "no-referrer-when-downgrade" always;

       root /var/www/agent.yourdomain.com;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # API proxy
       location /api/ {
           proxy_pass http://127.0.0.1:8080/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }

       # WebSocket proxy
       location /ws/ {
           proxy_pass http://127.0.0.1:8080/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

### Chat Widget Integration

1. **Build and deploy chat widget:**
   The chat widget is typically embedded in the main website. Ensure the widget script points to the correct API endpoints.

2. **Widget configuration:**
   Update the chat widget configuration to use production URLs:
   ```javascript
   // In your chat widget script
   const config = {
       apiUrl: 'https://api.yourdomain.com',
       wsUrl: 'wss://api.yourdomain.com/ws',
       domain: 'yourdomain.com'
   };
   ```

### SSL Certificate Setup

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain SSL certificates:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d agent.yourdomain.com -d api.yourdomain.com
   ```

3. **Set up auto-renewal:**
   ```bash
   sudo crontab -e
   # Add this line:
   0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Firewall Configuration

```bash
# Allow SSH, HTTP, HTTPS, and backend port
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 8080/tcp
sudo ufw --force enable
```

### Monitoring and Logs

1. **Backend logs:**
   ```bash
   sudo journalctl -u visiomatix-backend -f
   ```

2. **Nginx logs:**
   ```bash
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Application logs:**
   ```bash
   tail -f /opt/visiomatix/logs/visiomatix.log
   ```

### Backup Strategy

1. **Database backup:**
   ```bash
   # Create backup script
   sudo nano /opt/visiomatix/backup.sh
   ```

   ```bash
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/opt/visiomatix/backups"
   mkdir -p $BACKUP_DIR

   # Stop service for consistent backup
   sudo systemctl stop visiomatix-backend

   # Backup database
   cp /opt/visiomatix/data/chatdb.mv.db $BACKUP_DIR/chatdb_$DATE.mv.db

   # Start service
   sudo systemctl start visiomatix-backend

   # Clean old backups (keep last 7 days)
   find $BACKUP_DIR -name "chatdb_*.mv.db" -mtime +7 -delete
   ```

2. **Schedule backups:**
   ```bash
   sudo chmod +x /opt/visiomatix/backup.sh
   sudo crontab -e
   # Add: 0 2 * * * /opt/visiomatix/backup.sh
   ```

### Performance Optimization

1. **Nginx optimization:**
   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

   Add worker optimizations:
   ```
   worker_processes auto;
   worker_connections 1024;
   ```

2. **Backend JVM tuning:**
   Update the systemd service to include JVM options:
   ```ini
   ExecStart=/usr/bin/java -Xmx2g -Xms512m -XX:+UseG1GC -jar target/chat-0.0.1-SNAPSHOT.jar --spring.profiles.active=production
   ```

### Domain and DNS Configuration

Ensure your DNS is configured as follows:
- `yourdomain.com` → Main website
- `agent.yourdomain.com` → Agent dashboard
- `api.yourdomain.com` → API endpoints (optional, can use main domain)

### Testing Production Deployment

1. **Test all endpoints:**
   ```bash
   curl -k https://yourdomain.com/api/health
   curl -k https://agent.yourdomain.com
   ```

2. **Test WebSocket connection:**
   Use browser developer tools to verify WebSocket connections work.

3. **Load testing:**
   Consider using tools like Apache Bench or JMeter for load testing.

## Support

For issues or questions:
- Check existing documentation
- Review application logs
- Test in isolation (backend/frontend separately)
- Check network connectivity for WebSocket connections
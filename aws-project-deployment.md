# AWS Project Deployment Guide

This guide provides step-by-step instructions for deploying the Visiomatix project to AWS using free tier services where possible, with cost-effective alternatives for production workloads.

## AWS Free Tier Overview

- **EC2 t2.micro**: 750 hours/month free for 12 months
- **RDS**: 750 hours of db.t2.micro database usage for 12 months
- **S3**: 5GB storage, 20,000 GET requests, 2,000 PUT requests per month
- **CloudFront**: 1TB data transfer out, 10,000,000 HTTP/HTTPS requests per month
- **API Gateway**: 1 million API calls per month
- **Lambda**: 1 million requests and 400,000 GB-seconds compute time per month

## Prerequisites

- AWS Account (with free tier eligibility)
- AWS CLI installed and configured
- Git repository with your code
- Domain name (optional, can use AWS provided URLs)

## Architecture Overview

```
Internet
    ↓
CloudFront (CDN)
    ↓
S3 (Static Frontend)
    ↓
API Gateway (Optional)
    ↓
Lambda (Optional for serverless)
    ↓
EC2 Instance (Backend)
    ↓
RDS (Database)
```

## Port Configuration Overview

### Default Ports Used in Visiomatix Deployment

| Service | Port | Protocol | Purpose | AWS Service |
|---------|------|----------|---------|-------------|
| Backend API | 8080 | TCP | Spring Boot application | EC2 |
| Frontend (HTTP) | 80 | TCP | Main website HTTP | CloudFront/S3 |
| Frontend (HTTPS) | 443 | TCP | Main website HTTPS | CloudFront/S3 |
| Agent Dashboard (HTTP) | 80 | TCP | Agent panel HTTP | CloudFront/S3 |
| Agent Dashboard (HTTPS) | 443 | TCP | Agent panel HTTPS | CloudFront/S3 |
| Database | 3306 | TCP | MySQL/PostgreSQL | RDS |
| SSH | 22 | TCP | Server access | EC2 |
| WebSocket | 8080 | WS/WSS | Real-time chat | EC2 |

### Security Group Configuration

**EC2 Security Group (visiomatix-backend-sg):**
```
Inbound Rules:
- SSH (22) - TCP - Your IP/32 - For server access
- HTTP (80) - TCP - 0.0.0.0/0 - For health checks (optional)
- HTTPS (443) - TCP - 0.0.0.0/0 - For direct HTTPS access (optional)
- Custom TCP (8080) - TCP - 0.0.0.0/0 - Backend API and WebSocket
```

**RDS Security Group (visiomatix-db-sg):**
```
Inbound Rules:
- MySQL/Aurora (3306) - TCP - sg-xxxxx (EC2 security group) - Database access from EC2 only
```

## Step 1: Launch EC2 Instance for Backend

1. **Create EC2 Instance:**
   - Go to AWS Console → EC2 → Launch Instance
   - Name: `visiomatix-backend`
   - AMI: Ubuntu Server 22.04 LTS (free tier eligible)
   - Instance Type: `t2.micro` (free tier)
   - Key Pair: Create or select existing
   - Security Group: Create new security group with the rules above
     - SSH (22) - Your IP only
     - HTTP (80) - 0.0.0.0/0 (optional)
     - HTTPS (443) - 0.0.0.0/0 (optional)
     - Custom TCP (8080) - 0.0.0.0/0 (backend API and WebSocket)
   - Storage: 8GB (default, free tier)

2. **Connect to EC2:**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

3. **Install Java and Maven:**
   ```bash
   sudo apt update
   sudo apt install -y openjdk-17-jdk maven
   java -version
   mvn -version
   ```

4. **Clone and deploy backend:**
   ```bash
   git clone https://github.com/your-repo/visiomatix-final-setup.git
   cd visiomatix-final-setup/visiomatix.chat/chat

   # Build the application
   mvn clean package -DskipTests

   # Create application directory
   sudo mkdir -p /opt/visiomatix
   sudo mv target/chat-*.jar /opt/visiomatix/
   sudo mv src/main/resources /opt/visiomatix/config
   ```

5. **Create production configuration:**
   ```bash
   sudo nano /opt/visiomatix/config/application.properties
   ```

   Add:
   ```properties
   spring.profiles.active=production
   server.port=8080
   server.address=0.0.0.0

   # Database will be configured with RDS later
   spring.datasource.url=jdbc:h2:mem:testdb
   spring.datasource.driver-class-name=org.h2.Driver
   spring.jpa.hibernate.ddl-auto=create-drop

   jwt.secret=your-production-jwt-secret
   jwt.expiration=86400000

   logging.level.com.visiomatix=INFO
   ```

6. **Create systemd service:**
   ```bash
   sudo nano /etc/systemd/system/visiomatix.service
   ```

   Add:
   ```ini
   [Unit]
   Description=Visiomatix Backend
   After=network.target

   [Service]
   Type=simple
   User=ubuntu
   WorkingDirectory=/opt/visiomatix
   ExecStart=/usr/bin/java -jar chat-*.jar --spring.config.location=config/application.properties
   Restart=always
   RestartSec=10

   [Install]
   WantedBy=multi-user.target
   ```

7. **Start the service:**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable visiomatix
   sudo systemctl start visiomatix
   sudo systemctl status visiomatix
   ```

## Step 2: Set Up RDS Database (Free Tier)

1. **Create RDS Instance:**
   - AWS Console → RDS → Create Database
   - Engine: MySQL (or PostgreSQL)
   - Templates: Free tier
   - DB instance identifier: `visiomatix-db`
   - Master username: `admin`
   - Master password: Choose strong password
   - DB instance class: `db.t2.micro` (free tier)
   - Storage: 20GB (minimum for free tier)
   - Public accessibility: Yes (for development, restrict in production)
   - VPC: Default
   - Security Group: Create new, allow MySQL/Aurora (3306) from EC2 security group

2. **Update backend configuration:**
   ```bash
   sudo nano /opt/visiomatix/config/application.properties
   ```

   Update database configuration:
   ```properties
   spring.datasource.url=jdbc:mysql://your-rds-endpoint:3306/visiomatix?useSSL=false&serverTimezone=UTC
   spring.datasource.username=admin
   spring.datasource.password=your-password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
   ```

3. **Install MySQL connector:**
   ```bash
   # Add to pom.xml dependencies if not present
   # <dependency>
   #     <groupId>mysql</groupId>
   #     <artifactId>mysql-connector-java</artifactId>
   #     <version>8.0.33</version>
   # </dependency>
   ```

4. **Restart backend service:**
   ```bash
   sudo systemctl restart visiomatix
   ```

## Step 3: Deploy Frontend to S3 + CloudFront

### Main Frontend (Visiomatix)

1. **Create S3 Bucket:**
   - AWS Console → S3 → Create Bucket
   - Bucket name: `visiomatix-frontend-[random-suffix]`
   - Region: Choose closest to your users
   - Block all public access: Uncheck (we'll configure bucket policy)

2. **Enable static website hosting:**
   - Bucket → Properties → Static website hosting
   - Enable, index document: `index.html`

3. **Build frontend locally:**
   ```bash
   cd Visiomatix
   echo "VITE_API_BASE_URL=http://your-ec2-public-ip:8080" > .env.production
   echo "VITE_WS_URL=ws://your-ec2-public-ip:8080/ws" >> .env.production
   npm run build
   ```

4. **Upload to S3:**
   ```bash
   aws s3 sync dist/ s3://visiomatix-frontend-[suffix] --delete
   ```

5. **Configure bucket policy for public access:**
   - Bucket → Permissions → Bucket policy
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": "*",
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::visiomatix-frontend-[suffix]/*"
           }
       ]
   }
   ```

6. **Create CloudFront Distribution:**
   - AWS Console → CloudFront → Create Distribution
   - Origin Domain: Select your S3 bucket
   - Origin Access: Public (since bucket is public)
   - Default Root Object: `index.html`
   - Price Class: Use only US, Canada, Europe (cheaper)
   - Enable IPv6, Compress objects: Yes

### Agent Frontend

1. **Create separate S3 bucket:**
   - Bucket name: `visiomatix-agent-[random-suffix]`

2. **Repeat steps 2-6 above for agent frontend:**
   ```bash
   cd agent-frontend
   echo "VITE_API_BASE_URL=http://your-ec2-public-ip:8080" > .env.production
   echo "VITE_WS_URL=ws://your-ec2-public-ip:8080/ws" >> .env.production
   npm run build
   aws s3 sync dist/ s3://visiomatix-agent-[suffix] --delete
   ```

   **Port Configuration for Agent Frontend:**
   - API calls: Port 8080 (backend)
   - WebSocket connections: Port 8080 with `/ws` endpoint
   - HTTPS termination: Handled by CloudFront (port 443)

3. **Create CloudFront distribution for agent dashboard**

## Step 4: Set Up Domain (Optional but Recommended)

1. **Route 53 Hosted Zone:**
   - AWS Console → Route 53 → Create Hosted Zone
   - Domain name: `yourdomain.com`
   - Update nameservers at your domain registrar

2. **Create A Records:**
   - Main site: `yourdomain.com` → CloudFront distribution (ports 80/443)
   - Agent: `agent.yourdomain.com` → Agent CloudFront distribution (ports 80/443)
   - API: `api.yourdomain.com` → EC2 Elastic IP (port 8080)

   **Port Mapping:**
   - Frontend domains use standard HTTP/HTTPS ports (80/443) via CloudFront
   - API domain points directly to EC2 port 8080 for backend access
   - WebSocket connections use WSS (port 443) through CloudFront or direct WS (port 8080)

## Step 5: SSL Certificate with ACM

1. **Request Certificate:**
   - AWS Console → Certificate Manager → Request Certificate
   - Domain: `*.yourdomain.com`
   - Validation: DNS validation

2. **Update CloudFront:**
   - Edit distribution → Custom SSL Certificate → Select ACM certificate

## Step 6: Security Best Practices

1. **Update Security Groups:**
   - EC2: Restrict SSH to your IP only
   - RDS: Restrict MySQL access to EC2 security group only

2. **Environment Variables:**
   ```bash
   # In EC2, create .env file
   sudo nano /opt/visiomatix/.env
   JWT_SECRET=your-secure-secret
   DB_PASSWORD=your-db-password
   ```

3. **Enable CloudWatch Monitoring:**
   - EC2 → Actions → Monitor and troubleshoot → Manage detailed monitoring

## Step 7: Cost Optimization

### Free Tier Limits
- Monitor usage in AWS Billing dashboard
- Set up billing alerts for $5 threshold

### Cost Saving Tips
1. **Use Reserved Instances** after free tier expires
2. **Spot Instances** for development/testing
3. **Lambda + API Gateway** for serverless backend (if traffic is low)
4. **S3 Storage Classes** - move old logs to Glacier
5. **CloudWatch Logs** retention policies

## Step 8: Backup and Monitoring

1. **RDS Automated Backups:**
   - RDS → Modify → Backup → Enable automated backups

2. **EC2 Backup:**
   ```bash
   # Install awscli on EC2
   sudo apt install awscli
   aws configure  # Use IAM role instead for security

   # Create backup script
   sudo nano /opt/visiomatix/backup.sh
   ```

   ```bash
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   aws s3 cp /opt/visiomatix/data/ s3://your-backup-bucket/backup-$DATE/ --recursive
   ```

3. **CloudWatch Alarms:**
   - Set up alarms for EC2 CPU utilization, RDS connections, etc.

## Step 9: CI/CD Pipeline (Optional)

### Using AWS CodePipeline

1. **Create CodeCommit Repository:**
   - AWS Console → CodeCommit → Create Repository

2. **Set up CodeBuild:**
   - Build spec for backend:
   ```yaml
   version: 0.2
   phases:
     build:
       commands:
         - mvn clean package -DskipTests
   artifacts:
     files:
       - target/chat-*.jar
   ```

3. **CodeDeploy for EC2:**
   - Install CodeDeploy agent on EC2
   - Create deployment group and application

## Troubleshooting

### Common Issues

1. **Backend not accessible:**
   ```bash
   # Check service status
   sudo systemctl status visiomatix

   # Check logs
   sudo journalctl -u visiomatix -f

   # Test port
   curl http://localhost:8080/api/health
   ```

2. **Frontend not loading:**
   - Check CloudFront distribution status
   - Verify S3 bucket permissions
   - Check browser console for CORS errors

3. **Database connection issues:**
   - Verify RDS security group allows EC2 access
   - Check database credentials
   - Test connection from EC2: `mysql -h your-rds-endpoint -u admin -p`

### Port Testing and Verification

```bash
# Test backend API port (8080)
curl -v http://localhost:8080/api/health

# Test WebSocket port (8080)
# Use a WebSocket testing tool or browser console

# Test database port (3306) from EC2
mysql -h your-rds-endpoint -u admin -p -e "SELECT 1;"

# Test frontend ports via CloudFront (80/443)
curl -I https://your-cloudfront-domain

# Check open ports on EC2
sudo netstat -tlnp | grep -E ':(80|443|8080|3306)'

# Verify security groups
aws ec2 describe-security-groups --group-ids your-sg-id
```

### Monitoring Commands

```bash
# EC2 system resources
top
df -h
free -h

# Application logs
sudo journalctl -u visiomatix --since "1 hour ago"

# AWS CLI monitoring
aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --start-time 2024-01-01T00:00:00Z --end-time 2024-01-02T00:00:00Z --period 3600 --statistics Maximum
```

## Cost Estimation

### Free Tier (First 12 Months)
- EC2: $0 (750 hours)
- RDS: $0 (750 hours)
- S3: $0 (5GB storage)
- CloudFront: $0 (1TB transfer)
- Total: $0/month

### After Free Tier
- EC2 t2.micro: ~$8/month
- RDS t2.micro: ~$12/month
- S3 + CloudFront: ~$1-5/month
- Total: ~$21-25/month

## Migration to Production

When ready for production:

1. **Use Application Load Balancer** for multiple EC2 instances
2. **RDS Multi-AZ** for high availability
3. **ElastiCache** for Redis session storage
4. **WAF + Shield** for security
5. **CloudFormation** for infrastructure as code

## Alternative: Netlify Fullstack Setup

For a simpler, more cost-effective alternative to AWS, consider deploying on Netlify with the following configuration:

### Netlify Architecture Overview

```
Internet
    ↓
Netlify CDN (Global)
    ↓
Netlify Sites (Frontend)
    ↓
Netlify Functions (Backend API)
    ↓
External Database (PlanetScale/Supabase)
    ↓
WebSocket Service (Pusher)
```

### Port Configuration for Netlify

| Service | Port | Protocol | Purpose | Netlify Equivalent |
|---------|------|----------|---------|-------------------|
| Frontend Sites | 80/443 | HTTP/HTTPS | Main website | Automatic HTTPS |
| Netlify Functions | 9000 | Internal | Backend API | `/api/*` routes |
| WebSocket | 443 | WSS | Real-time chat | Pusher/Socket.io |
| Database | Provider-specific | TCP | Data storage | PlanetScale/Supabase |

### Quick Netlify Setup

1. **Deploy Main Frontend:**
   ```bash
   cd Visiomatix
   echo "VITE_API_BASE_URL=https://your-netlify-site.netlify.app/api" > .env.production
   echo "VITE_WS_URL=wss://your-pusher-app.pusherapp.com" >> .env.production
   npm run build
   # Deploy to Netlify (drag & drop dist/ or connect repo)
   ```

2. **Deploy Agent Frontend:**
   ```bash
   cd agent-frontend
   echo "VITE_API_BASE_URL=https://your-netlify-site.netlify.app/api" > .env.production
   echo "VITE_WS_URL=wss://your-pusher-app.pusherapp.com" >> .env.production
   npm run build
   # Deploy to separate Netlify site
   ```

3. **Create Netlify Functions:**
   ```javascript
   // netlify/functions/api.js
   const express = require('express');
   const serverless = require('serverless-http');

   const app = express();

   // CORS for multiple frontends
   app.use((req, res, next) => {
     const allowedOrigins = [
       'https://your-main-site.netlify.app',
       'https://your-agent-site.netlify.app'
     ];
     const origin = req.headers.origin;
     if (allowedOrigins.includes(origin)) {
       res.header('Access-Control-Allow-Origin', origin);
     }
     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     next();
   });

   app.use(express.json());

   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok', service: 'netlify-functions' });
   });

   module.exports.handler = serverless(app);
   ```

4. **Configure netlify.toml:**
   ```toml
   [build]
     functions = "netlify/functions"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200
   ```

### Netlify Cost Comparison

| Service | AWS (After Free Tier) | Netlify |
|---------|----------------------|---------|
| Frontend Hosting | ~$1-5/month | $0 (100GB free) |
| Backend Functions | ~$10-50/month | $0 (125K invocations free) |
| Database | ~$12/month | ~$0 (PlanetScale free tier) |
| CDN | ~$1-5/month | Included |
| **Total** | **~$24-72/month** | **~$0-29/month** |

### When to Choose Netlify vs AWS

**Choose Netlify if:**
- You want simpler deployment
- Lower cost for small to medium applications
- Don't need complex server management
- Prefer serverless architecture

**Choose AWS if:**
- You need advanced customization
- Higher traffic/enterprise requirements
- Complex microservices architecture
- Need full control over infrastructure

## Support Resources

- AWS Free Tier: https://aws.amazon.com/free/
- AWS Documentation: https://docs.aws.amazon.com/
- AWS Support: Free for first 12 months
- AWS Calculator: https://calculator.aws/
- Netlify Docs: https://docs.netlify.com/
- Netlify Pricing: https://www.netlify.com/pricing/

Both AWS and Netlify provide excellent hosting solutions. Netlify offers a simpler, more cost-effective option for most applications, while AWS provides more power and customization for complex deployments.
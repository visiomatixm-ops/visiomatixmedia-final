# Netlify Fullstack Setup Guide

This guide provides step-by-step instructions for deploying the complete Visiomatix ecosystem on Netlify, including frontend hosting, backend functions, and chat widget integration.

## Netlify Free Tier Overview

- **Sites**: 100 sites per account
- **Bandwidth**: 100GB/month
- **Build minutes**: 300 minutes/month
- **Functions**: 125K invocations/month, 100 hours compute time
- **Forms**: 100 submissions/month
- **Domains**: Custom domains supported
- **HTTPS**: Automatic SSL certificates

## Architecture Overview

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
WebSocket Service (Pusher/Socket.io)
```

## Port Configuration

### Netlify Default Ports
- **Frontend Sites**: Automatic (served on standard HTTP/HTTPS ports 80/443)
- **Functions**: Internal port 9000 (accessed via `/api/` routes)
- **WebSocket**: Port 443 (WSS) via external service
- **Database**: Provider-specific ports (typically 3306 for MySQL, 5432 for PostgreSQL)

### CORS Configuration
Netlify automatically handles CORS for functions, but for custom backends:

```javascript
// netlify.toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-api.com/:splat"
  status = 200
  headers = {Access-Control-Allow-Origin = "*", Access-Control-Allow-Headers = "Content-Type, Authorization"}
```

## Prerequisites

- Netlify account (free)
- Git repository (GitHub/GitLab/Bitbucket)
- Database provider (PlanetScale, Supabase, or Railway)
- WebSocket service (Pusher, Socket.io, or Ably)

## Step 1: Set Up Database

### Option 1: PlanetScale (MySQL-compatible)

1. **Create PlanetScale account** and database
2. **Get connection string:**
   ```
   mysql://user:password@host/database?sslaccept=strict
   ```

### Option 2: Supabase (PostgreSQL)

1. **Create Supabase project**
2. **Get connection details from Settings > Database**

## Step 2: Deploy Backend as Netlify Functions

1. **Create `netlify/functions` directory:**
   ```bash
   mkdir -p netlify/functions
   ```

2. **Create main API function (`netlify/functions/api.js`):**
   ```javascript
   const express = require('express');
   const serverless = require('serverless-http');
   const cors = require('cors');

   const app = express();

   // CORS configuration for multiple frontends
   const corsOptions = {
     origin: [
       'https://your-main-site.netlify.app',
       'https://your-agent-site.netlify.app',
       'http://localhost:5173', // Development
       'http://localhost:5174'  // Agent development
     ],
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
   };

   app.use(cors(corsOptions));
   app.use(express.json());

   // Your API routes here
   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok', timestamp: new Date().toISOString() });
   });

   app.post('/api/chat', (req, res) => {
     // Chat logic here
     res.json({ message: 'Chat response' });
   });

   module.exports.handler = serverless(app);
   ```

3. **Create `netlify.toml` configuration:**
   ```toml
   [build]
     publish = "dist"
     functions = "netlify/functions"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200

   [[headers]]
     for = "/api/*"
     [headers.values]
       Access-Control-Allow-Origin = "*"
       Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
       Access-Control-Allow-Headers = "Content-Type, Authorization"

   [functions]
     directory = "netlify/functions"
     node_bundler = "esbuild"
   ```

4. **Environment variables in Netlify:**
   - Go to Site Settings > Environment variables
   - Add:
     ```
     DATABASE_URL=your-database-connection-string
     JWT_SECRET=your-jwt-secret
     PUSHER_APP_ID=your-pusher-app-id
     PUSHER_KEY=your-pusher-key
     PUSHER_SECRET=your-pusher-secret
     PUSHER_CLUSTER=your-pusher-cluster
     ```

## Step 3: Deploy Main Frontend (Visiomatix)

1. **Connect repository to Netlify:**
   - Go to Netlify Dashboard > Add new site > Import from Git
   - Connect your repository
   - Set build settings:
     - Base directory: `Visiomatix`
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **Environment variables:**
   ```
   VITE_API_BASE_URL=https://your-site-name.netlify.app/api
   VITE_WS_URL=wss://your-pusher-app-id.pusherapp.com
   VITE_PUSHER_KEY=your-pusher-key
   VITE_PUSHER_CLUSTER=your-pusher-cluster
   ```

3. **Build hooks (optional):**
   - Add build hooks for automated deployments

4. **Custom domain (optional):**
   - Go to Site Settings > Domain management
   - Add custom domain and configure DNS

## Step 4: Deploy Agent Frontend

1. **Create separate Netlify site:**
   - Add new site from the same repository
   - Set build settings:
     - Base directory: `agent-frontend`
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **Environment variables for agent:**
   ```
   VITE_API_BASE_URL=https://your-main-site.netlify.app/api
   VITE_WS_URL=wss://your-pusher-app-id.pusherapp.com
   VITE_PUSHER_KEY=your-pusher-key
   VITE_PUSHER_CLUSTER=your-pusher-cluster
   VITE_AGENT_MODE=true
   ```

3. **CORS configuration:**
   Since both sites are on Netlify, CORS is automatically handled for function calls.

## Step 5: Set Up WebSocket Service

### Using Pusher (Recommended for Netlify)

1. **Create Pusher account** and app
2. **Install Pusher SDK:**
   ```bash
   npm install pusher-js pusher
   ```

3. **Frontend WebSocket integration:**
   ```javascript
   // In your React components
   import Pusher from 'pusher-js';

   const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
     cluster: import.meta.env.VITE_PUSHER_CLUSTER,
     encrypted: true
   });

   const channel = pusher.subscribe('chat-channel');
   channel.bind('message', (data) => {
     console.log('New message:', data);
   });
   ```

4. **Backend function WebSocket handling:**
   ```javascript
   // In netlify/functions/api.js
   const Pusher = require('pusher');

   const pusher = new Pusher({
     appId: process.env.PUSHER_APP_ID,
     key: process.env.PUSHER_KEY,
     secret: process.env.PUSHER_SECRET,
     cluster: process.env.PUSHER_CLUSTER,
     useTLS: true
   });

   app.post('/api/send-message', (req, res) => {
     pusher.trigger('chat-channel', 'message', req.body);
     res.json({ success: true });
   });
   ```

## Step 6: Chat Widget Integration

1. **Create chat widget component:**
   ```javascript
   // src/components/ChatWidget.js
   import React, { useState, useEffect } from 'react';
   import Pusher from 'pusher-js';

   const ChatWidget = () => {
     const [messages, setMessages] = useState([]);
     const [input, setInput] = useState('');

     useEffect(() => {
       const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
         cluster: import.meta.env.VITE_PUSHER_CLUSTER
       });

       const channel = pusher.subscribe('chat-channel');
       channel.bind('message', (data) => {
         setMessages(prev => [...prev, data]);
       });

       return () => {
         pusher.disconnect();
       };
     }, []);

     const sendMessage = async () => {
       await fetch('/api/send-message', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ text: input, timestamp: new Date() })
       });
       setInput('');
     };

     return (
       <div className="chat-widget">
         <div className="messages">
           {messages.map((msg, i) => (
             <div key={i}>{msg.text}</div>
           ))}
         </div>
         <input
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
         />
         <button onClick={sendMessage}>Send</button>
       </div>
     );
   };

   export default ChatWidget;
   ```

2. **Embed widget in main site:**
   ```javascript
   // In your main site pages
   import ChatWidget from '../components/ChatWidget';

   function HomePage() {
     return (
       <div>
         {/* Your page content */}
         <ChatWidget />
       </div>
     );
   }
   ```

## Step 7: Database Integration

### Using PlanetScale with Netlify Functions

1. **Install database connector:**
   ```bash
   npm install @planetscale/database
   ```

2. **Database connection in functions:**
   ```javascript
   // netlify/functions/api.js
   const { connect } = require('@planetscale/database');

   const conn = connect({
     host: process.env.DATABASE_HOST,
     username: process.env.DATABASE_USERNAME,
     password: process.env.DATABASE_PASSWORD
   });

   app.get('/api/messages', async (req, res) => {
     try {
       const result = await conn.execute('SELECT * FROM messages ORDER BY created_at DESC');
       res.json(result.rows);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });
   ```

## Step 8: Security Configuration

1. **Environment variables security:**
   - Never commit secrets to git
   - Use Netlify's environment variable management
   - Rotate secrets regularly

2. **CORS policy:**
   ```javascript
   // In netlify/functions/api.js
   const allowedOrigins = [
     'https://your-main-site.netlify.app',
     'https://your-agent-site.netlify.app',
     'https://your-custom-domain.com',
     'https://agent.your-custom-domain.com'
   ];

   app.use(cors({
     origin: function (origin, callback) {
       if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
       } else {
         callback(new Error('Not allowed by CORS'));
       }
     },
     credentials: true
   }));
   ```

3. **Rate limiting:**
   ```javascript
   // Basic rate limiting
   const rateLimit = require('express-rate-limit');

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });

   app.use('/api/', limiter);
   ```

## Step 9: Monitoring and Analytics

1. **Netlify Analytics:**
   - Built-in analytics in Netlify dashboard
   - Function logs and performance metrics

2. **External monitoring:**
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Add error tracking (Sentry)

3. **Log management:**
   ```javascript
   // In functions
   console.log('API call:', req.method, req.path);
   // Logs appear in Netlify dashboard
   ```

## Step 10: Custom Domain Setup

1. **Add custom domain to main site:**
   - Site Settings > Domain management > Add custom domain
   - Configure DNS records as instructed

2. **Add subdomain for agent:**
   - Add `agent.yourdomain.com` as additional domain
   - Configure DNS CNAME record

3. **SSL certificates:**
   - Netlify provides automatic HTTPS for custom domains

## Deployment Workflow

1. **Development:**
   ```bash
   # Local development
   cd Visiomatix && npm run dev
   cd agent-frontend && npm run dev
   ```

2. **Production deployment:**
   - Push to main branch triggers automatic deployment
   - Netlify builds and deploys both sites
   - Functions are deployed automatically

## Cost Optimization

### Netlify Pricing Tiers
- **Starter**: $0/month (100GB bandwidth, 300 build minutes)
- **Pro**: $19/month (400GB bandwidth, 1000 build minutes)
- **Business**: $99/month (unlimited bandwidth, 3000 build minutes)

### Cost Saving Tips
1. **Optimize build times** with caching
2. **Use Netlify's CDN** effectively
3. **Monitor function usage** to avoid overages
4. **Compress assets** and images
5. **Use efficient database queries**

## Troubleshooting

### Common Issues

1. **Function timeouts:**
   - Netlify functions have 10-second timeout by default
   - Optimize database queries
   - Consider using background functions for long tasks

2. **CORS errors:**
   - Verify allowed origins in CORS configuration
   - Check if functions are properly configured

3. **Build failures:**
   - Check build logs in Netlify dashboard
   - Ensure all dependencies are listed in package.json
   - Verify environment variables are set

4. **WebSocket connections:**
   - Ensure Pusher credentials are correct
   - Check network connectivity
   - Verify cluster settings

### Debug Commands

```bash
# Test functions locally
npm install -g netlify-cli
netlify dev

# Check function logs
netlify logs functions

# Test API endpoints
curl https://your-site.netlify.app/api/health
```

## Migration from Other Platforms

### From AWS
1. Export database data
2. Migrate static assets to Netlify
3. Convert Lambda functions to Netlify functions
4. Update DNS records

### From Heroku
1. Export database
2. Deploy frontends to Netlify
3. Convert dynos to Netlify functions
4. Update environment variables

## Support Resources

- **Netlify Documentation**: https://docs.netlify.com/
- **Netlify Community**: https://community.netlify.com/
- **Pusher Documentation**: https://pusher.com/docs/
- **PlanetScale Docs**: https://docs.planetscale.com/

This setup provides a cost-effective, scalable solution for hosting the Visiomatix application on Netlify with proper port configuration, CORS setup, and chat widget integration.
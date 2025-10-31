
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

## Support

For issues or questions:
- Check existing documentation
- Review application logs
- Test in isolation (backend/frontend separately)
- Check network connectivity for WebSocket connections
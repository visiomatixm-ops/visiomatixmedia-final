# Visiomatix Project Guide

## 📋 Overview
This project consists of two main applications: **Visiomatix** (a media company website) and **Visiomatix Chat** (a real-time chat application). Both are built using modern web technologies with full-stack implementations.

## 🏗️ Architecture

### Project Structure
```
Visiomatix/
├── Visiomatix/          # Media company website (React/TypeScript)
├── visiomatix.chat/      # Chat application
│   ├── chat/            # Spring Boot backend
│   └── frontend/        # React frontend
└── project-guide.md     # This guide
```

---

## 🎨 Visiomatix - Media Company Website

### Technology Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Bootstrap 5.3.8, Custom CSS
- **Animations**: Framer Motion 12.23.24
- **Routing**: React Router DOM 7.9.4
- **Build Tool**: Vite 7.1.7

### Features Implemented

#### 🏠 Home Page
- **Carousel Component**: Image slider with smooth transitions
- **Banner Sections**: Dynamic banners with background images and overlay text
- **Services Layout**: Grid display of company services
- **Page Animations**: Fade-in effects using Framer Motion

#### 🛠️ Services Page
- **Advanced Animations**: Parallax hero background, staggered text reveals
- **Service Cards**: 7 different services with descriptions:
  - Video Editing
  - 2D/3D Animation
  - Brand Design
  - Photography
  - Videography
  - Web Design
  - Motion Graphics
- **Responsive Design**: Mobile-first approach with Bootstrap grid

#### 📄 Additional Pages
- **About**: Company information and team details
- **Blog**: Content management page
- **Careers**: Job opportunities
- **Contact**: Contact form and information
- **Testimonials**: Customer reviews and feedback

#### 🎯 Key Components
- **Menu**: Navigation component with responsive design
- **Footer**: Site footer with links and information
- **Banner**: Reusable banner component with customizable content
- **ServiceCard**: Individual service display cards
- **ServicesLayout**: Grid layout for services
- **PageLoader**: Loading spinner with CSS animations
- **CarouselComponent**: Image carousel with navigation

### Development Features
- **Lazy Loading**: Code splitting for better performance
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Vite**: Fast development server and optimized builds

---

## 💬 Visiomatix Chat - Real-Time Chat Application

### Backend (Spring Boot)

#### Technology Stack
- **Framework**: Spring Boot 3.5.6
- **Language**: Java 21
- **Database**: MySQL 8.4+
- **Security**: Spring Security with JWT authentication
- **WebSocket**: STOMP over SockJS for real-time communication
- **Build Tool**: Maven 3.11.0
- **ORM**: Spring Data JPA
- **Validation**: Bean Validation (JSR 380)

#### Core Features

##### 🔐 Authentication & Authorization
- **JWT Token Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin, User, Moderator roles
- **User Registration/Login**: Complete user lifecycle management
- **Password Security**: Proper password handling and validation

##### 👥 User Management
- **User CRUD Operations**: Create, read, update, delete users
- **Role Management**: Dynamic role assignment and management
- **Permission System**: Granular permission controls
- **Profile Management**: User profile updates and settings

##### 💬 Chat System
- **Real-Time Messaging**: WebSocket-based instant messaging
- **Chat Sessions**: Support for different session types (Agent-Client, Group, Support)
- **Message History**: Persistent message storage and retrieval
- **Typing Indicators**: Real-time typing status
- **Message Status**: Read receipts and delivery confirmations
- **File Sharing**: Support for different message types (Text, Image, File)

##### 📊 Admin Dashboard
- **Statistics**: Chat usage and user activity metrics
- **Session Management**: Active session monitoring
- **User Administration**: Complete user lifecycle management
- **System Monitoring**: Performance and health metrics

#### API Endpoints
- **Authentication**: `/api/users/register`, `/api/users/login`
- **User Management**: `/api/users/*` (CRUD operations)
- **Role Management**: `/api/roles/*` (Create, list, delete roles)
- **Permission Management**: `/api/permissions/*` (CRUD operations)
- **Chat Sessions**: `/api/chat/sessions/*` (Session management)
- **Messages**: `/api/chat/sessions/*/messages/*` (Message operations)

### Frontend (React)

#### Technology Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.1.7
- **WebSocket**: STOMP.js with SockJS client
- **HTTP Client**: Axios with interceptors
- **Styling**: Bootstrap 5.3.8
- **Routing**: React Router DOM 7.9.4

#### Features Implemented

##### 🔐 Authentication
- **Login/Register Forms**: User-friendly authentication interface
- **JWT Token Management**: Automatic token storage and refresh
- **Protected Routes**: Role-based route protection
- **Auto Logout**: Token expiration handling

##### 💬 Chat Interface
- **Real-Time Messaging**: Live chat with WebSocket connection
- **Chat Sessions**: Multiple conversation support
- **Message History**: Paginated message loading
- **Typing Indicators**: Real-time typing status display
- **User Status**: Online/offline status indicators

##### 👤 User Management
- **Profile Management**: User profile updates
- **Role Display**: Current user roles and permissions
- **Admin Panel**: User administration interface (for admins)

##### 🔧 Services
- **ApiService**: Centralized HTTP client with JWT authentication
- **WebSocketService**: Real-time communication service
- **PrivateRoute**: Route protection component

---

## 🛠️ Development & Deployment

### Prerequisites
- **Node.js**: 18+ for React applications
- **Java**: 21 for Spring Boot
- **MySQL**: 8.4+ for database
- **Maven**: 3.6+ for Java builds

### Running the Applications

#### Visiomatix Website
```bash
cd Visiomatix
npm install
npm run dev
```

#### Chat Backend
```bash
cd visiomatix.chat/chat
mvn spring-boot:run
```

#### Chat Frontend
```bash
cd visiomatix.chat/frontend
npm install
npm run dev
```

### Database Setup
- Configure MySQL connection in `application.properties`
- Run database migrations (if any)
- Default admin user is created on startup

---

## 📚 Documentation & Testing

### API Documentation
- **API Endpoint Guide**: Comprehensive REST API documentation
- **Postman Collections**: Ready-to-use API testing collections
- **Insomnia Collections**: Alternative API testing setup
- **Login Guide**: Authentication testing instructions

### Testing Features
- **Curl Commands**: Direct API testing examples
- **Test Scripts**: Automated testing workflows
- **Environment Variables**: Pre-configured testing environments

---

## 🎯 Key Achievements

### Technical Highlights
1. **Modern Tech Stack**: Latest versions of React, Spring Boot, and supporting libraries
2. **Real-Time Communication**: WebSocket implementation for instant messaging
3. **Security**: JWT-based authentication with role-based access control
4. **Performance**: Lazy loading, code splitting, and optimized builds
5. **Responsive Design**: Mobile-first approach with Bootstrap
6. **Type Safety**: Full TypeScript implementation across all projects

### Architecture Decisions
1. **Microservices Approach**: Separate frontend and backend applications
2. **RESTful APIs**: Clean API design with proper HTTP methods
3. **WebSocket Integration**: STOMP protocol for reliable real-time messaging
4. **JWT Authentication**: Stateless authentication for scalability
5. **Database Design**: Proper entity relationships and data modeling

### User Experience
1. **Smooth Animations**: Framer Motion for engaging user interactions
2. **Real-Time Updates**: Instant message delivery and status updates
3. **Responsive Interface**: Works seamlessly across all devices
4. **Intuitive Navigation**: Clear user flows and navigation patterns

---

## 🚀 Future Enhancements

### Potential Improvements
- **File Upload**: Enhanced file sharing capabilities
- **Push Notifications**: Browser notifications for new messages
- **Voice/Video Chat**: WebRTC integration for multimedia communication
- **Message Encryption**: End-to-end encryption for security
- **Analytics Dashboard**: Advanced reporting and analytics
- **Mobile Apps**: Native mobile applications
- **Multi-language Support**: Internationalization (i18n)
- **Dark Mode**: Theme switching capabilities

### Scalability Considerations
- **Microservices Architecture**: Further decomposition into smaller services
- **Load Balancing**: Horizontal scaling support
- **Caching**: Redis integration for performance
- **CDN**: Static asset optimization
- **Database Sharding**: Support for larger user bases

---

## 📁 Detailed File Descriptions

### Visiomatix Website Files

#### Core Application Files
- **`src/App.tsx`**: Main application component with lazy-loaded routing. Implements React Router with routes for Home, About, Services, Blog, Careers, Testimonials, and Contact pages. Includes Suspense with PageLoader fallback and global Menu/Footer layout.

- **`src/main.tsx`**: Application entry point that renders the App component into the DOM using React 19's createRoot API. Includes strict mode for development warnings.

- **`src/index.css`**: Global CSS styles including Bootstrap imports, custom variables, and base styling for the entire application.

#### Page Components
- **`src/pages/Home.tsx`**: Landing page featuring carousel, banner sections, and services layout. Implements Framer Motion animations with fade-in effects and structured content sections.

- **`src/pages/Services.tsx`**: Services showcase page with advanced animations including parallax hero background, staggered text reveals, and alternating service cards. Features 7 different services with detailed descriptions and responsive grid layout.

- **`src/pages/About.tsx`**: Company information page with team details and company story.

- **`src/pages/Blog.tsx`**: Content management page for blog posts and articles.

- **`src/pages/Careers.tsx`**: Job opportunities and career information page.

- **`src/pages/Contact.tsx`**: Contact form and company contact information.

- **`src/pages/Testimonials.tsx`**: Customer reviews and testimonials display page.

#### Component Library
- **`src/component/Menu.tsx`**: Responsive navigation component with Bootstrap navbar, logo, and navigation links. Includes mobile hamburger menu functionality.

- **`src/component/Footer.tsx`**: Site footer with company information, links, and social media connections.

- **`src/component/Banner.tsx`**: Reusable banner component with customizable title, subtitle, background image, and height. Used for hero sections and promotional content.

- **`src/component/CarouselComponent.tsx`**: Image carousel/slider component using custom implementation with navigation controls and smooth transitions.

- **`src/component/ServiceCard.tsx`**: Individual service display card with image, title, and description. Used in services grid layout.

- **`src/component/ServicesLayout.tsx`**: Grid layout component that arranges ServiceCard components in responsive Bootstrap grid.

- **`src/component/PageLoader.tsx`**: Loading spinner component with CSS animations for page transitions and lazy loading states.

- **`src/component/PeopleCard.tsx`**: Team member display card with photo, name, and role information.

#### Configuration Files
- **`package.json`**: Node.js dependencies and scripts configuration for React application.
- **`tsconfig.json` & `tsconfig.app.json` & `tsconfig.node.json`**: TypeScript configuration files for different build contexts.
- **`vite.config.ts`**: Vite build tool configuration with React plugin and development settings.
- **`eslint.config.js`**: ESLint configuration for code quality and consistency.

### Visiomatix Chat Backend Files

#### Core Application
- **`chat/src/main/java/com/visiomatix/chat/chat/ChatApplication.java`**: Main Spring Boot application class with @SpringBootApplication annotation. Entry point that starts the embedded Tomcat server.

- **`chat/pom.xml`**: Maven configuration file defining Spring Boot 3.5.6 dependencies including Web, Security, JPA, WebSocket, MySQL connector, JWT, and Lombok.

- **`chat/src/main/resources/application.properties`**: Configuration file with database connection, JWT settings, server port, and Spring profiles.

#### Configuration Classes
- **`chat/src/main/java/com/visiomatix/chat/chat/config/SecurityConfig.java`**: Spring Security configuration with JWT authentication, CORS settings, and endpoint security rules.

- **`chat/src/main/java/com/visiomatix/chat/chat/config/WebSocketConfig.java`**: WebSocket configuration for STOMP messaging with SockJS fallback and authentication interceptors.

- **`chat/src/main/java/com/visiomatix/chat/chat/config/DatabaseConfig.java`**: Database configuration for JPA and transaction management.

- **`chat/src/main/java/com/visiomatix/chat/chat/config/WebConfig.java`**: Web MVC configuration with CORS settings and request logging.

- **`chat/src/main/java/com/visiomatix/chat/chat/config/JwtAuthenticationFilter.java`**: JWT token validation filter for securing API endpoints.

- **`chat/src/main/java/com/visiomatix/chat/chat/config/WebSocketAuthInterceptor.java`**: WebSocket authentication interceptor for real-time messaging security.

#### User Management
- **`chat/src/main/java/com/visiomatix/chat/chat/user/model/User.java`**: JPA entity representing user accounts with roles, authentication details, and audit fields.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/model/Role.java`**: JPA entity for user roles with associated permissions.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/model/Permission.java`**: JPA entity defining granular permissions for role-based access control.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/model/Privilege.java`**: JPA entity for privilege management (similar to permissions).

- **`chat/src/main/java/com/visiomatix/chat/chat/user/dto/UserDTO.java`**: Data transfer object for user data serialization and API responses.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/dto/JwtResponseDTO.java`**: DTO for JWT authentication responses.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/dto/RoleDTO.java`**: DTO for role data transfer.

#### Controllers
- **`chat/src/main/java/com/visiomatix/chat/chat/user/controller/UserController.java`**: REST controller for user CRUD operations and authentication endpoints.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/controller/RoleController.java`**: REST controller for role management operations.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/controller/PermissionController.java`**: REST controller for permission management.

- **`chat/src/main/java/com/visiomatix/chat/chat/chat/controller/ChatController.java`**: REST controller for chat session and message management.

- **`chat/src/main/java/com/visiomatix/chat/chat/chat/controller/ChatWebSocketController.java`**: WebSocket controller for real-time messaging.

#### Services
- **`chat/src/main/java/com/visiomatix/chat/chat/user/service/UserService.java` & `UserServiceImpl.java`**: Business logic for user management operations.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/service/RoleService.java`**: Business logic for role management.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/service/PermissionService.java`**: Business logic for permission management.

- **`chat/src/main/java/com/visiomatix/chat/chat/chat/service/ChatService.java` & `ChatServiceImpl.java`**: Business logic for chat operations.

#### Repositories
- **`chat/src/main/java/com/visiomatix/chat/chat/user/repository/UserRepository.java`**: JPA repository for user data access.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/repository/RoleRepository.java`**: JPA repository for role data access.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/repository/PermissionRepository.java`**: JPA repository for permission data access.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/repository/PrivilegeRepository.java`**: JPA repository for privilege data access.

- **`chat/src/main/java/com/visiomatix/chat/chat/chat/repository/ChatSessionRepository.java`**: JPA repository for chat session data.

- **`chat/src/main/java/com/visiomatix/chat/chat/chat/repository/MessageRepository.java`**: JPA repository for message data.

#### Utilities
- **`chat/src/main/java/com/visiomatix/chat/chat/user/util/JwtUtil.java`**: JWT token generation, validation, and parsing utilities.

- **`chat/src/main/java/com/visiomatix/chat/chat/user/util/DataSeeder.java`**: Database initialization utility for creating default users and roles.

#### Exception Handling
- **`chat/src/main/java/com/visiomatix/chat/chat/exception/GlobalExceptionHandler.java`**: Global exception handler for consistent error responses.

### Visiomatix Chat Frontend Files

#### Core Application
- **`frontend/src/App.css`**: Global styles for the chat application.

- **`frontend/src/App.tsx`**: Main React application component (structure similar to website App.tsx).

- **`frontend/src/main.tsx`**: Application entry point for the chat frontend.

- **`frontend/src/index.css`**: Global CSS styles with Bootstrap imports.

- **`frontend/package.json`**: Dependencies including React 19, STOMP.js, SockJS, Axios, Bootstrap, and React Router.

#### Components
- **`frontend/src/components/common/PrivateRoute.tsx`**: Route protection component that checks authentication and role-based access. Redirects unauthenticated users and enforces role requirements.

#### Services
- **`frontend/src/services/ApiService.ts`**: Comprehensive HTTP client service with:
  - JWT token management and automatic header injection
  - Axios interceptors for request/response handling
  - Authentication methods (login, register, logout)
  - Chat session management (create, get, close sessions)
  - Message operations (send, retrieve, mark as read)
  - User management for admin operations
  - Error handling and token expiration management

- **`frontend/src/services/WebSocketService.ts`**: Real-time communication service with:
  - STOMP over SockJS WebSocket connection
  - JWT authentication for WebSocket sessions
  - Message subscription and broadcasting
  - Typing indicators and user status updates
  - Connection management with auto-reconnect
  - Event-driven architecture with handler registration

#### Configuration Files
- **`frontend/tsconfig.json` & `tsconfig.app.json` & `tsconfig.node.json`**: TypeScript configurations.

- **`frontend/vite.config.ts`**: Vite build configuration.

- **`frontend/eslint.config.js`**: ESLint configuration.

### Documentation & Testing Files

#### API Documentation
- **`visiomatix.chat/API_Endpoint_Guide.md`**: Comprehensive API documentation with endpoint descriptions, request/response examples, authentication flows, and testing instructions.

- **`visiomatix.chat/API_Collections_Guide.md`**: Guide for using Postman and Insomnia collections for API testing.

- **`visiomatix.chat/loginguide.md`**: Step-by-step guide for testing authentication endpoints.

#### Testing Collections
- **`visiomatix.chat/Visiomatix_Chat_API.postman_collection.json`**: Postman collection with all API endpoints.

- **`visiomatix.chat/Visiomatix_Chat_API.postman_environment.json`**: Postman environment variables.

- **`visiomatix.chat/Visiomatix_Chat_API.insomnia_collection.json`**: Insomnia collection for API testing.

#### Build Scripts
- **`visiomatix.chat/chat/phase1_test.sh`**: Test script for phase 1 functionality.

---

## 📞 Support & Maintenance

### Documentation
- All code is well-documented with JSDoc and JavaDoc comments
- Comprehensive README files for each project
- API documentation with examples and error handling

### Code Quality
- ESLint configuration for consistent code style
- TypeScript for type safety
- Unit and integration tests (framework ready)
- Code formatting and linting rules

---

*Last Updated: October 14, 2025*
*Author: Viral Prajapati*
*Project Version: 1.0.0*
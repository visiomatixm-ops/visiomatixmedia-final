# Visiomatix Project Mind Map & Class Explanation

## 🏗️ Project Architecture Overview

```
Visiomatix Project
├── 🎨 Visiomatix (Media Company Website)
│   ├── Technology: React 19 + TypeScript + Vite
│   ├── Pages: Home, Services, About, Blog, Careers, Contact, Testimonials
│   └── Components: Menu, Footer, Banner, Carousel, ServiceCard, etc.
│
└── 💬 Visiomatix Chat (Real-Time Chat Application)
    ├── Backend (Spring Boot)
    │   ├── Technology: Java 21 + Spring Boot 3.5.6 + MySQL
    │   ├── Security: JWT + Spring Security
    │   ├── Real-Time: WebSocket + STOMP
    │   └── Modules: User Management, Chat System, Admin Dashboard
    └── Frontend (React)
        ├── Technology: React 19 + TypeScript + Vite
        └── Features: Authentication, Real-Time Chat, User Management
```

---

## 🎨 Visiomatix - Media Company Website

### 📁 Project Structure
```
Visiomatix/
├── src/
│   ├── App.tsx (Main app with routing)
│   ├── main.tsx (Entry point)
│   ├── index.css (Global styles)
│   ├── pages/ (Page components)
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── Careers.tsx
│   │   ├── Contact.tsx
│   │   └── Testimonials.tsx
│   └── component/ (Reusable components)
│       ├── Menu.tsx
│       ├── Footer.tsx
│       ├── Banner.tsx
│       ├── CarouselComponent.tsx
│       ├── ServiceCard.tsx
│       ├── ServicesLayout.tsx
│       ├── PageLoader.tsx
│       └── PeopleCard.tsx
├── public/ (Static assets)
└── package.json (Dependencies)
```

### 🔧 Key Classes & Components

#### **App.tsx**
- Main application component
- Implements React Router with lazy loading
- Routes: Home, About, Services, Blog, Careers, Testimonials, Contact
- Uses Suspense with PageLoader fallback
- Global layout with Menu and Footer

#### **Page Components**
- **Home.tsx**: Landing page with carousel, banners, services
- **Services.tsx**: Advanced animations, parallax effects, service cards
- **About.tsx**: Company information and team details
- **Blog.tsx**: Content management page
- **Careers.tsx**: Job opportunities
- **Contact.tsx**: Contact form and information
- **Testimonials.tsx**: Customer reviews

#### **Reusable Components**
- **Menu.tsx**: Responsive navigation with Bootstrap navbar
- **Footer.tsx**: Site footer with links and information
- **Banner.tsx**: Reusable banner with customizable content
- **CarouselComponent.tsx**: Image slider with navigation
- **ServiceCard.tsx**: Individual service display cards
- **ServicesLayout.tsx**: Grid layout for services
- **PageLoader.tsx**: Loading spinner with CSS animations
- **PeopleCard.tsx**: Team member display cards

---

## 💬 Visiomatix Chat - Backend (Spring Boot)

### 📁 Project Structure
```
visiomatix.chat/chat/
├── src/main/java/com/visiomatix/chat/chat/
│   ├── ChatApplication.java (Main application)
│   ├── config/ (Configuration classes)
│   │   ├── SecurityConfig.java
│   │   ├── WebSocketConfig.java
│   │   ├── DatabaseConfig.java
│   │   ├── WebConfig.java
│   │   ├── JwtAuthenticationFilter.java
│   │   ├── WebSocketAuthInterceptor.java
│   │   └── JwtAuthenticationEntryPoint.java
│   ├── user/ (User management module)
│   │   ├── controller/ (REST controllers)
│   │   │   ├── UserController.java
│   │   │   ├── RoleController.java
│   │   │   └── PermissionController.java
│   │   ├── service/ (Business logic)
│   │   │   ├── UserService.java & UserServiceImpl.java
│   │   │   ├── RoleService.java
│   │   │   ├── PermissionService.java
│   │   │   └── CustomUserDetailsService.java
│   │   ├── repository/ (Data access)
│   │   │   ├── UserRepository.java
│   │   │   ├── RoleRepository.java
│   │   │   ├── PermissionRepository.java
│   │   │   └── PrivilegeRepository.java
│   │   ├── model/ (JPA entities)
│   │   │   ├── User.java
│   │   │   ├── Role.java
│   │   │   ├── Permission.java
│   │   │   └── Privilege.java
│   │   ├── dto/ (Data transfer objects)
│   │   │   ├── UserDTO.java
│   │   │   ├── JwtResponseDTO.java
│   │   │   └── RoleDTO.java
│   │   └── util/ (Utilities)
│   │       ├── JwtUtil.java
│   │       └── DataSeeder.java
│   ├── chat/ (Chat module)
│   │   ├── controller/
│   │   │   ├── ChatController.java
│   │   │   ├── ChatMessageController.java
│   │   │   └── ChatWebSocketController.java
│   │   ├── service/
│   │   │   ├── ChatService.java & ChatServiceImpl.java
│   │   ├── repository/
│   │   │   ├── ChatSessionRepository.java
│   │   │   └── MessageRepository.java
│   │   ├── model/
│   │   │   ├── ChatSession.java
│   │   │   └── Message.java
│   │   ├── dto/
│   │   │   └── ChatMessagePayload.java
│   │   └── websocket/
│   │       └── WebSocketEventListener.java
│   ├── dashboard/ (Admin dashboard - empty)
│   └── exception/
│       └── GlobalExceptionHandler.java
├── src/main/resources/
│   ├── application.properties
│   └── migration/ (Database migrations)
└── pom.xml
```

### 🔧 Core Classes Explanation

#### **Main Application**
- **ChatApplication.java**: Spring Boot main class with @SpringBootApplication

#### **Configuration Classes**
- **SecurityConfig.java**: Spring Security configuration with JWT authentication, CORS, endpoint security
- **WebSocketConfig.java**: STOMP over SockJS configuration for real-time messaging
- **DatabaseConfig.java**: JPA and transaction management setup
- **WebConfig.java**: Web MVC configuration with CORS and logging
- **JwtAuthenticationFilter.java**: JWT token validation filter
- **WebSocketAuthInterceptor.java**: WebSocket authentication interceptor

#### **User Management Module**

##### **Models (JPA Entities)**
- **User.java**: User entity with authentication, roles, audit fields
- **Role.java**: Role entity with permissions and users relationships
- **Permission.java**: Permission entity for granular access control
- **Privilege.java**: Privilege entity (similar to permissions)

##### **DTOs (Data Transfer Objects)**
- **UserDTO.java**: User data serialization for API responses
- **JwtResponseDTO.java**: JWT authentication response structure
- **RoleDTO.java**: Role data transfer object

##### **Controllers (REST API)**
- **UserController.java**: User CRUD operations and authentication endpoints
- **RoleController.java**: Role management operations
- **PermissionController.java**: Permission management operations

##### **Services (Business Logic)**
- **UserService & UserServiceImpl**: User management business logic
- **RoleService**: Role management operations
- **PermissionService**: Permission operations
- **CustomUserDetailsService**: Spring Security user details service

##### **Repositories (Data Access)**
- **UserRepository**: JPA repository for User entity
- **RoleRepository**: JPA repository for Role entity
- **PermissionRepository**: JPA repository for Permission entity
- **PrivilegeRepository**: JPA repository for Privilege entity

##### **Utilities**
- **JwtUtil.java**: JWT token generation, validation, parsing
- **DataSeeder.java**: Database initialization with default users/roles

#### **Chat Module**

##### **Models (JPA Entities)**
- **ChatSession.java**: Chat session entity with participants, type, status
- **Message.java**: Message entity with content, sender, session, timestamps

##### **DTOs**
- **ChatMessagePayload.java**: Message payload for WebSocket communication

##### **Controllers**
- **ChatController.java**: REST API for chat sessions and messages
- **ChatMessageController.java**: Message-specific operations
- **ChatWebSocketController.java**: WebSocket message handling

##### **Services**
- **ChatService & ChatServiceImpl**: Chat business logic and operations

##### **Repositories**
- **ChatSessionRepository**: Chat session data access with custom queries
- **MessageRepository**: Message data access with complex queries

##### **WebSocket**
- **WebSocketEventListener.java**: WebSocket connection event handling

#### **Exception Handling**
- **GlobalExceptionHandler.java**: Centralized exception handling for consistent error responses

---

## 💬 Visiomatix Chat - Frontend (React)

### 📁 Project Structure
```
visiomatix.chat/frontend/
├── src/
│   ├── App.tsx (Main app)
│   ├── main.tsx (Entry point)
│   ├── index.css (Global styles)
│   ├── App.css (App-specific styles)
│   ├── components/
│   │   └── common/
│   │       └── PrivateRoute.tsx (Route protection)
│   └── services/
│       ├── ApiService.ts (HTTP client)
│       └── WebSocketService.ts (Real-time communication)
├── public/
└── package.json
```

### 🔧 Key Classes & Components

#### **Core Components**
- **App.tsx**: Main React application component
- **PrivateRoute.tsx**: Route protection with authentication and role checks

#### **Services**

##### **ApiService.ts**
- Comprehensive HTTP client with Axios
- JWT token management and automatic header injection
- Authentication methods (login, register, logout)
- Chat session management (create, get, close)
- Message operations (send, retrieve, mark as read)
- User management for admin operations
- Error handling and token expiration management

##### **WebSocketService.ts**
- STOMP over SockJS WebSocket connection
- JWT authentication for WebSocket sessions
- Message subscription and broadcasting
- Typing indicators and user status updates
- Connection management with auto-reconnect
- Event-driven architecture with handler registration

---

## 🔗 Class Relationships & Data Flow

### **Authentication Flow**
```
User Registration/Login
    ↓
JwtUtil.generateToken()
    ↓
JwtAuthenticationFilter validates token
    ↓
CustomUserDetailsService loads user details
    ↓
Role-based access control applied
```

### **Chat Message Flow**
```
REST API: ChatController/ChatMessageController
    ↓
ChatService processes business logic
    ↓
ChatSessionRepository/MessageRepository persist data
    ↓
WebSocket: ChatWebSocketController broadcasts
    ↓
WebSocketService receives and updates UI
```

### **User Management Flow**
```
UserController receives requests
    ↓
UserService implements business logic
    ↓
UserRepository accesses database
    ↓
UserDTO serializes response
```

---

## 📊 Database Schema

### **User Management Tables**
- **users**: User accounts with authentication data
- **roles**: User roles (ADMIN, USER, AGENT)
- **permissions**: Granular permissions
- **privileges**: Role privileges
- **user_roles**: Many-to-many user-role relationships
- **role_permissions**: Many-to-many role-permission relationships

### **Chat System Tables**
- **chat_sessions**: Chat conversations with metadata
- **messages**: Individual messages with content and metadata
- **session_participants**: Many-to-many session-user relationships

---

## 🚀 API Endpoints Summary

### **Authentication**
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login with JWT

### **User Management**
- `GET /api/users/{username}` - Get user details
- `PUT /api/users/{userId}` - Update user
- `DELETE /api/users/{userId}` - Delete user

### **Role Management**
- `POST /api/roles/create` - Create role
- `GET /api/roles/list` - List all roles
- `DELETE /api/roles/delete/{id}` - Delete role

### **Permission Management**
- `POST /api/permissions` - Create permission
- `GET /api/permissions` - List permissions
- `DELETE /api/permissions/{id}` - Delete permission

### **Chat Sessions**
- `GET /api/chat/sessions` - Get user sessions
- `POST /api/chat/sessions` - Create session
- `GET /api/chat/sessions/{id}` - Get session details
- `POST /api/chat/sessions/{id}/participants/{userId}` - Add participant
- `DELETE /api/chat/sessions/{id}` - Close session

### **Messages**
- `GET /api/chat/sessions/{id}/messages` - Get message history
- `GET /api/chat/sessions/{id}/messages/recent` - Get recent messages
- `POST /api/chat/sessions/{id}/messages/mark-read` - Mark as read
- `GET /api/chat/sessions/{id}/unread-count` - Get unread count
- `GET /api/chat/sessions/{id}/messages/search` - Search messages

### **Admin/Dashboard**
- `GET /api/chat/admin/statistics` - Chat statistics
- `GET /api/chat/admin/active-sessions-count` - Active sessions count

### **WebSocket Endpoints**
- `/app/chat/{sessionId}/send` - Send message
- `/topic/chat/{sessionId}` - Receive messages
- `/app/chat/{sessionId}/typing` - Send typing indicator
- `/topic/typing/{sessionId}` - Receive typing indicators
- `/topic/user/status` - User status updates

---

## 🔒 Security Implementation

### **JWT Authentication**
- Token generation and validation via JwtUtil
- Automatic token refresh and expiration handling
- Secure password storage with proper encoding

### **Role-Based Access Control**
- Hierarchical roles: ADMIN > AGENT > USER
- Permission-based authorization
- Session participant verification for chat access

### **WebSocket Security**
- JWT authentication for WebSocket connections
- Channel interceptor for message authorization
- Real-time session validation

---

## 📈 Key Features & Capabilities

### **Real-Time Communication**
- WebSocket with STOMP protocol
- Typing indicators and read receipts
- User online/offline status
- Instant message delivery

### **Scalable Architecture**
- RESTful API design
- Microservices-ready structure
- Database optimization with indexes
- Connection pooling and caching

### **User Experience**
- Responsive design across devices
- Smooth animations and transitions
- Real-time updates without page refresh
- Intuitive user interfaces

### **Admin Features**
- User management dashboard
- Chat statistics and monitoring
- Role and permission administration
- System health monitoring

---

*This mind map provides a comprehensive overview of the Visiomatix project structure, all classes, their relationships, and functionality. The project demonstrates modern full-stack development with React, Spring Boot, real-time communication, and robust security implementation.*
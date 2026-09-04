# Sarovar SmartStay — Intelligent Hotel Management System
> **AI-Powered Hotel Management, Analytics & Security Platform**  
> *Hotel Sarovar, Boisar, Maharashtra, India*

[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Spring%20Boot%20%7C%20MySQL%20%7C%20AI%20%7C%20Cybersecurity-amber)](https://github.com)
[![Implementation MVP](https://img.shields.io/badge/Implementation-40--50%25%20MVP-emerald)](https://github.com)

---

## 📌 Project Overview
**Sarovar SmartStay** is an enterprise-grade full-stack Intelligent Hotel Management System developed for **Hotel Sarovar, Boisar, Maharashtra**. It integrates three core subjects into a unified production architecture:
1. **Internet Programming**: Built with React.js (Frontend), Java Spring Boot (REST API Backend), Spring Data JPA, and MySQL.
2. **Artificial Intelligence**: Features real-time food recommendations, moving-average 7-day inventory demand prediction, weekly room occupancy forecasting, and staffing optimization with **Explainable AI ("Why?")** cards.
3. **Cybersecurity**: Features BCrypt password hashing (`$2a$10$`), stateless JWT bearer token authentication, Role-Based Access Control (RBAC), and real-time security audit logging.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Analytics & Charts**: Recharts
- **Design System**: SaaS Hospitality aesthetic (Deep Navy `#0f172a`, Warm Gold `#d97706`, Soft Shadows)

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 3.2.3
- **Security**: Spring Security + JJWT (JSON Web Token)
- **ORM**: Spring Data JPA / Hibernate
- **Database**: Dual Configuration (H2 In-Memory for zero-friction instant demo + MySQL Production Schema)
- **Build Tool**: Apache Maven

---

## 📁 Directory Structure
```
sarovar-smartstay/
│
├── database/
│   ├── schema.sql                 # Production MySQL DDL Schema
│   └── seed.sql                   # 35 Rooms, 55+ Sarovar Menu Items, Users, Bookings & Audit Logs
│
├── backend/
│   ├── pom.xml                    # Maven configuration
│   └── src/main/
│       ├── resources/
│       │   ├── application.yml    # Spring Boot Configuration
│       │   └── schema-h2.sql      # Auto H2 Schema for instant zero-config launch
│       └── java/com/sarovar/smartstay/
│           ├── SmartStayApplication.java
│           ├── config/            # SecurityConfig, JwtAuthenticationFilter, CorsConfig
│           ├── controller/        # Auth, Room, Booking, Customer, Employee, Restaurant, Inventory, AI, Security controllers
│           ├── dto/               # Request & Response DTOs
│           ├── entity/            # JPA Entities (User, Role, Room, Booking, Customer, MenuItem, etc.)
│           ├── repository/        # Spring Data JPA Repositories
│           ├── security/          # JwtTokenProvider, UserDetailsServiceImpl, UserPrincipal
│           └── service/           # Business logic & AI Recommendation/Prediction Services
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── index.css              # Sarovar Design System
│       ├── App.jsx                # Router & Guarded Routes
│       ├── context/               # AuthContext
│       ├── services/              # API Client & Axios Endpoints
│       ├── components/common/     # Navbar, Sidebar, DashboardCard, StatusBadge, Modal
│       └── pages/                 # Public, Admin, Receptionist, Housekeeping & Customer Portals
│
├── .env.example
└── README.md
```

---

## 🔑 Role-Based Demo Credentials

The system includes pre-seeded demo accounts with BCrypt-hashed passwords:

| Role | Username / Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin@sarovar.com` | `Admin@123` | Master KPI Dashboard, Rooms, Bookings, Customers, Staff, AI Center, Security Center, Reports |
| **RECEPTIONIST** | `reception@sarovar.com` | `Reception@123` | Front Desk, Room Grid, Booking Manager, Check-in / Check-out |
| **RESTAURANT STAFF** | `restaurant@sarovar.com` | `Restaurant@123` | Kitchen Orders Desk, Menu Catalog, Inventory |
| **HOUSEKEEPING** | `housekeeping@sarovar.com` | `House@123` | Assigned Rooms to Clean, Room State Workflow (`CLEANING` ➔ `AVAILABLE`) |
| **CUSTOMER** | `customer@sarovar.com` | `Customer@123` | Customer Portal, Room Booking Wizard, Pure Veg Ordering, AI Recommendations |

---

## 🚀 How to Run the Application

### 1. Database Setup
- **Zero-Friction Option (Default)**: The Spring Boot backend includes an embedded H2 database pre-populated with all 35 rooms, 55+ Sarovar Pure Veg menu items, customers, bookings, and logs. It starts automatically without installing MySQL.
- **MySQL Option**: Import `database/schema.sql` and `database/seed.sql` into MySQL Server:
  ```bash
  mysql -u root -p < database/schema.sql
  mysql -u root -p sarovar_smartstay < database/seed.sql
  ```

### 2. Backend Setup (Spring Boot)
Open terminal in `/backend`:
```bash
cd backend
mvn spring-boot:run
```
> The REST API server will start on **`http://localhost:8080`**.

### 3. Frontend Setup (React.js)
Open terminal in `/frontend`:
```bash
cd frontend
npm install
npm run dev
```
> The React web application will open on **`http://localhost:5173`**.

---

## 🤖 Artificial Intelligence Features & Viva Explainability

1. **Food Recommendation Engine (`GET /api/ai/recommendations/{customerId}`)**:
   - **Algorithm**: Content-based co-occurrence matrix pairing main dishes (e.g. *Paneer Tikka Masala*) with breads (*Butter Naan*), lentils (*Dal Tadka*), and drinks (*Mango Lassi*).
   - **Explainability Card**: "Algorithm Score: Matched customer preference for rich Punjabi & Tandoor delicacies based on co-occurrence matrix."
2. **Inventory Demand Prediction (`GET /api/ai/inventory-predictions`)**:
   - **Algorithm**: 7-day moving consumption formula: `Demand = Safety Threshold × 1.8`. Automatically flags `HIGH` risk and generates reorder quantities when stock falls below safety levels (e.g. *Fresh Paneer*).
3. **Hotel Occupancy Prediction (`GET /api/ai/occupancy-prediction`)**:
   - **Algorithm**: Time-series forecast based on historical Saturday peak trends in Boisar MIDC corporate hub and reservation velocity.
4. **Staffing Optimization (`GET /api/ai/staffing-insights`)**:
   - **Algorithm**: Roster optimization recommending shift counts for Housekeeping, Reception, Kitchen, and Security based on predicted weekend occupancy.

---

## 🔒 Cybersecurity Features & Viva Presentation Guide

1. **BCrypt Password Hashing**: Passwords stored as `$2a$10$...` hashes. Plaintext passwords are never logged or stored.
2. **JWT Authentication**: Issued upon login via `JwtTokenProvider`, passed in the `Authorization: Bearer <token>` HTTP header.
3. **Role-Based Access Control (RBAC)**: REST endpoints protected using Spring Security method authority matchers.
4. **Security Audit Logs (`security_logs`)**: Automatically records events (e.g., `USER_LOGIN`, `FAILED_LOGIN_ATTEMPT`, `UPDATE_ROOM_STATUS`, `CHECK_IN`) with IP addresses, timestamps, and threat risk scoring.

---

## 🎬 College Viva Demonstration Flow

1. **Demo 1 — Customer Flow**:
   - Log in as `customer@sarovar.com` / `Customer@123`.
   - Browse rooms, create a room reservation, browse the 100% Pure Veg menu, view AI food recommendations, and place a kitchen order.
2. **Demo 2 — Receptionist Flow**:
   - Log in as `reception@sarovar.com` / `Reception@123`.
   - View room occupancy grid, click **Perform Check-in** on a confirmed booking (room turns `OCCUPIED`), click **Perform Check-out** (room turns `CLEANING`).
3. **Demo 3 — Housekeeping Workflow**:
   - Log in as `housekeeping@sarovar.com` / `House@123`.
   - Locate the room marked `CLEANING`, click **Mark Cleaned & Available** (room turns `AVAILABLE` automatically).
4. **Demo 4 — Admin AI & Cybersecurity Control**:
   - Log in as `admin@sarovar.com` / `Admin@123`.
   - Inspect master KPI cards, open **AI Intelligence Center** (review 5 AI explainability cards), open **Security Center** (review login audit logs & threat levels).

---

## 📊 Current Implementation Status: 40–50% MVP
- **Completed**: React frontend design system, Spring Boot REST backend, JWT authentication, MySQL/H2 schemas, 35-room management, booking flow, customer directory, employee roster, 55+ Sarovar Pure Veg menu catalog, ordering cart, inventory alerts, 5 AI forecasting/recommendation modules, security logs, and role-based portals.
- **Future Scope (Remaining 50–60%)**: Production Razorpay payment gateway integration, real-time WebSocket notifications, advanced machine learning model training (Python Scikit-Learn/TensorFlow sidecar), and multi-property management.

---

**Developed for**: Capstone Project Evaluation — Sarovar Hotel, Boisar  
**Authors**: College Capstone Engineering Team

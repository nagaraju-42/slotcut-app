# SlotCut Backend - Spring Boot API

Production-ready salon booking management backend with JWT authentication, PostgreSQL database, and Flyway migrations.

## Features

- **User Authentication**: Phone + PIN-based login with JWT tokens
- **Salon Management**: CRUD operations for salons and services
- **Booking System**: Complete booking lifecycle management
- **Queue Tracking**: Real-time position tracking in salon queues
- **Email Notifications**: Automated booking confirmations and updates
- **Database Migrations**: Flyway version control for schema changes
- **CORS Support**: Pre-configured for frontend integration
- **Security**: BCrypt password hashing, JWT validation, role-based access

## Tech Stack

- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL 15
- **ORM**: Spring Data JPA
- **Security**: Spring Security, JWT (jjwt)
- **Migration**: Flyway 9.22.3
- **Build**: Gradle 8.4
- **Java**: OpenJDK 17

## Database Migrations

All migrations are in `src/main/resources/db/migration/`:

- **V1__Initial_Schema.sql**: Core tables (users, salons, services, bookings, slots, notifications)
- **V2__Add_Sample_Data.sql**: Demo data for testing
- **V3__Add_JWT_Token_Table.sql**: Refresh token management
- **V4__Add_Rating_and_Reviews.sql**: Review and rating system
- **V5__Add_Email_Notifications.sql**: Email notification logs

## Quick Start

### Local Development

#### Prerequisites
- JDK 17+
- PostgreSQL 15+
- Gradle 8.4+

#### Setup

1. **Clone and navigate**
   ```bash
   cd slotcut-backend
   ```

2. **Configure database** in `src/main/resources/application.yml`
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/slotcut
       username: postgres
       password: postgres
   ```

3. **Build the project**
   ```bash
   gradle build
   ```

4. **Run the application**
   ```bash
   gradle bootRun
   ```

   API will be available at `http://localhost:8080/api`

### Docker Deployment

#### Using Docker Compose (Recommended)

```bash
# From project root
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Backend on port 8080
- Frontend on port 3000

Verify backend health:
```bash
curl http://localhost:8080/api/health
```

#### Using Docker alone

```bash
# Build image
docker build -t slotcut-backend:1.0.0 ./slotcut-backend

# Run container
docker run -e DB_HOST=host.docker.internal \
           -e DB_PASSWORD=postgres \
           -p 8080:8080 \
           slotcut-backend:1.0.0
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with phone and PIN
- `GET /api/auth/health` - Server health check

### Salons
- `GET /api/salons` - List all salons
- `GET /api/salons/{salonId}` - Get salon details
- `GET /api/salons/owner/{ownerId}` - Get owner's salons
- `GET /api/salons/city/{city}` - Get salons by city
- `POST /api/salons` - Create salon (owner only)
- `PUT /api/salons/{salonId}` - Update salon (owner only)

### Bookings
- `POST /api/bookings` - Create new booking (requires auth)
- `GET /api/bookings/student/{studentId}` - Get student's bookings
- `GET /api/bookings/salon/{salonId}` - Get salon's bookings
- `GET /api/bookings/salon/{salonId}/today` - Get today's bookings
- `GET /api/bookings/{bookingId}` - Get booking details
- `PUT /api/bookings/{bookingId}/cancel` - Cancel booking

### Request Headers
```
Authorization: Bearer {accessToken}
X-User-Id: {userId}
```

## Sample Login Credentials

Pre-seeded in database migrations:

**Owner Account**
- Phone: 9876543210
- PIN: 1234
- Type: OWNER

**Student Accounts**
- Phone: 9123456789, PIN: 1234
- Phone: 9234567890, PIN: 1234
- Phone: 9345678901, PIN: 1234

## Environment Variables

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=slotcut
DB_USER=postgres
DB_PASSWORD=postgres

# Server
SERVER_PORT=8080

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000
```

## Free Deployment

### Railway (Recommended - $5/month PostgreSQL)

1. **Create Railway project**
   ```bash
   railway init
   ```

2. **Add PostgreSQL plugin**
   - Dashboard → Plugins → PostgreSQL

3. **Deploy backend**
   ```bash
   railway up
   ```

4. **Environment variables in Railway dashboard**
   - `JWT_SECRET`: Generate a strong secret
   - `DB_*`: Auto-populated from PostgreSQL plugin

### Heroku (Free tier ending - Render alternative)

Use Render.com with free PostgreSQL tier (200MB).

### Local VPS (DigitalOcean $4/month)

```bash
# SSH into server, then:
docker-compose up -d
```

## Project Structure

```
slotcut-backend/
├── src/main/
│   ├── java/com/slotcut/
│   │   ├── entity/           # JPA entities
│   │   ├── repository/       # Spring Data repositories
│   │   ├── service/          # Business logic
│   │   ├── controller/       # REST endpoints
│   │   ├── dto/              # Data transfer objects
│   │   ├── security/         # JWT and auth config
│   │   ├── config/           # Spring configuration
│   │   └── SlotcutApplication.java
│   └── resources/
│       ├── db/migration/     # Flyway SQL migrations
│       ├── application.yml   # Configuration
│       └── static/           # Static assets
├── build.gradle
├── Dockerfile
└── README.md
```

## Database Schema

### Users
Stores student and owner accounts with PIN authentication.

### Salons
Salon information, ratings, and operational hours.

### Services
Services offered by salons (haircut, color, etc.)

### Booking Slots
Available time slots for each service.

### Bookings
Confirmed reservations with student details.

### Queue Positions
Real-time queue position and wait estimates.

### Notifications
System-generated alerts for bookings and updates.

### Reviews
Customer ratings and feedback.

## Development Tips

### Enable SQL Logging
```yaml
spring:
  jpa:
    show-sql: true
```

### Run Tests
```bash
gradle test
```

### Generate Jar
```bash
gradle bootJar
```

### Database Reset
```bash
# Drop and recreate (Flyway baseline)
gradle flywayClean flywayMigrate
```

## API Testing

### Using cURL

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210",
    "pin": "1234",
    "userType": "OWNER"
  }'

# Get salons
curl http://localhost:8080/api/salons

# Create booking
curl -X POST http://localhost:8080/api/bookings \
  -H "Content-Type: application/json" \
  -H "X-User-Id: {userId}" \
  -d '{
    "salonId": "...",
    "serviceId": "...",
    "bookingDate": "2024-01-20",
    "startTime": "10:00",
    "endTime": "10:30",
    "studentName": "Arjun Verma",
    "studentPhone": "9123456789"
  }'
```

### Using Postman

Import the API collection from `/docs/postman-collection.json` (to be created).

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DB_HOST, DB_USER, DB_PASSWORD in environment
- Ensure port 5432 is not blocked

### Migration Failed
- Check Flyway logs: `Caused by: org migration error`
- Verify SQL syntax in migration files
- Use `gradle flywayInfo` to check migration status

### JWT Validation Failed
- Ensure JWT_SECRET is set in environment
- Check token expiration: `expiresAt` in token payload
- Refresh token if expired

## Performance Optimization

- Add database indexes (already included in V1)
- Enable connection pooling (HikariCP default)
- Use caching for salon listings
- Implement pagination for large result sets

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS in production
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Use environment secrets manager
- [ ] Enable audit logging
- [ ] Regular security updates

## License

MIT License - See LICENSE file

## Support

Issues? Questions?
- GitHub Issues: [Project Repository]
- Email: support@slotcut.com

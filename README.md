E-commerce Microservices
A scalable e-commerce platform built with microservices architecture, similar to Jumia or Amazon.
Technology Stack

Frontend: React
Backend: Node.js with Express.js
Database: MongoDB
Message Broker: RabbitMQ (planned for future implementation)
Containerization: Docker and Docker Compose

Microservices Architecture
This project is structured as a collection of microservices:

API Gateway: Routes requests to appropriate services
Product Service: Manages product information and catalog
Order Service: Handles order processing and management
User Service: Manages user accounts and profiles
Inventory Service: Tracks product stock and availability

Future planned services:

Authentication Service: Handles user authentication and authorization
Payment Service: Processes payments
Review Service: Manages product reviews and ratings

Getting Started
Prerequisites

Docker and Docker Compose
Node.js (v14 or higher)
npm (v6 or higher)

Installation

Clone the repository:
git clone https://github.com/your-username/e-commerce-microservices.git
cd e-commerce-microservices

Create the necessary .env files in each service directory or use the default ones provided.
Build and start the services:
docker-compose up --build

Access the application:

Frontend: http://localhost:8080
API Gateway: http://localhost:3000
Swagger Documentation: http://localhost:3000/api-docs



Development
Service Structure
Each microservice follows a similar structure:

src/index.js: Entry point
src/routes/: API route definitions
src/controllers/: Business logic handlers
src/models/: Data models
src/services/: Service layer with business logic
src/config/: Configuration files

Adding a New Service

Create a new directory for your service
Add Dockerfile and necessary files following the existing pattern
Update docker-compose.yaml to include your service
Add service URL to api-gateway configuration

Testing
Each service can be tested independently:
cd service-name
npm test
API Documentation
API documentation is available through Swagger:

http://localhost:3000/api-docs

Deployment
Instructions for deploying to production environments will be added in the future.
License
This project is licensed under the MIT License - see the LICENSE file for details.
# Full Stack School Project

## Overview
This project is a full-stack web application for managing school-related data, including classes, students, lessons, events, announcements, and attendance. It is built using Next.js, React, Prisma, and PostgreSQL. This project was developed following the tutorial by Lama Dev on YouTube, specifically for the school brainland.bg.

## Features

### 1. **Class Management**
   - **Create, Read, Update, Delete (CRUD) Operations**: Users can manage classes through a user-friendly interface.
   - **Implementation**: Classes are stored in a PostgreSQL database using Prisma as the ORM. The frontend uses React components to interact with the backend API.

### 2. **Student Management**
   - **CRUD Operations**: Students can be added, viewed, updated, and deleted.
   - **Implementation**: Similar to class management, students are stored in the database, and the frontend provides a form for managing student data.

### 3. **Lesson Management**
   - **CRUD Operations**: Lessons can be created, viewed, updated, and deleted.
   - **Implementation**: Lessons are linked to classes, allowing for easy filtering and management.

### 4. **Event Management**
   - **CRUD Operations**: Events can be created, viewed, updated, and deleted.
   - **Implementation**: Events are stored in the database, and the frontend provides a form for managing event data.

### 5. **Announcement Management**
   - **CRUD Operations**: Announcements can be created, viewed, updated, and deleted.
   - **Implementation**: Announcements can be targeted to specific classes or all classes, with a dropdown menu for selection.

### 6. **Attendance Marking**
   - **Mark Attendance**: Teachers can mark attendance for students in specific classes and lessons.
   - **Implementation**: The attendance marking form allows for selecting a class and lesson, and then marking attendance for each student.

## Technical Details

### Frontend
- **Next.js**: The project uses Next.js for server-side rendering and routing.
- **React**: React components are used for building the user interface.
- **React Hook Form**: Used for form handling and validation.
- **Zod**: Used for schema validation of form inputs.

### Backend
- **Prisma**: Used as the ORM to interact with the PostgreSQL database.
- **PostgreSQL**: The database stores all the data related to classes, students, lessons, events, announcements, and attendance.

### API
- **RESTful API**: The backend provides a RESTful API for CRUD operations on the various entities.

## Getting Started
1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up the Database**:
   - Ensure PostgreSQL is running and create a database.
   - Update the `.env` file with your database connection string.
4. **Run Migrations**:
   ```bash
   npx prisma migrate dev
   ```
5. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## Conclusion
This project demonstrates a full-stack application with a focus on managing school-related data. It showcases the use of modern web technologies and best practices in software development.
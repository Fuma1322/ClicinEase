# ClinicEase

## From Screen to Clinic, Your Health is in Your Hands

---

![ClinicEase Screenshot](path/to/screenshot.png) <!-- Make sure to replace this path with the actual path to your screenshot -->

---

## Introduction

ClinicEase is a comprehensive healthcare management application designed to streamline appointment scheduling, improve resource utilization, and enhance patient convenience. By eliminating long queues at clinics and enabling users to book appointments online, ClinicEase optimizes clinic workflows and reduces waiting times.

- **Deployed Site**: [ClinicEase](https://www.clinicease.tech)
- **Project Blog Article**: [ClinicEase Final Project](https://link-to-blog-article)
- **Team LinkedIn Profiles**:
  - [Mokonyana Emmanuel Ntsoereng](https://www.linkedin.com/in/mokonyana​-ntsoereng-b4367795/)
  - [Tankiso Leonard Fuma](https://www.linkedin.com/in/tankiso​-leonard-fuma-2b16352a5/)
  - [Thetele Ramoonyane](https://www.linkedin.com/in/thetele-​ramoonyane-982312291/)

---

## Project Name

**ClinicEase**

---

## Team Members and Roles

- **Project Manager**: Mokonyana Ntsoereng
- **Frontend Developer**: Tankiso Leonard Fuma
- **Backend Developer**:  Thetele Ramoonyane

---

## Technologies

### Front-End

- **Next.js**: A powerful React framework that simplifies web development with features like server-side rendering and static generation.
- **TailwindCSS**: Used for styling due to its performance, developer experience, and vibrant community.

### Back-End

- **Node.js**: Chosen for its high performance and low overhead, utilizing an event-driven architecture and non-blocking I/O for efficient request handling.
- **MongoDB**: Selected for its flexibility with data schemas, accommodating the evolving needs of the project.
- **Prisma**: was used as our ORM due to its type safety and ease of use with TypeScript.
- **Resend**: An email delivery service used for sending transactional emails, such as welcome emails and notifications, ensuring reliable email communication with users.

### Project Management

- **Trello**: A web-based project management tool that helps organize tasks, track progress, and collaborate effectively within the team.

### UI/UX Design

- **Balsamiq**: A vector graphics editor and prototyping tool used for designing user interfaces, creating wireframes, and collaborating on design projects in real-time.


## Challenge Statement

### Problem to Solve

ClinicEase helps streamline appointment scheduling, improve resource utilization, and enhance patient convenience by eliminating long queues at clinics. It enables users to book appointments online, reducing waiting times and optimizing clinic workflows.

### What It Won’t Solve

While ClinicEase offers valuable tools for appointment management and patient access, it does not address broader systemic issues such as healthcare infrastructure, accessibility, quality of care, affordability, social determinants of health, emergency care, and data privacy.

### Target Users

ClinicEase benefits patients and Healthcare centres by improving access to care and facilitating better patient-provider interactions.

## Installation

To set up the ClinicEase project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Fuma1322/clinicease.git
    cd clinicease
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add necessary environment variables as outlined in `.env.example`.

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. **Open the app in your browser**:
    ```
    http://localhost:3000
    ```

---

## Usage

1. **User Registration**: Register an account by providing personal details.
2. **Appointment Booking**: Search for doctors based on location or specialty and book an appointment.
3. **Appointment Management**: View, manage, and cancel appointments.
4. **Notifications**: Receive email notifications for appointment reminders and confirmations.

---

## Contributing

We welcome contributions from the community! To contribute, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**.
4. **Commit your changes**: `git commit -m 'Add some feature'`
5. **Push to the branch**: `git push origin feature/your-feature-name`
6. **Create a pull request**.

---

## Related Projects

- **Zoho Bookings**: Offers a broader scope of services with global reach.
- **ClinicEase vs. Zoho Bookings**:
  - Scope and Reach: Zoho Bookings has global reach, while ClinicEase focuses on the local community of Lesotho.
  - Customization vs. Localization: Zoho Bookings provides global customization options, while ClinicEase prioritizes localization and community engagement.

---

## Licensing

This project is licensed under the Gorvenment of Lesotho License. See the [LICENSE](LICENSE) file for more information.

---

## APIs

### User Authentication Routes

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Authenticate and log in a user.
- `POST /api/auth/logout`: Log out a user.

### User Profile Routes

- `GET /api/user/profile`: Fetch user profile information.
- `POST /api/user/profile/update`: Update user profile information.

### Appointment Booking Routes

- `GET /api/appointments`: Fetch all appointments.
- `POST /api/appointments/book`: Book a new appointment.
- `POST /api/appointments/cancel/:id`: Cancel an appointment by ID.
- `GET /api/appointments/:id`: Fetch a specific appointment by ID.

### Doctor Information Routes

- `GET /api/doctors`: Fetch all doctors.
- `GET /api/doctors/:id`: Fetch doctor information by ID.

### Search Routes

- `GET /api/search/doctors`: Search for clinics based on filters like location, specialty, etc.

### 3rd Party APIs

- **Google Maps API**: Provides geolocation and mapping services.
  - Usage: Display clinic locations on a map, provide directions to clinics, and show nearby amenities.
- **Resend API**: Integrates email services.
  - Usage: Send appointment reminders and notify users of appointment changes via email.
- **NextAuth Authentication API**: Provides authentication and user management services.
  - Usage: Handle user registration, login, and logout functionalities securely.

---

## User Stories

### User Registration

As a new user, I want to register an account on ClinicEase.
- Provide username, email, password, name, phone number, and address.
- Receive a confirmation email to verify the account.
- Receive error messages for invalid or incomplete information during registration.

### Appointment Booking

As a registered user, I want to book an appointment using ClinicEase.
- Search for clinics based on location or specialty.
- View available appointments, choose a slot, and confirm the booking.
- Receive an email confirmation with appointment details.
- Be notified if the selected slot is no longer available.

### Appointment Management

As a registered user, I want to manage my appointments on ClinicEase.
- View a list of upcoming appointments and their details.
- Cancel appointments with confirmation prompts.
- Receive an email confirmation upon cancellation.
- Be notified if cancellation is no longer possible within a certain timeframe.

### Notifications and Reminders

As a user, I want to receive notifications and reminders on ClinicEase.
- Receive email reminders for upcoming appointments.

### Administrative Functions

As an administrator, I want to handle admin roles on ClinicEase.
- Manage user accounts and permissions.
- View analytics and reports on appointment scheduling and usage patterns.

---

## Conclusion

ClinicEase represents a significant advancement in healthcare management, providing convenience and efficiency for both patients and doctors. Despite challenges, the project's successful implementation of core features and robust security measures demonstrates the team's resilience and dedication. Further development and refinement will ensure ClinicEase continues to meet the evolving needs of its users.

For detailed information about the project, please refer to the following:
- **Deployed Site**: [ClinicEase](https://www.clinicease.tech)
- **Project Blog Article**: [ClinicEase Final Project](https://link-to-blog-article)

---

*Thank you for considering ClinicEase. We look forward to collaborating with you!*

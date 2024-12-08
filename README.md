# TaskifyPro - Company Task and Workflow Management

TaskifyPro is a task and workflow management application designed to streamline task assignments, monitor progress, and improve productivity for companies. It features role-based dashboards for Managers and Employees, ensuring efficient collaboration and task management.

---

## 🚀 Demo

[Live Demo Link](https://taskify-pro-inky.vercel.app/) _(Replace this with the actual deployed app link)_

---

## 🌟 Features

### Common Features:

- Secure login with role-based access.
- Dark and light themes.
- Notifications and reminders (email or in-app).

### Manager Features:

- **Task Management:** Create tasks with details, assign to employees, set priorities, and deadlines.
- **Team Management:** Add or remove employees and manage roles.
- **Reports and Analytics:** Track task progress, employee performance, and workload.
- **Project Management:** Group tasks under projects.

### Employee Features:

- **Task Dashboard:** View assigned tasks with deadlines and priorities.
- **Task Updates:** Mark tasks as completed or in progress and provide feedback.
- **Personal Calendar:** Manage deadlines and schedules.
- **Collaboration:** Request assistance or escalate tasks to managers.

### Extra Features:

- **Kanban Board:** Drag-and-drop task management.
- **Time Tracking:** Log time spent on tasks.

---

## 🛠️ Technologies Used

### Frontend:

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit or Context API

### Backend:

- **Framework:** Node.js or NestJS
- **Database:** MongoDB
- **Authentication:** JWT

---

## 📂 Project Setup

### Prerequisites

1. Ensure Node.js (v16 or higher) and npm/yarn are installed.
2. Install Git.

### Steps to Run the Application Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/TaskifyPro.git
   cd TaskifyPro
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=https://taskifypro.onrender.com
   ```

4. **Run the Development Server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit http://localhost:3001 in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🔧 Usage

### Workflow:

1. **Sign Up:** Register as a Manager or Admin.
2. **Create Workers:** Managers can create workers from the dashboard.
3. **Assign Tasks:** Managers can assign tasks to workers and track their progress.

### Role-Based Dashboards:

- **Manager Dashboard:** Task creation, assignment, and tracking.
- **Employee Dashboard:** Task updates, feedback, and collaboration.

---

## 🌈 Theming

- Toggle between **dark** and **light** themes using the theme switcher in the app.

---

## 🧩 File Structure

```
TaskifyPro/
├── app/              # Next.js app directory (routes)
├── components/       # Reusable UI components
├── public/           # Static assets
├── redux/            # Redux Toolkit setup (if applicable)
├── lib/            # Utility functions
└── .env              # Environment variables (excluded from Git)
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 📬 Contact

For any questions or feedback, reach out at: sreejithspillai.dev@gmail.com

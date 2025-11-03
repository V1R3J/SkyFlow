# Cloud-Based File Management System

A modern cloud-based file management system built with **Next.js** (frontend) and **Node.js** (backend). This project allows users to upload, manage, and share files securely in the cloud.

---

## 🚀 Features

- User authentication & authorization
- Upload, download, and delete files
- Folder creation and management
- Cloud storage integration
- File sharing via links
- Role-based access control
- File versioning
- Responsive UI with Next.js
- RESTful API backend with Node.js

---

## 🛠 Tech Stack

### Frontend
- **Next.js** ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
- **React** ![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white)
- **Tailwind CSS** ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-blue?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
- **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge&logo=node.js&logoColor=white)
- **Express.js** ![Express](https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express&logoColor=white)
- **MongoDB** ![MongoDB](https://img.shields.io/badge/MongoDB-brightgreen?style=for-the-badge&logo=mongodb&logoColor=white)
- **Mongoose** for ODM
- **JWT** for authentication
- **Cloud Storage** (AWS S3, GCP, Azure)

### Dev Tools
- **ESLint** & **Prettier** for code quality
- **Nodemon** for backend development
- **Vercel** for frontend deployment
- **Postman** for API testing

---

## 📂 File Structure

```bash
root
├── api/                  # Backend folder
│   ├── controllers/      # Request handlers
│   ├── models/           # Database models (User, File, Folder)
│   ├── routes/           # API routes
│   ├── services/         # Business logic, cloud storage integrations
│   ├── middlewares/      # Auth, error handling, validation
│   ├── utils/            # Helper functions
│   ├── config/           # DB and environment configurations
│   └── server.js         # Entry point for backend server
│
├── client/               # Frontend folder (Next.js)
│   ├── components/       # Reusable components (Navbar, FileCard, etc.)
│   ├── pages/            # Next.js pages
│   │   ├── api/          # Next.js API routes (if any)
│   │   ├── index.js      # Homepage
│   │   ├── login.js
│   │   ├── dashboard.js
│   │   └── files.js
│   ├── styles/           # CSS / Tailwind styles
│   └── public/           # Static assets
│
├── .env                  # Environment variables
├── package.json           # Root package.json (optional)
└── README.md

# Setup Instructions

## Setup Instructions

### Backend (Node.js + Express)

1. Navigate to the backend folder:

```bash
cd api
```

2. Install dependencies:

```bash
npm install
```

3. Setup environment variables in `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUD_STORAGE_KEY=your_cloud_storage_key
```

4. Start the backend server:

```bash
npm run dev
```

Ensure you have `nodemon` installed for live reload.

### Frontend (Next.js)

1. Navigate to the frontend folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at http://localhost:3000

## 🔗 Additional Functionalities

* **Search & Filter Files**: Easily locate files using search keywords.
* **File Previews**: Preview images, PDFs, and documents before download.
* **Cloud Sync**: Automatic sync to cloud storage (AWS S3 / GCP / Azure).
* **Notifications**: Email or in-app notifications for shared files or folder updates.
* **Activity Logs**: Track user activity and file modifications.

## 📝 Contribution

1. Fork the repository

2. Create your feature branch:

```bash
git checkout -b feature/YourFeature
```

3. Commit your changes:

```bash
git commit -m 'Add some feature'
```

4. Push to the branch:

```bash
git push origin feature/YourFeature
```

5. Open a Pull Request

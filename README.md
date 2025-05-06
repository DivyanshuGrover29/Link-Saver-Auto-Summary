# Link Saver + Auto Summary Application

A full-stack application for saving and organizing web links with automatic metadata extraction.

## 🚀 Live Demo

[View Live Application](https://link-saver-auto-summary-xi.vercel.app)  

## ✨ Features
- User authentication (JWT)
- Save URLs with automatic metadata extraction
- View saved links in chronological order
- Delete unwanted links
- Responsive design

## 🛠 Tech Stack
### Frontend
- React.js
- Axios for API calls
- React Toastify for notifications
- CSS-in-JS for styling

### Backend
- Node.js with Express
- MongoDB (Mongoose ODM)
- JWT for authentication
- Axios for external API calls

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 🏗 Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/link-saver.git
   cd link-saver

2. Backend Setup
cd Link-Saver-Backend
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev


3. Frontend Setup
cd link-saver-frontend
npm install
npm run dev


## Environment Variables
Backend (.env)

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=8000

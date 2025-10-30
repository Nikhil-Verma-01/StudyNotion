# 📚 StudyNotion – An Ed-Tech Platform  

**StudyNotion** is a fully functional **MERN-stack**-based ed-tech platform that enables users to **create, consume, and rate educational content**.  
It provides a seamless learning experience for students and a platform for instructors to share their expertise globally.  

---

##  Overview  

**Tech Stack:**  
- **Frontend:** React.js, Redux, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (MongoDB Atlas)  
- **Media Management:** Cloudinary  
- **Deployment:**  
  - Frontend → Vercel  
  - Backend → Render / Railway  
  - Database → MongoDB Atlas  

---

##  Key Features  

### 👨‍🎓 For Students
- Browse and enroll in courses  
- Maintain a wishlist  
- Watch course content and track progress  
- Rate and review courses  
- Manage profile details  

### 👨‍🏫 For Instructors
- Create, update, and delete courses  
- Upload and manage content via Cloudinary  
- View course insights and ratings  
- Manage course pricing and visibility  

### 🛠️ For Admin *(Future Scope)*
- Platform-wide analytics and insights  
- Manage instructors, students, and courses  

---

##  System Architecture  

StudyNotion follows a **client-server architecture**, with:  
- **Frontend (Client):** React.js, communicates via RESTful APIs  
- **Backend (Server):** Node.js + Express.js for route handling, authentication, and API logic  
- **Database:** MongoDB for scalable and flexible data management  


---

## ⚙️ API Endpoints  

| Method | Endpoint | Description |
|:------:|:----------|:-------------|
| POST | `/api/auth/signup` | Register new user (student/instructor) |
| POST | `/api/auth/login` | Login and generate JWT token |
| POST | `/api/auth/verify-otp` | Verify OTP for account creation |
| POST | `/api/auth/forgot-password` | Send reset password email |
| GET | `/api/courses` | Fetch all courses |
| GET | `/api/courses/:id` | Get course by ID |
| POST | `/api/courses` | Create a new course (Instructor) |
| PUT | `/api/courses/:id` | Update a course |
| DELETE | `/api/courses/:id` | Delete a course |
| POST | `/api/courses/:id/rate` | Add rating to a course |

---

## 🔒 Security  

- **JWT (JSON Web Tokens)** for authentication and route protection  
- **Bcrypt** for password hashing  
- **Input validation** and error handling for all API routes  

---

## 💳 Payment Integration  

- Integrated **Razorpay** for secure payment handling during course enrollment.  

---

## ☁️ Deployment  

| Component | Service |
|------------|----------|
| Frontend | **Vercel** |
| Backend | **Render / Railway** |
| Database | **MongoDB Atlas** |
| Media | **Cloudinary** |

---

## 🌱 Future Enhancements  

| Enhancement | Description | Priority |
|--------------|--------------|-----------|
| 🎮 Gamification | Add badges, points, and leaderboards | Medium |
| 🧭 Personalized Learning Paths | AI-based course recommendations | High |
| 💬 Social Learning | Group discussions, peer feedback | Medium |
| 📱 Mobile App | Android/iOS support | High |
| 🤖 ML Recommendations | Personalized content suggestions | Medium |
| 🕶️ VR/AR Integration | Immersive learning experiences | Low–Medium |

---

## 🧩 Folder Structure  



## 📈 Conclusion  

StudyNotion demonstrates how the **MERN stack** can power a scalable, feature-rich ed-tech platform.  
It’s designed to deliver an engaging, personalized, and accessible learning experience for everyone.  

---

### 👨‍💻 Developed by: *Nikhil Verma*  
> Project inspired by CodeHelp – EdTech Platform Clone  
> Date: 17 Feb 2023  
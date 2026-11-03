# StudioSpace - Creative Marketplace

A professional full-stack web application connecting creators (photographers, filmmakers, podcasters, musicians) with world-class professional workspaces and soundstages.

## 🔗 Live Demo & Source Code
* **Live Site URL:** [https://studiospace-frondend.vercel.app](https://studiospace-frondend.vercel.app)
* **GitHub Repository:** [https://github.com/Nafis-44/studiospace-frondend](https://github.com/Nafis-44/studiospace-frondend)

---

## 🌟 Key Features
* **Interactive Studio Exploration & Details:** Browse through categorized professional photo studios, soundstages, and music suites with dynamic routing and instant booking requests.
* **Double-Booking & Overlap Prevention:** Robust backend safeguards preventing duplicate confirmed bookings for the same studio and date.
* **Secure JWT Authentication:** Integrated with Better Auth and `jose` JWKS verification middleware to protect creator listings and personal booking routes.
* **Creator Dashboard Management:** Full CRUD operations allowing hosts to add, update specifications via pre-filled forms, and delete their published creative workspaces.
* **Hybrid Rendering & Hydration Resilience:** Optimized Next.js App Router architecture leveraging Server/Client component patterns to ensure smooth navigation and zero hydration mismatches.

---

## 🛠️ Tech Stack

### Frontend (Client-Side)
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS, DaisyUI, Shadcn UI
* **Icons & Notifications:** Lucide React, React Hot Toast
* **Authentication Client:** Better Auth Client

### Backend (Server-Side)
* **Runtime & Framework:** Node.js, Express.js
* **Database & ODM:** MongoDB Atlas, Native MongoDB Driver (`ObjectId`)
* **Security & Auth Verification:** `jose` (Remote JWKS verification)
* **Middleware & Utilities:** CORS, Dotenv

---

## ⚙️ Local Setup & Installation Instructions

Follow these steps to run both the client and server locally on your machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/Nafis-44/studiospace-frondend.git](https://github.com/Nafis-44/studiospace-frondend.git)
cd studiospace-frondend
# Brainium Website

A modern, responsive website for the Brainium AI club with advanced team-based event registration system.

## 🚀 Features

- **Modern UI/UX** with cosmic background and smooth animations
- **Advanced Team Registration System** with real-time validation
- **Smart Registration Status Management** (Open/Closed/Full with loading states)
- **QR Code Generation** for event attendance tracking
- **Mobile-Optimized Forms** with number-only phone inputs
- **Backend-Optional Architecture** (works offline with graceful degradation)
- **Enhanced Error Handling** with attractive status messages
- **Responsive Design** for all devices and screen sizes

## 🛠️ Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 📋 Advanced Registration System

### Core Features:
- **Team-based registration** (2-4 members per team)
- **Real-time dynamic validation** for all team members
- **Smart loading states** to prevent premature form access
- **USN format validation** (1BY23AI045 or 1TD24CS123)
- **Number-only phone inputs** with mobile keyboard optimization
- **Automatic registration status** based on capacity and deadlines
- **Offline-first design** with graceful backend degradation

### Validation Features:
- **Instant feedback** on all form fields (leader + team members)
- **Visual indicators** with red borders and error messages
- **Input restrictions** (letters blocked in phone fields)
- **Auto-formatting** (USN auto-capitalization)
- **Copy-paste protection** (non-digits filtered from phone fields)

## 🎨 Enhanced Status Messages

### ✅ Registration Success
- **Full green theme** with celebration animations and confetti
- **Huge success message** with emojis and bold typography
- **QR code generation** with download functionality
- **Registration ID** for tracking

### ❌ Registration Failed
- **Attractive red theme** with gradient backgrounds
- **Large error messaging** with clear typography
- **Contact information** prominently displayed
- **Retry instructions** and support details

### 🚪 Registration Full
- **Door closed icon** with pulsing animation
- **Bold "REGISTRATION FULL"** in large text
- **Reference to contact section** below
- **Professional messaging** about capacity

### ⏰ Registration Closed
- **Rotating time icon** with smooth animation
- **Clear deadline information** with formatted dates
- **Reference to help section** for questions
- **Gray theme** indicating closure

### 🔄 Loading State
- **Spinner animation** during data fetching
- **"Loading Registration Status..."** message
- **Prevents premature form access** until data loads

## 🔒 Security & Backend

### Security Features:
- **Environment variables** for sensitive URLs
- **No hardcoded credentials** in source code
- **Gitignored sensitive files** (.env, .gs files)
- **Safe for public repositories**

### Backend Integration:
- **Optional backend** - app works without .env file
- **Graceful degradation** with mock data when offline
- **Small notification popup** for backend connection issues
- **No crashes** when backend unavailable
- **Developer-friendly** setup process

## 📁 Project Structure

```
src/
├── components/
│   ├── CosmicBackground.tsx      # Animated cosmic background
│   ├── Navbar.tsx                # Navigation component
│   ├── RegistrationModal.tsx     # Advanced team registration form
│   ├── EventDetailsModal.tsx     # Event information modal
│   └── BackendNotification.tsx   # Backend connection status popup
├── pages/
│   ├── Home.tsx                  # Landing page with animations
│   ├── Events.tsx                # Events listing page
│   ├── EventDetailsPage.tsx      # Detailed event view with registration
│   ├── About.tsx                 # About page
│   └── Gallery.tsx               # Gallery page
└── App.tsx                       # Main application with routing
```

## 🎯 Key Components

### RegistrationModal
- **Advanced team registration form** with 2-4 member support
- **Real-time validation** for all team members (not just leader)
- **Number-only phone inputs** with mobile optimization
- **QR code generation** on successful registration
- **Enhanced status messages** with attractive designs
- **Offline functionality** with graceful backend handling

### EventDetailsPage  
- **Smart loading states** to prevent premature form access
- **Dynamic registration status** (Open/Closed/Full with icons)
- **Static capacity display** (clean "200 teams" format)
- **Reference-based contact** (points to help section)
- **Single registration hub** with centralized logic

### BackendNotification
- **Non-intrusive popup** for backend connection issues
- **Auto-dismissing** after 8 seconds
- **Orange warning theme** with clear messaging
- **Prevents app crashes** when backend unavailable

## 📱 Responsive Design

- **Mobile-first** approach
- **Tablet and desktop** optimized
- **Touch-friendly** interactions
- **Accessible** design patterns

---

**Built with React + TypeScript + Tailwind CSS**

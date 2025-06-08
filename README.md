# Real-Time Communication Platform (Slack Clone)

A full-stack real-time communication platform inspired by **Slack** and **Google Chat**, built using **Django REST Framework** and **React**. This project was created out of curiosity to understand how modern communication tools work under the hood and to learn how to implement features like real-time chat, multimedia messaging, and group collaboration at scale.

---

## 🚀 What It Is

This is a **workspace-based** real-time communication platform that allows users to:

- Create and join isolated workspaces
- Engage in one-on-one and group conversations
- Share multimedia in real-time messages
- Make audio and video calls
- Invite members via email
- Manage workspace-specific profiles

Each workspace operates independently — providing a focused communication environment strictly related to its own context or organization. This isolates discussions and members from other workspaces, offering a more structured and professional interaction flow.

---

## 🔧 Key Features

### 💬 Messaging & Chat
- **One-on-one direct messaging**
- **Group chat rooms**
- **Persistent chat history** (no expiry)
- **Multimedia sharing** (images, files, etc.)
- **Real-time updates via WebSockets**

### 📞 Real-Time Communication
- **Audio and Video Calling** (One-on-one and Group)
- Powered by **ZegoCloud SDK**
- **Low-latency WebRTC integration**

### 🧠 Workspace-Based System
- Each workspace is isolated (like a company chat space)
- Users can **create**, **join**, and **switch between** workspaces
- Workspace-specific user profiles and summaries
- No crossover between chats or members of different workspaces

### 📩 Workspace Invitations
- Invite users to a workspace via **email invitations**
- Users can accept invitations to join
- Admins can manage users within the workspace

### 🛡️ Authentication & Authorization
- **JWT-based authentication**
- **Google OAuth 2.0 login support**

### 💳 Monetization & Payments
- Integration with **Stripe** for premium features
- Support for **premium workspaces**

### ⚙️ Technologies Used
- **Frontend:** React.js
- **Backend:** Django REST Framework
- **Real-time Communication:** Django Channels + WebSockets
- **Message Broker:** Redis
- **Payments:** Stripe
- **Video/Audio SDK:** ZegoCloud

---

## 🧠 Project Vision

This project was developed as a deep dive into the mechanics of modern communication platforms — focusing on user isolation, structured messaging, and real-time interaction. Unlike messaging apps where all chats are mixed (like WhatsApp), this platform enforces a **workspace-centric model** — ideal for teams and topic-specific collaboration.

---


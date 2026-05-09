# Portfolio Case Study: PulseDesk AI ⚡

## 🎯 Executive Summary
**PulseDesk AI** was built to solve "Tool Fatigue" for digital agency owners. Most agencies juggle Slack, Jira, QuickBooks, and spreadsheets. PulseDesk AI consolidates these into a single, high-performance workspace with a focus on premium aesthetics and AI-driven transparency.

## 🛠️ The Challenge
Designing a platform that handles complex data (financials, tasks, timelines) without feeling cluttered. The goal was to maintain a "Stripe-like" premium feel while providing deep operational insights.

## 💡 Key Solutions

### 1. The Glassmorphism Design System
I developed a custom dark-mode design system using **Tailwind CSS** and **Glassmorphism** principles. By using subtle borders (`border-white/[0.08]`) and backdrop blurs, the UI feels layered and modern rather than flat and generic.

### 2. High-Performance Kanban
Implemented using `@dnd-kit/core` for maximum flexibility. The board supports reordering and cross-column movement with pessimistic UI updates, ensuring that every drag is persisted to the MongoDB backend without lag.

### 3. Transparent Client Workflow
The **Client Portal** was a major architectural focus. It uses a role-based filtering system so clients only see "published" updates and milestones, maintaining a bridge between agency work and stakeholder expectations.

### 4. AI-Enhanced Reporting
Instead of static exports, I built a multi-step generation workflow. Using **Framer Motion**, the "Generating..." state provides a psychological reward through animations, making the automated data synthesis feel intelligent and valuable.

## 🚀 Impact & Performance
- **Zero-Latency Interactions**: Optimized React renders and local state management for instant UI feedback.
- **Resilient Connectivity**: Built-in mock data fallback allows potential clients/employers to explore the full feature set even without a local database setup.
- **Mobile-First Integrity**: Every dashboard view is meticulously audited for mobile responsiveness.

## 🔧 Technical Deep Dive
- **State**: Zustand for global auth and UI state.
- **Auth**: Custom JWT implementation with refresh strategies.
- **Backend**: Modular Express architecture with a service-oriented approach.
- **Visuals**: Recharts for dynamic, theme-aware data visualization.

---

## 🏆 Presentation Tip
When showcasing this to a client, highlight the **Reports Generation** workflow and the **Kanban movement**. These two features demonstrate both frontend polish and backend persistence integrity.

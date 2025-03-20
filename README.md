# Personal Productivity Dashboard with Pomodoro Integration

A dark, minimalistic productivity application with task management and Pomodoro timer features.

## Features

- **To-Do Lists with Categories**
  - Work Todos Today (Current tasks)
  - Forgotten (Overplanned tasks)
  - Completed (Finished tasks)
  
- **Pomodoro Timer with Tracking**
  - 25-minute work sessions with 5-minute breaks
  - Progress visualization
  - Session tracking and statistics
  
- **Work Mode Toggle**
  - Switch between normal and focused work mode
  - Visual indicators for current mode
  
- **Progress Visualization**
  - Heatmaps for tracking Pomodoro activity
  - Rank system based on completed Pomodoros
  - Stats for total focus time
  
- **Task Status Management**
  - Overdue tasks (past deadline)
  - Overplanned tasks (not completed as scheduled)

## Technology Stack

- **Frontend**: Electron.js with React + Tailwind CSS + DaisyUI
- **State Management**: Zustand
- **Data Storage**: LocalStorage (via Zustand persist)
- **UI Components**: Custom components with Tailwind styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/productivity-dashboard.git
cd productivity-dashboard
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

### Build for Production

```
npm run build
```

## Usage

1. Add tasks to your "Today" list
2. Start the Pomodoro timer to begin focused work sessions
3. Complete tasks to earn points and track progress
4. Toggle Work Mode when you need extra focus

## License

MIT 
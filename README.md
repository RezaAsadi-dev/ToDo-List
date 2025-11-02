# 📝 Task Management App (ToDo App)

A modern and beautiful task management application with a Persian user interface that allows you to organize your daily tasks in colorful folders.

## ✨ Features

- 📁 **Folder Management**: Create colorful folders to categorize tasks
- ✅ **Task Management**: Add, edit, and delete tasks
- 🔍 **Search**: Quick search across all tasks
- 🎯 **Filtering**: Filter by status (All, Active, Completed)
- 🎨 **Beautiful UI**: Modern design with colorful gradients and smooth animations
- 📱 **Responsive**: Compatible with all screen sizes
- 🇮🇷 **Persian Support**: Uses IRANSans font and RTL layout

## 🛠️ Technologies

- **React 19**: Main UI library
- **Vite**: Fast and modern build tool
- **Zustand**: Simple and powerful state management
- **Tailwind CSS 4**: Styling with utility classes
- **Lucide React**: Beautiful and modern icons

## 📦 Installation and Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation Steps

1. Clone the project:

```bash
git clone <repository-url>
cd My-ToDo
```

2. Install dependencies:

```bash
npm install
```

3. Run the project in development mode:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── assets/           # Static files (fonts, images)
├── components/      # Reusable components
│   ├── folder/      # Folder-related components
│   ├── layout/      # Layout components (Header, Background)
│   ├── modals/      # Modals (FolderModal, TaskModal, DeleteModal)
│   └── todo/        # Task-related components
├── hooks/           # Custom hooks
├── pages/           # Main application pages
├── store/           # State management (Zustand)
├── utils/           # Helper functions and constants
├── App.jsx          # Main component
├── main.jsx         # Application entry point
└── index.css        # Global styles
```

## 🎯 How to Use

### Creating a New Folder

1. Click on the "New Folder" button
2. Enter the folder name (minimum 2 characters)
3. Select a color for the folder
4. Click on "Add Folder"

### Adding a Task

1. Click on the "Add Task" button
2. Select the desired folder
3. Enter the task name (minimum 2 characters)
4. (Optional) Add task description
5. Click on "Add Task"

### Managing Tasks

- ✅ **Complete Task**: Click on the checkbox next to the task
- ✏️ **Edit Task**: Click on the edit icon on hover
- 🗑️ **Delete Task**: Click on the delete icon on hover

### Search and Filter

- Type your search query in the search bar
- Use filter buttons to filter tasks by status:
  - **All**: Show all tasks
  - **Active**: Only incomplete tasks
  - **Completed**: Only completed tasks

## 🎨 Available Colors

- 🟣 Purple
- 🔵 Blue
- 🩷 Pink
- 🟢 Green
- 🔴 Red
- 🟠 Orange

## 🔧 Scripts

- `npm run dev`: Run development server with HMR
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Check code with ESLint

## 📝 Notes

- This project uses Zustand for state management
- IRANSans font is used for better Persian text display
- All validations are performed on the client side

## 🤝 Contributing

To contribute to this project:

1. Fork the project
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to your branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is released under the MIT License.

## 👨‍💻 Developer

This project was developed with ❤️ using the latest web technologies.

---

**Note**: This application works with local state and data is not stored in the browser. For persistent storage, you can use localStorage or a backend.

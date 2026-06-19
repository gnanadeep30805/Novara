# Dashboard & Navigation Module

This module provides the central user dashboard showing placement readiness metrics, shortcuts to core preparation features, system notifications, and dark mode controls.

---

## 1. Workflow

1. **Routing**: When logging in, candidates are redirected to `/dashboard` (students) or `/admin/dashboard` (administrators).
2. **Metrics Fetching**: The dashboard fires requests to `/api/analytics` to pull streak, level XP, average resume score, study hours, and target settings.
3. **Core Modules Portal**: Grid layouts display shortcuts routing users directly to preparation roadmaps, mock interviews, and resume checkers.
4. **Header Navigation**: `Navbar.jsx` renders links, polls notifications every 30 seconds, and lists notification trays allowing marks as read.
5. **Theme Switching**: The theme context switches the site styling, saving the active option in localStorage.

---

## 2. Components Involved

### Frontend
- **[Dashboard.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Dashboard/Dashboard.jsx)**: Main student interface displaying placement readiness panels, quick action panels, and candidate target goals.
- **[AdminDashboard.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Dashboard/AdminDashboard.jsx)**: Admin control room providing management over checklists, roadmap cards, and global logs.
- **[Navbar.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/components/Navbar.jsx)**: Brand header displaying links, user profile logout button, and notifications bell dropdown.
- **[ThemeToggle.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/components/ThemeToggle.jsx)**: Clickable icon button switching light/dark modes.
- **[ThemeContext.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/context/ThemeContext.jsx)**: Distributes active dark theme classes to the HTML body node.

### Backend
- **[adminRoutes.js](file:///d:/UI%20development-NSRIT/Novara/server/src/routes/adminRoutes.js)**: Configures admin command controls endpoints.
- **[adminController.js](file:///d:/UI%20development-NSRIT/Novara/server/src/controllers/adminController.js)**: Logic checking admin status and managing resources.
- **[adminMiddleware.js](file:///d:/UI%20development-NSRIT/Novara/server/src/middleware/adminMiddleware.js)**: Restricts access to routes unless user has `admin` role.

---

## 3. Working in the Code

### Theme Context State
The `ThemeContext.jsx` uses `darkreader` or class controls to sync the HTML layout:
```javascript
export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme: () => setDarkMode(!darkMode) }}>
            {children}
        </ThemeContext.Provider>
    );
};
```

### Periodical Notification Fetching
Within the `Navbar.jsx` component, notifications are pulled dynamically using a React effect interval:
```javascript
useEffect(() => {
    if (user) {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // 30s poll
        return () => clearInterval(interval);
    }
}, [user]);
```
This requests the endpoint `/api/analytics/notifications` to fetch new messages (e.g. XP gained, roadmap created) from the database.

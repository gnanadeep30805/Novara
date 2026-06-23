# Study Planner Module

This module provides candidates with a weekly scheduler and milestone countdown tracker to organize their daily preparation tasks.

---

## 1. Workflow

1. **Plan Configuration**: The candidate creates a new plan by entering a week label, custom description, milestone target date (e.g. "Google Interview"), and a list of study tasks.
2. **Data Insertion**: The backend inserts a new `StudyPlan` record in MongoDB.
3. **Interactive Task Checklists**: Candidates can toggle checkboxes next to tasks on the planner dashboard. The client sends a PUT request to update the database state.
4. **Countdown Calculation**: The client uses JavaScript date differences to render an animated countdown timer (days, hours, minutes remaining) tracking the next upcoming milestone.

---

## 2. Components Involved

### Frontend
- **[StudyPlanner.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/StudyPlan/StudyPlanner.jsx)**: Main dashboard page containing week selectors, task checklist inputs, milestone clocks, and add/delete actions.

### Backend
- **[studyPlanRoutes.js](file:///d:/UI%20development-NSRIT/Novara/server/src/routes/studyPlanRoutes.js)**: REST API routes configuration.
- **[studyPlanController.js](file:///d:/UI%20development-NSRIT/Novara/server/src/controllers/studyPlanController.js)**: Controller handling fetching candidate plans, appending new weeks, updating checkboxes, and deleting plans.
- **[StudyPlan.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/StudyPlan.js)**: MongoDB schema storing task objects, check states, and milestone target dates.

---

## 3. Working in the Code

### Task Checklist Updates
Inside `studyPlanController.js`, when a candidate checks off a task, the controller finds the plan and targets the sub-document index to toggle `isCompleted`:
```javascript
export const togglePlannerTask = async (req, res) => {
    try {
        const { planId, taskId } = req.body;
        const plan = await StudyPlan.findOne({ _id: planId, userId: req.user._id });
        if (!plan) return res.status(404).json({ success: false, message: "Plan not found" });

        const task = plan.tasks.id(taskId);
        if (task) {
            task.isCompleted = !task.isCompleted;
            await plan.save();
        }

        res.json({ success: true, plan });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
```

### Dynamic Countdown Timer
Within the React frontend `StudyPlanner.jsx`, a `useEffect` interval calculates the remaining time to keep the clock ticking:
```javascript
useEffect(() => {
    const calculateTimeLeft = () => {
        const difference = +new Date(milestoneDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60)
            };
        }
        return timeLeft;
    };
    
    const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
    }, 60000); // update every minute
    
    return () => clearInterval(timer);
}, [milestoneDate]);
```
This is displayed as a badge to keep candidates focused on upcoming deadlines.

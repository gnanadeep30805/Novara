# Gamification & Leaderboard Module

This module gamifies the placement preparation journey, rewarding candidates with Experience Points (XP), levels, streak milestones, achievement badges, and global rank placement listings.

---

## 1. Workflow

1. **Perform Task**: When a candidate completes a core task (e.g. finishes a mock interview, scores high on a quiz, creates a study plan), the backend calls the `awardXP` handler in `analyticsService.js`.
2. **XP & Level Calculations**: 
   - The user's XP increments.
   - The system checks if the new XP crosses the next level boundary. The level formula is: `Level = floor(XP / 100) + 1`.
   - If a level-up occurs, a congratulate notification is dispatched.
3. **Streak Verification**: Daily streaks are checked. If the candidate logs in on consecutive calendar days, their streak increases by `1`. If they miss a day, the streak resets to `1`.
4. **Achievements & Badges**: An `Achievement` record is created, detailing the unlocked milestone and badge icon.
5. **Leaderboard Listings**: Candidates view the global top 10 rankings sorted descending by XP. The active user is highlighted.

---

## 2. Components Involved

### Frontend
- **[Analytics.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Analytics/Analytics.jsx)**: Leaderboard dashboard showing global top candidates, unlocked achievements, active streaks, and recent prepare action logs.

### Backend
- **[analyticsRoutes.js](file:///d:/UI%20development-NSRIT/Novara/server/src/routes/analyticsRoutes.js)**: REST API routes configuration.
- **[analyticsController.js](file:///d:/UI%20development-NSRIT/Novara/server/src/controllers/analyticsController.js)**: Controller handling analytics requests, notifications tray fetching, and read updates.
- **[analyticsService.js](file:///d:/UI%20development-NSRIT/Novara/server/src/services/analyticsService.js)**: Engine awarding XP, recalculating level boundaries, updating streaks, and saving achievement records.
- **[Achievement.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/Achievement.js)** & **[Notification.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/Notification.js)**: MongoDB schemas for achievements and in-app logs.

---

## 3. Working in the Code

### XP Award & Level Up Algorithm
Inside `analyticsService.js`, when `awardXP` is invoked, the database updates the candidate profile:
```javascript
const oldLevel = user.level;
user.xp += points;

// Level calculation formula
const newLevel = Math.floor(user.xp / 100) + 1;
let leveledUp = false;

if (newLevel > oldLevel) {
    user.level = newLevel;
    leveledUp = true;
}

await user.save();
```
If `leveledUp === true`, a special notification document is written, and the frontend triggers a banner alert.

### Global Leaderboard query
In `analyticsController.js`, the top 10 ranking list is queried directly from the `User` collection sorted by XP:
```javascript
const leaderboard = await User.find()
    .sort({ xp: -1 })
    .limit(10)
    .select("name email xp level profilePicture");
```
This is rendered as a leaderboard table in the `Analytics.jsx` view.

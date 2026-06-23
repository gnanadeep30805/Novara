# Authentication & User Management Module

This module handles secure candidate registration, role classification, email verification, login credentials validation, session persistence, and password recovery.

---

## 1. Workflow

1. **Sign Up**: A candidate fills out their details (name, email, password) and selects their role (`student` or `admin`). 
2. **Email Verification Link**: The backend generates a unique secure verification token, saves it, and uses Nodemailer to send a verification link to the candidate's email. The candidate is redirected to a "Verify Pending" page.
3. **Email Verification**: Clicking the verification link calls `/api/auth/verify-email/:token`, which sets `isVerified: true` in the DB.
4. **Log In**: The candidate logs in with their credentials. The backend verifies the password hash via `bcryptjs` and signs a JSON Web Token (JWT).
5. **Session State**: The client saves the JWT in `localStorage` and loads the user object into `AuthContext` to secure pages using `ProtectedRoute`.
6. **Password Recovery**: Candidates can request a reset link. An email containing a secure token is sent, allowing the candidate to configure a new password.

---

## 2. Components Involved

### Frontend
- **[Signup.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Auth/Signup.jsx)**: Signup form supporting student/admin classification.
- **[Login.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Auth/Login.jsx)**: Login page with visual role selectors.
- **[ForgotPassword.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Auth/ForgotPassword.jsx)** & **[ResetPassword.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Auth/ResetPassword.jsx)**: Handles email inputs and password reset requests.
- **[VerifyEmailPending.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Auth/VerifyEmailPending.jsx)** & **[VerifyEmail.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/pages/Auth/VerifyEmail.jsx)**: Email landing verification triggers.
- **[AuthContext.jsx](file:///d:/UI%20development-NSRIT/Novara/client/src/context/AuthContext.jsx)**: Core authentication provider distributing user profiles, tokens, loading states, and logout handlers across React nodes.
- **[authService.js](file:///d:/UI%20development-NSRIT/Novara/client/src/services/authService.js)**: API client mappings wrapper handling requests.

### Backend
- **[authRoutes.js](file:///d:/UI%20development-NSRIT/Novara/server/src/routes/authRoutes.js)**: Router for API auth endpoints.
- **[authController.js](file:///d:/UI%20development-NSRIT/Novara/server/src/controllers/authController.js)**: Controls credentials checking, hash generation, database storage, and recovery tokens.
- **[User.js](file:///d:/UI%20development-NSRIT/Novara/server/src/models/User.js)**: Schema for candidate accounts.
- **[authMiddleware.js](file:///d:/UI%20development-NSRIT/Novara/server/src/middleware/authMiddleware.js)**: Middleware confirming valid JWTs in HTTP Authorization headers.
- **[sendEmail.js](file:///d:/UI%20development-NSRIT/Novara/server/src/utils/sendEmail.js)**: Integrates nodemailer service templates.

---

## 3. Working in the Code

### Password Hashing & Salts
The candidate's password is encrypted prior to database insertion. Inside `User.js`, a pre-save hook intercepts password changes:
```javascript
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
```
During login, `bcrypt.compare` checks credentials inside `authController.js`:
```javascript
const isMatch = await bcrypt.compare(password, user.password);
```

### JWT Creation & Protection
Upon authentication, `generateToken.js` signs a JSON Web Token with the user ID, role, and expiration:
```javascript
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
```
The `authMiddleware.js` parses this header token to populate requests with `req.user`:
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id).select("-password");
```

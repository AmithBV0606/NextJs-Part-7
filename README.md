# Next-Js by Codevolution : Part-7

### Topics Covered :

- Authentication
- Clerk Setup
- Sign in and Sign out
- Profile Settings
- Conditional UI Rendering
- Protecting Routes
- Read Session and User Data
- Role Based Access Control
- Customizing Clerk Components

## Authentication

- Most apps revolve around users.

- When building for users, we need to consider three fundamental concepts :

    - **Identity** : Verifying who someone is, through authentication.
    - **Sessions** : Keep track of a user's logged-in state across requests.
    - **Access** : Controls what they can do.

- In developers term, we call these authentication, session management and authorization.

- With React single-page apps, you're only dealing with client-side code.

- With Next.js, you've got to protect your app from three different angles: client-side, server-side and API routes.

- When implementing authentication, you will typically want to :

    1. Let users sign up
    2. Give them a way to sign in
    3. Enable them to manage their account (password changes, email updates, etc.)
    4. Show or hide UI elements based on whether they're logged in
    5. Protect certain routes depending on authentication status
    6. Access session and user data when needed
    7. Set up role-based access control (admin, editor, viewer, and so on)
    8. Provide a way to sign out
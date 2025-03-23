export {}; // This makes file, a module

// Step 1 : Define the roles available in your app
export type Roles = "admin" | "moderator";

// Step 2 : Extend clerk's session token type globally
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

// Step 3 : We have to manually add the admin role to our own user

// Step 4 : Define and protect a new admin route. app/admin/page.tsx

// To view app/admin/page.tsx file, you not only need to be logged in, but you also need to be an admin.

// To protect this route we need to apply RBAC in our middleware.ts file

// Step 5 : Create server actions to manage user roles
# Session Management with TanStack Query

This document explains how to use the enhanced session management system built with TanStack Query in this application.

## Overview

The session management system provides:
- Reactive session state with TanStack Query
- Automatic session refresh and cache invalidation
- Type-safe session data
- Loading and error states
- Protected routes and components
- Server-side rendering compatibility

## Core Components

### Session Queries (`src/lib/auth/session-queries.ts`)

Defines query functions and keys for session management:

```typescript
import { getSessionQuery, getUserIdQuery, sessionKeys } from "~/lib/auth/session-queries";

// Query keys for cache management
sessionKeys.all        // ["session"]
sessionKeys.user()     // ["session", "user"]
sessionKeys.userId()   // ["session", "userId"]
```

### Session Hook (`src/lib/auth/use-session.ts`)

Main hook for session management:

```typescript
import { useSession } from "~/lib/auth/use-session";

function MyComponent() {
  const { 
    user,           // Full user object (null if userIdOnly: true)
    userId,         // User ID string
    isAuthenticated,// Boolean authentication status
    isLoading,      // Loading state
    isError,        // Error state
    error,          // Error object
    signOut,        // Sign out function
    refreshSession, // Refresh session function
    clearSession    // Clear session cache function
  } = useSession();
}
```

## Usage Patterns

### 1. Basic Session Usage

```typescript
import { useSession } from "~/lib/auth/use-session";

function UserInfo() {
  const { user, isAuthenticated, isLoading } = useSession();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;

  return <div>Welcome, {user?.name}!</div>;
}
```

### 2. User ID Only (Server Compatible)

```typescript
import { useUserId } from "~/lib/auth/use-session";

function AuthStatus() {
  const { userId, isAuthenticated, isLoading } = useUserId();
  
  return (
    <div>
      Status: {isAuthenticated ? `Logged in as ${userId}` : 'Not logged in'}
    </div>
  );
}
```

### 3. Protected Routes

```typescript
import { ProtectedRoute } from "~/components/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <PrivateContent />
    </ProtectedRoute>
  );
}

// Or with custom fallback
function AppWithFallback() {
  return (
    <ProtectedRoute 
      fallbackComponent={<div>Please sign in to continue</div>}
    >
      <PrivateContent />
    </ProtectedRoute>
  );
}
```

### 4. Authenticated Session Hook

```typescript
import { useAuthenticatedSession } from "~/lib/auth/use-session";

function ProtectedComponent() {
  // Automatically redirects to auth page if not authenticated
  const { user, isLoading } = useAuthenticatedSession();

  if (isLoading) return <div>Checking authentication...</div>;
  
  return <div>Protected content for {user?.name}</div>;
}
```

### 5. Session Provider

```typescript
import { SessionProvider } from "~/components/SessionProvider";

function App() {
  return (
    <SessionProvider initialUserId={serverUserId}>
      <YourApp />
    </SessionProvider>
  );
}
```

## Configuration Options

### useSession Options

```typescript
const session = useSession({
  userIdOnly: true,              // Use server-compatible user ID query
  redirectOnError: true,         // Redirect to auth on error
  authRedirectPath: "/login"     // Custom auth redirect path
});
```

### Query Client Configuration

The query client is configured with session-aware defaults:

- Automatic retry logic (no retry on 401/403)
- Session queries refetch on window focus
- Global error handling for authentication errors
- Optimized cache times for session data

## Authentication Flow Integration

### Sign In

```typescript
import { signInWithEmail } from "~/lib/auth/sign-in";

// Automatically updates session cache and invalidates queries
await signInWithEmail({ email, password });
```

### Sign Up

```typescript
import { signUpWithEmail } from "~/lib/auth/sign-up";

// Automatically updates session cache and invalidates queries
await signUpWithEmail({ email, password, name });
```

### Sign Out

```typescript
import { useSession } from "~/lib/auth/use-session";

function SignOutButton() {
  const { signOut } = useSession();
  
  return (
    <button onClick={signOut}>
      Sign Out
    </button>
  );
}
```

## Cache Management

### Manual Cache Operations

```typescript
import { 
  invalidateSessionQueries, 
  clearSessionCache, 
  setSessionData 
} from "~/lib/auth/session-queries";
import { queryClient } from "~/lib/queryClient";

// Invalidate and refetch session data
await invalidateSessionQueries(queryClient);

// Clear session cache
clearSessionCache(queryClient);

// Set session data manually
setSessionData(queryClient, sessionData);
```

### Automatic Cache Management

The system automatically:
- Updates cache on successful authentication
- Clears cache on sign out
- Invalidates stale session data
- Handles authentication errors

## Error Handling

The system provides comprehensive error handling:

- Network errors: Automatic retry with exponential backoff
- Authentication errors (401/403): No retry, optional redirect
- Session expiry: Automatic cache invalidation
- Global error notifications via toast

## Best Practices

1. **Use `useUserId()` for simple authentication checks**
2. **Use `useSession()` when you need full user data**
3. **Use `useAuthenticatedSession()` for protected components**
4. **Wrap protected routes with `<ProtectedRoute>`**
5. **Handle loading and error states appropriately**
6. **Use the session provider for SSR compatibility**

## Migration from Props-based Auth

Old pattern:
```typescript
function Component({ userId }: { userId: string }) {
  // Component logic
}
```

New pattern:
```typescript
function Component() {
  const { userId, isAuthenticated } = useUserId();
  // Component logic
}
```

This eliminates prop drilling and provides reactive session state throughout your application.

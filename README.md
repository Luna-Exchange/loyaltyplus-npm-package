# Loyalty Plus UID

## Features

- **Initialize**: Configure the client with API key, environment (staging or live), and project ID.
- **Login**: Authenticate a user and obtain an auth token.
- **Register Event**: Register events for a specific user.
- **Logout**: Clear cached auth tokens.

## Installation

To install the package, run the following command:

```bash
npm install loyaltyplus-uid
```

Or, if you're using `yarn`:

```bash
yarn add loyaltyplus-uid
```

## Usage

### 1. Initialize the Client

Before using any other functions, initialize the client with your API key, environment, and project ID:

```typescript
import { init } from "loyaltyplus-uid";

init("your-api-key", "staging", "your-project-id");
```

- **API Key**: Your unique API key provided by Loyalty Plus.
- **Environment**: Either `'staging'` or `'live'`.
- **Project ID**: The ID of your project.

### 2. Login a User

Authenticate a user using their unique `userId` and obtain an auth token:

```typescript
import { login } from "loyaltyplus-uid";

login("user123")
  .then((token) => console.log("Auth Token:", token))
  .catch((error) => console.error("Login failed:", error.message));
```

### 3. Register an Event

Register an event for a specific user:

```typescript
import { registerEvent } from "loyaltyplus-uid";

registerEvent("UserLoggedIn", "user123")
  .then(() => console.log("Event registered successfully."))
  .catch((error) => console.error("Failed to register event:", error.message));
```

- **Event Name**: The name of the event you want to register (e.g., `'UserLoggedIn'`).
- **User ID**: The unique ID of the user for whom the event is being registered.

### 4. Logout a User

Clear the cached auth token to logout a user:

```typescript
import { logout } from "loyaltyplus-uid";

logout();
```

### 5. Get Current Auth Token

You can also retrieve the currently stored auth token (if available) using:

```typescript
import { getAuthToken } from "loyaltyplus-uid";

const token = getAuthToken();
console.log("Current Auth Token:", token);
```

## API Reference

### Initialization

```typescript
init(apiKey: string, environment: 'staging' | 'live', projectId: string): void
```

- **apiKey**: The API key provided by Loyalty Plus.
- **environment**: Specify `'staging'` for testing or `'live'` for production.
- **projectId**: The unique ID of your project.

### Login

```typescript
login(userId: string): Promise<string>
```

- **userId**: The unique ID of the user.
- **Returns**: A promise that resolves to the auth token as a string.

### Register Event

```typescript
registerEvent(eventName: string, userId: string): Promise<void>
```

- **eventName**: The name of the event to register (e.g., `'UserLoggedIn'`).
- **userId**: The unique ID of the user for whom the event is being registered.
- **Returns**: A promise that resolves when the event is successfully registered.

### Logout

```typescript
logout(): void
```

Clears the cached auth token and logs out the user.

### Get Current Auth Token

```typescript
getAuthToken(): string | null
```

Returns the currently stored auth token, if available. Otherwise, returns `null`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

# React Query and Formik Demo Project

This project serves as a demonstration and practice environment for two powerful React ecosystem libraries: **Formik** (for simplified form handling and validation) and **React Query / TanStack Query** (for robust server state management, caching, and background synchronization).

## 1. Project Setup

This project was initialized using Vite with the React template.

### Prerequisites

* Node.js and npm (or yarn/pnpm)

### Installation

1.  Clone the repository (if applicable) and navigate to the project directory:
    ```bash
    # Assuming you created the project with the initial instructions
    cd react-query-demo
    ```

2.  Install the required dependencies:
    ```bash
    npm install formik yup @tanstack/react-query
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

## 2. Technologies Demonstrated

| Library | Version | Purpose |
| :--- | :--- | :--- |
| **React** | Latest | Core UI library. |
| **Formik** | Latest | Manages form state, submission, and validation. |
| **Yup** | Latest | Schema-based validation library integrated with Formik. |
| **@tanstack/react-query** | Latest | Manages server state, caching, synchronization, and data fetching. |

## 3. Form Handling (Formik & Yup)

The `FormikForm.js` component demonstrates a robust approach to form creation:

* **Controlled Inputs:** Formik replaces manual `useState` hooks for input control.
* **Schema Validation:** Validation rules are defined using a declarative **Yup schema**, ensuring strict and clear validation logic (e.g., minimum password length, required fields).
* **Simplified Components:** The use of Formik's `<Form>`, `<Field>`, and `<ErrorMessage>` significantly reduces boilerplate code compared to traditional React form handling.

## 4. Data Fetching and State Management (React Query)

The `PostsComponent.jsx` and `App.jsx` demonstrate the core benefits of using React Query (TanStack Query) for managing asynchronous data:

### Core Concepts

| Concept | Implementation in Code | Benefit |
| :--- | :--- | :--- |
| **`QueryClientProvider`** | Set up in `App.jsx` with a `staleTime` of 5 seconds. | Provides the context for caching and state management across the application. |
| **`useQuery`** | Used in `PostsComponent.jsx` with the key `['posts']`. | Manages loading, error, and data states automatically, eliminating the need for manual `isLoading`, `isError`, and `data` state hooks. |
| **Caching (Stale-While-Revalidate)** | Demonstrated by navigating between `PostsComponent` and `OtherComponent`. | **If data is fresh (within 5s):** Loads instantly from cache, no network request. **If data is stale (after 5s):** Loads instantly from cache, and triggers a background refetch to update silently. |
| **Manual Refetching** | The "Manual Refetch" button calls `refetch()`. | Allows the user to update the data on demand, providing a better user experience for critical data. |
| **`isFetching`** | Used to show a subtle "Updating..." status, separate from `isLoading`. | Differentiates between the initial load (`isLoading`) and background updates (`isFetching`), maintaining UI responsiveness. |

## 5. API Endpoint Used

The project fetches data from the public JSONPlaceholder API:

| Data Type | Endpoint |
| :--- | :--- |
| **Posts** | `https://jsonplaceholder.typicode.com/posts` |

---

## 6. Project Structure
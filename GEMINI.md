# GEMINI.md

## Project Overview

This project is a React and TypeScript web application for a charity organization called "Hanny's Hive". The application serves as the main website for the charity, providing information about its mission, impact, and ways to donate. It also includes user authentication and a dashboard for users and administrators.

The project is built with Vite, styled with Tailwind CSS, and uses Supabase for its backend, including database and authentication services.

## Building and Running

To build and run this project locally, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Environment Variables:**
    Create a `.env` file in the root of the project and add the following environment variables:

    ```
    GEMINI_API_KEY=your_gemini_api_key
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    This will start the development server, and you can view the application in your browser at `http://localhost:3000`.

4.  **Build for Production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready files.

## Development Conventions

*   **Component-Based Architecture:** The application is structured into components, with pages located in the `pages` directory and reusable components in the `components` directory (although not explicitly present, it's a common convention).
*   **Routing:** `react-router-dom` is used for client-side routing. All routes are defined in `App.tsx`.
*   **Styling:** Tailwind CSS is used for styling. Utility classes are used directly in the JSX.
*   **State Management:** Component-level state is managed with React Hooks. For authentication, a context (`AuthContext`) is used to provide authentication state to the entire application.
*   **Backend Interaction:** The application communicates with a Supabase backend for data storage and authentication. The Supabase client is initialized in `lib/supabaseClient.ts`.
*   **Types:** TypeScript is used for static typing. Type definitions are located in `types.ts`.

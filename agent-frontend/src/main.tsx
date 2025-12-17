/**
 * Application Entry Point
 *
 * This file serves as the entry point for the Visiomatix Chat Agent Dashboard React application.
 * It initializes the React application by rendering the root App component into the DOM.
 *
 * The application uses:
 * - React 18's createRoot API for concurrent rendering
 * - StrictMode for development warnings and checks
 * - CSS imports for global styling
 */

// Import React's StrictMode for development warnings and checks
import { StrictMode } from 'react'

// Import createRoot from React DOM for React 18 concurrent rendering
import { createRoot } from 'react-dom/client'

// Import global CSS styles
import './index.css'

// Import the main App component
import App from './App'

// Create the root React element and render the application
// This initializes the React application in the DOM element with id 'root'
createRoot(document.getElementById('root')!).render(
  // Wrap the app in StrictMode for development benefits:
  // - Identifies unsafe lifecycle methods
  // - Warns about legacy string ref API usage
  // - Detects unexpected side effects
  <StrictMode>
    <App />
  </StrictMode>,
)

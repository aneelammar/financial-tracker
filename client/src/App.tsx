import "./App.css"; 
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";  // Imports routing components from react-router-dom
import { Dashboard } from "./pages/dashboard";  
import { Auth } from "./pages/auth";  
import { FinancialRecordsProvider } from "./contexts/financial-record-context";  
import { SignedIn, UserButton } from "@clerk/clerk-react"; 

function App() {
  return (
    <Router>  {/* Router component to enable navigation between pages */}
      <div className="app-container">
        {/* Navbar: Contains a link to the Dashboard and a user button for signed-in users */}
        <div className="navbar">
          <Link to="/"> Dashboard</Link>  {/* Link to navigate to the Dashboard page */}
          <SignedIn>  {/* Displays the UserButton only if the user is signed in */}
            <UserButton />  {/* Button to manage user profile and sign out */}
          </SignedIn>
        </div>

        {/* Routes: Defines the paths and corresponding components */}
        <Routes>
          {/* Dashboard Route: Wraps the Dashboard component with FinancialRecordsProvider to pass down context */}
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          {/* Auth Route: Displays the Auth component for authentication */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;  // Exports the App component as the default export

import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
  } from "@clerk/clerk-react";
  import { Navigate } from "react-router-dom";
  
  export const Auth = () => {
    return (
      <div className="sign-in-container">  {/* Container for the sign-in page */}
        <SignedOut>  {/* Shows the following content if the user is signed out */}
          <h1> Welcome to Your Own Personal Finance Tracker!</h1>  
          <SignUpButton mode="modal" />  
          <SignInButton mode="modal" />  
        </SignedOut>
        
        <SignedIn>  {/* Shows the following content if the user is signed in */}
          <Navigate to="/" />  {/* Redirects to the home page ("/") after signing in */}
        </SignedIn>
      </div>
    );
  };
  
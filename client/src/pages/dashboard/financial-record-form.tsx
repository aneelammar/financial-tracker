{/* This file handles user authentication for the Finance Tracker application. 
  It uses the @clerk/clerk-react library to provide authentication features such as signing in and signing up.  */}

import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

// Component for adding a new financial record
export const FinancialRecordForm = () => {
  // State variables to manage input fields
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Access function to add records from context
  const { addRecord } = useFinancialRecords();

  // Access current user details
  const { user } = useUser();

  // Handles form submission and record creation
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form behavior

    // Create a new financial record
    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(), 
      description,
      amount: parseFloat(amount), 
      category,
      paymentMethod,
    };

    addRecord(newRecord); // Add the record to the context

    // Reset form fields for the next input
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Input for transaction description */}
        <div className="form-field">
          <label>Description:</label>
          <input
            type="text"
            required
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Input for transaction amount */}
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            required
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Dropdown for selecting a category */}
        <div className="form-field">
          <label>Category:</label>
          <select
            required
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Dropdown for selecting a payment method */}
        <div className="form-field">
          <label>Payment Method:</label>
          <select
            required
            className="input"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        {/* Submit button to add the record */}
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};

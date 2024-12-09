import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../../contexts/financial-record-context";

export const FinancialRecordForm = () => {
  // State variables to manage input fields
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const {addRecord} = useFinancialRecords();
  // Access current user details
  const { user } = useUser();

  // Handles form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form behavior

    const newRecord = {
      userId: user?.id ?? "", // Associate record with the current user
      date: new Date(), // Add timestamp
      description: description,
      amount: parseFloat(amount), // Convert amount to a number
      category: category,
      paymentMethod: paymentMethod,
    };

    addRecord(newRecord);

    // Reset form fields
    setDescription("");
    setAmount("");
    setCategory("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Description Input */}
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

        {/* Amount Input */}
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

        {/* Category Dropdown */}
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

        {/* Payment Method Dropdown */}
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

        {/* Submit Button */}
        <button type="submit" className="button">
          Add Record
        </button>
      </form>
    </div>
  );
};

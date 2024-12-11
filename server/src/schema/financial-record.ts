{/*This file defines the schema for a financial record in a MongoDB database using Mongoose. 
It ensures that all financial records adhere to a consistent structure and provides a model to interact with the database. */}

import mongoose from "mongoose"; // Import Mongoose for MongoDB interaction

// Define the TypeScript interface to enforce type safety for financial records
interface FinancialRecord {
  userId: string;       // The ID of the user associated with the financial record
  date: Date;           // The date of the financial transaction
  description: string;  // A brief description of the transaction
  amount: number;       // The monetary value of the transaction
  category: string;     // The category of the transaction (e.g., food, rent)
  paymentMethod: string; // The payment method used (e.g., cash, credit card)
}

// Define the Mongoose schema for a financial record
const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
  userId: { type: String, required: true },       // The user ID must be a string and is required
  date: { type: Date, required: true },          // The date must be a valid date and is required
  description: { type: String, required: true }, // Description must be a string and is required
  amount: { type: Number, required: true },      // Amount must be a number and is required
  category: { type: String, required: true },    // Category must be a string and is required
  paymentMethod: { type: String, required: true }, // Payment method must be a string and is required
});

// Create a Mongoose model for the financial record schema
const FinancialRecordModel = mongoose.model<FinancialRecord>(
  "FinancialRecord",        // The name of the collection in the database
  financialRecordSchema     // The schema used for this model
);

export default FinancialRecordModel; // Export the model for use in other parts of the application

{/* This file defines the server-side API routes for managing financial records.
It uses Express.js to handle HTTP requests such as retrieving, creating, updating, and deleting financial records stored in a MongoDB database. */}

import express, { Request, Response } from "express"; // Import Express framework and types for TypeScript
import FinancialRecordModel from "../schema/financial-record"; // Import the financial record schema for database interactions

const router = express.Router(); // Initialize a new Express router

// Route to fetch all financial records for a specific user
router.get("/getAllByUserID/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Extract user ID from the route parameters
    const records = await FinancialRecordModel.find({ userId: userId }); // Query the database for records matching the user ID
    if (records.length === 0) {
      return res.status(404).send("No records found for the user."); // Respond with 404 if no records are found
    }
    res.status(200).send(records); // Send the retrieved records with a 200 status
  } catch (err) {
    res.status(500).send(err); // Handle any server errors
  }
});

// Route to create a new financial record
router.post("/", async (req: Request, res: Response) => {
  try {
    const newRecordBody = req.body; // Extract the record data from the request body
    const newRecord = new FinancialRecordModel(newRecordBody); // Create a new record instance
    const savedRecord = await newRecord.save(); // Save the new record to the database
    res.status(200).send(savedRecord); // Respond with the saved record and a 200 status
  } catch (err) {
    res.status(500).send(err); // Handle any server errors
  }
});

// Route to update an existing financial record by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // Extract the record ID from the route parameters
    const newRecordBody = req.body; // Extract the updated data from the request body
    const record = await FinancialRecordModel.findByIdAndUpdate(
      id,
      newRecordBody,
      { new: true } // Return the updated record
    );
    if (!record) return res.status(404).send(); // Respond with 404 if the record is not found
    res.status(200).send(record); // Respond with the updated record and a 200 status
  } catch (err) {
    res.status(500).send(err); // Handle any server errors
  }
});

// Route to delete a financial record by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id; // Extract the record ID from the route parameters
    const record = await FinancialRecordModel.findByIdAndDelete(id); // Delete the record from the database
    if (!record) return res.status(404).send(); // Respond with 404 if the record is not found
    res.status(200).send(record); // Respond with the deleted record and a 200 status
  } catch (err) {
    res.status(500).send(err); // Handle any server errors
  }
});

export default router; // Export the router for use in the application

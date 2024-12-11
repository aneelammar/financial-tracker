{/* This file defines the main Dashboard component of the financial records page. 
  It integrates the user context to retrieve the current user information and displays the financial records,
   including a form for adding new records and a list to display existing ones. 
   The total monthly amount is calculated dynamically based on the records and displayed at the top of the dashboard. */}

import { useUser } from "@clerk/clerk-react"; 
import { FinancialRecordForm } from "./financial-record-form";  
import { FinancialRecordList } from "./financial-record-list";  
import "./financial-record.css";  
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";  // React hook for memoizing the total monthly calculation

export const Dashboard = () => {
  const { user } = useUser();  // Accesses the current user from Clerk's user context
  const { records } = useFinancialRecords();  // Retrieves the financial records from the context

  // Memoizes the total of all financial records for the current month
  const totalMonthly = useMemo(() => {
    return records.reduce((acc, record) => acc + record.amount, 0);  // Accumulates the total amount from all records
  }, [records]);  // Recalculates when the records change

  return (
    <div className="dashboard-container">
      {/* Header Section: Displays the dashboard title and total monthly amount */}
      <div className="dashboard-header">
        <h1>My Budget</h1>
        <div className="total">${totalMonthly.toFixed(2)}</div>  {/* Displays the total monthly amount, formatted to 2 decimal places */}
      </div>

      {/* Financial Record Form: Form component for adding new financial records */}
      <FinancialRecordForm />

      {/* Financial Record List: Displays the list of existing financial records */}
      <div className="financial-record-list">
        <FinancialRecordList />
      </div>
    </div>
  );
};

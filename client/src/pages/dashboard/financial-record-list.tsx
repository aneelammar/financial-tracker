{/* The component displays a list of financial records in a table format, where each field is editable (except for the date field).
  Users can edit descriptions, amounts, categories, and payment methods, as well as delete records. */}

import { useMemo, useState } from "react"; // Importing necessary hooks from React
import {
  FinancialRecord,
  useFinancialRecords,
} from "../../contexts/financial-record-context"; // Importing context for managing financial records
import { useTable, Column, CellProps, Row } from "react-table"; // Importing React Table library for table handling

// Defining a type for EditableCell component's props
interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void; // Function to update a record
  editable: boolean; // Flag to determine if cell is editable
}

// EditableCell component allows inline editing of table cells
const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue, // Initial value of the cell
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false); // State to track if the cell is in editing mode
  const [value, setValue] = useState(initialValue); // State to hold the current value of the cell

  // Function to handle losing focus (blur) after editing
  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value); // Update the record after editing
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)} // Start editing when clicking the cell, if editable
      style={{ cursor: editable ? "pointer" : "default" }} // Change cursor if editable
    >
      {isEditing ? (
        <input
          value={value} // Show current value in input field
          onChange={(e) => setValue(e.target.value)} // Update the state as user types
          autoFocus
          onBlur={onBlur} // Trigger onBlur on losing focus
          style={{ width: "100%" }}
        />
      ) : typeof value === "string" ? (
        value // Display the value as is if not in editing mode
      ) : (
        value.toString() // Convert non-string values to string and display
      )}
    </div>
  );
};

// FinancialRecordList component displays the list of financial records in a table format
export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords(); // Destructuring the context to manage records

  // Function to update a record when a cell's value changes
  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]?._id; // Get record ID
    updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value }); // Update record with new value
  };

  // Defining table columns using React Table's API
  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      {
        Header: "Description", // Table header
        accessor: "description", // Column data accessor
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord} // Pass the updateRecord function to EditableCell
            editable={true} // Set editable flag to true for this column
          />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={false} // Set editable flag to false for Date column
          />
        ),
      },
      {
        Header: "Delete", // Column to handle record deletion
        id: "delete",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")} // Delete record when button is clicked
            className="button"
          >
            Delete
          </button>
        ),
      },
    ],
    [records] // Recompute columns when records change
  );

  // Using React Table hooks to get table properties and methods
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns, // Pass the defined columns to the table
      data: records, // Pass the records data to the table
    });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row); // Prepare row before rendering
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

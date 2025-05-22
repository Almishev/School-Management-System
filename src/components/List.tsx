import React from "react";

const columns = {
  // ... existing columns ...
  Attendance: [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "student",
      headerName: "Student",
      width: 200,
      renderCell: (params: any) => (
        <div>
          {params.row.student.name} {params.row.student.surname}
        </div>
      ),
    },
    {
      field: "lesson",
      headerName: "Lesson",
      width: 150,
      renderCell: (params: any) => <div>{params.row.lesson.name}</div>,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (params: any) => (
        <div>{new Date(params.row.date).toLocaleString()}</div>
      ),
    },
    {
      field: "present",
      headerName: "Present",
      width: 100,
      renderCell: (params: any) => (
        <div>{params.row.present ? "Yes" : "No"}</div>
      ),
    },
  ],
};

// Dummy data and table rendering for demonstration
const List = ({ table }: { table: string }) => {
  // In real usage, fetch data for the table and render with columns[table]
  return (
    <div>
      <h2>List for: {table}</h2>
      {/* Render your table here using columns[table] and fetched data */}
      {/* This is a placeholder. Replace with your actual table/grid component. */}
    </div>
  );
};

export default List; 
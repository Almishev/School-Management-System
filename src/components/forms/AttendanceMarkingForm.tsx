"use client";

import { useState, useMemo } from "react";
import { createOrUpdateAttendance } from "@/lib/actions";
import { toast } from "react-toastify";

interface ClassType { id: number; name: string; }
interface LessonType { id: number; name: string; classId: number; }
interface StudentType { id: string; name: string; surname: string; classId: number; }

export default function AttendanceMarkingForm({
  classes,
  lessons,
  students,
}: {
  classes: ClassType[];
  lessons: LessonType[];
  students: StudentType[];
}) {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [attendance, setAttendance] = useState<{ [studentId: string]: boolean }>({});
  const [loading, setLoading] = useState(false);

  const filteredLessons = useMemo(() =>
    lessons.filter(l => l.classId === selectedClass), [lessons, selectedClass]);
  const filteredStudents = useMemo(() =>
    students.filter(s => s.classId === selectedClass), [students, selectedClass]);

  // Initialize attendance when students change
  useMemo(() => {
    const initial: { [studentId: string]: boolean } = {};
    filteredStudents.forEach(s => { initial[s.id] = true; });
    setAttendance(initial);
  }, [selectedClass, filteredStudents.length]);

  const handleAttendanceChange = (studentId: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLesson || !date) {
      toast.error("Please select lesson and date.");
      return;
    }
    setLoading(true);
    const attendanceList = Object.entries(attendance).map(([studentId, present]) => ({ studentId, present }));
    const res = await createOrUpdateAttendance(selectedLesson, new Date(date), attendanceList);
    setLoading(false);
    if (res.success) {
      toast.success("Attendance saved!");
    } else {
      toast.error("Error saving attendance");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            value={selectedClass ?? ""}
            onChange={e => {
              setSelectedClass(e.target.value ? Number(e.target.value) : null);
              setSelectedLesson(null);
            }}
          >
            <option value="">Select class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Lesson</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            value={selectedLesson ?? ""}
            onChange={e => setSelectedLesson(e.target.value ? Number(e.target.value) : null)}
            disabled={!selectedClass}
          >
            <option value="">Select lesson</option>
            {filteredLessons.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Date</label>
          <input
            type="date"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
      </div>
      {selectedClass && (
        <div className="flex flex-col gap-2">
          <label className="font-semibold mb-2">Students</label>
          {filteredStudents.map(student => (
            <label key={student.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={attendance[student.id] || false}
                onChange={() => handleAttendanceChange(student.id)}
              />
              {student.name} {student.surname}
            </label>
          ))}
        </div>
      )}
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md w-fit" disabled={loading}>
        Save Attendance
      </button>
    </form>
  );
} 
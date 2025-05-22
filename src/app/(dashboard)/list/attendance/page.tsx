"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import AttendanceMarkingForm from "@/components/forms/AttendanceMarkingForm";
import { getLessons, getStudents } from "@/lib/actions";

// Helper to fetch classes from API
async function fetchClasses() {
  try {
    const res = await fetch("/api/classes");
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

const AttendancePage = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  const [classes, setClasses] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/login");
    }
  }, [isSignedIn, router]);

  useEffect(() => {
    const fetchData = async () => {
      const [classesData, lessonsData, studentsData] = await Promise.all([
        fetchClasses(),
        getLessons(),
        getStudents(),
      ]);
      setClasses(classesData);
      setLessons(lessonsData);
      setStudents(studentsData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Assume user role is stored in publicMetadata or similar
    if (user && user.publicMetadata && user.publicMetadata.role) {
      setRole(user.publicMetadata.role as string);
    }
  }, [user]);

  useEffect(() => {
    if (role && role !== "admin" && role !== "teacher") {
      router.push("/dashboard");
    }
  }, [role, router]);

  if (!isSignedIn || (role && role !== "admin" && role !== "teacher")) return null;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <h1 className="text-lg font-semibold mb-4">Attendance Marking</h1>
      <AttendanceMarkingForm classes={classes} lessons={lessons} students={students} />
    </div>
  );
};

export default AttendancePage; 
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AssignmentForm({ setOpen, type, data }: any) {
  const [title, setTitle] = useState(data?.title || "");
  const [startDate, setStartDate] = useState(data?.startDate ? new Date(data.startDate).toISOString().slice(0, 16) : "");
  const [dueDate, setDueDate] = useState(data?.dueDate ? new Date(data.dueDate).toISOString().slice(0, 16) : "");
  const [lessonId, setLessonId] = useState(data?.lessonId || "");
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/lessons")
      .then(res => res.json())
      .then(data => {
        setLessons(data);
        setLoadingLessons(false);
      });
  }, []);

  if (loadingLessons) {
    return <div>Loading lessons...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, startDate, dueDate, lessonId }),
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Assignment created!");
      setOpen(false);
      router.refresh();
    } else {
      toast.error("Error creating assignment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1 className="text-lg font-semibold mb-2">{type === "create" ? "Add Assignment" : "Edit Assignment"}</h1>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Title</label>
        <input
          type="text"
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Start Date</label>
        <input
          type="datetime-local"
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Due Date</label>
        <input
          type="datetime-local"
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Lesson</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          value={lessonId}
          onChange={e => setLessonId(e.target.value)}
          required
        >
          <option value="">Select lesson</option>
          {lessons.map((l: any) => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md w-fit" disabled={loading}>
        {type === "create" ? "Add Assignment" : "Save Changes"}
      </button>
    </form>
  );
} 
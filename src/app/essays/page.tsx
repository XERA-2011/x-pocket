"use client";
import { useState, useEffect } from 'react';

interface Essay {
  title: string;
  english_text: string;
  chinese_translation: string;
}

export default function EssaysPage() {
  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/pet-essays.json')
      .then((res) => res.json())
      .then((data) => {
        setEssays(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load essays:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">English Essay Examples</h1>
      {loading ? (
        <p>Loading essays...</p>
      ) : (
        <div className="grid gap-4">
          {essays.map((essay, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{essay.title}</h2>
                <p className="text-base mt-2">{essay.english_text}</p>
                <p className="text-sm text-gray-500 mt-4">{essay.chinese_translation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

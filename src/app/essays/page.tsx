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
    <div className="mx-auto p-4 min-h-[75vh] mt-[100px]">

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : essays.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl text-gray-500">No essays available at the moment.</p>
          <p className="mt-2">Please check back later for updates.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {essays.map((essay, index) => (
            <div key={index} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-primary">{essay.title}</h2>
                <div className="divider my-2"></div>
                <div className="mb-4">
                  <p className="text-base leading-relaxed">{essay.english_text}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{essay.chinese_translation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

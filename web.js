// EduQuiz Website - Built with Next.js, TailwindCSS, ShadCN UI, and Framer Motion

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { name: "Correct", value: 70 },
  { name: "Wrong", value: 30 },
];

const COLORS = ["#00C49F", "#FF8042"];

export default function EduQuizHome() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      {/* Hero Section */}
      <section className="text-center my-12">
        <motion.h1
          className="text-5xl font-extrabold text-blue-900"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to EduQuiz AI
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Test your knowledge with intelligent quizzes, track your progress, and challenge friends!
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button className="text-lg px-6 py-3">Start Quiz</Button>
        </motion.div>
      </section>

      {/* Quiz Category Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
        {["Math", "Science", "History"].map((subject, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-800">{subject}</h3>
              <p className="text-gray-600 mt-2">Explore quizzes tailored to your level</p>
              <Button className="mt-4 w-full">Take Quiz</Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Analytics Section */}
      <section className="bg-white rounded-2xl shadow-md p-6 max-w-xl mx-auto my-12">
        <h2 className="text-2xl font-semibold text-blue-800 text-center mb-4">
          Your Progress
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={sampleData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {sampleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Leaderboard Section */}
      <section className="my-12 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Leaderboard</h2>
        <div className="bg-white shadow rounded-xl p-4 max-w-2xl mx-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {["Anjali", "Rohan", "Zara"].map((user, i) => (
                <tr key={i} className="text-blue-800">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{user}</td>
                  <td className="p-2">{Math.floor(Math.random() * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

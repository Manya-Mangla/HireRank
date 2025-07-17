import React, { useEffect, useState } from "react";

const ResultsTable = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const ranked = localStorage.getItem("ranked");
    if (ranked) setResults(JSON.parse(ranked));
  }, []);

  if (!results.length) return null;

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold text-white mb-4">Top Matches</h2>
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium">#</th>
              <th className="px-6 py-3 text-left font-medium">Filename</th>
              <th className="px-6 py-3 text-left font-medium">Score</th>
              <th className="px-6 py-3 text-left font-medium">Top Keywords</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {results.map((r, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-gray-700">{i + 1}</td>
                <td className="px-6 py-4 text-gray-900">{r.filename}</td>
                <td className="px-6 py-4 text-blue-600 font-semibold">{r.score}%</td>
                <td className="px-6 py-4 text-gray-700">{r.topKeywords.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ResultsTable;
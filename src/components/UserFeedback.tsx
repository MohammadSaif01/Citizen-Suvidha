import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface GrievanceItem {
  id: string;
  station: string;
  category: string;
  feedbackText: string;
  rating: number;
  time: string;
  status: 'Received' | 'In Progress' | 'Resolved';
}

export default function UserFeedback() {
  const [station, setStation] = useState('Rajiv Chowk Metro');
  const [category, setCategory] = useState('Overcrowding');
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  // Past complaints track record
  const [userComplaints, setUserComplaints] = useState<GrievanceItem[]>([
    {
      id: 'GRV-8921',
      station: 'Rajiv Chowk Metro',
      category: 'Overcrowding',
      feedbackText: 'Platform 2 was suffocating due to delayed yellow line train.',
      rating: 2,
      time: 'Today, 09:30 AM',
      status: 'In Progress',
    },
    {
      id: 'GRV-7104',
      station: 'Kashmere Gate ISBT',
      category: 'Cleanliness',
      feedbackText: 'Waiting hall seats were dirty near terminal bay 3.',
      rating: 3,
      time: 'Yesterday',
      status: 'Resolved',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newGrievance: GrievanceItem = {
      id: `GRV-${Math.floor(1000 + Math.random() * 9000)}`,
      station,
      category,
      feedbackText,
      rating,
      time: 'Just now',
      status: 'Received',
    };

    setUserComplaints([newGrievance, ...userComplaints]);
    setSubmitted(true);
    setFeedbackText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow">
        <div>
          <h1 className="text-lg font-bold">CITIZEN SUVIDHA GRIEVANCE PORTAL</h1>
          <p className="text-xs text-slate-400">Public Transit Grievance Redressal & Feedback System</p>
        </div>
        <Link
          to="/"
          className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          ← Back to Commuter Home
        </Link>
      </header>

      <main className="max-w-4xl w-full mx-auto p-6 flex-grow space-y-8">
        {/* Submission Form Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
              Submit Grievance
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">Transit Complaint & Commuter Feedback</h2>
            <p className="text-sm text-slate-500">
              Your feedback is audited by the transport monitoring cell for rapid action.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Station / Terminal</label>
                <select
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option>Rajiv Chowk Metro</option>
                  <option>Kashmere Gate ISBT</option>
                  <option>Hauz Khas Junction</option>
                  <option>Anand Vihar Terminal</option>
                  <option>Noida Sector 18</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option>Overcrowding & Stampede Risk</option>
                  <option>Train / Bus Delay</option>
                  <option>Ticketing / Counter Issues</option>
                  <option>Escalator / Lift Breakdown</option>
                  <option>Cleanliness & Sanitation</option>
                  <option>Security / Women Safety</option>
                </select>
              </div>
            </div>

            {/* Experience Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Transit Experience Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition cursor-pointer ${
                      rating >= star ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    ★ {star}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Complaint */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Detailed Description</label>
              <textarea
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Explain the problem you faced during your travel..."
                className="w-full p-3.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                required
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">🔒 Submitted reports generate an official tracking ID</span>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition shadow cursor-pointer"
              >
                Submit Official Grievance
              </button>
            </div>

            {submitted && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-lg">
                ✓ Your complaint has been submitted and synced with the Authority Admin Desk!
              </div>
            )}
          </form>
        </div>

        {/* Live Complaint Status Tracker */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Your Grievance Tracker & Redressal Status</h3>
          <p className="text-xs text-slate-500">Live timeline of authority action taken on citizen submissions</p>

          <div className="space-y-3 pt-2">
            {userComplaints.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.id}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-1">{item.station} • <span className="text-slate-500 font-medium">{item.category}</span></h4>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    item.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'In Progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'
                  }`}>
                    ● {item.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600">{item.feedbackText}</p>
                <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                  <span>Rating given: {'★'.repeat(item.rating)}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
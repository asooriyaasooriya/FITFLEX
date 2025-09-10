import React, { useState } from 'react';
import { TrendingUp, Calendar, Award, Target, BarChart3 } from 'lucide-react';

export const Progress: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('week');
  
  const progressData = {
    week: {
      workouts: [3, 4, 2, 5, 3, 4, 4],
      weight: [180, 179.5, 179, 178.8, 178.5, 178.2, 178],
      calories: [2200, 2400, 2100, 2500, 2300, 2400, 2350],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    month: {
      workouts: [12, 15, 13, 18],
      weight: [182, 180, 179, 178],
      calories: [9200, 10100, 9800, 10400],
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
    },
    year: {
      workouts: [45, 52, 48, 55, 50, 58, 62, 60, 65, 68, 70, 75],
      weight: [185, 184, 183, 182, 181, 180, 179, 178, 178, 177, 177, 178],
      calories: [36000, 38500, 37200, 39800, 38100, 40200, 41500, 40800, 42300, 43100, 44200, 45000],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  const currentData = progressData[timeFrame];
  
  const achievements = [
    { title: 'First Workout', description: 'Completed your first workout', date: '2 months ago', color: 'text-green-600' },
    { title: '10 Workouts', description: 'Reached 10 total workouts', date: '6 weeks ago', color: 'text-blue-600' },
    { title: 'Weight Goal', description: 'Lost 5 pounds', date: '3 weeks ago', color: 'text-purple-600' },
    { title: '50 Workouts', description: 'Half century milestone', date: '1 week ago', color: 'text-orange-600' },
  ];

  const stats = [
    { label: 'Total Workouts', value: '127', change: '+12%', icon: BarChart3 },
    { label: 'Weight Lost', value: '7.2 lbs', change: '-3.9%', icon: TrendingUp },
    { label: 'Avg. Duration', value: '42 min', change: '+8%', icon: Calendar },
    { label: 'Personal Records', value: '23', change: '+15%', icon: Award },
  ];

  const maxValue = Math.max(...currentData.workouts);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your fitness journey and celebrate milestones</p>
      </div>

      {/* Time Frame Selector */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setTimeFrame(period)}
                className={`px-4 py-2 rounded-md capitalize transition-all duration-200 ${
                  timeFrame === period
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-white hover:text-orange-500'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Icon className="w-8 h-8 text-orange-500" />
              <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Workout Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Workout Frequency</h3>
        <div className="space-y-4">
          {currentData.labels.map((label, index) => (
            <div key={label} className="flex items-center space-x-4">
              <div className="w-16 text-sm font-medium text-gray-600">{label}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${(currentData.workouts[index] / maxValue) * 100}%` }}
                >
                  <span className="text-white text-xs font-bold">
                    {currentData.workouts[index]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weight Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Weight Progress</h3>
        <div className="space-y-3">
          {currentData.labels.map((label, index) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-600 font-medium">{label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">{currentData.weight[index]} lbs</span>
                {index > 0 && (
                  <span className={`text-sm ${currentData.weight[index] < currentData.weight[index - 1] ? 'text-green-600' : 'text-red-600'}`}>
                    {currentData.weight[index] < currentData.weight[index - 1] ? '↓' : '↑'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.color} bg-opacity-10 mr-4`}>
                <Award className={`w-6 h-6 ${achievement.color}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
              <span className="text-gray-500 text-sm">{achievement.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
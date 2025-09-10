import React from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Award, 
  Clock, 
  Flame, 
  Target,
  Play,
  BarChart3
} from 'lucide-react';
import { ActiveTab } from '../App';

interface DashboardProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Workouts This Week', value: '4', icon: Calendar, color: 'text-blue-600' },
    { label: 'Calories Burned', value: '1,250', icon: Flame, color: 'text-orange-600' },
    { label: 'Personal Records', value: '12', icon: Award, color: 'text-green-600' },
    { label: 'Active Minutes', value: '320', icon: Clock, color: 'text-purple-600' },
  ];

  const quickActions = [
    { 
      label: 'Start Workout', 
      icon: Play, 
      action: () => onNavigate('workout'),
      color: 'from-orange-500 to-red-500' 
    },
    { 
      label: 'View Progress', 
      icon: BarChart3, 
      action: () => onNavigate('progress'),
      color: 'from-blue-500 to-indigo-500' 
    },
    { 
      label: 'Set Goals', 
      icon: Target, 
      action: () => onNavigate('goals'),
      color: 'from-green-500 to-emerald-500' 
    },
  ];

  const recentWorkouts = [
    { name: 'Upper Body Strength', date: 'Today', duration: '45 min', calories: 320 },
    { name: 'HIIT Cardio', date: 'Yesterday', duration: '30 min', calories: 280 },
    { name: 'Lower Body Power', date: '2 days ago', duration: '50 min', calories: 380 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Welcome back, Athlete! 💪</h2>
        <p className="text-orange-100 text-lg">
          Ready to crush your fitness goals today? Let's make it happen!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map(({ label, icon: Icon, action, color }) => (
            <button
              key={label}
              onClick={action}
              className={`bg-gradient-to-r ${color} text-white p-6 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg`}
            >
              <Icon className="w-8 h-8 mb-3" />
              <p className="font-semibold text-lg">{label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Workouts</h3>
        <div className="space-y-4">
          {recentWorkouts.map((workout, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div>
                <h4 className="font-semibold text-gray-900">{workout.name}</h4>
                <p className="text-gray-600 text-sm">{workout.date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{workout.duration}</p>
                <p className="text-orange-600 text-sm">{workout.calories} cal</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
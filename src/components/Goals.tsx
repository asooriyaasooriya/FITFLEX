import React, { useState } from 'react';
import { Plus, Target, Calendar, CheckCircle, Circle, TrendingUp } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: 'weight' | 'strength' | 'cardio' | 'habit';
  deadline: string;
  completed: boolean;
}

export const Goals: React.FC = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Lose Weight',
      description: 'Reach target weight for summer',
      targetValue: 175,
      currentValue: 178,
      unit: 'lbs',
      category: 'weight',
      deadline: '2024-06-01',
      completed: false
    },
    {
      id: '2',
      title: 'Run 5Km',
      description: 'Complete a 5Km run without stopping',
      targetValue: 5,
      currentValue: 3.2,
      unit: 'km',
      category: 'cardio',
      deadline: '2024-04-15',
      completed: false
    },
    {
      id: '3',
      title: 'Bench Press',
      description: 'Bench press body weight',
      targetValue: 180,
      currentValue: 165,
      unit: 'lbs',
      category: 'strength',
      deadline: '2024-05-01',
      completed: false
    },
    {
      id: '4',
      title: 'Daily Workouts',
      description: 'Exercise every day for 30 days',
      targetValue: 30,
      currentValue: 18,
      unit: 'days',
      category: 'habit',
      deadline: '2024-03-31',
      completed: false
    }
  ]);

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const getProgressPercentage = (goal: Goal) => {
    if (goal.category === 'weight') {
      // For weight loss, calculate progress differently
      const totalToLose = 185 - goal.targetValue; // Assuming starting weight of 185
      const lostSoFar = 185 - goal.currentValue;
      return Math.min((lostSoFar / totalToLose) * 100, 100);
    }
    return Math.min((goal.currentValue / goal.targetValue) * 100, 100);
  };

  const getCategoryColor = (category: Goal['category']) => {
    switch (category) {
      case 'weight': return 'from-purple-500 to-pink-500';
      case 'strength': return 'from-red-500 to-orange-500';
      case 'cardio': return 'from-blue-500 to-indigo-500';
      case 'habit': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: Goal['category']) => {
    switch (category) {
      case 'weight': return TrendingUp;
      case 'strength': return Target;
      case 'cardio': return Circle;
      case 'habit': return CheckCircle;
      default: return Target;
    }
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const inProgressGoals = goals.filter(goal => !goal.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Goals</h2>
        <p className="text-gray-600">Set targets and track your fitness achievements</p>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Goals</p>
              <p className="text-3xl font-bold text-gray-900">{goals.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-orange-500">{inProgressGoals}</p>
            </div>
            <Circle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-500">{completedGoals}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Add Goal Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Set New Goal</span>
        </button>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const Icon = getCategoryIcon(goal.category);
          const progressPercent = getProgressPercentage(goal);
          
          return (
            <div key={goal.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Goal Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${getCategoryColor(goal.category)}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${goal.completed ? 'text-green-600 line-through' : 'text-gray-900'}`}>
                      {goal.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{goal.description}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    goal.completed
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {goal.completed && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>
                    {goal.currentValue} / {goal.targetValue} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getCategoryColor(goal.category)} transition-all duration-500`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className="text-right text-xs text-gray-500 mt-1">
                  {Math.round(progressPercent)}% complete
                </p>
              </div>

              {/* Deadline */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </span>
              </div>

              {/* Days remaining */}
              <div className="mt-2">
                {(() => {
                  const today = new Date();
                  const deadline = new Date(goal.deadline);
                  const diffTime = deadline.getTime() - today.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  
                  if (diffDays < 0) {
                    return <span className="text-red-500 text-xs font-medium">Overdue</span>;
                  } else if (diffDays === 0) {
                    return <span className="text-orange-500 text-xs font-medium">Due today</span>;
                  } else {
                    return <span className="text-gray-500 text-xs">{diffDays} days remaining</span>;
                  }
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No goals set yet</h3>
          <p className="text-gray-500 mb-4">Start by setting your first fitness goal</p>
          <button
            onClick={() => setShowAddGoal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Set Your First Goal
          </button>
        </div>
      )}
    </div>
  );
};
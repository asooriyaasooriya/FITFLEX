import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, Timer } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  completed: boolean;
}

export const WorkoutTracker: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Push-ups', sets: 3, reps: 15, completed: false },
    { id: '2', name: 'Squats', sets: 3, reps: 20, completed: false },
    { id: '3', name: 'Plank', sets: 3, reps: 60, completed: false },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setWorkoutTime(time => time + 1);
      }, 1000);
    } else if (!isActive && workoutTime !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, workoutTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExercise = (id: string) => {
    setExercises(exercises.map(exercise =>
      exercise.id === id ? { ...exercise, completed: !exercise.completed } : exercise
    ));
  };

  const startWorkout = () => setIsActive(true);
  const pauseWorkout = () => setIsActive(false);
  const stopWorkout = () => {
    setIsActive(false);
    setWorkoutTime(0);
    setExercises(exercises.map(ex => ({ ...ex, completed: false })));
  };

  const completedExercises = exercises.filter(ex => ex.completed).length;

  return (
    <div className="space-y-6">
      {/* Workout Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upper Body Strength</h2>
          <div className="bg-gray-100 rounded-full p-4 inline-flex items-center justify-center mb-4">
            <Timer className="w-8 h-8 text-orange-500 mr-2" />
            <span className="text-3xl font-mono font-bold text-gray-900">
              {formatTime(workoutTime)}
            </span>
          </div>
          
          {/* Control Buttons */}
          <div className="flex justify-center space-x-3">
            {!isActive ? (
              <button
                onClick={startWorkout}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <Play className="w-5 h-5" />
                <span>Start</span>
              </button>
            ) : (
              <button
                onClick={pauseWorkout}
                className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                <Pause className="w-5 h-5" />
                <span>Pause</span>
              </button>
            )}
            <button
              onClick={stopWorkout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Square className="w-5 h-5" />
              <span>Stop</span>
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedExercises}/{exercises.length} exercises</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises / exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Exercises</h3>
          <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Add Exercise</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                exercise.completed
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50 hover:border-orange-300'
              }`}
              onClick={() => toggleExercise(exercise.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-semibold ${exercise.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                    {exercise.name}
                  </h4>
                  <p className={`text-sm ${exercise.completed ? 'text-green-600' : 'text-gray-600'}`}>
                    {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight && ` @ ${exercise.weight}lbs`}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  exercise.completed
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}>
                  {exercise.completed && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workout Summary */}
      {workoutTime > 0 && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3">Today's Session</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{formatTime(workoutTime)}</p>
              <p className="text-blue-100 text-sm">Duration</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{completedExercises}</p>
              <p className="text-blue-100 text-sm">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">~250</p>
              <p className="text-blue-100 text-sm">Calories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">85%</p>
              <p className="text-blue-100 text-sm">Intensity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
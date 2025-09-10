import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Zap } from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  calories: number;
  description: string;
  muscles: string[];
  equipment: string;
}

export const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Push-ups',
      category: 'Strength',
      difficulty: 'Beginner',
      duration: '5 min',
      calories: 30,
      description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps.',
      muscles: ['Chest', 'Shoulders', 'Triceps'],
      equipment: 'None'
    },
    {
      id: '2',
      name: 'Burpees',
      category: 'HIIT',
      difficulty: 'Advanced',
      duration: '10 min',
      calories: 100,
      description: 'High-intensity full-body exercise combining squat, plank, and jump.',
      muscles: ['Full Body'],
      equipment: 'None'
    },
    {
      id: '3',
      name: 'Squats',
      category: 'Strength',
      difficulty: 'Beginner',
      duration: '8 min',
      calories: 50,
      description: 'Fundamental lower body exercise for building leg and glute strength.',
      muscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
      equipment: 'None'
    },
    {
      id: '4',
      name: 'Mountain Climbers',
      category: 'Cardio',
      difficulty: 'Intermediate',
      duration: '6 min',
      calories: 60,
      description: 'Dynamic cardio exercise that works the core and cardiovascular system.',
      muscles: ['Core', 'Shoulders', 'Legs'],
      equipment: 'None'
    },
    {
      id: '5',
      name: 'Deadlifts',
      category: 'Strength',
      difficulty: 'Intermediate',
      duration: '12 min',
      calories: 80,
      description: 'Compound movement targeting posterior chain muscles.',
      muscles: ['Hamstrings', 'Glutes', 'Lower Back'],
      equipment: 'Barbell'
    },
    {
      id: '6',
      name: 'Plank',
      category: 'Core',
      difficulty: 'Beginner',
      duration: '5 min',
      calories: 25,
      description: 'Isometric core exercise for building stability and strength.',
      muscles: ['Core', 'Shoulders', 'Back'],
      equipment: 'None'
    }
  ];

  const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Core', 'Flexibility'];
  
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.muscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Exercise Library</h2>
        <p className="text-gray-600">Discover new exercises to enhance your workout routine</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exercises or muscle groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-gray-600">
        Showing {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''}
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Exercise Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{exercise.name}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>
              <div className="text-orange-500">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>

            {/* Exercise Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{exercise.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{exercise.calories} cal</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{exercise.description}</p>

            {/* Muscles */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-2">TARGET MUSCLES</p>
              <div className="flex flex-wrap gap-1">
                {exercise.muscles.map((muscle, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-500 mb-1">EQUIPMENT</p>
              <span className="text-sm text-gray-700">{exercise.equipment}</span>
            </div>

            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-medium">
              Add to Workout
            </button>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No exercises found</h3>
          <p className="text-gray-500">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};
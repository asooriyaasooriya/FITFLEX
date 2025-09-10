import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { WorkoutTracker } from "./components/WorkoutTracker";
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { Progress } from './components/Progress';
import { Goals } from './components/Goals';

export type ActiveTab = 'dashboard' | 'workout' | 'exercises' | 'progress' | 'goals';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'workout':
        return <WorkoutTracker />;
      case 'exercises':
        return <ExerciseLibrary />;
      case 'progress':
        return <Progress />;
      case 'goals':
        return <Goals />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;
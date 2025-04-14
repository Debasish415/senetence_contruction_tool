import React, { useState } from "react";
import QuizApp from "./QuizApp"; 

const IntroPage = () => {
  const [hasStarted, setHasStarted] = useState(false); 


  if (hasStarted) {
    return <QuizApp />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="border-4 border-yellow-400 p-10 rounded-md text-center max-w-xl w-full">
        <div className="text-4xl mb-4">📝</div>

    
        <h1 className="text-2xl font-bold mb-2">Sentence Construction</h1>

    
        <p className="text-gray-600 mb-6">
          You'll need to arrange the words in the correct order to form a complete sentence. 
          Choose carefully!
        </p>

    
        <div className="flex justify-around text-gray-700 mb-6">
          <div>
            <div className="text-sm">Time Per Question</div>
            <div className="font-semibold">30 sec</div>
          </div>
          <div>
            <div className="text-sm">Total Questions</div>
            <div className="font-semibold">10</div>
          </div>
          <div>
            <div className="text-sm">Coins</div>
            <div className="font-semibold text-yellow-500">🪙 0</div>
          </div>
        </div>

      
        <div className="flex justify-center gap-4">
          
          <button 
            className="border border-purple-500 text-purple-500 px-6 py-2 rounded-md"
          >
            Back
          </button>

          <button
            onClick={() => {
              
              setHasStarted(true);
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-md"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;

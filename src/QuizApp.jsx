import React, { useEffect, useState } from "react";


const TIMER_DURATION = 30;

const QuizApp = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currQIndex, setCurrQIndex] = useState(0);  
  const [userAnswers, setUserAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(TIMER_DURATION);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((data) => {
        if (data?.questions) {
          setQuizQuestions(data.questions);
        } else {
          console.error("No questions found in the response"); 
        }
      });
  }, []);


  useEffect(() => {
    if (!submitted && quizQuestions.length > 0) {
      const timerInterval = setInterval(() => {
        setSecondsLeft((time) => {
          if (time === 1) {
            if (currQIndex + 1 < quizQuestions.length) {
              setCurrQIndex((prev) => prev + 1);
            } else {
              setSubmitted(true);
            }
            return TIMER_DURATION;
          }
          return time - 1;
        });
      }, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [currQIndex, submitted, quizQuestions.length]);

  const handleWordPick = (word, indexInAnswer) => {
    const currentQ = quizQuestions[currQIndex];
    const currentId = currentQ?.questionId;
    const existing = [...(userAnswers[currentId] || [])];

    if (existing.includes(word)) return;

    existing[indexInAnswer] = word;

    setUserAnswers((prev) => ({
      ...prev,
      [currentId]: existing,
    }));
  };

  const handleUndoWord = (i) => {
    const currentQ = quizQuestions[currQIndex];
    const currentId = currentQ?.questionId;
    const filled = [...(userAnswers[currentId] || [])];
    filled[i] = undefined;

    setUserAnswers((prev) => ({
      ...prev,
      [currentId]: filled,
    }));
  };

  const goToNext = () => {
    if (currQIndex + 1 < quizQuestions.length) {
      setCurrQIndex(currQIndex + 1);
      setSecondsLeft(TIMER_DURATION); 
    } else {
      setSubmitted(true);
    }
  };


  const renderSentence = () => {
    const currentQ = quizQuestions[currQIndex];
    const selectedWords = userAnswers[currentQ?.questionId] || [];
    const totalBlanks = currentQ?.question.split("___________").length - 1 || 4;
    const parts = currentQ?.question.split(/\s?___________\s?/);

    return (
      <p className="text-xl text-center mb-6 leading-8 font-medium text-gray-800">
        {parts.map((chunk, i) => (
          <span key={i}>
            {chunk}
            {i < totalBlanks && (
              <span
                className="inline-block border-b-2 border-purple-600 text-purple-600 px-3 mx-1 cursor-pointer hover:text-purple-800"
                onClick={() => handleUndoWord(i)}
              >
                {selectedWords[i] || "_________"}
              </span>
            )}
          </span>
        ))}
      </p>
    );
  };

  
  const renderResults = () => {
    const score = quizQuestions.filter((q) => {
      const given = userAnswers[q.questionId] || [];
      return JSON.stringify(given) === JSON.stringify(q.correctAnswer);
    }).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white p-6 rounded-lg shadow-xl mb-8">
            <div className="w-28 h-28 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-green-500">
              {score}/{quizQuestions.length}
            </div>
            <h2 className="text-2xl font-bold mt-4 text-green-700">Well Done!</h2>
            <p className="text-gray-600 mt-2">
              You've completed the quiz. Review your answers below.
            </p>
            <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold">
              Go to Dashboard
            </button>
          </div>

          <div className="space-y-6 text-left">
            {quizQuestions.map((q, idx) => {
              const yourAnswer = userAnswers[q.questionId] || [];
              const correct = JSON.stringify(yourAnswer) === JSON.stringify(q.correctAnswer);
              return (
                <div key={q.questionId} className="bg-white p-5 rounded-lg shadow-md">
                  <p className="text-sm text-gray-500 mb-1">Question {idx + 1}</p>
                  <p className="font-semibold mb-2 text-gray-800">{q.question}</p>
                  <p
                    className={`text-sm font-semibold ${
                      correct ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    Your Answer: {yourAnswer.join(" ")}
                  </p>
                  {!correct && (
                    <p className="text-sm text-gray-500 mt-1">
                      Correct:{" "}
                      <span className="text-gray-800 font-medium">
                        {q.correctAnswer.join(" ")}
                      </span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };


  if (quizQuestions.length === 0) return <div className="p-10 text-center text-lg">Loading...</div>;
  if (submitted) return renderResults();

  const currQ = quizQuestions[currQIndex];
  const filledWords = userAnswers[currQ?.questionId] || [];

  const progressPercent = ((currQIndex + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full border-4 border-purple-500 flex items-center justify-center text-sm font-bold text-purple-700 animate-pulse">
              {secondsLeft}
            </div>
            <span className="text-gray-500 font-medium">sec left</span>
          </div>
          <button className="text-red-600 hover:underline font-semibold">Quit</button>
        </div>


        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-purple-500 transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <h3 className="text-center text-lg text-gray-700 font-medium mb-4">
          Select the correct words to complete the sentence
        </h3>

    
        {renderSentence()}


        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {currQ.options
            .filter((opt) => !filledWords.includes(opt))
            .map((opt, i) => (
              <button
                key={i}
                className="border px-4 py-2 rounded-md transition hover:bg-purple-100"
                onClick={() => handleWordPick(opt, filledWords.length)}
              >
                {opt}
              </button>
            ))}
        </div>

        <div className="flex justify-end">
          <button
            className={`px-6 py-2 rounded-full font-semibold text-white transition ${
              filledWords.filter(Boolean).length < 4
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={filledWords.filter(Boolean).length < 4}
            onClick={goToNext}
          >
            ➡️ Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;

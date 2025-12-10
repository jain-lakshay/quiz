import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What sound does a cat make?",
    options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
    answer: "Meow-Meow",
  },
  {
    question: "What would you probably find in your fridge?",
    options: ["Shoes", "Ice Cream", "Books"],
    answer: "Ice Cream",
  },
  {
    question: "What color are bananas?",
    options: ["Blue", "Yellow", "Red"],
    answer: "Yellow",
  },
  {
    question: "How many stars are in the sky?",
    options: ["Two", "Infinite", "One Hundred"],
    answer: "Infinite",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );

  const handleNext = () => {
    const updated = [...answers];
    updated[current] = selected;
    setAnswers(updated);

    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(updated[current + 1]);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]);
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
  };

  const progressWidth = `${((current + 1) / questions.length) * 100}%`;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-[900px] p-10 rounded-3xl shadow-xl"
      >
        {!finished ? (
          <>
            <h1 className="text-5xl font-serif text-center mb-2">
              Test Your Knowledge
            </h1>
            <p className="text-center mb-8">
              Answer all questions to see your results
            </p>

            {/* PROGRESS BAR */}
            <div className="w-full h-2 bg-gray-200 rounded-full mb-10 overflow-hidden">
              <motion.div
                className="h-full bg-blue-400 rounded-full"
                animate={{ width: progressWidth }}
                transition={{ duration: 0.4 }}
              ></motion.div>
            </div>

            {/* QUESTION */}
            <motion.h2
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-semibold text-center mb-6"
            >
              {current + 1}. {questions[current].question}
            </motion.h2>

            {/* OPTIONS */}
            <motion.div
              key={"options-" + current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {questions[current].options.map((opt) => (
                <motion.button
                  key={opt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelected(opt)}
                  className={`w-full p-4 rounded-xl border transition-all ${
                    selected === opt
                      ? "bg-blue-200 border-blue-500"
                      : "bg-blue-50 border-blue-100 hover:bg-blue-100"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </motion.div>

            {/* BUTTONS */}
            <div className="flex justify-between mt-10">
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className="px-6 py-3 bg-blue-100 rounded-xl hover:bg-blue-200 disabled:opacity-40"
              >
                ←
              </button>

              <button
                onClick={handleNext}
                disabled={!selected}
                className="px-6 py-3 bg-blue-300 rounded-xl hover:bg-blue-400 disabled:opacity-40"
              >
                →
              </button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-20"
          >
            <p className="mb-6 text-xl">Keep Learning!</p>
            <h2 className="text-4xl font-serif mb-6">Your Final Score is</h2>

            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="text-7xl font-bold mb-10 text-blue-700"
            >
              {Math.round((score / questions.length) * 100)}%
            </motion.p>

            <button
              onClick={restart}
              className="px-8 py-3 bg-blue-200 rounded-xl hover:bg-blue-300"
            >
              Start Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-100 p-10">
      {/* OUTER GLASS CARD */}
      <div className="relative w-full max-w-6xl rounded-[48px] bg-white/40 p-6 backdrop-blur-xl shadow-2xl">
        {/* INNER CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-[36px] bg-[#F6FBFF] p-16"
        >
          {!finished ? (
            <>
              {/* HEADER */}
              <h1 className="text-center text-5xl font-serif text-slate-700 mb-3">
                Test Your Knowledge
              </h1>
              <p className="text-center text-slate-500 mb-12">
                Answer all questions to see your results
              </p>

              {/* SEGMENTED PROGRESS */}
              <div className="flex justify-center gap-4 mb-14">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-24 rounded-full transition-all ${
                      idx <= current ? "bg-slate-700" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* QUESTION */}
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-100 text-center py-4 rounded-xl mb-8 text-lg font-semibold text-slate-700"
              >
                {current + 1}. {questions[current].question}
              </motion.div>

              {/* OPTIONS */}
              <div className="space-y-5">
                {questions[current].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelected(opt)}
                    className={`w-full py-4 rounded-xl border text-slate-700 transition-all ${
                      selected === opt
                        ? "bg-blue-200 border-blue-400"
                        : "bg-blue-50 border-blue-100 hover:bg-blue-100"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* NAV BUTTONS */}
              <div className="flex justify-between mt-14">
                <button
                  onClick={handlePrev}
                  disabled={current === 0}
                  className="px-6 py-3 rounded-xl bg-blue-100 hover:bg-blue-200 disabled:opacity-40"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  className="px-6 py-3 rounded-xl bg-blue-200 hover:bg-blue-300 disabled:opacity-40"
                >
                  →
                </button>
              </div>
            </>
          ) : (
            /* RESULT SCREEN */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <p className="mb-6 text-lg text-slate-500">Keep Learning!</p>

              <h2 className="text-4xl font-serif text-slate-700 mb-8">
                Your Final score is
              </h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="text-[96px] font-serif text-slate-700 mb-10"
              >
                {Math.round((score / questions.length) * 100)}%
              </motion.div>

              <button
                onClick={restart}
                className="px-10 py-3 rounded-xl bg-blue-200 hover:bg-blue-300"
              >
                Start Again
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

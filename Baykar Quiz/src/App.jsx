
import React, { useEffect, useState, useCallback } from "react";
import Question from "./components/Question";
import Score from "./components/Score";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [state, setState] = useState({
    questionBank: [],
    currentQuestion: 0,
    selectedOption: "",
    quizEnd: false,
    answers: []
  })

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function fetchQuestionBank() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch places!");
        }
        let mappedQuestions = data.map(function (elem) {
          return {
            id: elem.id,
            question: elem.title,
            options: elem.body.split(/\r?\n/)
          }
        })
        setState((prevState) => {
          return {
            ...prevState,
            ["questionBank"]: mappedQuestions
          }
        })
        setFetched(true);
      } catch (error) {

      }
    }

    fetchQuestionBank();
  }, []);


  function handleOptionChange(e) {
    setState((prevState) => {
      return {
        ...prevState,
        ["selectedOption"]: e.target.value
      }
    })
  };

  function handleFormSubmit(value) {
    handleAnswer(value);
    handleNextQuestion();
  };

  function handleSkip() {
    handleAnswer("");
    handleNextQuestion();
  }

  function handleAnswer(value) {
    let addedAnswers = state.answers;
    addedAnswers.push(value);
    setState((prevState) => {
      return {
        ...prevState,
        ["answers"]: addedAnswers
      }
    });
  }



  function handleNextQuestion() {
    const { questionBank, currentQuestion } = state;
    if (currentQuestion + 1 < questionBank.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          quizEnd: true,
        }
      });
    }
  };
  const { questionBank, currentQuestion, selectedOption, quizEnd } = state;
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center">
      <h1 className="app-title">QUIZ APP</h1>
      {!fetched && <div>Fetching</div>}
      {(fetched && !quizEnd) && <Question
        key={currentQuestion}
        question={questionBank[currentQuestion]}
        selectedOption={selectedOption}
        time={30000}
        onOptionChange={handleOptionChange}
        onSubmit={handleFormSubmit}
        onEmpty={handleSkip}
      />
      }
      {(fetched && quizEnd) && <Score
        answers={state.answers}
        onNextQuestion={handleNextQuestion}
        className="score"
      />}
    </div>
  );

}
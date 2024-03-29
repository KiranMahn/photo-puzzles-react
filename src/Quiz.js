import { useState } from 'react'
import { quiz } from './data/questions'
import './quiz.css'
import myData from './PhotoDetails.json';
let idIndex = 0;
let imgLocation = "[56.6577495263809, -4.635479507522097]";

const Quiz = (props) => {
  let imgOrder = props.imgOrder;
  let setPTResult = props.setResult;
  let setReady = props.setReady;
  let finalResult = props.result;
  let reset = props.reset;
  let setReset = props.setReset;
  let currentId = imgOrder[idIndex];
  let setCurrId = props.setCurrId;
  imgLocation = myData["images"][currentId]["location"];
  let trivia = myData["images"][currentId]["trivia"];
  const { question, choices, correctAnswer } = trivia;
  let numImages = 9;

  console.log("Trivia: " + JSON.stringify(trivia));

  console.log("inside quiz the image location is: " + imgLocation);
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  // const resetMe = () => {
  //   setResult({
  //     score: 0,
  //     correctAnswers: 0,
  //     wrongAnswers: 0,
  //   });
  //   setReset(false);
  // }

  // if(reset) {
  //   console.log("resetting...")
  //   resetMe();
    
  // }

  // const { questions } = quiz
  // const { question, choices, correctAnswer } = questions[activeQuestion]
  const onClickNext = () => {
    console.log("pressed")
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
  
    if (idIndex !== numImages - 1) {
      console.log("switching...");
      idIndex++;
      console.log("old id: " + currentId)
      setCurrId(imgOrder[idIndex])
      console.log("new id: " + imgOrder[idIndex])

      setActiveQuestion(imgOrder[idIndex])
    } else {
      setActiveQuestion(imgOrder[idIndex])
      if(result.correctAnswers >= 6) {
        setPTResult("Win");
      } else {
        setPTResult("Lost");
      }
      setReady(true);
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">{addLeadingZero(idIndex + 1)}</span>
            <span className="total-question">/{addLeadingZero(imgOrder.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === imgOrder.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{imgOrder.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Quiz;
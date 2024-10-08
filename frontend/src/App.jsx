import { useState } from 'react'
import {QRCodeSVG} from 'qrcode.react';
import JoinGame from './component/onjoin';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'


const questions = [
  {
    question: 'What is the purpose of the `useState` hook in React?',
    options: [
      'A: To manage side effects',
      'B: To manage state in functional components',
      'C: To handle routing',
      'D: To create class components'
    ],
    correctAnswer: 'B'
  },
  {
    question: 'What are props in React?',
    options: [
      'A: State management system',
      'B: Methods for handling events',
      'C: Short for properties passed to components',
      'D: Built-in functions'
    ],
    correctAnswer: 'C'
  },
  {
    question: 'What does JSX stand for?',
    options: [
      'A: JavaScript XML',
      'B: JavaScript eXtended',
      'C: Java eXtensible Markup Language',
      'D: JavaScript XQuery'
    ],
    correctAnswer: 'A'
  },
  {
    question: 'What is the significance of the `key` prop in React?',
    options: [
      'A: It helps in identifying elements in lists',
      'B: It is used for styling components',
      'C: It manages component lifecycle',
      'D: It is not significant'
    ],
    correctAnswer: 'A'
  },
  {
    question: 'Which method is used to update the state in a class component?',
    options: [
      'A: setState',
      'B: updateState',
      'C: changeState',
      'D: modifyState'
    ],
    correctAnswer: 'A'
  },
  {
    question: 'What is the purpose of the `useEffect` hook?',
    options: [
      'A: To handle form input',
      'B: To perform side effects in functional components',
      'C: To create components',
      'D: To manage state'
    ],
    correctAnswer: 'B'
  },
  {
    question: 'What is a higher-order component (HOC)?',
    options: [
      'A: A component that renders another component',
      'B: A component that fetches data',
      'C: A component that handles routing',
      'D: A component that creates a state'
    ],
    correctAnswer: 'A'
  },
  {
    question: 'What do you call a function that returns a component in React?',
    options: [
      'A: Pure function',
      'B: Component function',
      'C: Functional component',
      'D: Class function'
    ],
    correctAnswer: 'C'
  },
  {
    question: 'Which lifecycle method is called just before a component is removed from the DOM?',
    options: [
      'A: componentDidMount',
      'B: componentWillUnmount',
      'C: componentDidUpdate',
      'D: render'
    ],
    correctAnswer: 'B'
  },
  {
    question: 'What is the main difference between a class component and a functional component?',
    options: [
      'A: Class components use hooks',
      'B: Functional components can hold state',
      'C: Class components can manage state and lifecycle methods, while functional components cannot',
      'D: There is no difference'
    ],
    correctAnswer: 'C'
  }
  
];

function App() {
  const [playersName, setplayerName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalPoint, settotalPoint] = useState(0);
  const [onPopup,setonPopup]=useState(false)
  const [players,setPlayers]=useState([])

  const currentQuestion = questions[currentQuestionIndex];

  const handlePlayerJoin = (name) => {
    setplayerName(name);
    setPlayers((prevPlayers) => [...prevPlayers, name]);
  };

  const handleReset=()=>{
    setplayerName('')
    settotalPoint(0)
    setCurrentQuestionIndex(0)
    setonPopup(false)
  }

  const handleAnswerSubmit = (answer) => {
    if (playersName === '') {
      toast.error('Enter your Name and join', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',

      });
    } else {
      if (answer === currentQuestion.correctAnswer) {
        setTimeout(() => {
          toast.success('Correct Answer :+1 point');
          settotalPoint(totalPoint + 1);
          console.log(currentQuestionIndex)
          if (currentQuestionIndex<9){
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          } else{
            setonPopup(true)
          }
        }, 1000);
      } else {
        toast.error('Wrong Answer :-0.5 point');
        settotalPoint(totalPoint - 0.5);
      }
    }
  };

  return (
    <div className='bg-[#f14c2c] min-h-screen p-10 relative'>
      <h1 className='text-[#eae0ce] text-3xl text-center font-semibold font-jost pb-5'>
        Quiz Game
      </h1>
      <div className='bg-[#eae0ce] min-h-[700px] p-5 md:w-[100%]'>
        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-col items-center md:order-2 md:w-[40%]'>
            <QRCodeSVG 
              value={window.location.href}
              size={300}
              className='border-[10px] hidden md:block'
            />
            <QRCodeSVG 
              value={window.location.href}
              size={150}
              className='border-[10px] md:hidden '
            />
            <h3 className='font-jost py-10 text-center text-2xl font-semibold'>
              SCAN THE QR CODE TO JOIN
            </h3>
            <JoinGame onJoin={handlePlayerJoin} />
          </div>
          <div className='md:order-1 flex flex-col items-center mt-5 md:mt-0 md:w-[60%]'>
            <div className='h-[200px] w-[250px] md:w-[500px] bg-[#f14c2c] p-3 mb-3 '>
              <h1 className='text-center text-white text-xl ] font-bold  font-jost'>Dashboard</h1>
              <ul className='overflow-y-scroll h-[150px] p-2 font-Poppins text-md'>
                  {players.map((player, index) => (
                   <li key={index}>{player}</li>
                   ))}
              </ul>
              
            </div>
            <div className='bg-[#FFD700] h-[200px] w-[250px]  md:w-[500px] rounded-md p-3'>
              <h2 className='font-jost text-xl font-bold text-center'>
                PLAYER DETAIL
              </h2>
              <div className='md:text-xl text-md font-jost font-semibold flex justify-around py-14'>
                <h1>NAME: {playersName}</h1>
                <h1>Score: {totalPoint}</h1>
              </div>
            </div>
            <div className='my-10'>
              <h2 className='md:text-xl font-Poppins'>{currentQuestion.question}</h2>
              <div className='flex flex-col space-y-3 py-5'>
                {currentQuestion.options.map((option, index) => (
                  <button
                    className='text-left md:text-lg font-Poppins font-semibold bg-white md:py-2 py-1 pl-2 rounded-md hover:bg-blue-400 active:bg-blue-500'
                    key={index}
                    onClick={() => handleAnswerSubmit(option.charAt(0))}
                    disabled={onPopup}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

      {onPopup && <div className='absolute h-[400px] w-[400px] bg-white shadow-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-auto flex flex-col items-center justify-center'>
        <h1 className='text-xl font-Poppins'>Score : {totalPoint}</h1>
        <h1 className='font-jost py-5 text-2xl font-bold'>{totalPoint ===10 ? `Good,${playersName}`: totalPoint>6 ? `Just Miss,${playersName}` : totalPoint>1 ? `Well Try,${playersName}`: `Loose,${playersName}`}</h1>      
        <button onClick={handleReset} className='bg-green-400 hover:bg-green-600 h-14 w-28 font-jost text-black rounded font-bold'>Try Agin</button>      

      </div>}
      <a href='https://www.linkedin.com/in/sakthiyanathan/' className=' text-white font-jost text-right  '><p className='pt-3'>---Sakthiyanthan P</p></a>
    </div>
  );
}
export default App;
import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../outCSS/output.css'


function App() {
  const [pitch, setPitch] = useState(1)
  const [rate, setRate] = useState(1)
  const [voice, setVoice] = useState(new SpeechSynthesisUtterance())
  const [voices, setVoices] = useState([])
  const textInputRef = useRef(null)
  const selectRef = useRef(null)


  const synth = window.speechSynthesis;


  function loadVoices() {
    setVoices(synth.getVoices());
  }
  
  // in Google Chrome the voices are not ready on page load
  if ("onvoiceschanged" in synth) {
    synth.onvoiceschanged = loadVoices;
  } else {
    loadVoices();
  }

  useEffect(() => {
    if(textInputRef.current) {
      textInputRef.current.value = 'Hello, my name is Ayu'
      textInputRef.current.focus()
    }

 
  }, [])

  


  const pitchHandler = (e) => {
    setPitch(e.target.value)
  }

  const rateHandler = (e) => {
    setRate(e.target.value)
  }

  

  const speakHandler = () => {
    const text = textInputRef.current.value
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.pitch = pitch
    utterance.rate = rate
    utterance.voice = voices[selectRef.current.selectedIndex]

    synth.speak(utterance)

  }


  return (
    <div className="App h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center items-center">
      <div className="flex flex-col h-3/5 w-4/5 lg:w-3/5 bg-white rounded-lg justify-center items-center">
        {/* text to prove */}
        <div className="flex flex-col lg:flex-row justify-evenly items-start w-3/4 h-auto p-2 ">
          <input className="w-full lg:w-3/5 h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-2 mb-2" ref={textInputRef}  type="text" placeholder="Insert text" />
          <button className="w-1/5 h-10 rounded-lg bg-blue-500 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50" onClick={()=>speakHandler()} >Speak</button>
        </div>


        {/* controls for voice utterance */}
        <div className="flex flex-col lg:flex-row justify-evenly items-center w-full lg:w-3/4 h-1/3 p-2">
          <select className="w-2/5 h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-2"  ref={selectRef}>
            {voices.map((voice, index) => {
              return <option key={index} value={voice.name}>{voice.name}</option>
            })}
          </select>

          {/* pitch slider*/}
          <div className="flex flex-col justify-center items-center w-1/5 h-auto">
            <label className="text-gray-500 font-bold text-sm">Pitch <span className=''>{pitch}</span></label>
            <input className="w-full h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-2" type="range" min="0" max="2" step="0.1" value={pitch} onChange={(e) => pitchHandler(e)} />
          </div>

          {/* rate slider*/}
          <div className="flex flex-col justify-center items-center w-1/5 h-auto">
            <label className="text-gray-500 font-bold text-sm">Rate <span>{rate}</span></label>
            <input className="w-full h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-2" type="range" min="0" max="2" step="0.1" value={rate} onChange={(e) => rateHandler(e)} />
          </div>
        </div>


      </div>
    </div>
  )
}

export default App

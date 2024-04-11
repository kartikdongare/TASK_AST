import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Map from './Component/Map'
import {REACT_APP_GOOGLE_MAPS_KEY} from './constant'
import Login from './Component/LoginPage';
import { BrowserRouter,Routes,Route  } from 'react-router-dom';
// import DirectionMap from './Component/DirectionMap'

function App() {
  const [count, setCount] = useState(0)

  return (
  //  <Map googleMapsApiKey={REACT_APP_GOOGLE_MAPS_KEY}/>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={ <Login/>}/>
    <Route path='/map' element={ <Map/>}/>
  </Routes>
  </BrowserRouter>
  // <Login/>
  //
  )
}

export default App

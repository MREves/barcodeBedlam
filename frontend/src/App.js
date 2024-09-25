import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Battle } from './Battle'
import { NavBar } from './NavBar';
import { DeckBuilder } from './DeckBuilder';

const App = () => {

  return (
    <>
      <NavBar/>
      <h1 className="neonText">Barcode Bedlam</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/deckBuilder" element={<DeckBuilder />} />
      </Routes>
    </>
  )
}

export default App;

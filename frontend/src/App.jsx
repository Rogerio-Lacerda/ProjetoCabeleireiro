import './App.css';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CadastroClientes from './CadastroClientes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-cliente" element={<CadastroClientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

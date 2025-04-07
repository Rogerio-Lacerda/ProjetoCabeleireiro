import './App.css';
import Header from './layout/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroClientes from './pages/CadastroClientes';
import CadastroBarbeiros from './pages/CadastroBarbeiros';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cadastro-cliente" element={<CadastroClientes />} />
        <Route path="cadastro-barbeiro" element={<CadastroBarbeiros />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

    
  );
}

export default App;

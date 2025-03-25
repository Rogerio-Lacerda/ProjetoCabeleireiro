import './App.css';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CadastroClientes from './CadastroClientes';
import CadastroBarbeiros from './CadastroBarbeiros';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cadastro-cliente" element={<CadastroClientes />} />
        <Route path="cadastro-barbeiro" element={<CadastroBarbeiros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

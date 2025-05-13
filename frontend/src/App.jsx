import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastroClientes from './pages/CadastroClientes';
import CadastroBarbeiros from './pages/CadastroBarbeiros';
import Login from './pages/Login';
import Agendamento from './pages/Agendamento';
import { GlobalContext } from './UserContext';
import Agendados from './pages/Agendados';
import AgendamentoBarbeiro from './pages/AgendamentoBarbeiro';

function App() {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cadastro-cliente" element={<CadastroClientes />} />
          <Route path="cadastro-barbeiro" element={<CadastroBarbeiros />} />
          <Route path="login" element={<Login />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/agendados" element={<Agendados />} />
          <Route path="/agendamento-barbeiro" element={<AgendamentoBarbeiro />} />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;

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
import Servicos from './pages/Servicos';
import CadastrarServicos from './pages/CadastrarServicos';
import ExcluirServico from './pages/ExcluirServico';

function App() {
  return (
    <BrowserRouter>
      <GlobalContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cadastro-cliente" element={<CadastroClientes />} />
          <Route path="cadastro-barbeiro" element={<CadastroBarbeiros />} />
          <Route path="login" element={<Login />} />
          <Route path="/agendamento/:id" element={<Agendamento />} />
          <Route path="/agendados" element={<Agendados />} />
          <Route
            path="/agendamento-barbeiro"
            element={<AgendamentoBarbeiro />}
          />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/cadastro-servicos" element={<CadastrarServicos />} />
          <Route path="/excluir-servicos" element={<ExcluirServico />} />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;

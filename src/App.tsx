// Importar dependência para o uso das Rotas
// OBS1: o Switch nunca deixará chamar 2 rotas ao mesmo tempo (apenas uma por vez)
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Importar Páginas
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

// Importar contextos de autenticação do Firebase
import { AuthContextProvider } from './contexts/AuthContext'

/// Ação Principal e Rotas
// OBS 1: ao usar o exact, o local só séra acessado se for exatamente o mesmo do path
// OBS 2: ao usar :id vc pode usar qualquer coisa escrita após '/rooms/....'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/rooms/new' component={NewRoom} />
          <Route path='/rooms/:id' component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
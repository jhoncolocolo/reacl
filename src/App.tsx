import { HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from './views/auth/Login';
import { Home } from './views/auth/Home';
import { Menu } from './components/Menu';
import { AuthProvider, AuthRoute } from './services/auth';
import { Roles } from './views/auth/Roles';
import { Language } from './views/masters/Language';
import UnauthorizedComponent from './views/auth/Unauthorized';
import { Permissions } from './views/auth/Permissions';

function App() {
  return (
    <div className="App">
      <HashRouter>
          <AuthProvider>
            <Menu/>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/unauthorized" element={<UnauthorizedComponent/>}/>
              <Route path='/home' element={<AuthRoute route="home.index"><Home/></AuthRoute>}/>
              <Route path='/languages'  element={ <AuthRoute route="languages.index"> <Language/></AuthRoute> } />
              <Route path='/roles' element={<AuthRoute route="roles.index"><Roles/></AuthRoute>}/>
              <Route path='/permissions' element={<AuthRoute route="permissions.index"><Permissions/></AuthRoute>}/>
            </Routes>
          </AuthProvider>
        </HashRouter>
    </div>
  );
}

export default App;

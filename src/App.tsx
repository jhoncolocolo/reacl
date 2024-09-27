import { HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from './views/auth/Login';
import { Home } from './views/auth/Home';
import { Menu } from './components/Menu';
import { AuthProvider, AuthRoute } from './services/auth';
import { Roles } from './views/auth/Roles';
import { OperationType } from './views/masters/OperationType';
import UnauthorizedComponent from './views/auth/Unauthorized';
import { Permissions } from './views/auth/Permissions';
import { Modules } from './views/auth/Module';
import { ModulePermissions } from './views/auth/ModulePermission';

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
              <Route path='/operation_types'  element={ <AuthRoute route="operation_types.index"> <OperationType/></AuthRoute> } />
              <Route path='/roles' element={<AuthRoute route="roles.index"><Roles/></AuthRoute>}/>
              <Route path='/permissions' element={<AuthRoute route="permissions.index"><Permissions/></AuthRoute>}/>
              <Route path='/modules' element={<AuthRoute route="modules.index"><Modules/></AuthRoute>}/>
              <Route path='/module_permissions' element={<AuthRoute route="module_permissions.index"><ModulePermissions/></AuthRoute>}/>
            </Routes>
          </AuthProvider>
        </HashRouter>
    </div>
  );
}

export default App;

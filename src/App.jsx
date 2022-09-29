import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import { Route, Routes } from 'solid-app-router';
import { Router } from 'solid-app-router';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/main" component={Main} />
        <Route path="/" component={Login} />
      </Routes>
    </div>
  );
}

export default App;

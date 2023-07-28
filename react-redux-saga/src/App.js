import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import {Routes, Route} from 'react-router-dom'
import Cart from './components/Cart';
import ReduxCrud from './components/ReduxCrud';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/redux-crud' element={<ReduxCrud />} />
      </Routes>
    </div>
  );
}

export default App;

import './App.css';
import Detail from './pages/DetailPage';
import MapsNavigation from './components/MapsNavigation';
import FullReportPage from './components/FullReportPage';
import PaymentPage from './components/PaymentPage';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/detail' element={<Detail/>}/>
        <Route path='/detail/map-navigation' element={<MapsNavigation/>}/>
        <Route path='/detail/full-report' element={<FullReportPage/>}/>
        <Route path='/payments' element={<PaymentPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

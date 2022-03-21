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
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/full-report/:idInspection' element={<FullReportPage/>}/>
        <Route path='/map-navigation/:id' element={<MapsNavigation/>}/>
        <Route path='/payments/:carId' element={<PaymentPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

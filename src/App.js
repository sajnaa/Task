
import './App.css';
import PdfPreview from './components/pdfPreview/PdfPreview';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import TaskOne from './components/taskOne/TaskOne';
import pdf from "./pdf/sajna.pdf"
import TaskTwo from './components/taskTwo/TaskTwo';
import Option from './components/Option';
function App() {
  const pdfUrl = pdf;
  return (
    <div>
{/* <Router>
      <Routes>
       <Route path="/" element={<TaskOne/>} />
       <Route path="/tasktwo" element={<TaskTwo/>} />
       <Route path="/pdf" element={<PdfPreview pdfUrl={pdfUrl} />} />
      </Routes>
</Router> */}
{/* <Option/> */}

<TaskOne/>
    </div>
  );
}

export default App;

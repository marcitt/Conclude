import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import PdfUpload from './pages/PdfUpload';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/onboarding">Onboarding</Link> |{" "}
        <Link to="/upload">Upload PDF</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard userName="Alice" />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/upload" element={<PdfUpload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
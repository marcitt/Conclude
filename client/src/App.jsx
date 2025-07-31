import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import PdfUpload from './pages/PdfUpload';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '150px',
          padding: '1rem',
          borderRight: '1px solid #e9e9e9',
          boxSizing: 'border-box',
          zIndex: 1000,
        }}
        >
          {/* Empty aside for now */}
        </aside>

        <div style={{ flexGrow: 1 }}>
          <nav
            style={{
              borderBottom: '1px solid #e9e9e9',
              padding: '1rem',
              backgroundColor: '#fff',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <Link to="/">Dashboard</Link>
            <Link to="/onboarding">Onboarding</Link>
            <Link to="/upload">Upload PDF</Link>
          </nav>

          <main style={{ padding: '1rem' }}>
            <Routes>
              <Route path="/" element={<Dashboard userName="Alice" />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/upload" element={<PdfUpload />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

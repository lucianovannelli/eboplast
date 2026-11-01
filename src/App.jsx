import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import ScrollToTop from './components/ScrollToTop';

// Page Views
import HomePage from './pages/HomePage';
import TechnologyPage from './pages/TechnologyPage';
import ProductsPage from './pages/ProductsPage';
import ChemicalCompatibilityPage from './pages/ChemicalCompatibilityPage';
import PolesAndFirePage from './pages/PolesAndFirePage';
import ServicesPage from './pages/ServicesPage';
import QuotePage from './pages/QuotePage';
import ContactPage from './pages/ContactPage';
import OrderPortalPage from './pages/OrderPortalPage';
import AdminOrdersPage from './pages/AdminOrdersPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-[#5b8314] selection:text-white">
        {/* Main Technical Navigation */}
        <Navbar />

        {/* Multi-Page Routes View */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tecnologia" element={<TechnologyPage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/compatibilidad-quimica" element={<ChemicalCompatibilityPage />} />
            <Route path="/postes-prfv" element={<PolesAndFirePage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/cotizador" element={<QuotePage />} />
            <Route path="/cotizar" element={<QuotePage />} />
            <Route path="/seguimiento" element={<OrderPortalPage />} />
            <Route path="/seguimiento/:code" element={<OrderPortalPage />} />
            <Route path="/gestion" element={<AdminOrdersPage />} />
            <Route path="/contacto" element={<ContactPage />} />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp Contact Button */}
        <WhatsAppFloating />
      </div>
    </Router>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';
import { Layout } from './components/layout/Layout';
import { InitializationService } from './services/initialization.service';

export default function App() {
  useEffect(() => {
    InitializationService.initialize().catch(console.error);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </AuthProvider>
  );
}
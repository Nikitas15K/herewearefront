import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LandingPage, Layout, LoginPage, NotFoundPage, ProfilePage, ProtectedRoute, RegistrationPage, VehiclePage, Footer } from "../../components"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/vehicles/*" element={<ProtectedRoute component={VehiclePage} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Footer />
    </BrowserRouter>
  )
}
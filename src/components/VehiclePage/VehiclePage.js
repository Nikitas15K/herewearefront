import React from "react"
import { VehiclesHome, VehicleView, NotFoundPage } from "../../components"
import { Routes, Route } from "react-router-dom"
export default function CleaningJobsPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<VehiclesHome />} />
        <Route path=":vehicle_id" element={<VehicleView />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
import React from "react"
import { connect } from "react-redux"
import { Actions as vehicleActions } from "../../redux/vehicles"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiLoadingSpinner
} from "@elastic/eui"
import { VehicleCard, NotFoundPage } from "../../components"
import { useParams } from "react-router-dom"
import styled from "styled-components"
const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`
function VehicleView({
    isLoading,
    vehiclesError,
    currentVehicle,
    fetchVehicleById,
    clearCurrentVehicle
  }) {
    const { vehicle_id } = useParams()
    React.useEffect(() => {
      if (vehicle_id) {
        fetchVehicleById({ vehicle_id })
      }
      return () => clearCurrentVehicle()
    }, [vehicle_id, fetchVehicleById, clearCurrentVehicle])
    if (isLoading) return <EuiLoadingSpinner size="xl" />
    if (!currentVehicle) return <EuiLoadingSpinner size="xl" />
    if (!currentVehicle?.sign) return <NotFoundPage />
  
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center" paddingSize="none">
          <EuiPageContentBody>
          <VehicleCard vehicle={currentVehicle}/>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}
export default connect(
    (state) => ({
      isLoading: state.vehicles.isLoading,
      vehiclesError: state.vehicles.error,
      currentVehicle: state.vehicles.currentVehicle
    }),
    {
      fetchVehicleById: vehicleActions.fetchVehicleById,
      clearCurrentVehicle: vehicleActions.clearCurrentVehicle
    }
  )(VehicleView)
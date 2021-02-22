import React from "react"
import {
    EuiBadge,
    EuiButton,
    EuiCard,
    EuiFlexGroup,
    EuiFlexItem,
    EuiText,
    EuiSpacer,
    EuiLoadingChart
} from "@elastic/eui"
import styled from "styled-components"
const ImageHolder = styled.div`
  min-width: 400px;
  min-height: 30px;
  & > img {
    position: relative;
    z-index: 2;
  }
`
const vehicleTypeToDisplayNameMapping = {
    bicycle: "Bicycle",
    motorcycle: "Motorcycle",
    car: "Car",
    truck: "Truck",
    bus: "Bus"
}

const roleTypeToDisplayNameMapping = {
    owner: "Owner",
    user: "User",

}
export default function VehicleCard({ vehicle }) {
    const image = (
        <ImageHolder>
            <EuiLoadingChart size="xl" style={{ position: "absolute", zIndex: 1 }} />
            <img src="https://source.unsplash.com/400x30/?black" alt="Vehicle Cover" />
        </ImageHolder>
    )


    const title = (
        <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
            <EuiFlexItem grow={false}>{vehicle.sign}</EuiFlexItem>

            <EuiFlexItem grow={false}>
                <EuiBadge color="secondary">
                    {vehicleTypeToDisplayNameMapping[vehicle.type]}
                </EuiBadge>

            </EuiFlexItem>
        </EuiFlexGroup>
    )

    const middle = (
        <>
            <EuiSpacer />
            <ul justifyContent="spaceBetween" alignItems="flexEnd">
                <div>
                    <EuiFlexItem grow={false}>
                        <EuiText>Model: {vehicle.model}</EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiText>Manufacture Year: {vehicle.manufacture_year}</EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiText>Role: {roleTypeToDisplayNameMapping[vehicle.roles.role]}</EuiText>
                    </EuiFlexItem>
                </div>
                <div>
                    <EuiFlexItem grow={false}>
                        <EuiText>Insurance Number: {vehicle.insurance.number}</EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiText>Insurance Expire Date: {vehicle.insurance.expiredate}</EuiText>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiText>Insurance Company: </EuiText>
                    </EuiFlexItem>
                </div>
            </ul>
        </>
    )
    const footer = (
        <>
            <EuiSpacer />
            <EuiFlexGroup justifyContent="spaceBetween" alignItems="flexEnd">
                <EuiFlexItem grow={false}>
                    <EuiButton>Update Insurance</EuiButton>
                </EuiFlexItem>

                <EuiFlexItem grow={false}>
                    <EuiButton>Add Insurance</EuiButton>
                </EuiFlexItem>

                <EuiFlexItem grow={false}>
                    <EuiButton>Update Role</EuiButton>
                </EuiFlexItem>
            </EuiFlexGroup>
        </>
    )
    return (
        <EuiCard
            display="plain"
            textAlign="left"
            image={image}
            title={title}
            description={middle}
            footer={footer}
        />
    )
}

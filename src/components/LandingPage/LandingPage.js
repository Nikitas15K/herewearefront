import React from "react"
import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui"
import { Carousel, CarouselTitle } from "../../components"
import { useCarousel } from "../../hooks/useCarousel"
import happy from "../../assets/img/happy.jpg"
import happyInCar from "../../assets/img/forgetoldways.jpg"
import carCrashCost from "../../assets/img/carcrashcost.jpg"
import forgetOldWays from "../../assets/img/forgetoldways.jpg"
import loveYourCar from "../../assets/img/loveyourcar.jpg"
import driver from "../../assets/img/driver.jpg"
import dots from "../../assets/img/dots.png"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
`

const LandingTitle = styled.h1`
  font-size: 2.5rem;
  display: flex;
  justify-content: center;

`

const StyledEuiPageContent = styled(EuiPageContent)`
   border-radius: 50%;
`
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
background : #abd544;  
max-width: 600px;
  max-height: 400px;
  & > img {
    width: 100%;
  }
`

const carouselItems = [
    { label: "We all love our car", content: <img src={happy} alt="happy" /> },
    { label: "dorm room", content: <img src={happyInCar} alt="happyInCar" /> },
    { label: "bedroom", content: <img src={carCrashCost} alt="carCrashCost" /> },
    { label: "bathroom", content: <img src={forgetOldWays} alt="forgetOldWays" /> },
    { label: "kitchen", content: <img src={loveYourCar} alt="loveyourcar" /> },
    { label: "reading room", content: <img src={driver} alt="driver" /> },
]

export default function LandingPage() {
    const { current } = useCarousel(carouselItems, 3000)
    return (
        <StyledEuiPage style={{
            backgroundImage: `url(${dots})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left bottom'
        }}>
            <EuiPageBody component="section">
                <EuiFlexGroup direction="column" alignItems="center">

                    <EuiFlexItem>
                        <LandingTitle>Here We Are</LandingTitle>

                    </EuiFlexItem>

                    <EuiFlexItem>
                        <LandingTitle>After An Accident, Repair Your Day Fast!</LandingTitle>
                    </EuiFlexItem>

                </EuiFlexGroup>

                <EuiFlexGroup direction="rowReverse">

                    <EuiFlexItem style={{ backgroundColor: "#abd544", margin:"3rem 2rem 5rem -2rem" }}>
                        <CarouselTitle items={carouselItems} current={current} />
                    </EuiFlexItem>

                    <EuiFlexItem>
                        <Carousel items={carouselItems} current={current} />
                    </EuiFlexItem>

                </EuiFlexGroup>

                <EuiFlexGroup direction="column" alignItems="center">

                </EuiFlexGroup>

            </EuiPageBody>
        </StyledEuiPage >
    )
}

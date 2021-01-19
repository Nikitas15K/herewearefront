import React from "react"
import {
    EuiPage,
    EuiPageBody,
    EuiPageContentBody,
    EuiFlexGroup,
    EuiFlexItem,
} from "@elastic/eui"
import { Carousel, CarouselTitle } from "../../components"
import { useCarousel } from "../../hooks/useCarousel"
import happy from "../../assets/img/happy.jpg"
import happyInCar from "../../assets/img/repairyourdayafteranaccident.jpg"
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

const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  @media screen and (max-width: 1200px) {
    width: 50%;
   }
`

const carouselItems = [
    { label: "We all love our car", content: <img src={happy} alt="happy" /> },
    { label: "Some problems are solved easily", content: <img src={happyInCar} alt="happyInCar" /> },
    { label: "Send picture of damage", content: <img src={carCrashCost} alt="carCrashCost" /> },
    { label: "Forget the old slow way", content: <img src={forgetOldWays} alt="forgetOldWays" /> },
    { label: "When you take care of your car", content: <img src={loveYourCar} alt="loveyourcar" /> },
    { label: "We can predict the damage", content: <img src={driver} alt="driver" /> },
]

export default function LandingPage() {
    const { current } = useCarousel(carouselItems, 3000)
    return (
        <StyledEuiPage style={{
            backgroundImage: `url(${dots})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top'
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

                <EuiFlexGroup direction="row">

                    <EuiFlexItem>
                        <StyledEuiPageContentBody>
                            <Carousel items={carouselItems} current={current} />
                        </StyledEuiPageContentBody>
                    </EuiFlexItem>

                    <EuiFlexItem>
                        <CarouselTitle items={carouselItems} current={current} />
                    </EuiFlexItem>


                </EuiFlexGroup>

                <EuiFlexGroup direction="column" alignItems="center">

                </EuiFlexGroup>

            </EuiPageBody>
        </StyledEuiPage >
    )
}

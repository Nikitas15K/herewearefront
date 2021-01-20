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
import accident from "../../assets/img/accident.jpg"
import problems from "../../assets/img/problems.jpg"
import loveYourCar from "../../assets/img/loveyourcar.jpg"
import stateHere from "../../assets/img/statehere.jpg"
import driver from "../../assets/img/driver.jpg"
import dots from "../../assets/img/dots.png"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
    display: flex;
    background-image: url(${dots});
    background-repeat: no-repeat;
    background-position: 'left top';

    @media screen and (max-width: 651px) {
        background-repeat: repeat;
      } 
`

const LandingTitle = styled.h1`
  font-size: 2.5rem;
  text-align:center;
`

const carouselItems = [
    { label: "In HereWeAre we think that...", content: <img src={happy} alt="happy" /> },
    { label: "...when you love your car...", content: <img src={loveYourCar} alt="loveyourcar" /> },
    { label: "... problems should be solved easily ...", content: <img src={happyInCar} alt="happyInCar" /> },
    { label: "... don't lose your day ...", content: <img src={problems} alt="problems" /> },
    { label: "... even when sth does wrong ...", content: <img src={accident} alt="accident" /> },
    { label: "... forget the old slow ways ...", content: <img src={forgetOldWays} alt="forgetOldWays" /> },
    { label: " ... state accident in our web app...", content: <img src={stateHere} alt="stateHere" /> },
    { label: "... take picture of damage ...", content: <img src={carCrashCost} alt="carCrashCost" /> },
    { label: "... and we predict the damage!", content: <img src={driver} alt="driver" /> },
]

export default function LandingPage() {
    const { current } = useCarousel(carouselItems, 3000)
    return (
        <StyledEuiPage style={{

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
                        <EuiPageContentBody>
                            <Carousel items={carouselItems} current={current} />
                        </EuiPageContentBody>
                    </EuiFlexItem>

                    <EuiFlexItem>
                        <CarouselTitle items={carouselItems} current={current} />
                    </EuiFlexItem>


                </EuiFlexGroup>

            </EuiPageBody>
        </StyledEuiPage >
    )
}

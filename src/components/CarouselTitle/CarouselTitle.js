import React from "react"
import hereweare from "../../assets/img/hereweare.png"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"

const AnimatedTitle = styled.div`
  margin:3rem 0rem 1rem -2rem;
  & h1,p {
    display: flex;
    color: white;
    text-align:right;

    @media screen and (max-width: 700px) {
      margin: 0rem;
}
`
const AnimatedCarouselTitle = styled.span`
  font-size: 2.2rem;
  margin-left: 2rem;
  width: 30rem;
  margin: 0 auto;
  color:white;
  & .underline {
    width: 170px;
    height: 2px;
    border-radius: 4px;
    position: absolute;
    color:white;
  }
  @media screen and (max-width: 700px) {
    font-size: 0.1rem;
    visibility: hidden;
   }
`

const StyledImg = styled.img`
  width:2.7rem;
  height:2.5rem;
  margin: 0 0.1rem;
`

const StyledLi = styled.li`
list-style-type: none;
margin: 0 auto;
padding: 1rem;
background-color:#abd544;

@media screen and (max-width: 651px) {
  padding: 0.1rem 1rem 1rem 2.5rem;
 }
`

const TimelineDiv = styled.div`
width:40rem;
color:white;
text-align: right;
padding: 0.1rem 0.2rem 0.7rem 0.5rem;
font-size: 1.8rem;
@media screen and (max-width: 651px) {
  width:100%;
  padding:0.1rem 0.1rem 0.1rem 0.1rem;
  font-size: 1.2rem;
 }

`

const transitionDuration = 0.4;
const transitionEase = [0.68, -0.55, 0.265, 1.55];
export default function CarouselTitle({ items, current }) {
  return (
    <AnimatedTitle>
      <ul>
        <StyledLi>
          <AnimatePresence exitBeforeEnter>
            <AnimatedCarouselTitle>
              {items.map((item, i) => {
                return (
                  current === i && (
                    <React.Fragment key={i}>
                      <motion.span
                        key={i}
                        initial="top"
                        animate="present"
                        exit="bottom"
                        variants={{
                          top: { opacity: 0, y: -150 },
                          present: { opacity: 1, y: 0 },
                          bottom: { opacity: 0, y: 150 }
                        }}
                        transition={{ duration: transitionDuration, ease: transitionEase }}
                      >
                        {item.label}
                      </motion.span>
                    </React.Fragment>
                  )
                )
              })}
              <div className="underline" />
            </AnimatedCarouselTitle>
          </AnimatePresence>
        </StyledLi>

        <StyledLi>
          <TimelineDiv>
            <StyledImg size="l" src={hereweare} />
            Become a member in HereWeAre services
                </TimelineDiv>
        </StyledLi>
        <StyledLi>
          <TimelineDiv>
            <StyledImg size="l" src={hereweare} />
            Make your vehicle accident statement fast
           </TimelineDiv>
        </StyledLi>

        <StyledLi>
          <TimelineDiv>
            <StyledImg size="l" src={hereweare} />
            Keep history of your vehicle accident statements
                </TimelineDiv>
        </StyledLi>

        <StyledLi>
          <TimelineDiv>
            <StyledImg size="l" src={hereweare} />
            Have a prediction for your vehicle damage
                </TimelineDiv>
        </StyledLi>
      </ul>


    </AnimatedTitle>
  )
}

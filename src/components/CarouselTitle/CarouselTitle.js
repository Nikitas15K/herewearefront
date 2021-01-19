import React from "react"
import { EuiTitle } from "@elastic/eui"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"
const AnimatedTitle = styled.div`
  margin-bottom: 1rem;
  & h1,p {
    display: flex;
    color: white;
    justify-content:right;
    align-item:center;
  }
`
const TitleWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;

`
const AnimatedCarouselTitle = styled.span`
  position: relative;
  display: flex;
  justify-content:right;
  align-item:center;
  width: 15rem;
  margin: 0 15px;
  white-space: nowrap;
  & .underline {
    width: 170px;
    height: 2px;
    border-radius: 4px;
    position: absolute;
    bottom: -4px;
    left: -10px;
    background: #abd544;
    color:white
  }
`

const transitionDuration = 0.4;
const transitionEase = [0.68, -0.55, 0.265, 1.55];
export default function CarouselTitle({ items, current }) {
  return (
    <AnimatedTitle>
      <EuiTitle>
        <TitleWrapper>
        <p style={{ display:"flex", justifyContent: "center", alignItem: "center" }} >
          Welcome to HereWeAre Services! <br/> 
          Become a member <br/>
          Make fast vehicle accident statement <br/>
            </p>
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
          <h1>cleaned.</h1>
        </TitleWrapper>
      </EuiTitle>
    </AnimatedTitle>
  )
}

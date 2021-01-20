import React from "react"
import { EuiPanel } from "@elastic/eui"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"

const CarouselWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 450px;
  min-width: 450px;
  @media screen and (max-width: 651px) {
    min-height: calc(100vw - 25px);
    min-width: calc(100vw - 25px);
  }
`
const StyledEuiPanel = styled(EuiPanel)`
  height: 432px;
  width: 650px;
  max-width: 650px;
  max-height: 432px;
  border-radius: 10px;
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  @media screen and (max-width: 651px) {
    height: calc(61.75vw);
    width: calc(95vw);
  }  
`
const transitionDuration = 0.4
const transitionEase = [0.68, -0.55, 0.265, 1.55]
export default function Carousel({ items = [], current }) {
    return (
        <CarouselWrapper>
            <AnimatePresence exitBeforeEnter>
                {items.map((item, i) =>
                    current === i ? (
                        <React.Fragment key={i}>
                            <motion.div
                                key={i}
                                initial="left"
                                animate="present"
                                exit="right"
                                variants={{
                                    left: { opacity: 0, x: -70 },
                                    present: { opacity: 1, x: 0 },
                                    right: { opacity: 0, x: 70 }
                                }}
                                transition={{ duration: transitionDuration, ease: transitionEase }}
                            >
                                <StyledEuiPanel paddingSize="l">
                                  {item.content}
                                  <kbd>Image from <a href='https://www.freepik.com/photos/car' className="u-border-1 u-border-palette-2-base u-btn u-button-style u-none u-text-body-alt-color u-btn-1">Freepik</a></kbd> 
                                </StyledEuiPanel>
                                
                            </motion.div>
                        </React.Fragment>
                    ) : null
                )}
            </AnimatePresence>
        </CarouselWrapper>
    )
}


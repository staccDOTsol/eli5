import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import fetch from 'node-fetch'
const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);
const [input, setInput] = useState("humans of new york")
const [answer, setAnswer] = useState("")
const [answer2, setAnswer2] = useState("")

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );
  function handleInput(e){
setInput(e.target.value)
  }
async function handleSubmit(){
try {
let search = await ( await fetch ("https://playitagainsam.herokuapp.com/?search="+input)).json()
console.log(search.r.replace('\n','').replace('\n',''))
setAnswer(search.r.toString().replace('\n','').replace('\n',''))
setAnswer2("Did you maybe mean one of these? " +(search.as).toString().replace('[','').replace(']','') + "?")

} 
catch (err){
  console.log(err)
} 
}
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
          <div className="cta-slogan">
            <h3 className="m-0">
              ELI5
              </h3>
          </div>
            <div className="container-xs">
            <h2 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
                <input onChange={handleInput} type="text"></input><button  className="banner-close" onClick={handleSubmit}>Learn!</button>
            </h2>
              <p className="m-0 mb-16 reveal-from-bottom" data-reveal-delay="400">
              {answer}<br/>{answer2}<br/>
                What do you want to know about? I'll explain it like you're 5 years old :)
                </p>
              
            </div>
            </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import "../resources/RouletteWheel.css";
import { Button, Modal } from 'react-bootstrap';
import RouletteSlideVerA from "./RouletteSlider";

export default function RouletteWheel({ probabilities }) {

  const data = [
    { option: "1 - 2% off", probability: probabilities[0] },
    { option: "2 - Free Meal", probability: probabilities[1] },
    { option: "3 - 25% off", probability: probabilities[2] },
    { option: "4 - Free Meal", probability: probabilities[3] },
    { option: "5 - Better Luck Next Time", probability: probabilities[4] },
    { option: "6 - 5% off", probability: probabilities[5] },
    { option: "7 - Free Meal", probability: probabilities[6] },
    { option: "8 - Better Luck Next Time", probability: probabilities[7] },
    { option: "9 - Free Meal", probability: probabilities[8] }
  ];
  // Initialization
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(-1);
  const [showSubheading, setShowSubheading] = useState(false);


  // Handling the spin button click
  const handleSpinClick = () => {
    // Show the social media share popup on first spin
    // if (spinCounter === 0) {
    //   setShowSharePopup(true);
    //   return;
    // }

    // Regular spin logic
    setMustSpin(true);
    setShowSubheading(false);
    const randomValue = Math.random();
    let accumulatedProbability = 0;
    let newPrizeNumber = -1;

    for (let i = 0; i < data.length; i++) {
      accumulatedProbability += data[i].probability;
      if (randomValue <= accumulatedProbability) {
        newPrizeNumber = i;
        break;
      }
    }

    if (newPrizeNumber !== -1) {
      setPrizeNumber(newPrizeNumber);
    } else {
      console.error("Failed to determine prize segment.");
    }
  };

  // React to the end of a spin
  useEffect(() => {
    if (!mustSpin && prizeNumber !== -1) {
      setTimeout(() => {
        setShowSubheading(true);
      }, 1000);
    }
  }, [mustSpin]);



  const [showModal, setShowModal] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSliderChange = (event) => {
    // Update the state with the new slider value
    setSliderValue(parseInt(event.target.value));
  };

  const handleSave = () => {
    console.log('Selected value:', sliderValue);
    handleCloseModal();
  };



  return (
    <>
      <div className="wheel-container " style={{ flexWrap: 'wrap' }}>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#f2f2f2"]}
          outerBorderWidth={[5]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["#dedede"]}
          radiusLineWidth={[1]}
          fontSize={15}
          textColors={["#ffffff"]}
          backgroundColors={[
            "#F22B35",
            "#F99533",
            "#24CA69",
            "#514E50",
            "#46AEFF",
            "#9145B7"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        <button className="spin-button" onClick={handleSpinClick} disabled={mustSpin}>SPIN</button>
      </div>

      {showSubheading && (
        <>
        <div className="d-flex justify-content-center align-items-center">
        <div className="winner-announcement">
          <h2 className="winner-subheading">You won: {data[prizeNumber].option}</h2>
          <div>
          <div className="d-flex justify-content-center align-items-center">
              <button type="button" className="btn btn-success" style={{zIndex: '100 !important'}} onClick={handleShowModal}>Reveal Secret</button>
            </div>
          </div>
        </div>
        </div>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
      <div className="d-block">
        <div className="d-flex justify-content-center align-items-center">
        <Modal.Header closeButton>
          <Modal.Title>Secret Message</Modal.Title>
        </Modal.Header>
        </div>
          
        <Modal.Body className="text-center m-5">
          {/* <input
            type="range"
            min="1"
            max="9"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          Selected value: {sliderValue} */}
          Spin Wheel is preset to always won on No 8.
        </Modal.Body>
          
        <div className="d-flex justify-content-center align-items-center">
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
        </div>
      </div>
      </Modal>

    </>
  );
}

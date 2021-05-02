import logo from './logo.svg';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import Webcam from 'react-webcam';
import React, { useRef, useEffect } from 'react';
import { drawRectangle } from './drawFunction';
import './App.css';

function App() {
  //your init state for both your cam / canvas
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //load in our trained model from coco
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log('model has been loaded');
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    //check to see if your data is even available
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //get your vid props
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // now set that width from the webcamRef / height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //you made a canvas error for the video to go into, since you want the same w/h as the video set it as that
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // now make your detections
      const obj = await net.detect(video);

      const ctx = canvasRef.current.getContext('2d');
      //draw the labels
      drawRectangle(obj, ctx);
    }
  };
  useEffect(() => {
    runCoco();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
          }}
        />
      </header>
    </div>
  );
}

export default App;

'use client'

import { Suspense, useEffect, useState, useRef } from 'react';

const Title = ({ onReposition }) => {
  const [initial, setInitial] = useState(false);
  const [reposition, setReposition] = useState(false);
  const repositionDelay = 5000; // 5 seconds
  const elementRef = useRef(null);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      handleReposition();
    }, repositionDelay);

    return () => clearTimeout(timer); 
  }, []);

  const handleReposition = () => {
    if (reposition) return;
    const element = elementRef.current;
    if (!element) return;
    
    // Get current transform from ongoing animation
    const currentTransform = window.getComputedStyle(element).transform;
    const currentOpacity = window.getComputedStyle(element).opacity;

    // Cancel current animations and lock current position
    const currentAnimations = element.getAnimations();
    currentAnimations.forEach(anim => anim.cancel());
    element.style.transform = currentTransform;

    // Set current opacity to be saved for animation overwrite
    element.style.setProperty('--current-opacity', currentOpacity);

    // Apply reposition animation
    requestAnimationFrame(() => {
      element.classList.add('reposition');
    });
    
    // Set reposition to true
    setReposition(true);
    onReposition?.(true);
  }

  return (<div id="svg-title" ref={elementRef} className="svg-element" onClick={handleReposition}></div>)
}


const Buttons = () => {
  return (<div className="grid grid-cols-3 gap-8 content-center absolute">
            <button className="opacity-0 backdrop-invert p-8 text-center font-bold text-shadow-lg/50 transition button-initial-animation" style={{animationDelay: 0 + "ms"}}>
              EXPLORATION
            </button>
            <button className="opacity-0 backdrop-invert p-8 text-center font-bold text-shadow-lg/50 transition button-initial-animation" style={{animationDelay: 100 + "ms"}}>
              PROJECTS
            </button>
            <button className="opacity-0 backdrop-invert p-8 text-center font-bold text-shadow-lg/50 transition button-initial-animation" style={{animationDelay: 200 + "ms"}}> 
              ABOUT ME
            </button>
          </div>)
}


const Background = ({onVideoLoaded}) => {
  let fileName = "";

  const RandomInt = Math.floor(Math.random() * 9);

  switch(RandomInt) {
    case 0:
      fileName = "ep1-IbvNpSLRJPjm47sq6ZdVIgtZPirBTs.mp4";
      break;
    case 1:
      fileName = "ep2-SvDhXZ4LnFIJSDGzryNXdW2RvUFl5z.mp4";
      break;
    case 2:
      fileName = "ep3-lXPzRDwHisVVtJ3Ai4aQRpbPNOaPsb.mp4";
      break;
    case 3:
      fileName = "ep4-snuo304lxXcXERDwjXSGYHPsexpvQI.mp4";
      break;
    case 4:
      fileName = "ep5-2YHTDxWGzUQCEeRdqMlKELZr3jPMtI.mp4";
      break;
    case 5:
      fileName = "ep7-aJpm19ePOGvZEv47qX2D2WuuMKkF2C.mp4";
      break;
    case 6:
      fileName = "ep8-Jvw3XjF7GE9ND83cZ0Xn2Pbt0PFq79.mp4";
      break;
    case 7:
      fileName = "ep9-RAdWPszAFJs1qDL8za8qzpReJWCKGc.mp4";
      break;
    case 8:
      fileName = "ep10-vFq6jtvaWdnW8Cx1DOoMC2adUuQ8TQ.mp4";
      break;
    default:
      fileName = "ep1-IbvNpSLRJPjm47sq6ZdVIgtZPirBTs.mp4";
      break;
  }


  return (
    <Suspense fallback={<p className="flex items-center justify-center" >PSYEONE LOADING</p>}>
      <VideoComponent fileName={fileName} onVideoLoaded={onVideoLoaded}/>
    </Suspense>
  )
}

function VideoComponent({ fileName, onVideoLoaded }) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/getBlobs?prefix=${fileName}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setUrl(data[0].url);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success/failure
        onVideoLoaded();
      }
    }
    fetchData();
  }, [fileName, onVideoLoaded]);

  // Wait for loading to complete and URL to be available
  if (loading || !url) {
    return <div className="flex items-center justify-center min-h-screen"><p className="text-center" >PSYEONE LOADING</p></div>;
  }

  return (
    <div className="video-container">
      <video autoPlay muted loop>
        <source src={url} type="video/mp4" />
        Your browser doesnt support video tag.
      </video>
    </div>
  )
}

const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isRepositionAnimated, setIsRepositionAnimated] = useState(false);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  const handleReposition = () => {
    setIsRepositionAnimated(true);
  }

  return (
    <div>
      <Background onVideoLoaded={handleVideoLoaded} />
      {videoLoaded && (
        <div>
          <div className="page-container">
            <Title onReposition={handleReposition} />
            {isRepositionAnimated && (
              <Buttons />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home;

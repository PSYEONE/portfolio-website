import { Suspense } from 'react';
import { list } from '@vercel/blob';

const Title = () => {
  return <div id="svg-title" className="svg-element"></div>
}

const Background = () => {
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
    <Suspense fallback={<p>Loading...</p>}>
      <VideoComponent fileName={fileName}/>
    </Suspense>
  )
}

async function VideoComponent({fileName}) {
  const {blobs} = await list({
    prefix: fileName,
    limit: 1,
  })
  const {url} = blobs[0]

  return (
    <div className="video-container">
      <video autoPlay muted loop preload="none">
        <source src={url} type="video/mp4" />
        Your browser doesnt support video tag.
      </video>
    </div>
  )
}

const Home = () => {
  return (
    <div>
      <Background />
      <div className="svg-container">
        <Title />
      </div>
    </div>
  )
}

export default Home;
import { Suspense } from 'react';
import { list } from '@vercel/blob';


//Explores | Electronics | Motion Design | Photography
//fonts to use: Albert Sans
const Title = () => {
  return (
    <section id="svgWrapper">
      <div id="svg"></div>
      <svg>
        <image className="backdrop-contrast-200" x="0" y="0" width="100%" height="100%"/>
      </svg>
    </section>
  )
}

const Background = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VideoComponent fileName="ep1-IbvNpSLRJPjm47sq6ZdVIgtZPirBTs.mp4"/>
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
      <Title />
    </div>
  )
}


export default Home;

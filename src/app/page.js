import { React, Suspense } from 'react';
import { list } from '@vercel/blob';

const Title = () => {
  return (
    <h1>
      Welcome to my portfolio!
    </h1>
  )
}

const Background = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VideoComponent fileName="ep1-IbvNpSLRJPjm47sq6ZdVIgtZPirBTs.mp4" />
    </Suspense>
  )
}

async function VideoComponent({ fileName}) {
  const { blobs } = await list({
    prefix: fileName,
    limit: 1,
  })
  const { url } = blobs[0]

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
    <Background />
  )
}


export default Home;

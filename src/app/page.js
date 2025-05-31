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
      <VideoComponent fileName="ep1.mp4" />
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
    <video autoPlay muted loop preload="none">
      <source src={url} type="video/mp4" />
      Your browser doesnt support video tag.
    </video>
  )
}

const Home = () => {
  return (
    <Background />
  )
}


export default Home;

import React from 'react';

const Title = () => {
  return (
    <h1>
      Welcome to my portfolio!
    </h1>
  )
}

const Background = () => {
  return (
    <div>
      <video autoPlay loop muted>
        <source src={require('./media/girls last tour/ep1.mp4')} type='video/mp4' />
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

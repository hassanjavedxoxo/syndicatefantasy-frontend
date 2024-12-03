import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import style from '../style/OurTeam.module.css'
function OurTeam() {
  return (
    <>
    <Navbar/>
    
    <div className={`${style.ourTeamMain} container-fluid`}>
      <h2 className='text-center mt-4'>Welcome to the Fantasy Syndicate, your go-to for concise, no-nonsense fantasy football insights. Hosted by Josh and Alex, we're here to disrupt the status quo of mainstream media and offer real opinions from passionate football fans like you. What we do is for enthusiasts who value informed opinions over cookie-cutter analyses. We believe in authentic opinions, even when we don't always see eye-to-eye, and provide insights based on real data and experiences, not just mainstream narratives.</h2>
      <h2 className='text-center mt-5'>If you are interested in hearing something specific on the podcast, have questions, or want to join us in the discussion, click the links below to shoot us an email, connect with us on Youtube, or chat with us on Twitter.</h2>
      <h2 className='text-center mt-5'>Let’s steal some championships together!</h2>
    </div>
    <Footer/>
    </>
  )
}

export default OurTeam
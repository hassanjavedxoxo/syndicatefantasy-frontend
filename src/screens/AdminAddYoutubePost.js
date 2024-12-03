import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import style from '../style/AdminAddYoutubePost.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminAddYoutubePost() {
  useEffect(() => {
    if(!localStorage.getItem('isLogin')) {
      navigate('/adminlogin')
  }
  }, [])

  const [heading, setHeading] = useState('')
  const [link, setLink] = useState('')
  const navigate = useNavigate();

  const goToAddBlogPage = () => {
    navigate('/adminaddblog');
  }

  const goToAddYoutubePage = () => {
    navigate('/adminaddyoutubepost');
  }

  const handleSubmit = () => {
    axios.post('http://46.202.178.195:5000/api/youtube', {
      heading: heading,
      videoLink: link
    }).then((res) => {
      setHeading('');
      setLink('');
      alert('SUBMITED');
    }).catch((err) => {
      console.log(err);
      alert('ERROR WHILE SUBMITTING')
    })
  }
  return (
    <>
      <Navbar />
      <div className={`${style.adminAddYoutubePostMain} container-fluid`}>
        <div className="row mb-3">
          <div className="col-auto my-3">
            <button onClick={() => goToAddBlogPage()} className={style.adminNavigate}>ADD BLOG</button>
          </div>
          <div className="col-auto my-3">
            <button onClick={() => goToAddYoutubePage()} className={style.adminNavigate}>ADD YOUTUBE POST</button>
          </div>
          <div className="col-auto my-3">
            <button onClick={() => navigate('/admin')} className={style.adminNavigate}>ADMIN HOME</button>
          </div>
        </div>
        <input value={heading} onChange={(e) => setHeading(e.target.value)} type="text" style={{ marginTop: '130px' }} className={style.blockInput} placeholder='Heading' />
        <input value={link} onChange={(e) => setLink(e.target.value)} type="text" className={style.blockInput} placeholder='Youtube Link' />
        <button onClick={() => handleSubmit()} className={style.submitButton}>Submit</button>
      </div>
      <Footer />
    </>
  )
}

export default AdminAddYoutubePost
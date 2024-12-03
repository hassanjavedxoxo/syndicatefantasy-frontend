import React from 'react'
import style from '../style/YoutubePost.module.css'
import axios from 'axios'
function YoutubePost(props) {
  const handleDelete = () => {
    axios.delete(`http://46.202.178.195:5000/api/youtube/${props.id}`)
    .then(() => {
      alert('POST DELETED')
      props.setRefreshApiCall(prev => prev + 1);
    }).catch((err) => {
      alert('ERROR OCCURED');
      console.log('Error:- ' + err);
    })
  }
  return (
    <div className={`${props.index % 2 === 0 ? style.youtubePostMainForEven : style.youtubePostMainForOdd} col-md-6 py-4 px-0`}>
      <div className={`${style.youtubePostSub}`}>
        <iframe className={`${style.video}`} src={props.videoLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        <p className={`${style.title}`}>{props.title}</p>
        {
        props.id ? <button className={style.deleteButton} onClick={() => handleDelete()}>DELETE</button> : null
      }
      </div>
      
      
    </div>
  )
}

export default YoutubePost
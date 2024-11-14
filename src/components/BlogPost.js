import React from 'react'
import style from '../style/BlogPost.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
function BlogPost(props) {

  const location = useLocation();
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/blogs/${props.id}`)
      .then(() => {
        alert('BLOG DELETED')
      }).catch((err) => {
        alert('ERROR OCCURED');
        console.log('Error:- ' + err);
      })
  }
  const navigate = useNavigate();


  const goToBlog = () => {
    navigate('/blog', { state: { data: props.data, image: props.image, heading: props.heading } });
  }


  const uploadedDate = new Date(props.uploaded);

  // Format the date to a more readable format
  const formattedDate = uploadedDate.toLocaleString('en-US', {
    weekday: 'long', // "Monday"
    year: 'numeric', // "2024"
    month: 'long', // "November"
    day: 'numeric', // "7"
    hour: 'numeric', // "11"
    minute: 'numeric', // "01"
    second: 'numeric', // "04"
    hour12: true, // 12-hour format
  });


  return (
    <>
      {
        props.id ?
          <div className={`${location.pathname === '/' ? style.blogPostMainForHome : style.blogPostMain} container-fluid`}>
            <div className="row">
              <div className={`col-md-3 p-1 ${style.blogImageCont}`}>
                <img className={style.blogImage} src={`http://localhost:5000${props.image}`} alt="" />
              </div>
              <div className={`col-md-9 py-0 ${style.blogPostTextCont}`}>
                <h2>{props.heading}</h2>
                <p className='mt-3'>{props.data[0].paragraph.split('. ').slice(0, 2).join('. ') + '.'}</p>
                <p className='mt-3'>{formattedDate}</p>
                {props.id ? <button className={`${style.deleteButton}`} onClick={() => handleDelete()}>Delete</button> : null}
              </div>
            </div>
          </div>
          :
          <div onClick={() => goToBlog()} className={`${location.pathname === '/' ? style.blogPostMainForHome : style.blogPostMain} container-fluid`}>
            <div className="row">
              <div className={`col-md-3 p-1 ${style.blogImageCont}`}>
                <img className={style.blogImage} src={`http://localhost:5000${props.image}`} alt="" />
              </div>
              <div className={`col-md-9 py-0 ${style.blogPostTextCont}`}>
                <h2>{props.heading}</h2>
                <p className='mt-3'>{props.data[0].paragraph.split('. ').slice(0, 2).join('. ') + '.'}</p>
                <p className='mt-3'>{formattedDate}</p>
              </div>
            </div>
          </div>
      }

    </>
  )
}

export default BlogPost
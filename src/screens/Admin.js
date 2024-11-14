import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import style from '../style/Admin.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import YoutubePost from '../components/YoutubePost';
import BlogPost from '../components/BlogPost';
import Loader from '../components/Loader';

function Admin() {
    const [loader, setLoader] = useState(false);
    const [blogData, setBlogData] = useState([]);
    const [youtubeData, setYoutubeData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('isLogin')) {
            navigate('/adminlogin')
        }
        setLoader(true);
        axios.get('http://localhost:5000/api/blogs')
            .then((res) => {
                setBlogData(res.data);
                console.log('RECEIVED BLOG DATA', res.data);
                return axios.get('http://localhost:5000/api/youtube');
            })
            .then((res) => {
                setYoutubeData(res.data);
                console.log('RECEIVED YOUTUBE DATA', res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoader(false); // Make sure to set loader to false even if there is an error
            });
    }, []);

    const goToAddBlogPage = () => navigate('/adminaddblog');
    const goToAddYoutubePage = () => navigate('/adminaddyoutubepost');

    return (
        <>
        {loader ? <Loader/> : null}
            <Navbar />
            <div className={`${style.adminMain} container-fluid`}>
                <div className="row mb-3">
                    <div className="col-auto my-3">
                        <button onClick={goToAddBlogPage} className={style.adminNavigate}>ADD BLOG</button>
                    </div>
                    <div className="col-auto my-3">
                        <button onClick={goToAddYoutubePage} className={style.adminNavigate}>ADD YOUTUBE POST</button>
                    </div>
                </div>
                <h2>ALL BLOGS</h2>
                <div className={`container-fluid ${style.homePosts}`}>
                    <div className="row mt-5">
                        {blogData.map((blog, index) => (
                            <div key={blog._id} className={`col-12 mb-3 ${style.adminBlogCont}`}>
                                <div>
                                    
                                    <BlogPost heading={blog.heading} id={blog._id} uploaded={blog.updatedAt} data={JSON.parse(blog.data)} image={blog.image}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <h2>ALL YOUTUBE POSTS</h2>
                <div className={`container-fluid ${style.homePosts}`}>
                    <div className="row mt-5 mb-5">
                        {youtubeData.map((value, index) => (
                            <YoutubePost 
                                key={value._id}
                                videoLink={value.videoLink} 
                                title={value.heading} 
                                index={index + 1} 
                                id={value._id} 
                            />
                        ))}
                    </div>
                </div>
                {loader && <p>Loading...</p>} {/* Display a loader if data is still loading */}
            </div>
            <Footer />
        </>
    );
}

export default Admin;
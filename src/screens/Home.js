import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../style/Home.module.css';
import YoutubePost from '../components/YoutubePost';
import Footer from '../components/Footer';
import BlogPost from '../components/BlogPost';
import axios from 'axios';
import Loader from '../components/Loader';

function Home() {
    const [loader, setLoader] = useState(false);
    const [blogData, setBlogData] = useState([]);
    const [youtubeData, setYoutubeData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query

    useEffect(() => {
        setLoader(true);
        axios.get('http://46.202.178.195:5000/api/blogs')
            .then((res) => {
                setBlogData(res.data);
                console.log('RECEIVED BLOG DATA', res.data);
                return axios.get('http://46.202.178.195:5000/api/youtube');
            })
            .then((res) => {
                setYoutubeData(res.data);
                console.log('RECEIVED YOUTUBE DATA', res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoader(false);
            });
    }, []);

    // Function to handle the search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter the blog and youtube posts based on the search query
    const filteredBlogs = blogData.filter((blog) =>
        blog.heading.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredYoutube = youtubeData.filter((video) =>
        video.heading.toLowerCase().includes(searchQuery.toLowerCase())
        
    );

    return (
        <>
            {loader ? <Loader /> : null}
            <Navbar />
            <div className={`${style.homeMain} container-fluid p-0`}>
                <div className="row" style={{ width: '100vw', marginRight: '0px', marginLeft: '0px' }}>
                    <div className="col-md-6">
                        <img className={style.heroImage} style={{ width: '50%' }} src="/assets/home-hero.png" alt="" />
                    </div>
                    <div className="col-md-6">
                        <div className={style.heroHeadingCont}>
                            <h3 className={style.heroHeading}>JOIN THE</h3>
                            <h3 className={style.heroHeading}>SYNDICATE</h3>
                            <input 
                                className={style.heroInput} 
                                placeholder='Search Post...' 
                                type="text" 
                                value={searchQuery} // Bind the input value to the state
                                onChange={handleSearchChange} // Handle input change
                            />
                        </div>
                    </div>
                </div>

                <div className={`container-fluid ${style.homePosts}`}>
                    <div className="row mt-5 mx-0">
                        {filteredYoutube.map((value, index) => (
                            <YoutubePost 
                                key={value._id}
                                videoLink={value.videoLink} 
                                title={value.heading} 
                                index={index + 1}
                            />
                        ))}
                    </div>
                </div>

                <div className={`container-fluid p-0 ${style.homePost2}`}>
                    <div className="row mt-5" style={{marginRight:'0px', marginLeft:'0px'}}>
                        {filteredBlogs.map((blog, index) => (
                            <div key={blog._id} className="col-12 mb-3">
                                <div>
                                    <BlogPost 
                                        heading={blog.heading} 
                                        uploaded={blog.updatedAt} 
                                        data={JSON.parse(blog.data)} 
                                        image={blog.image}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}

export default Home;

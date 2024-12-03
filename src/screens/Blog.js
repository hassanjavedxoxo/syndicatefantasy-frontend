import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import style from '../style/Blog.module.css'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [image, setImage] = useState('');
    const [heading, setHeading] = useState('');

    useEffect(() => {
        if (location.state) {
            setData(location.state.data);
            setHeading(location.state.heading);
            setImage(location.state.image);
        } else {
            console.warn("No state passed, redirecting...");
        }
    }, [location.state]);

    return (
        <>
        <Navbar/>
        <div className={`${style.blogMain} container-fluid`}>

            <h1>{heading}</h1>
            {image && <img src={`http://46.202.178.195:5000${image}`} alt="Blog" />}
            {data && data.map((item, index) => (
                <div key={index}>
                    <h2>{item.heading}</h2>
                    <p style={{color:'white'}}>{item.paragraph}</p>
                </div>
            ))}
        </div>
        <Footer/>
        </>
    );
};

export default Blog;

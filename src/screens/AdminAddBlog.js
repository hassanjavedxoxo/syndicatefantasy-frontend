import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import style from '../style/AdminAddBlog.module.css';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminAddBlog() {
  useEffect(() => {
    if(!localStorage.getItem('isLogin')) {
      navigate('/adminlogin')
  }
  }, [])
  const [mainHeading, setMainHeading] = useState('')
  const [image, setImage] = useState(null);
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [blogBlocks, setBlogBlocks] = useState([]); // Array to store headings and paragraphs

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);  // Store the actual file object
      setImagePreview(URL.createObjectURL(file));  // Create a URL for image preview
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Remove the image
    setImagePreview(null); // Remove the preview URL
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleParagraphChange = (e) => {
    setParagraph(e.target.value);
  };

  const handleAddBlock = () => {
    if (heading && paragraph) {
      setBlogBlocks([...blogBlocks, { heading, paragraph }]);
      setHeading('');
      setParagraph('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log('Blog Data:', { image, data: blogBlocks });

    // Check if any of the required fields are missing
    if (!blogBlocks.length || !image) {
      alert('All fields are required!');
      return; // Exit the function if validation fails
    }

    // Create FormData object to send with the request
    const formData = new FormData();
    // Send the 'blogBlocks' data as a JSON string
    formData.append('data', JSON.stringify(blogBlocks)); // Send the data as a JSON string
    formData.append('image', image);  // Append the image file
    formData.append('heading', mainHeading);  // Append the image file

    try {
      // Make the POST request to the backend API (adjust the URL as needed)
      const response = await axios.post('http://46.202.178.195:5000/api/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set correct content type for file upload
        },
      });

      // Handle success response (e.g., show a message or reset form)
      console.log('Blog saved:', response.data);
      alert('Blog Posted');

      // Reset form fields
      setHeading('');
      setBlogBlocks([]); // Reset the blog blocks array
      setParagraph('');
      setImage(null);  // Reset image field
      setMainHeading('');
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error saving blog:', error);
      alert('Error saving blog. Please try again.');
    }
  };

  const navigate = useNavigate();

  const goToAddBlogPage = () => {
    navigate('/adminaddblog');
  }

  const goToAddYoutubePage = () => {
    navigate('/adminaddyoutubepost');
  }



  return (
    <>
      <Navbar />
      <div className={`${style.adminAddBlogMain} container-fluid`}>
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
        <form onSubmit={handleSubmit}>
          {/* Conditionally render the file input if no image is uploaded */}
          {!image && (
            <div >
              <label htmlFor="image">Upload an Image:</label>
              <input
                className={style.uploadImageButton}
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          )}

          {/* Image preview and remove option */}
          {image && (
            <div className={`${style.imagePreview}`}>
              <h3>Image Preview:</h3>
              <img
                src={imagePreview}
                alt="Image preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
              <button type="button" onClick={() => handleRemoveImage()}>
                Remove Image
              </button>
            </div>
          )}

          <div>
            <input type="text" className={style.blockInput} placeholder='Enter Main Heading' onChange={(e) => setMainHeading(e.target.value)} />

            <input
              className={style.blockInput}
              placeholder='Enter Sub Heading'
              type="text"
              id="heading"
              name="heading"
              value={heading}
              onChange={handleHeadingChange}
            />
          </div>

          <div>

            <textarea
              placeholder='Enter Paragraph'
              className={style.blockInput}
              id="paragraph"
              name="paragraph"
              value={paragraph}
              onChange={handleParagraphChange}
            />
          </div>

          <button type="button" className={style.addBlockButton} onClick={handleAddBlock}>
            Add Block
          </button>

          {blogBlocks.length > 0 && (
            <div>
              <h3>Added Blog Blocks:</h3>
              {blogBlocks.map((block, index) => (
                <div key={index}>
                  <h4 className='text-center' style={{ color: 'white' }}>{block.heading}</h4>
                  <p className='text-center' style={{ color: 'white' }}>{block.paragraph}</p>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className={style.submitButton} >Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AdminAddBlog;

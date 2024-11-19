import ReactGA from 'react-ga4';

export const initializeGA = () => {
    const measurementID = 'G-7RZJS3GR2B'; // Replace with your client’s Measurement ID
    ReactGA.initialize(measurementID);
    console.log('Google Analytics Initialized');
};

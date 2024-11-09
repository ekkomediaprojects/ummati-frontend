// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import '../assets/fonts/Quicksand-Regular.ttf';
import '../assets/fonts/Poppins-Regular.ttf';
import playButton from '../assets/images/homepage/Latest Episode/playButton.svg';
import pauseButton from '../assets/images/homepage/Latest Episode/pauseButton.svg';
import forwardButton from '../assets/images/homepage/Latest Episode/fast_forward.svg';
import rewindButton from '../assets/images/homepage/Latest Episode/fast_rewind.svg';
import generalEvents from '../assets/images/homepage/Types of Events/General Events.png';
import professioanalNetworking from '../assets/images/homepage/Types of Events/Professional networking.png';
import mommyNMe from '../assets/images/homepage/Types of Events/Mommy n me.png';
import getInvolved1 from '../assets/images/homepage/Get involved/getInvolved1.png';
import getInvolved2 from '../assets/images/homepage/Get involved/getInvolved2.png';
import getInvolved3 from '../assets/images/homepage/Get involved/getInvolved3.png';

const HomePage = () => (
  <div>
    <Header />
    <HeroSection />

    <section style={styles.latestEpisode}>
      <h2 style={styles.headerText}>Listen To Our Latest Episode</h2>
      <h4 style={styles.subText}>Stay Up To Date</h4>      
      {/* Podcast Player Container */}
    <div style={styles.podcastPlayer}>
      
      {/* Left Square Box */}
      <div style={styles.square}></div>

      {/* Text and Controls Container */}
      <div style={styles.textAndControls}>
        
        {/* Episode Title and Podcast Name */}
        <div style={styles.textContainer}>
          <div style={styles.episodeTitle}>Episode Title</div>
          <div style={styles.podcastName}>Podcast Name</div>
        </div>

        {/* Play Button and Progress Bar */}
        <div style={styles.playAndProgressContainer}>
          <button style={styles.circleButton}>
            <img src={playButton} alt="Play Button" style={styles.playButton} />
          </button>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressIndicator}></div>
          </div>
        </div>

        {/* Control Buttons and Duration Text */}
        <div style={styles.controlsAndDuration}>
          <div style={styles.controlButtonsContainer}>
            <img src={rewindButton} alt="Rewind" style={styles.controlButton} />
            <img src={pauseButton} alt="Pause" style={styles.controlButton} />
            <img src={forwardButton} alt="Forward" style={styles.controlButton} />
          </div>
          <div style={styles.durationText}>15:32</div>
        </div>

      </div>
    </div>

    {/* Call-to-Action Button */}
    <div style={styles.buttonContainer}>More Episodes</div>
  </section>


  <section style={styles.typesOfEvents}>
      <h2 style={styles.headerText}>Types Of Events</h2>
      <h4 style={styles.subText}>We aim to host events for women in all stages of life. We want to encourage you to meet and enjoy the company of various women in safe spaces allowing you to foster friendships over shared experiences. </h4> 
  
  {/* Image Container with 3 Images, Titles, and Captions */}
  <div style={styles.eventsImageContainer}>
        <div style={styles.eventItem}>
          <img src={generalEvents} alt="Event 1" style={styles.eventImage} />
          <div style={styles.eventTitle}>General Events</div>
          <div style={styles.eventCaption}>These events are for anyone 18+ years old. Everyone is welcome!</div>
        </div>
        <div style={styles.eventItem}>
          <img src={professioanalNetworking} alt="Event 2" style={styles.eventImage} />
          <div style={styles.eventTitle}>Professional Networking</div>
          <div style={styles.eventCaption}>We host networking events amongst working women and also host workshops. .</div>
        </div>
        <div style={styles.eventItem}>
          <img src={mommyNMe} alt="Event 3" style={styles.eventImage} />
          <div style={styles.eventTitle}>Mommy & Me</div>
          <div style={styles.eventCaption}>We host networking events amongst working women and also host workshops. </div>
        </div>
      </div>  
  </section>

  <section style={styles.getInvolved}>
      <h2 style={styles.headerText}>Get Involved</h2>
      <h4 style={styles.subText}>There are many ways to get involved and be a part of our growing network of inspiring women. You can join our team, help us open a new chapter in your city, attend one of our events, sponsor an event, or collaborate with us. As we expand, we are always eager to connect with like-minded individuals and organizations. Together, we can create meaningful change and foster a supportive community.
      </h4> 
      <div style={styles.buttonContainer}>Chapters</div>

      {/* Edge-to-Edge Images Section */}
    <div style={styles.edgeToEdgeImages}>
      <img src={getInvolved1} alt="Edge Image 1" style={styles.fullWidthImage} />
      <img src={getInvolved2} alt="Edge Image 2" style={styles.fullWidthImage} />
      <img src={getInvolved3} alt="Edge Image 3" style={styles.fullWidthImage} />
    </div>
  </section>

    <Footer />
  </div>


);


const styles = {
  latestEpisode: {
    width: '100%',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box',
  },
  headerText: {
    textAlign: 'center',
    color: '#5A4283',
    fontSize: '40px',
    fontFamily: 'Quicksand',
    fontWeight: '700',
  },
  subText: {
    textAlign: 'center',
    color: 'black',
    fontSize: '22px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    marginTop: '10px',
  },
  podcastPlayer: {
    width: '662px',
    height: '152px', // Set exact height
    background: '#ECE7DA',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    gap: '10px',
    marginTop: '20px',
    alignItems: 'flex-start', // Ensures items align to the top
  },
  square: {
    width: '111px',
    height: '116px',
    background: '#D9D9D9',
    border: '1px solid #737373',
  },
  textAndControls: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  textContainer: {
    marginBottom: '5px',
    marginLeft: '40px',
    marginTop: '-20',
  },
  episodeTitle: {
    fontSize: '32px',
    color: '#222222',
    fontFamily: 'Quicksand',
    fontWeight: '400',
    marginTop: '-20',
  },
  podcastName: {
    fontSize: '16px',
    color: '#222222',
    fontFamily: 'Quicksand',
    fontWeight: '400',
    marginTop: '-20',
  },
  playAndProgressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '5px',
    marginLeft: '20px',
  },
  circleButton: {
    width: '35px',
    height: '35px',
    background: 'white',
    border: '1px solid #D9D9D9',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  playButton: {
    width: '24px',
    height: '24px',
  },
  progressBarContainer: {
    flex: 1,
    height: '7px',
    backgroundColor: '#D9D9D9',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  progressIndicator: {
    width: '30%',
    height: '100%',
    backgroundColor: '#5A4283',
  },
  controlsAndDuration: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-5px',
    marginLeft: '20px',
  },
  controlButtonsContainer: {
    display: 'flex',
    gap: '10px',
  },
  controlButton: {
    width: '14px',
    height: '20px',
    cursor: 'pointer',
  },
  durationText: {
    color: '#8C8989', 
    fontSize: 12, 
    fontFamily: 'Inter', 
    fontWeight: '400',
  },

  buttonContainer: {
    background: '#78B27B',
    borderRadius: '10px',
    padding: '10px 20px',
    textAlign: 'center',
    color: 'white',
    fontSize: '18px',
    fontFamily: 'Quicksand',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
  },
  
  typesOfEvents: {
    backgroundColor: '#F7F5EF',
  },

  eventsImageContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  eventItem: {
    width: '30%', // Ensures each item takes up 1/3 of the container
    textAlign: 'center',
  },
  eventImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  eventTitle: {
    width: '100%',
    textAlign: 'center',
    color: '#222222',
    fontSize: '24px',
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: '700',
    wordWrap: 'break-word',
    marginTop: '10px',
  },
  eventCaption: {
    width: '100%',
    textAlign: 'center',
    color: 'black',
    fontSize: '20px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    wordWrap: 'break-word',
    marginTop: '5px',
  },

  getInvolved: {
    marginTop: '25px',
  },

  edgeToEdgeImages: {
    display: 'flex',
    width: '100%',
    marginTop: '20px',
  },
  firstImage: {
    width: '25%', // First image takes 25% of the width
    height: 'auto',
  },
  middleImage: {
    width: '50%', // Middle image takes 50% of the width
    height: 'auto',
  },
  lastImage: {
    width: '25%', // Last image takes 25% of the width
    height: 'auto',
  },
};

export default HomePage;

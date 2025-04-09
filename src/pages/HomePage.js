import React ,{ useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import { useNavigate} from "react-router-dom";
import { Typography, Button, Box, CircularProgress ,Skeleton} from "@mui/material";
import Footer from "../components/Footer";
import generalEvents from "../assets/images/homepage/Types of Events/General Events.png";
import professioanalNetworking from "../assets/images/homepage/Types of Events/Professional networking.png";
import mommyNMe from "../assets/images/homepage/Types of Events/Mommy n me.png";
import getInvolved1 from "../assets/images/homepage/Get involved/getInvolved1.png";
import getInvolved22 from "../assets/images/homepage/Get involved/getInvolved2.png";
import getInvolved2 from "../assets/images/homepage/Get involved/getInvolved22.png";
import getInvolved3 from "../assets/images/homepage/Get involved/getInvolved3.png";
const HomePage = () => {
  const [latestPodcastEpi, setLatestPodcastEpi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  
  const navigate = useNavigate();
    useEffect(() => {
      const fetchEpisodes = async () => {
        try {
          setLoading(true);
          const cid = process.env.REACT_APP_CLIENT_ID_YOUTUBE
          const channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`)
          const reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`;
          const response = await fetch(reqURL);
          if (response?.ok) {
              const result = await response.json();
              if (result.items && result.items.length !== 0) {
                setError(null)
                const link = result.items[0].link;
                const id = new URL(link).searchParams.get("v");
                setLatestPodcastEpi(id);
              } else setError("No Episodes Yet!")
          } else {
            setError("Failed to load episodes. Please try again later!");
            setLoading(false);
          }
        } catch (err) {
          setError("Failed to load episodes. Please try again later!");
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
      fetchEpisodes();
    }, []);
  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleIframeLoad = () => {
    setIsIframeLoaded(true);
  };
  return (
    <div className="">
      
      <HeroSection />
      <section className="w-full px-6 py-10 bg-white text-center">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#5A4283",
            fontSize: { xs: "16px", sm: "30px", md: "40px" },
            fontHeight: { xs: "20px", sm: "35px", md: "50px" },
            fontFamily: "Quicksand",
          }}
        >
          Listen To Our Latest Episode
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "black",
            fontFamily: "poppins",
            fontWeight: 400,
            marginTop: 2,
            fontSize: { xs: "12px", sm: "16px", md: "22px" },
            fontHeight: { xs: "18px", sm: "20px", md: "33px" },
          }}
        >
          Stay Up To Date
        </Typography>

         {/* {/* Podcast Player  */}
         <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: '100%',
        padding: 2,
        textAlign: 'center',
        justifyContent: 'center', 
      }}
    >
      <Typography
      component="div"
      sx={{
        width: '100%',
        maxWidth: '1000px',
        height: '100%',
      }}
    >
      {/* {loading ? (
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: '12px' }} />
      ) : ( */}
        <Box sx={{ position: 'relative' }}>
          {!isIframeLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <div className="flex items-center justify-center">
            {error ? (
             <Box className="w-screen h-40 flex items-center justify-center bg-gray-100 ">
               <p className="text-red-500 text-md font-semibold">{error}</p>
             </Box>
           
            ) : (
              latestPodcastEpi && ( // Only render the iframe if latestPodcastEpi exists
                <iframe
                  width="560"
                  height="315"
                  onLoad={handleIframeLoad}
                  src={`https://www.youtube.com/embed/${latestPodcastEpi}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )
            )}
          </div>
        </Box>
      {/* )} */}
    </Typography>
    </Box>

        {/* More Episodes Button */}
        <Button
          variant="contained"
          sx={{
            padding: "8px 16px",
            fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px" }, // Responsive font size
            fontFamily: "Quicksand",
            fontWeight: "700",
            backgroundColor: "#78B27B",
            borderRadius: "10px",
            textTransform: "none",
            width: { xs: "150px", sm: "200px", md: "250px", lg: "300px" },
          }}
          onClick={() => handleNavigate("/podcast")}
        >
          More Episodes
        </Button>
      </section>
      {/* Types of Events Section */}
      <section className="w-full px-6 py-10 bg-[#F7F5EF] text-center">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: "#5A4283",
            fontSize: { xs: "16px", sm: "30px", md: "40px" },
            fontHeight: { xs: "20px", sm: "35px", md: "50px" },
            fontFamily: "Quicksand",
          }}
        >
          Types Of Events
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "12px", sm: "16px", md: "22px" },
            fontHeight: { xs: "18px", sm: "24px", md: "33px" },
            fontFamily: "poppins",
            color: "black",
            mt: 2,
            maxWidth: { xs: "316px", md: "816px", lg: "1164px" },
            marginX: "auto",
          }}
        >
          We aim to host events for women in all stages of life. We want to
          encourage you to meet and enjoy the company of various women in safe
          spaces allowing you to foster friendships over shared experiences.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: "32px",
            mt: "32px",
            paddingX: { xs: "16px", sm: "32px", md: "48px" },
          }}
        >
          {/* General Events */}
          <Box sx={{ textAlign: "center" }}>
            <img
              src={generalEvents}
              alt="General Events"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <Typography
              variant="h3"
              sx={{
                mt: "16px",
                fontWeight: 700,
                fontSize: { xs: "16px", md: "20px", lg: "24px" },
                fontHeight: { xs: "20px", md: "24px", lg: "30px" },
                fontFamily: "Quicksand",
                color: "black",
              }}
            >
              General Events
            </Typography>
            <Typography
              sx={{
                mt: "8px",
                fontWeight: 400,
                fontSize: { xs: "18px", md: "18px", lg: "20px" },
                fontHeight: { xs: "12px", md: "24px", lg: "30px" },
                fontFamily: "poppins",
                color: "black",
              }}
            >
              These events are for anyone 18+ years old. Everyone is welcome!
            </Typography>
          </Box>

          {/* Professional Networking */}
          <Box sx={{ textAlign: "center" }}>
            <img
              src={professioanalNetworking}
              alt="Professional Networking"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <Typography
              variant="h3"
              sx={{
                mt: "16px",
                fontWeight: 700,
                fontSize: { xs: "16px", md: "20px", lg: "24px" },
                fontHeight: { xs: "20px", md: "24px", lg: "30px" },
                fontFamily: "Quicksand",
                color: "black",
              }}
            >
              Professional Networking
            </Typography>
            <Typography
              sx={{
                mt: "8px",
                fontWeight: 400,
                fontSize: { xs: "18px", md: "18px", lg: "20px" },
                fontHeight: { xs: "12px", md: "24px", lg: "30px" },
                fontFamily: "poppins",
                color: "black",
              }}
            >
              We host networking events amongst working women and also host
              workshops.
            </Typography>
          </Box>

          {/* Mommy & Me */}
          <Box sx={{ textAlign: "center" }}>
            <img
              src={mommyNMe}
              alt="Mommy & Me"
              className="rounded-lg w-full max-w-xs mx-auto"
            />
            <Typography
              variant="h3"
              sx={{
                mt: "16px",
                fontWeight: 700,
                fontSize: { xs: "16px", md: "20px", lg: "24px" },
                fontHeight: { xs: "20px", md: "24px", lg: "30px" },
                fontFamily: "Quicksand",
                color: "black",
              }}
            >
              Mommy & Me
            </Typography>
            <Typography
              sx={{
                mt: "8px",
                fontWeight: 400,
                fontSize: { xs: "18px", md: "18px", lg: "20px" },
                fontHeight: { xs: "12px", md: "24px", lg: "30px" },
                fontFamily: "poppins",
                color: "black",
              }}
            >
              We host networking events amongst working women and also host
              workshops.
            </Typography>
          </Box>
        </Box>
      </section>
      <Box sx={{ mt: 2 }}>
        {/* Header Text */}
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              textAlign: "center",
              color: "#5A4283",
              fontSize: { xs: "16px", sm: "30px", md: "40px" },
              fontHeight: { xs: "20px", sm: "35px", md: "50px" },
              fontFamily: "Quicksand",
            }}
          >
            Get Involved
          </Typography>

          {/* Sub Text */}
          <Typography
            variant="h4"
            sx={{
              textAlign: "start",
              mt: 2,
              mb: 2,
              padding: "10px",
              fontWeight: 400,
              fontSize: { xs: "12px", sm: "16px", md: "22px" },
              fontHeight: { xs: "18px", sm: "24px", md: "33px" },
              fontFamily: "poppins",
              color: "black",
              maxWidth: { md: "816px", lg: "1164px" },
              marginX: "auto",
            }}
          >
            There are many ways to get involved and be a part of our growing
            network of inspiring women. You can join our team, help us open a
            new chapter in your city, attend one of our events, sponsor an
            event, or collaborate with us. As we expand, we are always eager to
            connect with like-minded individuals and organizations. Together, we
            can create meaningful change and foster a supportive community.
          </Typography>

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {/* Button Container */}
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                padding: "8px 16px",
                fontSize: { xs: "10px", sm: "14px", md: "16px", lg: "20px" },
                fontFamily: "Quicksand",
                fontWeight: "700",
                backgroundColor: "#78B27B",
                borderRadius: "10px",
                textTransform: "none",
                width: { xs: "150px", sm: "200px", md: "250px", lg: "300px" }, // Increased button width
              }}
              onClick={() => handleNavigate("/membership")}
            >
              Chapters
            </Button>
          </Box>
        </Box>

        {/* Edge-to-Edge Images Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {  xs: "column",md: "row", }, // Switches to column on xs, row on sm and up
            width: "100%",
            mt: 4,
          }}
        >
          <Box sx={{ flex: 1, height: 300 }}>
            <img
              src={getInvolved1}
              alt="Group pic 1"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, height: 300 }}>
            <img
              src={getInvolved2}
              alt="Group pic 2"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box sx={{ flex: 1, height: 300 }}>
            <img
              src={getInvolved3}
              alt="Group pic 3"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>
      {/* Footer */}
      
    </div>
  );
};
export default HomePage;

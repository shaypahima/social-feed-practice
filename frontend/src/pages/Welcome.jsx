import "../styles/Welcome.css";
import { Link, useNavigate } from "react-router";

import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

export default function WelcomePage() {
  const navigate = useNavigate();
  const {isAuth} = useContext(AuthContext);

  useEffect(() => {
    if(isAuth) navigate("/feed");
  }, [isAuth, navigate]);


  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Orbit Social Network</h1>
        <p className="welcome-subtitle">
          Connect, Share, and Engage with People Around the World
        </p>

        {/* <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Connect with Friends</h3>
            <p>Build your network and stay in touch with your loved ones</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-share-alt"></i>
            <h3>Share Moments</h3>
            <p>Share your favorite moments and experiences</p>
          </div>

          <div className="feature-card">
            <i className="fas fa-comments"></i>
            <h3>Join Conversations</h3>
            <p>Engage in meaningful discussions with your community</p>
          </div>
        </div> */}

        <div className="cta-buttons">
          <button onClick={() => navigate("/signup")} className="btn btn-primary">Sign Up</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
        
        <p className="login-text">
          Already have an account? <Link className="btn btn-link" to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

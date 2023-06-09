import {useLocation, useNavigate} from "react-router-dom";

export const useDetectLocation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  function detectLocationOf(page) {
    if (location.url !== page) {
      navigate(page);
    }
  }

  return {
    detectLocationOf, navigate
  };
}


export const LoadingSpinner = ({size, mobile}) => {
  return (
    <img
      alt="preloadImg"
      draggable="false"
      className="loading-spinner"
      style={{width:`${size}em`, height: `${size}em`, left:mobile && '0px'}}
      src="spinner.svg"
    />
  );
};

// openai icon to message chat image
// https://www.svgrepo.com/show/306500/openai.svg

export const LoadingSpinner = ({size}) => {
  return (
    <img
      alt="preloadImg"
      draggable="false"
      className="loading-spinner"
      style={{width:`${size}em`, height: `${size}em`}}
      src="spinner.svg"
    />
  );
};

// openai icon to message chat image
// https://www.svgrepo.com/show/306500/openai.svg

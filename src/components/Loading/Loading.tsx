import Lottie from 'react-lottie';
import animationData from '../../assets/Animation.json';

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={250} width={350} />;
};

export default Loading
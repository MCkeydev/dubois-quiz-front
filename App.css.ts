import { keyframes } from '@emotion/react';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0) rotate(15deg) scale(1.2);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const cssStyles = {
    container: {
        animation: `${bounce} 1s ease infinite`,
    },
};

export default cssStyles;

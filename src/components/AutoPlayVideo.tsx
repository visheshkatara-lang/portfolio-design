import React, { useRef, useEffect } from 'react';

interface AutoPlayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

export const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({ src, className, ...props }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct programmatic configuration ensures strict cross-browser standards
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('muted', 'true');
    video.setAttribute('autoplay', 'true');
    video.setAttribute('preload', 'auto');

    let isPlaying = false;
    const playVideo = async () => {
      try {
        if (video.paused && !isPlaying) {
          isPlaying = true;
          await video.play();
        }
      } catch (error) {
        // Browser autoplay prevention or iframe security policy:
        // Silently capture this and register user interaction handlers to play at the first click/touch.
        const retryPlay = () => {
          video.play()
            .then(() => {
              window.removeEventListener('click', retryPlay);
              window.removeEventListener('touchstart', retryPlay);
            })
            .catch(() => {});
        };
        window.addEventListener('click', retryPlay, { once: true });
        window.addEventListener('touchstart', retryPlay, { once: true });
      } finally {
        isPlaying = false;
      }
    };

    // Ensure the video loops robustly even if browser engine's "loop" attribute misbehaves
    const handleEnded = () => {
      if (video.loop) {
        video.currentTime = 0;
        playVideo();
      }
    };

    video.addEventListener('ended', handleEnded);

    // Initial play trigger
    playVideo();

    // Retrigger play whenever the page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      loop
      muted
      playsInline
      preload="auto"
      {...props}
    />
  );
};

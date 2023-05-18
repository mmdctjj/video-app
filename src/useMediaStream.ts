import { useState, useEffect } from "react";

export const useMediaStream = (options: MediaStreamConstraints) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(
        options ?? {
          audio: false,
          video: { width: 600, height: 300 }
        }
      )
      .then(function (mediaStream) {
        setMediaStream(mediaStream);
      })
      .catch(function (err) {
        setError(err);
      });
  }, []);

  return {
    mediaStream,
    error
  };
};

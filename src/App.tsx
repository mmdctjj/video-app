import { useEffect, useState } from "react";
import { useMediaStream } from "./useMediaStream";
export default () => {
  const [dom, setDom] = useState<HTMLVideoElement>();

  const [flag, setFlag] = useState<boolean>(false);

  const { mediaStream } = useMediaStream({
    audio: true,
    video: {
      width: 1920,
      height: 1080
    }
  });

  useEffect(() => {
    if (!dom) return;
    dom.srcObject = mediaStream;
    dom.onloadeddata = function (e) {
      dom.play();
    };
  }, [mediaStream, dom]);

  useEffect(() => {
    document.querySelector("video") ? setDom(document.querySelector("video")) : ''
  }, []);

  const getCurrenScreen = () => {
    const canvas = document.createElement("canvas");
    canvas.width = dom.videoWidth;
    canvas.height = dom.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(dom, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    return dataURL;
  };

  const getPic = () => {
    setCurrentRUL(getCurrenScreen()) 
    return getCurrenScreen()
  }

  const [cuttImgRUL, setCurrentRUL] = useState<string>('')

  const downPic = () => {
    const a = document.createElement("a");
    a.href = getCurrenScreen();
    a.download = "img";
    a.click();
    a.remove()
  }

  const downGif = () => {
    
  }

  useEffect(() => showPic(), [cuttImgRUL])

  const showPic = () => {
    const dom =document.querySelector('img')
    if (!dom) return
    dom.src = cuttImgRUL as string
  }
  
  const [imgs, setImgs] = useState([]);

  const getGif = () => {
    setFlag(true);
    setImgs([]);
    const id = setInterval(() => {
      const img = getPic();
      setImgs((curr) => [...curr, img]);
    }, 16.67);
    setTimeout(() => {
      setFlag(false);
      clearInterval(id);
    }, 5000);
  };

  const preViewGif = () => {
    const newImage = document.querySelector("img");
    let idx = 0;
    console.log(imgs)
    const id = setInterval(() => {
      newImage.src = imgs[idx];
      idx++;
      if (idx === imgs.length - 1) clearInterval(id);
    }, 100);
  };

  return (
    <>
      <video
        id="123"
        poster="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebdfb2583e3f4a33a72bc6ffd44b42f2~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?"
        width={400}
        height={300}
      />
      <br />
      <button onClick={() => dom.pause()}>暂停</button>
      <button onClick={() => dom.play()}>播放</button>
      <button onClick={() => getPic()}>截屏</button>
      <button onClick={() => downPic()}>下载截图</button>
      <button onClick={() => getGif()}>{flag ? "录制中..." : "录制GIF"}</button>
      {imgs.length && !flag ? (
        <>
        </>
        <button onClick={() => preViewGif()}>预览GIF</button>
      ) : (
        ""
      )}
      <br />
      <br />
      <img width="500px" alt="img" />
    </>
  );
};

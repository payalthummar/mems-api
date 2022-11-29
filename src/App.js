import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Memes from "./Memes";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
function App() {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(91);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memePosition, setMemePosition] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);

  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const fileRef = useRef(null);

  const url = "https://api.imgflip.com/get_memes";

  async function fetchData() {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.data.memes);
      setMemes(data.data.memes);
    } catch (e) {
      console.log(e);
    }
  }
  // function fetchData() {
  //   axios
  //     .get("https://api.imgflip.com/get_memes")
  //     .then((res) => setMemes(res.data.data.memes))
  //     .catch((e) => console.log(e));
  // }
  useEffect(() => {
    fetchData();
  }, []);

  const nextMeme = () => {
    setCurrentMeme((prev) => {
      if (prev === memes.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
    setTopText("");
    setBottomText("");
  };
  const prevMeme = () => {
    setCurrentMeme((prev) => {
      if (prev === 0) {
        return memes.length - 1;
      } else {
        return prev - 1;
      }
    });
    setTopText("");
    setBottomText("");
  };

  const reset = () => {
    setTopText("");
    setBottomText("");
    setUploadedImage(null);
  };
  const getRandomNumber = (array) => {
    const result = Math.floor(Math.random() * array.length);
    return result;
  };

  const saveImage = () => {
    domtoimage.toBlob(document.getElementById("my-node")).then(function (blob) {
      window.saveAs(blob, "my-node.png");
    });
  };

  console.log("data", memes);
  console.log("memes", memes);
  return (
    <div className="App">
      <h1>Memes Generator</h1>
      <h3>{!uploadedImage && memes[currentMeme]?.name}</h3>
      <div className="container">
        {uploadedImage ? (
          <>
            <div id="my-node">
              <img
                className="picture"
                src={URL.createObjectURL(uploadedImage)}
                alt="not found"
              />
              <h3 className="text-top">{topText}</h3>
              <h3 className="text-bottom">{bottomText}</h3>
            </div>
            <br />
            <button onClick={() => setUploadedImage(null)}>
              Delete uploaded Image
            </button>
          </>
        ) : (
          <div id="my-node">
            <img
              className="img-memes"
              src={memes[currentMeme]?.url}
              alt={memes[currentMeme].name}
            />
            <h3 className="text-top">{topText}</h3>
            <h3 className="text-bottom">{bottomText}</h3>
          </div>
        )}
      </div>
      <br />
      <br />
      {/* <img src={memes[memePosition]?.url} />
      <button onClick={() => setMemePosition(getRandomNumber(memes))}>
        Random meme
      </button> */}
      <img
        className="picture"
        src={memes[getRandomNumber(memes)]?.url}
        alt={memes[getRandomNumber(memes)]?.name}
      />
      <button onClick={prevMeme}>Prev</button>
      <button onClick={nextMeme}>Next</button>
      <br />
      <br />
      <input
        type="text"
        name="memes"
        ref={topRef}
        value={topText}
        onChange={(e) => setTopText(e.target.value)}
        placeholder="Text top"
      />{" "}
      <input
        type="text"
        name="memes"
        ref={bottomRef}
        value={bottomText}
        onChange={(e) => setBottomText(e.target.value)}
        placeholder="Text Bottom"
      />{" "}
      <input
        type="file"
        ref={fileRef}
        onChange={(e) => setUploadedImage(e.target.files[0])}
      />
      <button onClick={saveImage}>Save Image</button>
      <button onClick={reset}>Reset</button>
      {/* <Memes memes={memes} /> */}
    </div>
  );
}

export default App;

import InfiniteScroll from "./components/InfiniteScroll";
import Item from "./components/Item";
import { PHOTOS, newTopImg, newBottomImg } from "./constants";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [photos, setPhotos] = useState(PHOTOS);
  return (
    <div className="h-screen w-screen m-0 bg-cyan-500 flex  items-center justify-center">
      <h1 className="mb-auto fixed top-0 text-3xl uppercase tracking-wider mt-8 font-light -rotate-3 bg-blue-800 p-3 rounded-tr-xl rounded-bl-xl text-gray-50 shadow-xl">
        Infinite Scroll
      </h1>
      <InfiniteScroll
        onScrollTop={() =>
          setPhotos([newTopImg, newTopImg, ...photos].slice(0, 30))
        }
        onScrollBottom={() =>
          setPhotos([...photos, newBottomImg, newBottomImg].slice(-30))
        }
        className="bg-gray-100 h-[60vh]  w-[90vw] sm:w-96 rounded-lg shadow-md mt-10 overflow-y-auto hide-scrollbar scroll-smooth"
      >
        <div className="space-y-2 pt-2 pb-2 px-2">
          {photos.map((url, index) => (
            <Item imgUrl={url} key={`image__${index}`} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default App;

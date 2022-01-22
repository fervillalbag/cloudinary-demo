import React from "react";
import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  const [file, setFile] = React.useState<{} | any>(null);
  const [showImage, setShowImage] = React.useState<{} | any>(null);

  const handleFileChange = (e: any) => {
    const file = e.currentTarget.files[0];
    const image = URL.createObjectURL(file);
    setShowImage(image);
    setFile(file);
  };

  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nextjs-test");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/da6b7skw8/image/upload",
      {
        method: "post",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>
        {showImage && (
          <Image src={showImage} alt="" width={200} height={200} />
        )}
      </div>

      <button onClick={handleFileSubmit}>Submit</button>
    </div>
  );
};

export default Home;

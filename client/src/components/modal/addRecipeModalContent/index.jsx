import MyButton from "../../button";
import TextInput from "../../textInput/Index";
import { useState } from "react";
import { sendRequest } from "../../config/request";
import Resizer from "react-image-file-resizer";

import "./styles.css";

const AddBookFromModal = () => {
  const handleImage = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      try {
        const base64Image = await resizeAndConvertImage(selectedImage);
        setData({ ...data, pic_url: base64Image });
      } catch (error) {
        console.error("error resizing the image", error);
      }
    }
  };

  const resizeAndConvertImage = (image) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        image,
        800,
        800,
        "JPEG",
        70,
        0,
        (base64Image) => {
          resolve(base64Image);
        },
        "base64"
      );
    });
  };

  const [data, setData] = useState({
    name: "",
    author: "",
    genre: "",
    review: "",
    pic_url: "",
  });

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitClick = async (e) => {
    const create_book_button = document.getElementById("create-book-button");
    create_book_button.innerHTML = "Sharing...";
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/users/create_post",
        body: data,
      });
      if (response.message.trim() === "Post created successfully") {
        create_book_button.innerHTML = "success";
        setData({
          name: "",
          author: "",
          genre: "",
          review: "",
          pic_url: "",
        });
      } else {
        create_book_button.innerHTML = "Failed";
        create_book_button.style.backgroundColor = "rgb(255, 109, 109)";
        setTimeout(() => {
          create_book_button.innerHTML = "Share Book!";
          create_book_button.style.backgroundColor = "rgb(82, 171, 152)";
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      create_book_button.innerHTML = "Try Again";
    }
  };

  return (
    <div className="add-book-modal-container">
      <h1 className="add-book-header showcase-header">Share A Book!!</h1>
      <TextInput
        name={"name"}
        label={"Book's Name:"}
        placeholder={"Books's name"}
        onChange={handleDataChange}
        value={data.name}
      />
      <TextInput
        name={"author"}
        label={"Book's Author:"}
        placeholder={"Book's Author"}
        onChange={handleDataChange}
        value={data.author}
      />
      <TextInput
        name={"genre"}
        label={"Genre:"}
        placeholder={"Genre"}
        onChange={handleDataChange}
        value={data.genre}
      />
      <TextInput
        name={"review"}
        label={"Your Review:"}
        placeholder={"Your review"}
        onChange={handleDataChange}
        value={data.review}
        className={"review-input"}
      />
      <TextInput
        label={"Cover Photo:"}
        type={"file"}
        onChange={(e) => handleImage(e)}
      />
      <div className={"add-book-modal-buttons-container"}>
        <MyButton
          id={"create-book-button"}
          label={"Share Book!"}
          styles={{ width: "700px", fontSize: "1.1rem" }}
          onClick={handleSubmitClick}
        />
      </div>
    </div>
  );
};

export default AddBookFromModal;

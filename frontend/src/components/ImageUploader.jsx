import React, { useState } from "react";
import { BsImage, BsFillTrashFill } from "react-icons/bs";
import { BarLoader } from "react-spinners";
import { handleImageUpload } from "../api/handleImageUpload";
import { IoIosCheckmarkCircle } from "react-icons/io";
const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [uploadedImageStatus, setUploadedImageStatus] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();

    setImage(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await handleImageUpload(setIsLoading, image);
    setUploadedImageStatus(data);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uploadedImageStatus.imageUrl);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  if (isLoading) {
    return (
      <article className="p-8 max-w-[480px] w-full rounded-lg bg-white shadow-xl ">
        <h1 className="mb-8 text-xl font-semibold text-slate-800">
          Uploading...
        </h1>
        <BarLoader width={"100%"} color="#3b82f6" />
      </article>
    );
  }

  if (!isLoading && uploadedImageStatus?.success) {
    return (
      <article className="p-8 max-w-[480px] w-full rounded-lg bg-white shadow-xl flex flex-col items-center">
        <IoIosCheckmarkCircle className="mb-4 text-4xl text-green-500" />
        <h1 className="mb-8 text-lg font-medium text-slate-800">
          Uploaded Successfully!
        </h1>
        <div className=" rounded-2xl  w-full h-[20rem] overflow-hidden mb-4 flex items-center justify-center">
          <img
            src={uploadedImageStatus?.imageUrl}
            alt="image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex items-center w-full gap-1 p-1 bg-blue-100 border border-gray-300 rounded bg-opacity-30">
          <p className="line-clamp-1">{uploadedImageStatus?.imageUrl}</p>
          <div className="shrink-0 ">
            <button
              className="px-2 py-2 font-medium text-white bg-blue-500 rounded-lg "
              onClick={handleCopy}
            >
              Copy Link
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="p-8 max-w-[480px] w-full rounded-lg bg-white shadow-xl flex flex-col items-center">
      <h1 className="mb-4 text-lg font-medium text-slate-800">
        Upload your Image
      </h1>
      <span className="block mb-8 text-sm text-slate-600">
        File should be jpeg,png...
      </span>
      <form
        className="w-full"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          type="file"
          id="uploadfile"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
        <div
          className="border rounded-2xl border-blue-600 border-dashed w-full h-[20rem] relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {image ? (
            <button className="w-[2rem] h-[2rem] flex items-center justify-center rounded bg-red-100 absolute top-2 right-2">
              <BsFillTrashFill
                className="text-lg text-red-500"
                onClick={() => setImage(null)}
              />
            </button>
          ) : null}
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="image"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-blue-100 bg-opacity-30">
              <div className="flex flex-col items-center gap-4">
                <BsImage size={48} className="text-slate-600" />
                <span className="text-slate-400">
                  Drag and Drop your image here...
                </span>
              </div>
            </div>
          )}
        </div>
        {!image ? (
          <span className="block my-4 font-semibold text-center text-slate-600">
            OR
          </span>
        ) : (
          <span className="block my-4" />
        )}
        {
          <div className="flex justify-center">
            {image ? (
              <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded cursor-pointer">
                Upload File
              </button>
            ) : (
              <label
                htmlFor="uploadfile"
                className="px-4 py-2 font-medium text-white bg-blue-500 rounded cursor-pointer"
              >
                Choose File
              </label>
            )}
          </div>
        }
      </form>
    </article>
  );
};

export default ImageUploader;

import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const filters = [
  { name: "Normal", className: "" },
  { name: "Grayscale", className: "filter-grayscale" },
  { name: "Sepia", className: "filter-sepia" },
  { name: "Blur", className: "filter-blur" },
  { name: "Brightness", className: "filter-brightness" },
  { name: "Contrast", className: "filter-contrast" },
  { name: "Invert", className: "filter-invert" },
];

const Result = () => {
  const [images, setImages] = useState([assets.sample_img_1]); // Story mode images array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [storyInput, setStoryInput] = useState(""); // multiline story input for story mode
  const [refineInput, setRefineInput] = useState(""); // refinement prompt input
  const [isRefining, setIsRefining] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState("");

  const { generateImage } = useContext(AppContext);

  // Predefined prompt templates
  const templates = [
    "A futuristic cityscape in cyberpunk style",
    "A magical forest with glowing plants",
    "A 3D render of a luxury car on a mountain road",
    "A cinematic portrait of a warrior in armor",
    "A surreal desert landscape with floating rocks",
  ];

  // Generate images for each line of story
  const handleGenerateStory = async (e) => {
    e.preventDefault();
    if (!storyInput.trim()) return;

    setLoading(true);
    const lines = storyInput.trim().split("\n").filter(Boolean);
    const generatedImages = [];

    for (const line of lines) {
      const img = await generateImage(line);
      generatedImages.push(img || assets.sample_img_1);
    }

    setImages(generatedImages);
    setCurrentIndex(0);
    setIsImageLoaded(true);
    setSelectedFilter("");
    setLoading(false);
  };

  // Refine current image by combining original prompt + refinement prompt
  const handleRefine = async () => {
    if (!refineInput.trim()) return;
    setLoading(true);

    const currentPrompt = storyInput.trim().split("\n")[currentIndex];
    const combinedPrompt = `${currentPrompt} with refinement: ${refineInput.trim()}`;

    const img = await generateImage(combinedPrompt);
    if (img) {
      const newImages = [...images];
      newImages[currentIndex] = img;
      setImages(newImages);
      setRefineInput("");
      setIsRefining(false);
    }

    setLoading(false);
  };

  const currentImage = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div className="relative">
        <img
          src={currentImage}
          alt={`Scene ${currentIndex + 1}`}
          className={`max-w-sm rounded-md ${selectedFilter}`}
        />
        <span
          className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
            loading ? "w-full transition-all duration-[10s]" : "w-0"
          }`}
        />
      </div>
      <p className={!loading ? "hidden" : ""}>Loading....</p>

      {!isImageLoaded && (
        <>
          <form onSubmit={handleGenerateStory} className="flex flex-col w-full max-w-xl mt-10">
            <textarea
              placeholder="Write your story here (one line per scene)"
              value={storyInput}
              onChange={(e) => setStoryInput(e.target.value)}
              rows={5}
              className="p-3 rounded-md bg-neutral-500 text-white resize-none"
            />
            <button
              type="submit"
              className="mt-4 bg-zinc-900 px-10 py-3 rounded-full text-white"
            >
              Generate Image
            </button>
          </form>

          {/* Prompt templates */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center max-w-2xl">
            {templates.map((prompt, i) => (
              <span
                key={i}
                onClick={() => setStoryInput(prompt)}
                className="cursor-pointer bg-blue-100 text-blue-900 px-4 py-1 rounded-full text-sm hover:bg-blue-200"
              >
                {prompt}
              </span>
            ))}
          </div>
        </>
      )}

      {isImageLoaded && (
        <>
          {/* Navigation and Download buttons */}
          <div className="flex gap-4 mt-10 justify-center">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              className="px-6 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={currentIndex === images.length - 1}
              onClick={() => setCurrentIndex(currentIndex + 1)}
              className="px-6 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>

            <a
              href={currentImage}
              download={`story-image-${currentIndex + 1}.png`}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Download
            </a>
          </div>

          {/* Show current prompt */}
          <p className="text-white text-center whitespace-pre-line mt-4 max-w-xl">
            <strong>Current Scene Prompt:</strong>{" "}
            {storyInput.trim().split("\n")[currentIndex]}
          </p>

          {/* Refinement UI */}
          {!isRefining ? (
            <button
              onClick={() => setIsRefining(true)}
              className="bg-blue-600 px-8 py-2 rounded-full text-white mt-4"
            >
              Refine Image
            </button>
          ) : (
            <div className="flex flex-col w-full max-w-xl mt-4">
              <input
                type="text"
                placeholder="Enter refinement prompt"
                value={refineInput}
                onChange={(e) => setRefineInput(e.target.value)}
                className="p-2 rounded text-black"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleRefine}
                  className="bg-green-600 px-6 py-2 rounded text-white"
                >
                  Apply Refinement
                </button>
                <button
                  onClick={() => {
                    setIsRefining(false);
                    setRefineInput("");
                  }}
                  className="bg-red-600 px-6 py-2 rounded text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Filters selector */}
          <div className="flex flex-wrap gap-3 justify-center mt-6 max-w-xl">
            {filters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.className)}
                className={`px-4 py-2 rounded-full text-sm border ${
                  selectedFilter === filter.className
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-200 text-black border-gray-400 hover:bg-gray-300"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* Reset / Generate Another */}
          <button
            onClick={() => {
              setIsImageLoaded(false);
              setImages([assets.sample_img_1]);
              setCurrentIndex(0);
              setStoryInput("");
              setRefineInput("");
              setIsRefining(false);
              setSelectedFilter("");
            }}
            className="mt-6 bg-zinc-900 px-10 py-3 rounded-full text-white"
          >
            Generate Another
          </button>
        </>
      )}
    </motion.div>
  );
};

export default Result;


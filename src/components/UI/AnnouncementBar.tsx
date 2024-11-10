import React, { useState, useEffect } from "react";

const messages = [
  "🚨 Free shipping on orders over $50!",
  "🔥 20% off on selected items!",
  "💥 New arrivals are here!",
];

const AnnouncementBar: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setIsFading(true); // Trigger fade-out animation
      setTimeout(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % messages.length
        );
        setIsFading(false);
      }, 500);
    }, 3000);

    return () => clearInterval(fadeInterval);
  }, []);

  return (
    <div className="bg-black text-white py-4 text-center font-inter text-sm relative overflow-hidden">
      <div
        className={`transition-opacity duration-500 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {messages[currentMessageIndex]}
      </div>
    </div>
  );
};

export default AnnouncementBar;

import React from "react";
import { CiPhone } from "react-icons/ci";
const Button = ({ link, type = "button", name }) => {
  return (
    <div>
      <a href={link}>
        <button
          className="relative flex border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit rounded-full"
          type={type}
        >
          {name}
        </button>
      </a>
    </div>
  );
};

export default Button;

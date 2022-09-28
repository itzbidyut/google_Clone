import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useResultContext } from "../context/ResultContextProvider";
import { useDebounce } from "use-debounce";
const links = [
  {
    url: "/search",
    text: "All",
  },
  {
    url: "/image",
    text: "Image",
  },
  {
    url: "/news",
    text: "News",
  },
  {
    url: "/video",
    text: "Video",
  },
];

export default function Search() {
  const [text, setText] = useState("");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="searchBar">
      <div className="container">
        <div>
          <div className="inputBox">
            <input
              placeholder="search"
              value={text}
              type="text"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {text && (
            <div>
              <br></br>
              <div className="links text-center">
                {links.map((item) => (
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive ? "active" : "inactive"
                    }
                  >
                    {item.text}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

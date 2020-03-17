import React from "react";

const TagList = ({ tags }) => {
  return (
    <ul className="tag-list">
      {tags.map(tag => (
        <li key={tag} className="tag-default tag-pill teg-outline">
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagList;

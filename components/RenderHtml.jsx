import React from "react";

const RenderHtml = ({ content }) => {
  const markup = {
    __html: content,
  };
  return (
    <>
      <style jsx>{`
        p {
          margin: 5rem 0;
          font-size: 1rem;
          color: red;
          line-height: 2rem;
        }
      `}</style>
      <div dangerouslySetInnerHTML={markup} />
      <span className="mb-10" />
    </>
  );
};

export default RenderHtml;

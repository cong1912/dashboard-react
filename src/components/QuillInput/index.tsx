import React from 'react';

const QuillInput = ({ quillRef }) => {
  return <div ref={quillRef} style={{ height: 110 }} />;
};

export default React.memo(QuillInput);

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const Timymce = ({ handleChangeContent, content }) => {
  const editorRef = useRef(null);

  const onChange = (e) => {
    handleChangeContent(e.target.getContent());
  };

  return (
    <>
      <Editor
        apiKey="4wvwhb18asy172qnsxv6g879f5er5mcoowyg3gygvys2lm9x"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content}
        init={{
          height: 500,
          plugins:
            'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable',
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={onChange}
      />
    </>
  );
};

export default Timymce;

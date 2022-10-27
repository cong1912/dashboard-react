import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react'
import {ClassicEditor} from '@ckeditor/ckeditor5-editor-classic'


export default function Editor() {
  return (
    <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        onInit={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
        } }
    />
  )
}

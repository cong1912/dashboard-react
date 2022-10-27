import axios from 'axios';
import { UPLOAD_IMAGE_URL } from 'src/constants/url';

const token = JSON.parse(localStorage.getItem('token') || 'null');
export function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise((resolve, reject) => {
        const body = new FormData();
        loader.file.then(async (file) => {
          body.append('file', file);

          await axios({
            method: 'post',
            url: UPLOAD_IMAGE_URL,
            data: body,
            withCredentials: false,
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          })
            .then((res) => res)
            .then((res) => {
              console.log(res, 'res');
              resolve({
                default: `${res.data.url.replace('/public', '')}`
              });
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    }
  };
}

export function uploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

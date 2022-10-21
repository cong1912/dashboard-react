import * as React from 'react';
import Button from '@mui/material/Button';
import { readAsDataUrl } from 'src/utils/file';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ImageList,
  ImageListItem,
  TextField
} from '@mui/material';
import { createFaq } from 'src/services/FaqService';
import { useParams } from 'react-router-dom';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function FaqFormModal({ open, close }) {
  const { id } = useParams();

  const [form, setForm] = React.useState({
    title: '',
    content: '',
    files: []
  });
  const [listImage, setListImage] = React.useState([]);

  const handleChangeImage = async (event) => {
    if (form.files.length >= 2) return;
    setForm({
      ...form,
      files: [...form.files, event.target.files[0]]
    });
    const imgBase64 = await readAsDataUrl(event.target.files[0]);
    setListImage([...listImage, imgBase64]);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmitFormFaq = () => {
    let formData = new FormData();

    formData.append('tile', form.title);
    formData.append('content', form.content);
    for (let i = 0; i < form.files.length; i++) {
      formData.append('files', form.files[i]);
    }
    createFaq(id, formData).then((response) => {
      close();
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle>Reply FAQ</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title Faq"
            type="text"
            fullWidth
            variant="standard"
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="content"
            name="content"
            label="Content Faq"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={form.content}
            onChange={handleChange}
          />
          <TextField
            name="upload-photo"
            margin="dense"
            type="file"
            onChange={handleChangeImage}
          />
          <ImageList sx={{ width: 500, height: 250 }} cols={3} rowHeight={164}>
            {listImage.map((item) => (
              <ImageListItem key={item}>
                <img
                  src={`${item}`}
                  srcSet={`${item}`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmitFormFaq}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export interface DeleteDialogType {
  open: boolean;
  name: string;
  handleClose: () => void;
  handleDelete: () => void;
}

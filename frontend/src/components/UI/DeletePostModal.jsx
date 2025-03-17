import { Modal, Button, IconButton } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import { useState } from "react";
import { useDeletePost } from "../../hooks/feedRequests";


// eslint-disable-next-line react/prop-types
export default function DeletePostModal({_id,token}) {
  const [open, setOpen] = useState(false);
  const { mutate: deletePost } = useDeletePost();

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm() {
    deletePost(_id, token);
    handleClose();
  }

  return (
    <>
      <IconButton
        color="red"
        appearance="primary"
        icon={<TrashIcon />}
        onClick={() => setOpen(true)}
      />
      <Modal size="xs" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Are you sure you want to delete this post?"}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirm} appearance="primary">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

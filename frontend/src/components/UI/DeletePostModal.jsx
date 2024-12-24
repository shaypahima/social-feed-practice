import { Modal, Button, IconButton } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import { useState } from "react";
import { useDeletePost } from "../../hooks/feedRequests";


// eslint-disable-next-line react/prop-types
export default function DeletePostModal({id}) {
  const [open, setOpen] = useState(false);
  const { mutate: deletePost } = useDeletePost(id);

  function handleClose() {
    setOpen(false);
  }

  function handleConfirm() {
    deletePost();
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
          <Button onClick={handleConfirm} appearance="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

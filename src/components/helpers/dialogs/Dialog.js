import React from 'react';
import PropTypes from 'prop-types';
import {
  Scale,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  Button
} from '@chakra-ui/core';

function Dialog({ shown = false, onClose, onSuccess, title, message }) {
  const cancelButtonRef = React.useRef();

  function handleSuccess() {
    onClose();
    onSuccess();
  }

  return (
    <Scale in={shown}>
      {(styles) => (
        <AlertDialog blockScrollOnMount={false} leastDestructiveRef={cancelButtonRef} onClose={onClose} isOpen={true}>
          <AlertDialogOverlay opacity={styles.opacity} />
          <AlertDialogContent {...styles}>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>{message}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelButtonRef} onClick={onClose}>
                Annuler
              </Button>
              <Button variantColor='blue' ml={3} onClick={handleSuccess}>
                Confirmer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Scale>
  );
}

Dialog.propTypes = {
  shown: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string
};

export default Dialog;

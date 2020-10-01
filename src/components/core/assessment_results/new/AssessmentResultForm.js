import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Button, FormControl, FormLabel } from '@chakra-ui/core';

import assetEnums from '../../../../utils/enums/asset';

import Form from '../../../helpers/Form';
import FileUploader from '../../../helpers/FileUploader';

function AssessmentResultForm({ addAsset, removeAsset, onSave, onCancel, onOpenAssetFile }) {
  function handleFileUploaded({ type, url, remoteId }) {
    addAsset({
      type,
      remoteId,
      name: 'Rapport',
      url,
      role: assetEnums.roles.PRIMARY
    });
  }

  return (
    <Form onSubmit={onSave}>
      <Stack w='30%' py={5}>
        <FormControl isRequired>
          <FormLabel color='gray.500'>Fichier du rapport</FormLabel>
          <FileUploader
            allowImage={false}
            folder='assessment_results'
            onFileUploaded={handleFileUploaded}
            onFileDeleted={removeAsset}
            onOpenFile={onOpenAssetFile}
          />
        </FormControl>
        <Stack direction='row' justifyContent='flex-end' py={8}>
          <Button type='button' variant='outline' onClick={onCancel}>
            Annuler
          </Button>
          <Button colorScheme='blue' type='submit'>
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

AssessmentResultForm.propTypes = {
  addAsset: PropTypes.func.isRequired,
  removeAsset: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOpenAssetFile: PropTypes.func.isRequired
};

export default AssessmentResultForm;

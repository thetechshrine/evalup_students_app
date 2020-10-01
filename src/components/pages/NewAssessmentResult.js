import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Heading } from '@chakra-ui/core';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';

import assetEnums from '../../utils/enums/asset';
import assessmentsResultsActions from '../../store/actions/assessment-results';

import { NotificationContext } from '../providers/Notification';
import AssessmentResultForm from '../core/assessment_results/new/AssessmentResultForm';
import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import useAssets from '../hooks/useAssets';
import useDisclosure from '../hooks/useDisclosure';

function NewAssessmentResult() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { assets, addAsset, removeAsset } = useAssets();
  const history = useHistory();
  const { shown, open, close } = useDisclosure();

  function handleSaveAssessmentResult(evt) {
    evt.preventDefault();

    const { assessmentId } = queryString.parse(window.location.search);
    dispatch(
      assessmentsResultsActions.createAssessmentResult({
        assessmentId,
        assessmentResult: { assets },
        notification,
        history
      })
    );
  }

  function handleCancel() {
    history.goBack();
  }

  const [assetFile, setAssetFile] = useState({});
  function handleOpenAssetFile({ type, url }) {
    setAssetFile({ type, url });
    open();
  }

  function handleCloseAssetFile() {
    setAssetFile({});
    close();
  }

  return (
    <>
      <Stack>
        <Heading>Nouveau rendu</Heading>

        <AssessmentResultForm
          addAsset={addAsset}
          removeAsset={removeAsset}
          onSave={handleSaveAssessmentResult}
          onCancel={handleCancel}
          onOpenAssetFile={handleOpenAssetFile}
        />
      </Stack>

      <PDFViewerModal
        shown={shown && assetFile.type === assetEnums.types.PDF}
        onClose={handleCloseAssetFile}
        url={assetFile.url}
      />
    </>
  );
}

export default NewAssessmentResult;

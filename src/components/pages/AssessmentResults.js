import React, { useEffect, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import assessemtResultsActions from '../../store/actions/assessment-results';

import Block from '../helpers/Block';
import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import AssessmentResult from '../core/assessment_results/AssessmentResult';
import useDisclosure from '../hooks/useDisclosure';

function AssessmentResults() {
  const dispatch = useDispatch();
  const { assessmentResults, loading } = useSelector((state) => state.assessmentResults);
  const { shown, open, close } = useDisclosure();

  useEffect(() => {
    dispatch(assessemtResultsActions.getAssessmentResults());
  }, [dispatch]);

  const [assessementResultReportUrl, setAssessmentResultReportUrl] = useState(null);
  function handleOpenAssessemntResultReport({ url } = {}) {
    setAssessmentResultReportUrl(url);
    open();
  }

  function handleCloseAssessmentResultReport() {
    setAssessmentResultReportUrl(null);
    close();
  }

  function displayAssessmentResults() {
    return (
      <SimpleGrid spacing={10}>
        {assessmentResults.map((assessmentResult) => (
          <AssessmentResult
            key={assessmentResult.id}
            assessmentResult={assessmentResult}
            onOpenReport={handleOpenAssessemntResultReport}
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Block>
        <Block.Header title='Rendus' showOnCreate={false} />

        <Block.Main loading={loading} dataLength={assessmentResults.length} emptyDataMessage='Aucun rendu enregistré'>
          {displayAssessmentResults()}
        </Block.Main>
      </Block>

      <PDFViewerModal shown={shown} onClose={handleCloseAssessmentResultReport} url={assessementResultReportUrl} />
    </>
  );
}

export default AssessmentResults;

import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import assessmentsActions from '../../store/actions/assessments';
import entitiesUtils from '../../utils/entities-utils';

import { NotificationContext } from '../providers/Notification';
import Block from '../helpers/Block';
import Assessment from '../core/today_assessment/Assessment';
import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import useDisclosure from '../hooks/useDisclosure';

function TodayAssessment() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { user } = useSelector((state) => state.auth);
  const { todayAssessment, loading } = useSelector((state) => state.assessments);
  const { shown, open, close } = useDisclosure();
  const history = useHistory();

  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (user && !hasFetched) {
      dispatch(
        assessmentsActions.getTodayAssessment({
          notification,
          groupId: user.group.id
        })
      );
      setHasFetched(true);
    }
  }, [dispatch, user]);

  function handleCreate() {
    history.push(`/assessment-results/new?assessmentId=${todayAssessment.id}`);
  }

  return (
    <>
      <Block>
        <Block.Header
          title='Evaluation'
          showOnCreate={!!todayAssessment}
          onCreateLabel='Créer le rendu'
          onCreate={handleCreate}
        />

        <Block.Main
          loading={loading}
          dataLength={todayAssessment ? 1 : 0}
          emptyDataMessage='Aucune évaluation disponible'
        >
          {todayAssessment && <Assessment assessment={todayAssessment} onOpenSubject={open} />}
        </Block.Main>
      </Block>

      {todayAssessment && (
        <PDFViewerModal shown={shown} onClose={close} url={entitiesUtils.getPrimaryAssetUrl(todayAssessment)} />
      )}
    </>
  );
}

export default TodayAssessment;

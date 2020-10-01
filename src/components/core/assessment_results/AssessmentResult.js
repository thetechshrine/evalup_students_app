import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Flex, Box, Divider, Button, SimpleGrid, Tooltip, Text, Heading, Badge } from '@chakra-ui/core';
import { ViewIcon } from '@chakra-ui/icons';
import { RiFileList3Fill } from 'react-icons/ri';

import assessmentResultEnums from '../../../utils/enums/assessment-result';
import { assessmentResultPropType } from '../../../utils/default-prop-types';
import entitiesUtils from '../../../utils/entities-utils';

function getIconColor(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if ([statuses.CREATED, statuses.NOTED].includes(assessmentResult.status)) return '#A0AEC0';

  return '#38A169';
}

function isPending(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  return [statuses.CREATED, statuses.NOTED].includes(assessmentResult.status);
}

function getStatusBadgeColorScheme(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if ([statuses.CREATED, statuses.NOTED].includes(assessmentResult.status)) return 'gray';

  return 'green';
}

function getStatusBadgeLabel(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if ([statuses.CREATED, statuses.NOTED].includes(assessmentResult.status)) return 'En attente de correction';

  return 'Corrigé';
}

function getNumberValue2PaddedFromStartWithZero(numberValue) {
  return String(numberValue).padStart(2, '0');
}

function getObtainedNoteLabel(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if ([statuses.CREATED, statuses.NOTED].includes(assessmentResult.status)) return '--';

  return getNumberValue2PaddedFromStartWithZero(assessmentResult.obtainedNote);
}

function getObtainedCreditsLabel(assessmentResult) {
  const { statuses } = assessmentResultEnums;
  if ([statuses.CREATED, statuses.NOTED].includes(assessmentResult.status)) return '--';

  return getNumberValue2PaddedFromStartWithZero(assessmentResult.obtainedCredits);
}

function AssessmentResult({ assessmentResult, onOpenReport }) {
  function handleOpenReport() {
    onOpenReport({ url: entitiesUtils.getPrimaryAssetUrl(assessmentResult) });
  }

  return (
    <Stack spacing={0} direction='row' borderWidth={1} borderRadius='lg' overflow='hidden'>
      <Flex justifyContent='center' alignItems='center' padding={6}>
        <Box as={RiFileList3Fill} size={72} color={getIconColor(assessmentResult)} />
      </Flex>

      <Box>
        <Divider orientation='vertical' />
      </Box>

      <Stack flex={1} spacing={0}>
        <Flex justifyContent='space-between' alignItems='center' padding={3}>
          <Stack>
            <Text fontSize='xl'>{assessmentResult.assessment.title}</Text>
            <Stack direction='row' fontSize='1.05rem'>
              <Text color='gray.500'>Ajouté le</Text>
              <Text fontWeight='medium'>{new Date(assessmentResult.createdAt).toLocaleDateString()}</Text>
              <Text color='gray.500'>à</Text>
              <Text fontWeight='medium'>{new Date(assessmentResult.createdAt).toLocaleTimeString()}</Text>
            </Stack>
            {!isPending(assessmentResult) && assessmentResult.comments && (
              <Stack pt={2}>
                <Text fontWeight='medium' color='gray.500' fontSize='1.05rem'>
                  Commentaires
                </Text>
                <Text>{assessmentResult.comments}</Text>
              </Stack>
            )}
          </Stack>
          <Badge fontSize='sm' colorScheme={getStatusBadgeColorScheme(assessmentResult)}>
            {getStatusBadgeLabel(assessmentResult)}
          </Badge>
        </Flex>

        <Divider />

        <SimpleGrid columns={2}>
          <Stack padding={3} spacing={1}>
            <Heading fontSize='1.3rem'>{getObtainedNoteLabel(assessmentResult)} / 20</Heading>
            <Text color='gray.500'>Note</Text>
          </Stack>
          <Stack padding={3} spacing={1}>
            <Heading fontSize='1.3rem'>
              {getObtainedCreditsLabel(assessmentResult)} /{' '}
              {getNumberValue2PaddedFromStartWithZero(assessmentResult.assessment.course.credits)}
            </Heading>
            <Text color='gray.500'>Crédits</Text>
          </Stack>
        </SimpleGrid>

        <Stack
          direction='row'
          paddingTop={2}
          paddingBottom={3}
          paddingLeft={3}
          paddingRight={3}
          justifyContent='flex-end'
        >
          <Tooltip
            label='Attention! Si vous avez un gestionnaire de téléchargement actif, cette action téléchargera le fichier'
            aria-label='A tooltip'
          >
            <Button variant='outline' leftIcon={<ViewIcon />} onClick={handleOpenReport}>
              Voir le rapport
            </Button>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
}

AssessmentResult.propTypes = {
  assessmentResult: assessmentResultPropType,
  onOpenReport: PropTypes.func.isRequired
};

export default AssessmentResult;

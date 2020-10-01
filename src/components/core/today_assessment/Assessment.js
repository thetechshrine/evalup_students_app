import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Stack, Text, Badge, Divider, SimpleGrid, Heading, Button, Tooltip } from '@chakra-ui/core';
import { ViewIcon } from '@chakra-ui/icons';

import { assessmentPropType } from '../../../utils/default-prop-types';
import assessmentEnums from '../../../utils/enums/assessment';

function getTypeBadgeColorScheme(assessment) {
  if (assessment.type === assessmentEnums.types.MAIN) return 'purple';

  return 'gray';
}

function getTypeBadgeLabel(assessment) {
  if (assessment.type === assessmentEnums.types.MAIN) return 'Examen';

  return 'Rattrapage';
}

function getDescriptionLabel(assessment) {
  if (assessment.description) return assessment.description;

  return 'Aucune note supplémentaire';
}

function Assessment({ assessment, onOpenSubject }) {
  return (
    <Stack borderWidth={1} borderRadius='lg' overflow='hidden' flex={1}>
      <Flex justifyContent='space-between' alignItems='center' padding={6}>
        <Stack>
          <Text fontSize='xl'>{assessment.title}</Text>
          <Text fontSize='md' color='gray.500'>
            {getDescriptionLabel(assessment)}
          </Text>
        </Stack>
        <Badge fontSize='sm' colorScheme={getTypeBadgeColorScheme(assessment)}>
          {getTypeBadgeLabel(assessment)}
        </Badge>
      </Flex>

      <Divider />

      <SimpleGrid columns={2}>
        <Stack padding={6} spacing={1}>
          <Heading fontSize='1.3rem'>{new Date(assessment.startDate).toLocaleString()}</Heading>
          <Text color='gray.500'>Date de début</Text>
        </Stack>
        <Stack padding={6} spacing={1}>
          <Heading fontSize='1.3rem'>{new Date(assessment.endDate).toLocaleString()}</Heading>
          <Text color='gray.500'>Date de fin</Text>
        </Stack>
      </SimpleGrid>

      <Stack
        direction='row'
        paddingTop={1}
        paddingBottom={6}
        paddingLeft={6}
        paddingRight={6}
        justifyContent='flex-end'
      >
        <Tooltip
          label='Attention! Si vous avez un gestionnaire de téléchargement actif, cette action téléchargera le fichier'
          aria-label='A tooltip'
        >
          <Button variant='outline' colorScheme='purple' leftIcon={<ViewIcon />} onClick={onOpenSubject}>
            Voir le sujet
          </Button>
        </Tooltip>
      </Stack>
    </Stack>
  );
}

Assessment.propTypes = {
  assessment: assessmentPropType,
  onOpenSubject: PropTypes.func.isRequired
};

export default Assessment;

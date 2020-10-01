import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading, Button } from '@chakra-ui/core';

function BlockHeader({ title, showOnCreate = true, onCreateLabel, onCreate }) {
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Heading>{title}</Heading>
      {showOnCreate === true && (
        <Button variant='outline' colorScheme='purple' size='lg' onClick={onCreate}>
          {onCreateLabel}
        </Button>
      )}
    </Flex>
  );
}

BlockHeader.propTypes = {
  title: PropTypes.string.isRequired,
  showOnCreate: PropTypes.bool,
  onCreateLabel: PropTypes.string,
  onCreate: PropTypes.func
};

export default BlockHeader;

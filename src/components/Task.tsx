import { Box, ScaleFade, Textarea } from '@chakra-ui/react';
import React from 'react'
import { TaskModel } from '../utils/models';

type TaskProps = {
    index: number;
    task: TaskModel;
};

function Task( {index, task}: TaskProps) {
  return (
    <ScaleFade in={true} unmountOnExit>
        <Box
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        w={200}
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        >
            <Textarea
            value={task.title}
            fontWeight="semibold"
            cursor="inherit"
            border="none"
            p={0}
            resize="none"
            minH={70}
            maxH={200}
            focusBorderColor="none"
            color="gray.700"
            ></Textarea>
        </Box>
    </ScaleFade>
  )
}

export default Task
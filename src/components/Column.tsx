
import { Badge, Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { ColumnType } from '../utils/enums'
import { TaskModel } from '../utils/models';
import Task from './Task';

const ColumnColorScheme: Record<ColumnType, string> = {
    Todo: 'gray',
    'In Progress': 'blue',
    Blocked: 'red',
    Completed: 'green',
};

const mockTasks: TaskModel[] = [
    {
        id: '1',
        title: 'Task 1',
        column: ColumnType.TO_DO,
        color: 'gray.300',
    },
    {
        id: '2',
        title: 'Task 2',
        column: ColumnType.TO_DO,
        color: 'gray.300',
    }
]
  

function Column({ column }: { column: ColumnType}) {

    const ColumnTasks = mockTasks.map((task, index) => (
        <Task
            key={task.id}
            task={task}
            index={index}
        />
    ));


  return (
    <Box>
        <Heading fontSize="md" mb={4} letterSpacing="wide">
            <Badge
                px={2}
                py={1}
                rounded="lg"
                colorScheme={ColumnColorScheme[column]}
            >
            {column}
            </Badge>
            <Stack
            direction={{ base: 'row', md: 'column' }}
            h={{ base: 300, md: 600 }}
            p={4}
            mt={2}
            spacing={4}
            rounded="lg"
            boxShadow="md"
            overflow="auto"
            >
                {ColumnTasks}
            </Stack>
        </Heading>
    </Box>
  )
}

export default Column
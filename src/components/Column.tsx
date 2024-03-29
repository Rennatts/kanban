
import { Badge, Box, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocaStorage';
import { ColumnType } from '../utils/enums'
import { RawTask, TaskModel } from '../utils/models';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import CreateTaskModal from './CreateTaskModal';
import { useDrop } from 'react-dnd';

const ColumnColorScheme: Record<ColumnType, string> = {
    Todo: 'gray',
    'In Progress': 'blue',
    Blocked: 'red',
    Completed: 'green',
};

const mockTasks: TaskModel[] = [
    {
        id: '1',
        description: 'teste 01',
        column: ColumnType.TO_DO,
        color: 'pink.300',
    },
    {
        id: '2',
        description: 'teste 02',
        column: ColumnType.TO_DO,
        color: 'gray.300',
    }
]
  

function Column({ column }: { column: ColumnType}) {
    const [tasks, setTasks] = useLocalStorage<TaskModel[]>("TASKS", [])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [columnTasks, setcolumnTasks]= useState<TaskModel>();

    function onCreateTask({ ...data }: RawTask) {
        setTasks(prevNotes => {
          return [
            ...prevNotes,
            { ...data, id: uuidv4() },
          ]
        })
        window.location.reload();
    }

    function onDeleteTask(id: string) {
        setTasks(prevTasks => {
            return prevTasks.filter(task => task.id !== id);
        });
        window.location.reload();
        
    }


    // function onDeleteTask({ ...data }: RawTask) {
    //     setTasks(prevNotes => {
    //       return [
    //         ...prevNotes,
    //         { ...data, id: uuidv4() },
    //       ]
    //     })
    //     window.location.reload();
    // }


    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item:TaskModel) => addTaskToColumn(item.id, column),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addTaskToColumn = (id: string, column: ColumnType) => {

        setTasks(prevNotes => {
            prevNotes.filter(item => item.id === id).forEach(item => item.column = column)
            return [
              ...prevNotes,
            ]
        })   
        window.location.reload();
    }

    const ColumnTasks = tasks.map((task, index) => (
        task.column === column ? 
        (
            <Task
            key={task.id}
            task={task}
            index={index}
            onDeleteTask={onDeleteTask}
        />
        ) : null
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
                <CreateTaskModal onSubmit={onCreateTask} column={column} onOpen={onOpen} isOpen={isOpen} onClose={onClose}/>
                <Stack
                ref={drop}
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

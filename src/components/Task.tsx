import { Box, GridItem, ScaleFade, Textarea } from '@chakra-ui/react';
import { TaskModel } from '../utils/models';
import { useDrag } from "react-dnd";


type TaskProps = {
    index: number;
    task: TaskModel;
};

function Task( {index, task}: TaskProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    }));
  return (
    <ScaleFade in={true} unmountOnExit>
        <Box
        ref={drag}
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
        opacity={isDragging? 0.5 : 1}
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
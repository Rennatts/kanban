import { Box, Flex, GridItem, ScaleFade, Textarea } from '@chakra-ui/react';
import { TaskModel } from '../utils/models';
import { useDrag } from "react-dnd";
import { DeleteIcon, EditIcon} from '@chakra-ui/icons'


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
    <ScaleFade in={true} unmountOnExit onClick={(e:any) => console.log("task", task)}>
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
            <Box mt={10}  w="20%" position="relative" left="120px" top="-20px" cursor="pointer" m={4} p={2.5}>
                <DeleteIcon color="gray.500"
                 _hover={{
                    color: "white"}}
                />
                <EditIcon color="gray.500" mt={2}
                 _hover={{
                    color: "white"}}
                />
            </Box>
            <Textarea
            fontWeight="semibold"
            cursor="inherit"
            border="none"
            p={0}
            resize="none"
            minH={70}
            maxH={200}
            focusBorderColor="none"
            color="gray.700"
            defaultValue={task.description}
            ></Textarea>
        </Box>
    </ScaleFade>
  )
}

export default Task
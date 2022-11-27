import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { FormEvent, useRef, useState } from "react"
import { ColumnType } from "../utils/enums"
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from "usehooks-ts";
import { RawTask } from "../utils/models";
import { AddIcon } from '@chakra-ui/icons'

type udeDisclosure = {
    isOpen?: any
    onOpen?: any
    onClose?: any
    column: ColumnType;
    onSubmit: any;
}

function CreateTaskModal({isOpen, onOpen, onClose, column, onSubmit}: udeDisclosure) {
    //const { isOpen, onOpen, onOpen } = useDisclosure()

    const titleRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    const [task, setTask] = useState({
        title: "",
        description: "",
    })
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    // function onCreateTask(data:any) {
    //     setTask(prevTask => {
    //       return [
    //         ...prevTask,
    //         { ...data, id: uuidv4(), column: column, color: 'green.300' },
    //       ]
    //     })
    // }

    function handleInputChange(event: any) {
        console.log("event", event.target)
        setTask({...task, [event.target.name]: event.target.value});

        console.log("task", task)
    }


    function handleSubmit(e: FormEvent) {
        console.log("eee", e)
        e.preventDefault()
    
        onSubmit({
          title: task.title,
          description: task.description,
          column: column,
          color: 'green.300'
        })
    }
  
    return (
      <>
        <Flex alignItems='center' flexDirection='column' bgColor="gray.100" cursor="pointer" m={4} p={2.5} 
        _hover={{
            background: "gray.200",
            color: "teal.500",
        }}>
            <AddIcon color="gray.500" onClick={onOpen}/>
        </Flex>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new task</ModalHeader>
            <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input name="title" value={task.title} onChange={(e)=> handleInputChange(e)} placeholder='title' />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea name="description" value={task.description} onChange={(e)=> handleInputChange(e)} placeholder='description'/>
                    </FormControl>
                </ModalBody>
  
            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default CreateTaskModal;


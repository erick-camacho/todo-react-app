import React, { useState } from 'react';
import { Flex, Spacer, ListItem, Text, Button, CloseButton, Divider } from '@chakra-ui/react';
import axios from 'axios';

const TaskItem = ({ task, getTasks, startEdit }) => {
  const [completed, setCompleted] = useState(task.completed)

  const deleteTask = async (e) => {
    try {
      await axios.delete('http://127.0.0.1:8000/api/tasks/' + task.id + '/');
      getTasks();
    } catch(error) {
      console.log(error)
    }
  }

  const handleClick = (e) => {
    setCompleted(!completed)
    putCompleted()
  }

  const putCompleted = async () => {
    try {
      await axios.put('http://127.0.0.1:8000/api/tasks/' + task.id + '/', {...task, completed});
      // getTasks();
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <ListItem px="2rem" py="1rem" cursor="pointer" _hover={{bgColor:"gray.200"}} >
        <Flex>
          <Text as={completed ? 's' : ''} onClick={handleClick} isTruncated>{task.title}</Text>
          <Spacer />
          <Button 
            variant="outline" 
            size="sm" 
            ml="2rem" mr="1rem" 
            colorScheme="cyan" 
            onClick={() => startEdit(task)}
          >
            Edit
          </Button>
          <CloseButton onClick={deleteTask} />
        </Flex>
      </ListItem>
      <Divider />
    </>
  )
}

export default TaskItem;

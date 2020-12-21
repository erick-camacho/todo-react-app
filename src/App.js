import React, { useState, useEffect } from 'react';
import { Box, Heading, Container } from '@chakra-ui/react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState({on: false, task: {}})

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks/')
      setTasks(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  const startEdit = (task) => {
    setEditMode({on: true, task})
  }

  const endEdit = () => {
    setEditMode({on: false, task: {}})
  }

  console.log(tasks)

  return (
    <>
      <Box p="3" bgColor="gray.800" boxShadow="lg" pos="fixed" w="100%" zIndex={2} top="0">
        <Heading size="md" color="white">TODO App</Heading>
      </Box>
      <Box bgColor="gray.100" h="100vh" pt="48px">
          <Container maxW="3xl" mt="2rem" p="0" bgColor="white">
            <TaskForm getTasks={getTasks} editMode={editMode} endEdit={endEdit} />
            <TaskList tasks={tasks} getTasks={getTasks} startEdit={startEdit} />
          </Container>
      </Box>
    </>
  )
}

export default App;


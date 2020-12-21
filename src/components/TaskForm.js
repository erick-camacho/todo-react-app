import React, { useState, useEffect } from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

const initialState = {
  title: ""
}

const TaskForm = ({ getTasks, editMode, endEdit }) => {
  const [task, setTask] = useState(initialState);
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    setTask({title: editMode.task.title})
  }, [editMode.task.title])

  const handleChange = (e) => {
    setTask({
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editMode.on) {
      await editTask()
      await endEdit()
    } else {
      await addTask()
    }
    await getTasks()
    setTask({title: ""})
  }

  const handleClick = (e) => {
    endEdit();
    setTask({title: ""});
  }

  const addTask = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/tasks/', task)
      setIsInvalid(false)
    } catch(error) {
      console.log(error)
      setIsInvalid(true)
    }
  }

  const editTask = async () => {
    try {
      await axios.put('http://127.0.0.1:8000/api/tasks/' + editMode.task.id + '/', task)
      setIsInvalid(false)
      // return response.data
    } catch(error) {
      console.log(error)
      setIsInvalid(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex p="2rem" boxShadow="md">
        <Input 
          onChange={handleChange}
          name="title" 
          value={task.title} 
          isInvalid={isInvalid}
          errorBorderColor="red.500"
          placeholder="Write a new task"
        />
        <Button type="submit" ml="4px" colorScheme="cyan" color="white">
          {editMode.on ? "Edit" : "Add"}
        </Button>
        {editMode.on && 
          <Button onClick={handleClick} ml="4px" colorScheme="orange" color="white">
            Cancel
          </Button>
        } 
      </Flex>
    </form>
  )
}

export default TaskForm;

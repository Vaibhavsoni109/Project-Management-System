import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../comonents/Loader";
import Title from "../comonents/Title";
import Button from "../comonents/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../comonents/Tabs";
import TaskTitle from "../comonents/TaskTitle";
import BoardView from "../comonents/BoardView";
import { tasks } from "../assets/data";
import Table from "../comonents/task/Table"
import AddTask from "../comonents/task/AddTask";
import { useGetAllTaskQuery } from "../redux/slices/taskApiSlice";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  inProgress: "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";
  const { data, isLoading } = useGetAllTaskQuery({
    strQuery: status,
    isTrashed: "",
    search: ""

  });

 

  return isLoading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE.inProgress}
            />
            <TaskTitle label='completed' className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className='w-full'>
          <Table tasks={data?.tasks}/>
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} task={tasks} />
    </div>
  );
};

export default Tasks;
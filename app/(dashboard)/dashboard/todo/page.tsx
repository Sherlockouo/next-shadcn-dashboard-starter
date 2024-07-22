import NewTaskDialog from '@/components/kanban/new-task-dialog';
import Todo from '@/components/todo/todo';
import { Heading } from '@/components/ui/heading';

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-start justify-between">
          <Heading title={`Kanban`} description="Manage tasks by dnd" />
          <NewTaskDialog />
        </div>
        <Todo />
      </div>
    </>
  );
}

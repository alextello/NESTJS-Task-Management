import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 1, username: 'USER' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  remove: jest.fn(),
});

describe('tasksService', () => {
  let tasksService;
  let taskRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    tasksService = await module.get(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });
  describe('getTasks', () => {
    it('Gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('some value');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'query',
      };
      // llamar tasksService.getTasks
      const result = await tasksService.getTasks(filters, mockUser);
      // Esperar que taskRepository.getTasks haya sido llamado
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('some value');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and succesffuly retrieve and return the task', async () => {
      const mockTask = { title: 'Test task', description: 'Test desc' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Create task', () => {
    it('create and returns the created task', async () => {
      const mockTask = { title: 'Test', description: 'Test desc' };
      taskRepository.createTask.mockResolvedValue(mockTask);
      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const result = await tasksService.createTask(mockTask, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        mockTask,
        mockUser,
      );
      expect(result).toEqual(mockTask);
    });
  });

  describe('Delete a task', () => {
    it('delete and returns deleted task', async () => {
      const mockTask = { title: 'title', description: 'description' };
      const remove = jest.fn().mockResolvedValue(mockTask);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        remove,
      });
      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      const result = await tasksService.deleteTask(1, mockUser);
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(remove).toHaveBeenCalled();
    });
  });

  describe('Update task status', () => {
    it('updates a task status', async () => {
      const save = jest.fn().mockResolvedValue(true);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        save,
      });
      expect(tasksService.getTaskById).not.toHaveBeenCalled();
      const result = await tasksService.updateTaskStatus(
        1,
        TaskStatus.DONE,
        mockUser,
      );
      expect(tasksService.getTaskById).toHaveBeenCalled();
      expect(save).toHaveBeenCalled();
    });
  });
});

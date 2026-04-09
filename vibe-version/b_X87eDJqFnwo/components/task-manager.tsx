"use client"

import { useState } from "react"
import { Check, Plus, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Task = {
  id: number
  title: string
  completed: boolean
}

type FilterStatus = "all" | "active" | "completed"

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [filter, setFilter] = useState<FilterStatus>("all")

  const addTask = () => {
    if (newTaskTitle.trim() === "") return

    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
  }

  const toggleTaskComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const activeCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.filter((task) => task.completed).length

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Task Manager</h1>
        <p className="text-muted-foreground">Keep track of your daily tasks</p>
      </div>

      {/* Add Task Form */}
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1"
        />
        <Button onClick={addTask} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg mb-6">
        {(["all", "active", "completed"] as FilterStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              filter === status
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-1.5 text-xs opacity-70">
              ({status === "all"
                ? tasks.length
                : status === "active"
                ? activeCount
                : completedCount})
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {filter === "all"
              ? "No tasks yet. Add one above!"
              : filter === "active"
              ? "No active tasks"
              : "No completed tasks"}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg border bg-card transition-all",
                task.completed && "opacity-60"
              )}
            >
              <button
                onClick={() => toggleTaskComplete(task.id)}
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                  task.completed
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/40 hover:border-primary"
                )}
              >
                {task.completed ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Circle className="h-3.5 w-3.5 opacity-0" />
                )}
              </button>
              <span
                className={cn(
                  "flex-1 text-foreground",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Footer Stats */}
      {tasks.length > 0 && (
        <div className="mt-6 pt-4 border-t text-center text-sm text-muted-foreground">
          {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
        </div>
      )}
    </div>
  )
}

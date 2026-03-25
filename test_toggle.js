const state = {
    tasks: [
        { id: '1', title: '🔥當日小任務', completed: false, repeat: 'none' }
    ],
    player: { attributes: {}, skills: [], exp: 0, gold: 0, level: 1, groups: [], tags: [], activities: [] }
};
const task = state.tasks[0];
task.completed = true;

const isDailyFocus = task.title && task.title.includes("🔥當日小任務");
if (((task.repeat && task.repeat !== 'none') || isDailyFocus) && !task.spawnedNext) {
    const repeatType = (task.repeat && task.repeat !== 'none') ? task.repeat : 'daily';
    
    let nextDueDate = new Date();
    if (task.dueDate) nextDueDate = new Date(task.dueDate);
    
    let nextStartDate = null;
    if (task.startDate) nextStartDate = new Date(task.startDate);

    if (repeatType === 'daily') {
        nextDueDate.setDate(nextDueDate.getDate() + 1);
        if (nextStartDate) nextStartDate.setDate(nextStartDate.getDate() + 1);
    }

    const clonedTask = JSON.parse(JSON.stringify(task));
    clonedTask.id = Date.now().toString();
    clonedTask.completed = false;
    clonedTask.spawnedNext = false;
    clonedTask.dueDate = nextDueDate.toISOString().split('T')[0];
    if (nextStartDate) clonedTask.startDate = nextStartDate.toISOString().split('T')[0];
    clonedTask.timeSpent = 0;

    task.spawnedNext = true;
    state.tasks.push(clonedTask);
}

const dailyTaskName = "🔥當日小任務";
let dailyTask = state.tasks.find(t => t.title.includes(dailyTaskName) && !t.completed);
if (!dailyTask) dailyTask = state.tasks.find(t => t.title.includes(dailyTaskName));

console.log("Tasks array length:", state.tasks.length);
console.log("Is original task completed?", state.tasks[0].completed);
console.log("Is cloned task completed?", state.tasks[1] ? state.tasks[1].completed : 'N/A');
console.log("Selected daily task:", dailyTask.id, "completed:", dailyTask.completed);


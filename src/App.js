import { useState } from "react";

const App = () => {
    const [context, setContext] = useState({
        tasks: [],
        input: undefined,
        editing: undefined,
    });

    const handleAddTask = (event) => {
        setContext((prev) => ({ ...prev, input: event.target.value }));
    };

    const handleDeleteTask = (event) => {
        event.preventDefault();
        const selectedIndex = event.currentTarget.dataset.index;

        console.log("delete", selectedIndex);
        setContext((prev) => {
            console.log("delete prev", context.tasks.splice(selectedIndex, 1));
            return {
                ...prev,
                tasks: context.tasks,
            };
        });
    };

    const handleEditTask = (event) => {
        event.preventDefault();
        const selectedIndex = event.currentTarget.dataset.index;
        setContext((prev) => ({
            tasks: [...prev.tasks],
            input: prev.tasks[selectedIndex],
            editing: selectedIndex,
        }));
    };

    const updateTasks = (tasks, index, value) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = value;
        return updatedTasks;
    };

    const handleStubmitTask = (event) => {
        event.preventDefault();
        console.log("submit", context.input, context.editing);
        context.input &&
            setContext((prev) => {
                return {
                    input: "",
                    tasks: prev.editing
                        ? updateTasks(prev.tasks, prev.editing, context.input)
                        : [...prev.tasks, context.input],
                    editing: undefined,
                };
            });
    };

    return (
        <main className='main'>
            <form onSubmit={handleStubmitTask} className='card'>
                <header className='card__header'>
                    <input
                        type='text'
                        className='card__header__input'
                        placeholder='Add a todo'
                        aria-label='todo add input'
                        value={context.input}
                        onChange={handleAddTask}
                    />
                </header>

                <div className='card__body'>
                    {context.tasks.length < 1 && (
                        <div role='alert' className='alert alert--danger'>
                            Todo list is empty
                        </div>
                    )}
                    <ul className='card__body__list' aria-label='todo list'>
                        {context.tasks.map((task, index) => (
                            <li key={index} class='card__body__list__item'>
                                <input
                                    type='checkbox'
                                    class='card__body__list__item__checkbox'
                                    aria-label='complete task'
                                />
                                <span class='card__body__list__item__checkbox__indicator'>
                                    <span class='card__body__list__item__checkbox__indicator__icons'></span>
                                </span>
                                <span class='card__body__list__item__text'>
                                    <span class='card__body__list__item__text__inner'>
                                        {task}
                                    </span>
                                </span>
                                <div class='card__body__list__item__btn-group'>
                                    <button
                                        data-index={index}
                                        type='button'
                                        class='card__body__list__item__btn card__body__list__item__btn--edit'
                                        aria-label='edit button'
                                        onClick={handleEditTask}
                                    >
                                        <i class='bi bi-pencil-square'></i>
                                    </button>
                                    <button
                                        data-index={index}
                                        type='button'
                                        class='card__body__list__item__btn card__body__list__item__btn--delete'
                                        aria-label='delete button'
                                        // onClick={handleDeleteTask}
                                    >
                                        <i class='bi bi-trash3'></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <footer className='card__footer'>
                    <button
                        type='submit'
                        className='card__footer__btn card__footer__btn--add'
                        aria-label='add button'
                    >
                        <i className='bi bi-plus-lg'></i>
                        <span className='card__footer__btn__text'>Add</span>
                    </button>
                    <button
                        type='button'
                        className='card__footer__btn card__footer__btn--update hidden'
                        aria-label='update button'
                    >
                        <i className='bi bi-send-check'></i>
                        <span className='card__footer__btn__text'>Update</span>
                    </button>
                </footer>
            </form>
        </main>
    );
};

export default App;

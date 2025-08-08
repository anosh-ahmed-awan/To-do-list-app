document.addEventListener('DOMContentLoaded', () => {
    const taskinput = document.getElementById('task-input');
    const taskaddbtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyimage = document.querySelector('.emptyimage');

    const toggleEmptyState = () => {
        emptyimage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    };

    const addtask = (event) => {
        event.preventDefault();
        const tasktext = taskinput.value.trim();
        if (!tasktext) return;
        const li = document.createElement('li');
        li.innerHTML = `
  <div class="task-box">
    <div class="task-left">
      <input type="checkbox" class="checkbox">
      <span class="task-text">${tasktext}</span>
    </div>
    <div class="task-buttons">
      <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
      <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>

  </div>
`;
        const checkbox = li.querySelector('.checkbox');
        const editbtn = li.querySelector('.edit-btn');
        const deletebtn = li.querySelector('.delete-btn');


        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;

            li.classList.toggle('completed', isChecked);


            editbtn.disabled = isChecked;
            editbtn.style.opacity = isChecked ? '0.5' : '1';
            editbtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        });


        editbtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskinput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
            }
        });


        deletebtn.addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });


        taskList.appendChild(li);
        taskinput.value = '';
        toggleEmptyState();
    };

    taskaddbtn.addEventListener('click', addtask);

    taskinput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addtask(e);
        }
    });
});
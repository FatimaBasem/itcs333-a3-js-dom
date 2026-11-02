
document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('todo-form');
    let input = document.getElementById('todo-input');
    let errorMsg = document.getElementById('error-msg');
    let list = document.getElementById('todo-list');
    let counter = document.getElementById('counter');

    let filterAll = document.getElementById('filter-all');
    let filterActive = document.getElementById('filter-active');
    let filterDone = document.getElementById('filter-done');

    let currentFilter = 'all'; // all, active or done

    function updateCounter() {
        let items = list.querySelectorAll('li');
        let left = 0;
        for (let li of items) {
            if (!li.classList.contains('completed')) {
                left++;
            }
        }
        if (left == 1) {
            counter.textContent = left + ' item left';
        } else {
            counter.textContent = left + ' items left';
        }
    }

    function applyFilter() {
        let items = list.querySelectorAll('li');
        for (let li of items) {
            let done = li.classList.contains('completed');
            let show = true;

            if (currentFilter == 'active') {
                show = !done;
            } else if (currentFilter == 'done') {
                show = done;
            }

            if (show) {
                li.classList.remove('hidden');
                li.style.display = '';
            } else {
                li.classList.add('hidden');
                li.style.display = 'none';
            }
        }
    }

    // called after every change
    function refresh() {
        applyFilter();
        updateCounter();
    }

    function addItem(e) {
        e.preventDefault();

        let text = input.value.trim();

        if (text == '') {
            errorMsg.classList.remove('hidden');
            errorMsg.style.display = '';
            return;
        }
        errorMsg.classList.add('hidden');
        errorMsg.style.display = 'none';

        let li = document.createElement('li');

        let span = document.createElement('span');
        span.textContent = text;

        let btn = document.createElement('button');
        btn.className = 'delete-btn';
        btn.textContent = 'x';

        li.appendChild(span);
        li.appendChild(btn);
        list.appendChild(li);

        input.value = '';
        refresh();
    }

    // one listener for the whole list (event delegation)
    function handleListClick(e) {
        let target = e.target;
        let li = null;

        if (target.classList.contains('delete-btn')) {
            list.removeChild(target.parentNode);
        } else if (target.tagName == 'LI') {
            li = target;
        } else if (target.tagName == 'SPAN') {
            li = target.parentNode;
        }

        if (li != null) {
            li.classList.toggle('completed');
        }
        refresh();
    }

    function showAll() { currentFilter = 'all'; refresh(); }
    function showActive() { currentFilter = 'active'; refresh(); }
    function showDone() { currentFilter = 'done'; refresh(); }

    form.addEventListener('submit', addItem);
    list.addEventListener('click', handleListClick);
    filterAll.addEventListener('click', showAll);
    filterActive.addEventListener('click', showActive);
    filterDone.addEventListener('click', showDone);

    errorMsg.style.display = 'none';
    refresh();
});
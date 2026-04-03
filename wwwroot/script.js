var clientTimeHint = 'This comes from your browser using JavaScript\'s new Date() function.';
var serverTimeHint = 'This comes from the C# server using DateTime.Now, fetched with fetch().';
var greetingHint = 'This text is stored in a variable in Program.cs and got here via GET /api/greeting.';

document.addEventListener('DOMContentLoaded', async function () {
    await loadSharedHeader();
    showCurrentDate();
    loadServerTime();
    showDaysLeft();
    setActiveNavLink();
    loadGreetingMessage();
    loadMessages();
    addHoverTooltips();
});


function loadSharedHeader() {
    var placeForHeader = document.getElementById('shared-header');
    if (!placeForHeader) {
        return Promise.resolve();
    }

    return fetch('/header.html')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Header load failed');
            }
            return response.text();
        })
        .then(function (html) {
            placeForHeader.innerHTML = html;
        });
}

function showCurrentDate() {
    const dateElement = document.getElementById('current-date');

    if (!dateElement) {
        return;
    }

    const today = new Date();
    const dateString = today.toLocaleDateString('en-GB');
    const timeString = today.toLocaleTimeString('en-GB');
    dateElement.textContent = dateString + ' ' + timeString;
}

function loadServerTime() {
    const serverDateElement = document.getElementById('server-date');

    if (!serverDateElement) {
        return;
    }

    fetch('/api/current-time')
        .then(function (response) { 
            return response.text();
        })
        .then(function (text2) {
            serverDateElement.textContent = text2;
        })
        .catch(function () {
            serverDateElement.textContent = 'Could not load server time';
        });
}

function showDaysLeft() {
    const daysLeftElement = document.getElementById('days-left');

    if (!daysLeftElement) {
        return;
    }

    const today = new Date();
    const deadline = new Date(2026, 6, 24);
    const oneDay = 1000 * 60 * 60 * 24;
    const timeDifference = deadline - today;
    const daysLeft = Math.ceil(timeDifference / oneDay);

    if (daysLeft > 0) {
        daysLeftElement.textContent = '(' + daysLeft + ' days left)';
    } else if (daysLeft === 0) {
        daysLeftElement.textContent = '(due today)';
    } else {
        daysLeftElement.textContent = '(deadline passed)';
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav a');

    links.forEach(function (link) {
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

function loadGreetingMessage() {
    const greetingTarget = document.getElementById('greeting-message');

    if (!greetingTarget) {
        return;
    }

    fetch('/api/greeting')
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            greetingTarget.textContent = text;
        })
        .catch(function () {
            greetingTarget.textContent = 'Could not load greeting';
        });
}

function addHoverTooltips() {
    var currentPage = window.location.pathname.split('/').pop() || 'examples.html';
    console.log(currentPage);
    if (currentPage !== 'examples.html') {
        return;
    }

    // no need for if checks on each row now
    document.getElementById('client-time-row').addEventListener('mouseenter', function () {
        document.getElementById('client-time-hover').textContent = clientTimeHint;
    });
    document.getElementById('client-time-row').addEventListener('mouseleave', function () {
        document.getElementById('client-time-hover').textContent = '';
    });

    document.getElementById('server-time-row').addEventListener('mouseenter', function () {
        document.getElementById('server-time-hover').textContent = serverTimeHint;
    });
    document.getElementById('server-time-row').addEventListener('mouseleave', function () {
        document.getElementById('server-time-hover').textContent = '';
    });

    document.getElementById('greeting-row').addEventListener('mouseenter', function () {
        document.getElementById('greeting-hover').textContent = greetingHint;
    });
    document.getElementById('greeting-row').addEventListener('mouseleave', function () {
        document.getElementById('greeting-hover').textContent = '';
    });
}

function loadMessages() {
    const messageBoard = document.getElementById('message-board');

    if (!messageBoard) {
        return;
    }

    fetch('/api/message')
        .then(function (response) {
            return response.text();
        })
        .then(function (messages) {
            messageBoard.value = messages;
            messageBoard.scrollTop = messageBoard.scrollHeight;
        })
        .catch(function () {
            messageBoard.value = 'Could not load messages';
        });
}

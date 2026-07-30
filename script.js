// INTERFACE

// Time
function updateTime() {
            var timeText = document.querySelector("#timeElement");
            timeText.innerHTML = new Date().toLocaleString();
        }
setInterval(updateTime, 1000);//Dragging Logic

function dragElement(element) {
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;

    if (document.getElementById(element.id + "header")) {
        document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        element.classList.add("dragging");
        document.onmouseup = stopDragging;
        document.onmousemove = moveElement;
    }

    function moveElement(e) {
            e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
        element.classList.remove("dragging");
    }
}

//Initialize Window

function createWindow(element, defaultTop, defaultLeft) {
    var screen = document.querySelector("#" + element);
    var screenclose = document.querySelector("#"+element+"close");
    var screenopen = document.querySelector("#"+element+"open");
    
    screenclose.addEventListener("click", function() {
        closeWindow(screen);
    });
    screenopen.addEventListener("click", function() {
        openWindow(screen, defaultTop, defaultLeft)
    });
    if (screen) {
        addWindowTapHandling(screen);
        dragElement(screen);
    }
}


// INTERACTION

// Open and Close Windows Logic

var biggestIndex = 1;
var taskBar = document.querySelector("#taskbar");

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element, top, left) {
    element.style.display = "block" 
    element.style.top = top;
    element.style.left = left;
    biggestIndex++; 
    element.style.zIndex = biggestIndex;
    taskBar.style.zIndex = biggestIndex + 1;
}

// Open Apps

var selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconTap(element, targetWindow) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(targetWindow)
    } else {
        if (selectedIcon) deselectIcon(selectedIcon);
        selectIcon(element)
    }
}

// Tab Layering

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    taskBar.style.zIndex = biggestIndex + 1;
    if (selectedIcon) {
        deselectIcon(selectedIcon);
    }
}

var appIcon = document.querySelector("#desktopApps");
if (appIcon && projectsScreen) {
    appIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        handleIconTap(appIcon, projectsScreen);
    });
}

document.addEventListener("click", function() {
    if (selectedIcon) deselectIcon(selectedIcon);
});


// APPS

createWindow("welcome", "25%", "20%");
createWindow("projects", "30%", "20%");
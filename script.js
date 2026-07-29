//Dragging Logic

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
    }
}

// Time
function updateTime() {
            var timeText = document.querySelector("#timeElement");
            timeText.innerHTML = new Date().toLocaleString();
        }
setInterval(updateTime, 1000);

//Drag Apps
dragElement(document.getElementById("#welcome"));
dragElement(document.getElementById("#projects"))

// Open and Close Windows

function closeWindow(element) {
    element.style.display = "none"
}

function openWindow(element) {
    element.style.display = "flex" //try block instead later
    biggestIndex++; 
    element.style.zIndex = biggestIndex;
    taskBar.style.zIndex = biggestIndex + 1;
}

var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

var projectsScreen = document.querySelector("#projects");
var projectsScreenClose = document.querySelector("#projectsclose");
var projectsScreenOpen = document.querySelector("#projectsopen");

projectsScreenClose.addEventListener("click", function() {
    closeWindow(projectsScreen);
});
projectsScreenOpen.addEventListener("click", function() {
    openWindow(projectsScreen);
});


//Open Apps

var selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element)
        openWindow(window)
    } else {
        selectIcon(element)
    }
}

// Rise Up

var biggestIndex = 1;
var taskBar = document.querySelector("#taskbar");

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    taskBar.style.zIndex = biggestIndex + 1;
    deselectIcon(selectedIcon)
}

//Initialize Window

function createWindow(element) {
    var screen = document.querySelector("#" + element);
    addWindowTapHandling(screen);
    dragElement(screen);
}
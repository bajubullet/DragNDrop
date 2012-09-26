var dragSrcEl = null;
var dragCol = null;

function handleDragStart(e) {
    this.style.opacity = '0.4'; // this / e.target is the source node.

    dragSrcEl = this;
    dragCol = $(this).parent();

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', $(this).html());
}

function handleDragOver(e) {
    if(e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over'); // Adds the dotted border.
}

function handleDragLeave(e) {
    this.classList.remove('over')
}

function handleDrop(e) {
    if(e.stopPropagation) {
        e.stopPropagation();
    }
    if($(dragCol).html() != $(this).html()) {
        $(this).append(dragSrcEl);
    }
    return false;
}

function handleDragEnd(e) {
    [].forEach.call(columns, function(col) {
        col.classList.remove('over');
    });
    [].forEach.call(issues, function(issue) {
        issue.style.opacity = '1';
    });
}

var issues = document.querySelectorAll('.issue');
var columns = document.querySelectorAll('.columns');

[].forEach.call(issues, function(issue) {
    issue.addEventListener('dragstart', handleDragStart, false);
    issue.addEventListener('dragend', handleDragEnd, false);
});

[].forEach.call(columns, function(column) {
    column.addEventListener('dragenter', handleDragEnter, false);
    column.addEventListener('dragover', handleDragOver, false);
    column.addEventListener('dragleave', handleDragLeave, false);
    column.addEventListener('dragleave', handleDragLeave, false);
    column.addEventListener('drop', handleDrop, false);
});
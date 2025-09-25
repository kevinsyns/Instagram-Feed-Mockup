function addPost() {
    const feed = document.getElementById('feed');
    const imageFile = document.getElementById('image-file').files[0];

    if (imageFile) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const newPost = document.createElement('div');
            const newImage = document.createElement('img');
            newImage.src = event.target.result;
            newPost.appendChild(newImage);
            newPost.draggable = true;
            newPost.addEventListener('dragstart', dragStart);
            newPost.addEventListener('dragover', dragOver);
            newPost.addEventListener('drop', drop);
            feed.appendChild(newPost);
        };

        reader.readAsDataURL(imageFile);

        // Limpiar el campo de entrada
        document.getElementById('image-file').value = '';
    } else {
        alert('Please select an image file');
    }
}

let dragged;

function dragStart(event) {
    dragged = event.target;
    event.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
        event.target.style.visibility = 'hidden';
    }, 0);
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
    event.preventDefault();
    if (event.target !== dragged) {
        dragged.style.visibility = 'visible';
        const feed = document.getElementById('feed');
        const nodes = Array.from(feed.children);
        const draggedIndex = nodes.indexOf(dragged.parentNode);
        const targetIndex = nodes.indexOf(event.target.parentNode);
        
        if (draggedIndex < targetIndex) {
            feed.insertBefore(dragged.parentNode, event.target.parentNode.nextSibling);
        } else {
            feed.insertBefore(dragged.parentNode, event.target.parentNode);
        }
    }
}

document.addEventListener('dragend', (event) => {
    event.target.style.visibility = 'visible';
});

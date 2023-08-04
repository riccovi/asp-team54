
var editor;
var previewFrame;
var preview;


window.onload = function() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
    
    var code = atob(document.getElementById('projectCode').textContent);
    editor.setValue(code);

    previewFrame = document.getElementById('preview');
    preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    
    var p5Script = preview.createElement('script');
    p5Script.src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js";

    p5Script.onload = function() {
        runCode(code);
        editor.session.on('change', function(delta) {
            var newCode = editor.getValue();
            runCode(newCode);
        });
    }

    preview.head.appendChild(p5Script);

    var deleteButton = document.getElementById('deleteButton');
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            fetch('/project/' + document.getElementById('projectId').textContent, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/profile';
                } else {
                    console.error('Deletion failed');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
};

function runCode(code) {
    var userCodeScript = preview.createElement('script');
    userCodeScript.textContent = code;
    preview.body.appendChild(userCodeScript);
}


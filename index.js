(function(console){

console.save = function(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'Untitled.obj'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/obj'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/obj', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }
})(console)

let filecontent = "";

document.forms["fileIn"].elements['myfile'].onchange = function(evt) {
    if(!window.FileReader) return; // Browser is not compatible

    var reader = new FileReader();

    reader.onload = function(evt) {
        if(evt.target.readyState != 2) return;
        if(evt.target.error) {
            alert('Error while reading file');
            return;
        }

        filecontent = evt.target.result;

    };

    reader.readAsText(evt.target.files[0]);
};


function load(){

	document.getElementById("text").value = filecontent; 
	document.getElementById("filename").value = document.forms[0].elements.myfile.files[0].name;

}

function save() {

	console.save(document.getElementById("text").value,document.getElementById("filename").value)

}

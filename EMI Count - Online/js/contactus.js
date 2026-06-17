const form = document.getElementById('form');

form.addEventListener('submit', event => {

    event.preventDefault();

    document.getElementById("statusMsg").style.display = 'block';
    document.getElementById("statusMsg").style.backgroundColor = 'var(--primary-color)';
    document.getElementById("statusMsg").innerText = `Please Wait...`;

    const formData = new FormData(form);
    form.reset()

    fetch('php/contact.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById("statusMsg").innerText = data;
        })
        .catch(error => {
            document.getElementById("statusMsg").innerText = error;
            document.getElementById("statusMsg").style.backgroundColor = 'red';
        })

});
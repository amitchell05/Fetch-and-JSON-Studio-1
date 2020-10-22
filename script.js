window.addEventListener('load', function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) { 
        response.json().then( function(json) {
            console.log(json);
            const container = document.querySelector('#container');

            json = sortAstronauts(json);

            container.innerHTML += `
                <h4>Number of Astronauts: ${json.length}</h4>
            `;

            for (let i = 0; i < json.length; i++) {
                let activeStat = setActiveStyle(json[i]);

                container.innerHTML += `
                    <div class="astronaut">
                        <div class="bio">
                            <h3>${json[i].firstName} ${json[i].lastName}</h3>
                            <ul>
                                <li>Hours in space: ${json[i].hoursInSpace}</li>
                                ${activeStat}
                                <li>Skills: ${json[i].skills.join(', ')}</li>
                            </ul>
                        </div>
                        <img class="avatar" src="${json[i].picture}">
                    </div>
                `;
            }
        });
    });
});

function sortAstronauts(data) {
    data.sort((a,b) => (a.hoursInSpace > b.hoursInSpace) ? 1 : -1);
    return data;
}

function setActiveStyle(data) {
    let text = '';
    if (data.active === true) {
        text = `<li style="color: green">Active: ${data.active}</li>`;
    } else {
        text  = `<li>Active: ${data.active}</li>`
    }

    return text;
}
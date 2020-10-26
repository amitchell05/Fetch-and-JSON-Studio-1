window.addEventListener('load', function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) { 
        response.json().then( function(json) {
            console.log(json);
            const container = document.getElementById('container');

            let astronauts = '';

            json = sortAstronauts(json);

            container.innerHTML += `
                <h4>Number of Astronauts: ${json.length}</h4>
            `;
            
            for (astronaut of json) {
                let activeStat = setActiveStyle(astronaut);
                astronauts += `
                    <div class="astronaut">
                        <div class="bio">
                            <h3>${astronaut.firstName} ${astronaut.lastName}</h3>
                            <ul>
                                <li>Hours in space: ${astronaut.hoursInSpace}</li>
                                <li>Active: ${activeStat}</li>
                                <li>Skills: ${astronaut.skills}</li>
                            </ul>
                        </div>
                        <img class="avatar" src="${astronaut.picture}">
                    </div>
                `;
            }
            
            container.innerHTML += astronauts;
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
        text  = `<li>Active: ${data.active}</li>`;
    }

    return text;
}
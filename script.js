window.addEventListener('load', function() {
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) { 
        response.json().then( function(json) {
            console.log(json);
            const container = document.querySelector('#container');

            json = sortAstronauts(json);

            for (let i = 0; i < json.length; i++) {
                container.innerHTML += `
                    <div class="astronaut">
                        <div class="bio">
                            <h3>${json[i].firstName} ${json[i].lastName}</h3>
                            <ul>
                                <li>Hours in space: ${json[i].hoursInSpace}</li>
                                <li id="active">Active: ${json[i].active}</li>
                                <li>Skills: ${json[i].skills.join(', ')}</li>
                            </ul>
                        </div>
                        <img class="avatar" src="${json[i].picture}">
                    </div>
                `;
            }

            for (let i = 0; i < json.length; i++) {
                let activeStatus = document.getElementById("active");
                if (json[i].active === true) {
                    activeStatus.style.color = 'green';
                    console.log(json[i].active);
                }
            }
        });
    });
});

function sortAstronauts(data) {
    data.sort((a,b) => (a.hoursInSpace > b.hoursInSpace) ? 1 : -1);
    return data;
}
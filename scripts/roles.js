const getJSON = async url => 
{
    const response = await fetch(url);
    if(!response.ok) // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);
  
    const data = response.json(); // get JSON from the response
    return data; // returns a promise, which resolves to this data value
}  

window.onload = init;

function init()
{ 
    async function main()
    {
        getJSON("data/match_data.json").then(data => {
            // Select the team-holder div
            const teamHolderT1 = document.querySelector(".team-holder-one");
            const teamHolderT2 = document.querySelector(".team-holder-two");

            const existingPlayersT1 = teamHolderT1.children.length;
            const existingPlayersT2 = teamHolderT2.children.length;
        
            // Remove excess players if there are more than needed
            while(teamHolderT1.children.length > data.team1.length) {
                teamHolderT1.removeChild(teamHolderT1.lastChild);
            }
            while(teamHolderT2.children.length > data.team2.length) {
                teamHolderT2.removeChild(teamHolderT2.lastChild);
            }

            // Team 1 setup
            for(let i = 0; i < data.team1.length; i++)
            {
                let role, playerName, nameHolder, roleHolder, playerHolder;

                // Only add player if we need more
                if (i >= existingPlayersT1){
                    // Create holder divs
                    playerHolder = document.createElement("div");
                    nameHolder = document.createElement("div");
                    roleHolder = document.createElement("div");
                    playerHolder.classList.add("player-holder");
                    nameHolder.classList.add("name-holder");
                    roleHolder.classList.add("role-holder");

                    role = document.createElement("img");
                    role.classList.add("role-image");
                    role.id = `role${i+1}-image`;
                    role.src = `images/${data.game}/${data.team1[i].role}.png`;

                    // Create player name paragraph
                    playerName = document.createElement("p");
                    playerName.classList.add("p-name");
                    playerName.id = `p${i+1}-name`;
                    playerName.textContent = data.team1[i].name;

                    // Append to holders
                    nameHolder.appendChild(playerName);
                    roleHolder.appendChild(role);
                    playerHolder.appendChild(nameHolder);
                    playerHolder.appendChild(roleHolder);
                    teamHolderT1.appendChild(playerHolder);   
                }
                else{
                    // If not set the correct elements
                    playerHolder = teamHolderT1.children[i];
                    role = playerHolder.querySelector(".role-image");
                    playerName = playerHolder.querySelector(".p-name");
                }

                playerName.textContent = data.team1[i].name;
                role.src = `images/${data.game}/${data.team1[i].role}.png`;
            }

            // Team 2 setup
            for(let i = 0; i < data.team2.length; i++)
            {
                let role, playerName, nameHolder, roleHolder, playerHolder;

                // Only add player if we need more
                if (i >= existingPlayersT2){
                    // Create holder divs
                    playerHolder = document.createElement("div");
                    roleHolder = document.createElement("div");
                    nameHolder = document.createElement("div");
                    playerHolder.classList.add("player-holder");
                    roleHolder.classList.add("role-holder");
                    nameHolder.classList.add("name-holder");

                    role = document.createElement("img");
                    role.classList.add("role-image");
                    role.id = `role${i+1}-image`;
                    role.src = `images/${data.game}/${data.team2[i].role}.png`;

                    // Create player name paragraph
                    playerName = document.createElement("p");
                    playerName.classList.add("p-name");
                    playerName.id = `p${i+1}-name`;
                    playerName.textContent = data.team2[i].name;

                    // Append to holders
                    nameHolder.appendChild(playerName);
                    roleHolder.appendChild(role)
                    playerHolder.appendChild(roleHolder);
                    playerHolder.appendChild(nameHolder);
                    teamHolderT2.appendChild(playerHolder);   
                }
                else{
                    // If not set the correct elements
                    playerHolder = teamHolderT2.children[i];
                    role = playerHolder.querySelector(".role-image");
                    playerName = playerHolder.querySelector(".p-name");
                }

                playerName.textContent = data.team2[i].name;
                role.src = `images/${data.game}/${data.team2[i].role}.png`;
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
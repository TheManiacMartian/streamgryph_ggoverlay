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
    let team2Chars = [];
    
    async function main()
    {
        getJSON("data/match_data.json").then(data => {
            // Select the team-holder div
            const teamHolder = document.querySelector(".team-holder");
            const existingPlayers = teamHolder.children.length;
        
            // Remove excess players if there are more than needed
            while(teamHolder.children.length > data.team2.length) {
                teamHolder.removeChild(teamHolder.lastChild);
            }

            for(let i = 0; i < data.team2.length; i++)
            {
                let img, playerName, charHolder, nameHolder, playerHolder;

                // Only add player if we need more
                if (i >= existingPlayers){
                    // Create holder divs
                    playerHolder = document.createElement("div");
                    charHolder = document.createElement("div");
                    nameHolder = document.createElement("div");
                    playerHolder.classList.add("player-holder");
                    charHolder.classList.add("char-holder");
                    nameHolder.classList.add("name-holder");

                    // Create image element
                    img = document.createElement("img");
                    img.classList.add("p-char");
                    img.id = `p${i+1}-char`;
                    img.src = `images/${data.game}/${data.team2[i].character}.png`;

                    // Create player name paragraph
                    playerName = document.createElement("p");
                    playerName.classList.add("p-name");
                    playerName.id = `p${i+1}-name`;
                    playerName.textContent = data.team2[i].name;

                    // Append to holders
                    charHolder.appendChild(img);
                    nameHolder.appendChild(playerName);
                    playerHolder.appendChild(charHolder);
                    playerHolder.appendChild(nameHolder);
                    teamHolder.appendChild(playerHolder);   
                }
                else{
                    // If not set the correct elements

                    playerHolder = teamHolder.children[i];
                    img = playerHolder.querySelector(".p-char");
                    playerName = playerHolder.querySelector(".p-name");
                }

                playerName.textContent = data.team2[i].name;
                img.src = `images/${data.game}/${data.team2[i].character}.png`;
                
                if(team2Chars[i] != data.team2[i].character)
                {
                    gsap.fromTo(`#p${i+1}-char`,
                        {
                            opacity: "0", right:"900px", ease: "power2.out", duration: 4
                        },
                        {
                            opacity: "1", right:"700px", ease: "power2.out", duration: 0.5
                        }
                    )
                }

                team2Chars[i] = data.team2[i].character;
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
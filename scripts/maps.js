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
    let mapPickChars = [];
    
    async function main()
    {
        getJSON("data/match_data.json").then(data => {
            // Select the map-holdser div
            const mapsHolder = document.querySelector(".maps-holder");
            const chosenMaps = mapsHolder.children.length;
        
            // Remove excess maps if there are more than needed
            while(mapsHolder.children.length > data.mapPick.length) {
                mapsHolder.removeChild(mapsHolder.lastChild);
            }

            for(let i = 0; i < data.mapPick.length; i++)
            {
                let img, mapName, charHolder, nameHolder, mapHolder;

                // Only add maps if we need more
                if (i >= chosenMaps){
                    // Create holder divs
                    mapHolder = document.createElement("div");
                    charHolder = document.createElement("div");
                    nameHolder = document.createElement("div");
                    mapHolder.classList.add("map-holder");
                    charHolder.classList.add("char-holder");
                    nameHolder.classList.add("name-holder");

                    // Create image element
                    img = document.createElement("img");
                    img.classList.add("p-char");
                    img.id = `m${i+1}-char`;
                    img.src = `images/Maps/${data.game}/${data.mapPick[i]}.png`;

                    // Create map name paragraph
                    mapName = document.createElement("p");
                    mapName.classList.add("p-name");
                    mapName.id = `m${i+1}-name`;
                    mapName.textContent = data.mapPick[i];

                    // Append to holders
                    charHolder.appendChild(img);
                    nameHolder.appendChild(mapName);
                    mapHolder.appendChild(charHolder);
                    mapHolder.appendChild(nameHolder);
                    mapsHolder.appendChild(mapHolder);   
                }
                else{
                    // If not set the correct elements

                    mapHolder = mapsHolder.children[i];
                    img = mapHolder.querySelector(".p-char");
                    mapName = mapHolder.querySelector(".p-name");
                }

                mapName.textContent = data.mapPick[i];
                img.src = `images/Maps/${data.game}/${data.mapPick[i]}.png`;
                
                if(mapPickChars[i] != data.mapPick[i])
                {
                    gsap.fromTo(`#m${i+1}-char`,
                        {
                            opacity: "0", right:"900px", ease: "power2.out", duration: 4
                        },
                        {
                            opacity: "1", right:"700px", ease: "power2.out", duration: 0.5
                        }
                    )
                }

                mapPickChars[i] = data.mapPick[i];
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
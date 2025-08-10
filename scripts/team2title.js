const getJSON = async url => 
{
    const response = await fetch(url);
    if(!response.ok) // check if response worked (no 404 errors etc...)
      throw new Error(response.statusText);
  
    const data = response.json(); // get JSON from the response
    return data; // returns a promise, which resolves to this data value
}  

window.onload = init;

function setImageIfExists(elementId, imagePath) {
    const testImage = new Image();
    testImage.onload = function () {
        document.getElementById(elementId).src = imagePath;
    };
    testImage.onerror = function () {
        console.warn(`Image not found: ${imagePath}`);
        document.getElementById(elementId).src = 'images/Team/Unknown.png';
    };
    testImage.src = imagePath;
}

function init()
{
    teamLogos = []
    async function main()
    {
        getJSON("data/match_data.json").then(data => {

            if(teamLogos[0] != data.team2Name)
            {
                gsap.fromTo(`#team2Logo`,
                    {
                        opacity: "0", right:"50px", ease: "power2.out", duration: 4
                    },
                    {
                        opacity: "1", right:"0px", ease: "power2.out", duration: 0.5
                    }
                )
            }

            document.getElementById('team2Name').textContent=data.team2Name;
            setImageIfExists('team2Logo', `images/Team/${data.team2Name}.png`);

            teamLogos[0] = data.team2Name;
            
        }).catch(error => {
            console.error(error);
        });
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
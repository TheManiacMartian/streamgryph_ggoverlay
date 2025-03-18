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
            switch (data.game)
            {
                case "Valorant":
                    document.getElementById('gameBackground').classList.add('bg-game-val');
                    document.getElementById('gameBackground').classList.remove('bg-game-mr');
                    document.getElementById('gameBackground').classList.remove('bg-game-ow');
                    break;
                case "Overwatch":
                    document.getElementById('gameBackground').classList.remove('bg-game-val');
                    document.getElementById('gameBackground').classList.remove('bg-game-mr');
                    document.getElementById('gameBackground').classList.add('bg-game-ow');
                    break;
                case "Marvel Rivals":
                    document.getElementById('gameBackground').classList.remove('bg-game-val');
                    document.getElementById('gameBackground').classList.add('bg-game-mr');
                    document.getElementById('gameBackground').classList.remove('bg-game-ow');
                    break;
            }

        }).catch(error => {
            console.error(error);
        });
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
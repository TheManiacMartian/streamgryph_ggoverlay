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
    let team1Chars = [];
    
    async function main()
    {
        getJSON("data/match_data.json").then(data => {
            for(let i = 0; i < data.team1.length; i++)
            {

                document.getElementById(`p${i+1}-name`).textContent=data.team1[i].name;
                document.getElementById(`p${i+1}-char`).src=`images/${data.game}/${data.team1[i].character}.png`;
                
                if(team1Chars[i] != data.team1[i].character)
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

                

                team1Chars[i] = data.team1[i].character;
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
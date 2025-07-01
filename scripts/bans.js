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
    let bans = [];
    
    async function main()
    {
        getJSON("data/match_data.json").then(data => {
            for(let i = 0; i < data.banPick.length; i++)
            {
                document.getElementById(`p${i+1}-char`).src=`images/NoChar.png`;
                document.getElementById(`p${i+1}-char`).src=`images/${data.game}/${data.banPick[i]}.png`;
                
                if(bans[i] != data.banPick[i])
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

                

                bans[i] = data.banPick[i];
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
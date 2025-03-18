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
    let teamLogos = [];

    async function main()
    {
        
        getJSON("data/match_data.json").then(data => {
            if(teamLogos[0] != data.team1Name)
            {
                gsap.fromTo(`#team1Logo`,
                    {
                        opacity: "0", right:"50px", ease: "power2.out", duration: 4
                    },
                    {
                        opacity: "1", right:"0px", ease: "power2.out", duration: 0.5
                    }
                )

                gsap.fromTo(`#team1Name`,
                    {
                        opacity: "0", right:"50px", ease: "power2.out", duration: 4
                    },
                    {
                        opacity: "1", right:"0px", ease: "power2.out", duration: 0.5
                    }
                )
            }

            if(teamLogos[1] != data.team2Name)
            {
                gsap.fromTo(`#team2Logo`,
                    {
                        opacity: "0", left:"50px", ease: "power2.out", duration: 4
                    },
                    {
                        opacity: "1", left:"0px", ease: "power2.out", duration: 0.5
                    }
                )

                gsap.fromTo(`#team2Name`,
                    {
                        opacity: "0", left:"50px", ease: "power2.out", duration: 4
                    },
                    {
                        opacity: "1", left:"0px", ease: "power2.out", duration: 0.5
                    }
                )
            }

            document.getElementById('score1').textContent=data.score1;
            document.getElementById('team1Name').textContent=data.team1Name;
            document.getElementById('team1Logo').src=`images/Team/${data.team1Name}.png`;
            document.getElementById('score2').textContent=data.score2;
            document.getElementById('team2Name').textContent=data.team2Name;
            document.getElementById('team2Logo').src=`images/Team/${data.team2Name}.png`;

            teamLogos[0] = data.team1Name;
            teamLogos[1] = data.team2Name;
        }).catch(error => {
            console.error(error);
        });

        
    }

    main();
    setInterval(() => { main();}, 500); // interval update
}
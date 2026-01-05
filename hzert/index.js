async function getData(){
    try {
        const response = await fetch("https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/champion.json");
        if (response.status != 200){
            throw new Error(response);
        }
        else {
            const api = await response.json();

            for (const champion in api.data) {
                const champId = api.data[champion].id.toLowerCase();

                document.querySelector(".champions").insertAdjacentHTML(
                    "afterbegin",
                    `<div class="card">
                        <h2>${api.data[champion].name}</h2>
                        <p>${api.data[champion].blurb}</p>
                        <img src="https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_q.png"
                            onerror="this.onerror=null; 
                                this.src='https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_q1.png';"/>

                        <img src="https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_w.png"
                            onerror="this.onerror=null; 
                                this.src='https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_w1.png';"/>

                        <img src="https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_e.png"
                            onerror="this.onerror=null; 
                                this.src='https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_e1.png';"/>

                        <img src="https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_r.png"
                            onerror="this.onerror=null; 
                                this.src='https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_r1.png';"/>
                    </div>`
                );
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
getData()

/*https://raw.communitydragon.org/latest/game/assets/characters/${champId}/hud/icons2d/${champId}_q1.png*/
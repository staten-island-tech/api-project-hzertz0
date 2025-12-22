async function getData(){
    try {
        const response = await fetch("https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/champion.json");
        if (response.status != 200){
            throw new Error(response);
        }
        else {
            const api = await response.json();
            for (const champion in api.data) {
                console.log(`${champion}:`, api.data[champion]);
                }
        }
    }
    catch (error) {
        console.log(error);
    }
}
getData()
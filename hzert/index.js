async function getData(api){
    try {
        const response = await fetch(``);
        if (response.status != 200){
            throw new Error(response);
        }
        else {
            const data = await response.json();
            console.log(data);
        }
    }
    catch (error) {
        console.log(error);
    }
}
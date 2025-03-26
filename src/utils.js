export async function getAllAnswers(apiURL) {
    try {
        await fetch(`${apiURL}answers`,
            {
                method: "GET",
            })
            .then((response) => response.json())
            .then(async answers => {
                return answers
            })
    } catch (error) {
        console.log(error)
    }
}
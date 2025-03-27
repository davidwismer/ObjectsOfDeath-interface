export async function getAllAnswersPerQuestion(apiURL, question) {
    let answers = {}
    try {
        await fetch(`${apiURL}answers/${question}`,
            {
                method: "GET",
            })
            .then((response) => response.json())
            .then(async answersRes => {
                answers = answersRes
            })
    } catch (error) {
        return console.log(error)
    }
    return answers
}
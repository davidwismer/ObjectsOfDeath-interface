export async function getAllAnswersPerQuestion(apiURL,apiURL2,apiURL3, question) {
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
        try {
            await fetch(`${apiURL2}answers/${question}`,
                {
                    method: "GET",
                })
                .then((response) => response.json())
                .then(async answersRes => {
                    answers = answersRes
                })
        } catch (error) {
            try {
                await fetch(`${apiURL3}answers/${question}`,
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
        }
    }
    return answers
}
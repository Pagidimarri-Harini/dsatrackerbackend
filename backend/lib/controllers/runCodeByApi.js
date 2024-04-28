const runCode = async ({ language = "", code = "", input = "" }) => {
    try {
        const url = 'https://online-code-compiler.p.rapidapi.com/v1/';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '19024205cemsh12d2cacee64cc5cp181d27jsn1d63a7b1dd39',
                'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            },
            body: JSON.stringify({
                language,
                version: 'latest',
                code,
                input
            })
        };

        const rs = await fetch(url, options)
        const body = await rs.json()

        return body
    } catch (error) {
        throw error
    }
}

module.exports = { runCode }
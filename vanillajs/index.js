async function* getTextStream() {
    const response = await fetch('http://localhost:5000/foo', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain'
        }
    });

    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        yield value;
    }
}

async function main() {
    const dataTarget = document.getElementById('target');
    for await (const chunk of getTextStream()) {
        dataTarget.textContent += chunk;
        console.log(chunk);
    }
}
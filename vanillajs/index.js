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


const anotherTag = document.getElementById('another_tag');
anotherTag.outerHTML = `
    <style>
        #greet {
            color: red;
        }
    </style>
    <h1 id="greet" onclick="greet()">Hello World</h1>
    <script type="text/javascript">
        function greet() {
            console.log('hello world');
        }
    </script>
`
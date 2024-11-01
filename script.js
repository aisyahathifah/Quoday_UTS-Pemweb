const quotes = {
    love: [
        { quote: "True love isn't found; it's built, brick by brick, with patience and care.", author: "quoday" },
        { quote: "In your smile, I find the warmth that lights my darkest days.", author: "quoday" },
        { quote: "Love is the quiet whisper that stays when the world is too loud." , author: "quoday" }
    ],
    life: [
        { quote: "Life is a journey, not to be measured by time, but by moments that take your breath away.", author: "quoday" },
        { quote: "The beauty of life lies in its impermanence; embrace every moment.", author: "quoday" },
        { quote: "Life is an endless road of learning, and each step brings us closer to who we're meant to be.", author: "quoday" }
    ],
    self: [
        { quote: "You are not defined by your scars; you are defined by the strength it took to heal them.", author: "quoday" },
        { quote: "Be the best version of yourself, not a secondhand version of someone else.", author: "quoday" },
        { quote: "Self-love is the foundation of a life well-lived; build it strong, and let it grow.", author: "quoday" }
    ]
};

let selectedCategory;

function submitName() {
    const name = document.getElementById("userName").value;
    if (name) {
        document.getElementById("greeting").textContent = `Hello, ${name}!`;
        document.getElementById("nameContainer").style.display = "none";
        document.getElementById("categoryContainer").style.display = "block";
    } else {
        alert("Please enter your name");
    }
}

function selectCategory(category) {
    selectedCategory = category;
    document.getElementById("categoryContainer").style.display = "none";
    document.getElementById("quoteContainer").style.display = "block";
    generateQuote();
}

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes[selectedCategory].length);
    const selectedQuote = quotes[selectedCategory][randomIndex];
    document.getElementById("quote").textContent = `"${selectedQuote.quote}"`;
    document.getElementById("author").textContent = `- ${selectedQuote.author}`;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    for (let j = 0; j < lines.length; j++) {
        context.fillText(lines[j], x, y + j * lineHeight);
    }
}

function downloadQuote() {
    const name = document.getElementById("greeting").textContent;
    const quoteText = document.getElementById("quote").textContent;
    const authorText = document.getElementById("author").textContent;
    const canvas = document.getElementById("quoteCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 500;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 24px Georgia";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.fillText(name, canvas.width / 2, 100);

    ctx.font = "italic 20px Georgia";
    wrapText(ctx, quoteText, canvas.width / 2, 200, 600, 30);

    ctx.font = "bold 18px Georgia";
    ctx.fillText(authorText, canvas.width / 2, 400);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "quote.jpg";
    link.click();
}

function shareToTwitter() {
    const quoteText = document.getElementById("quote").textContent;
    const authorText = document.getElementById("author").textContent;
    const tweetContent = `${quoteText} ${authorText}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;

    window.open(tweetUrl, "Share to Twitter", "width=600, height=300");
}

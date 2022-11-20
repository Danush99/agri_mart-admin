function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}

function colorCodearray() {
    const color_array = []
    for (let i = 0; i < 5; i++) {
        const color = generateRandomColor()
        color_array.push(color);
    }
    // while (color_array.length < 6) {
    //     const color = generateRandomColor()
    //     if (!color_array.includes) {
    //         color_array.push(color);
    //     }
    // }
    return color_array
}
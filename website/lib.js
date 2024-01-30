function utf8StringToBytes(str) {
    return new TextEncoder().encode(str);
}

function splitUtf8String(str, parts) {
    const bytes = utf8StringToBytes(str);
    const partSize = Math.floor(bytes.length / parts);
    const result = [];

    let start = 0;
    for (let i = 0; i < parts; i++) {
        let end = i === parts - 1 ? bytes.length : (i + 1) * partSize;

        // 真ん中のバイトが文字の途中でないか確認し、必要に応じて調整
        while (end < bytes.length && (bytes[end] & 0xC0) === 0x80) {
            end++;
        }

        const partBytes = bytes.slice(start, end);
        start = end;
        const partStr = new TextDecoder().decode(partBytes);
        result.push(partStr);
    }

    return result;
}
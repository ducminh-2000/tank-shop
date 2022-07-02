function playSound(file) {
    return new Promise(function (resolve, reject) {
        const sound = new Audio(file);
        sound.type = 'audio/mpeg';
        const play = sound.play();
        play.then(() => {
            resolve(sound)
        }).catch((e) => {
            reject(new Error(`Play Sound from ${file} Error, ${e}`))
        })
    });
}


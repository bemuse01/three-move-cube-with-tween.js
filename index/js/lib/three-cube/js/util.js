const util = {
    shuffle(arr){
        let temp = [...arr]
        for (let i = temp.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1))
            let t = temp[i]
            temp[i] = temp[j]
            temp[j] = t
        }
        return temp
    }
}
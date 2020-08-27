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
    },
    createCubePosition(length, row){
        let arr = [], size = row * row
        let x = [], y = [], z = []
        let start = Math.floor(row / 2)
        let init = {x: -start, y: start, z: start}
        
        for(let i = 0; i < (row % 2 === 0 ? row + 1 : row); i++){
            x[i] = init.x++
            y[i] = init.y--
            z[i] = init.z--
        }
        if(row % 2 === 0) {
            x.splice(start, 1)
            y.splice(start, 1)
            z.splice(start, 1)
            x = x.map(x => x - Math.sign(x) * 1 / 2)
            y = y.map(x => x - Math.sign(x) * 1 / 2)
            z = z.map(x => x - Math.sign(x) * 1 / 2)
        }

        for(let i = 0; i < length; i++) arr[i] = {x: x[i % row], y: y[Math.floor(i / size)], z: z[Math.floor((i % size) / row)]}
        return arr
    },
    setCubePositionByParam(param){
        let arr = []
        let pos = util.createCubePosition(param.row ** 3, param.row)
        pos.forEach(e => {
            arr.push({
                x: e.x * param.size + e.x * param.gap, 
                y: e.y * param.size + e.y * param.gap, 
                z: e.z * param.size + e.z * param.gap
            })
        })
        return arr
    },
    setObjectPositionByParam(element, param){
        param.geo.circle.vertices.shift()
        for(let i in param.geo) {
            let arr = []
            for(let j = 0; j < param.row ** 3; j++){
                let v = param.geo[i].vertices
                arr[j] = {x: v[j % v.length].x, y: v[j % v.length].y, z: v[j % v.length].z}
            }
            element.pos[i] = arr
        }
    },
    createOpaArray(original, opacity, strength, iteration){
        let arr = []
        for(let i = 0; i < iteration; i++) {
            if(i !== iteration - 1) arr[i] = original / strength
            else arr[i] = original / opacity
        }
        return arr
    },
    createTslArray(chance, random, i, pos, opacity){
        let obj = {}
        let strength = 6, iteration = 6
        obj = {
            x: pos[chance][random[i]].x, 
            y: pos[chance][random[i]].y, 
            z: pos[chance][random[i]].z,
            box: util.createOpaArray(tweens.cube.opa.box, opacity, strength, iteration),
            helper: util.createOpaArray(tweens.cube.opa.helper, opacity, strength, iteration),
            scale: chance === 'cube' ? 1 : 0.6
        }
        return obj
    }
}
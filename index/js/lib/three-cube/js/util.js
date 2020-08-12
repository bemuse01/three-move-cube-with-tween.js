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
    getCenterPosition(group, param){
        /* let e = group.children[Math.floor(Math.random() * group.children.length)],
            chance = Math.floor(Math.random() * 3)
            out = {}
        if(chance === 0) out = {pos: {x: e.position.x, y: 0, z: 0}, dir: chance}
        else if(chance === 1) out = {pos: {x: 0, y: e.position.y, z: 0}, dir: chance}
        else out = {pos: {x: 0, y: 0, z: e.position.z}, dir: chance}
        return out */
        let size = param.obj.row ** 2
        let element = group.cube.children[Math.floor(Math.random() * group.cube.children.length)],
            chance = Math.floor(Math.random() * 3)
            if(chance === 0){
                let mod = (element.index % size) % param.obj.row
                let arr = []
                for(let i = 0; i < size; i++) arr[i] = mod + param.obj.row * i
                arr.forEach(e => {
                    group.cube.children.forEach(c => {
                        if(e === c.index) group.rot.x.attach(c)
                    })
                })
                console.log(group.rot.x.children, group.rot.x.children.length)
            }else if(chance === 1){
                let div = Math.floor(element.index / size)
                let min = size * div, max = size * div + size - 1
                group.cube.children.forEach(e => {
                    if(min <= e.index && max >= e.index) group.rot.y.attach(e)
                })
                console.log(group.rot.y.children, group.rot.y.children.length)
            }else{
                let mod = (element.index % size) - ((element.index % size) % param.obj.row)
                let arr = []
                for(let i = 0; i < size; i++) arr[i] = Math.floor(i / param.obj.row) * size + i % param.obj.row + mod
                arr.forEach(e => {
                    group.cube.children.forEach(c => {
                        if(e === c.index) group.rot.z.attach(c)
                    })
                })
                console.log(group.rot.z.children, group.rot.z.children.length)
            }
        return {dir: chance}
    },
    createCenterElementArray(group, out){
       /*  group.cube.children.forEach((e, i) => {
            if(out.dir === 0){
                let min = out.pos.x - out.pos.x / 100, max = out.pos.x + out.pos.x / 100
                if(min <= e.position.x && max >= e.position.x) {
                    group.rot.x.attach(e)
                    console.log(e, out.dir, min, max)
                }
            }else if(out.dir === 1){
                let min = out.pos.y - out.pos.y / 100, max = out.pos.y + out.pos.y / 100
                if(min <= e.position.y && max >= e.position.y) {
                    group.rot.y.attach(e)
                    console.log(e, out.dir, min, max)
                }
            }else{
                let min = out.pos.z - out.pos.z / 100, max = out.pos.z + out.pos.z / 100
                if(min <= e.position.z && max >= e.position.z) {
                    group.rot.z.attach(e)
                    console.log(e, out.dir, min, max)
                }
            }
        }) */
    },
    detachElementFromRotation(group){
        for(let i in group.rot){
            if(group.rot[i].length !== 0) group.rot[i].children.forEach(e => {
                group.cube.attach(e)
            })
        }
    }
}
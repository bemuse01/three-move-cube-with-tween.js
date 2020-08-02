const tween = {
    createCubeTween(group, param){
        let normal = object.createPosition(param.obj.row ** param.obj.row)
        let index = [], pos = []

        for(let i = 0; i < param.obj.row ** param.obj.row; i++) {
            index[i] = i
            pos[i] = {
                x: normal[i].x * param.obj.size + normal[i].x * param.obj.gap,
                y: normal[i].y * param.obj.size + normal[i].y * param.obj.gap,
                z: normal[i].z * param.obj.size + normal[i].z * param.obj.gap
            }
        }

        this.addCubeTween(group, param, index, pos)
    },
    addCubeTween(group, param, index, pos){
        let random = util.shuffle(index)
        group.children.forEach((e, i) => {
            let randIndex = Math.floor(Math.random() * index.length)

            param.tween.start[i] = {x: e.position.x, y: e.position.y, z: e.position.z}
            /* param.tween.end[i] = {
                x: [e.position.x, 0, 0, pos[random[i]].x], 
                y: [e.position.y, 0, 0, pos[random[i]].y], 
                z: [e.position.z, 0, 0, pos[random[i]].z]
            } */
            param.tween.end[i] = {
                x: pos[random[i]].x, 
                y: pos[random[i]].y, 
                z: pos[random[i]].z
            }
            /* param.tween.end[i] = {
                x: pos[randIndex].x, 
                y: pos[randIndex].y, 
                z: pos[randIndex].z
            } */ 
            let tw = new TWEEN.Tween(param.tween.start[i])
                .to(param.tween.end[i], param.tween.time)
                .onUpdate(() => {move.onUpdateCubeTween(e, param.tween.start[i])})
                .onRepeat(() => {if(i === group.children.length - 1) move.onRepeatCubeTween(group, param, index, pos)})
                .repeat(Infinity)
                .easing(TWEEN.Easing.Quadratic.Out)
                // .repeatDelay(param.tween.delay)
                .delay(param.tween.delay)
                .start()
        })
    }
}
const tween = {
    createCubeTween(group, param){
        let normal = object.createPosition(param.obj.row ** 3, param.obj.row)
        let index = [], pos = []

        for(let i = 0; i < param.obj.row ** 3; i++) {
            index[i] = i
            pos[i] = {
                x: normal[i].x * param.obj.size + normal[i].x * param.obj.gap,
                y: normal[i].y * param.obj.size + normal[i].y * param.obj.gap,
                z: normal[i].z * param.obj.size + normal[i].z * param.obj.gap
            }
        }

        this.addCubeOpacityTween(group, param, index, pos)
    },
    addCubeTranslateTween(group, param, index, pos){
        let random = util.shuffle(index)
        group.cube.children.forEach((e, i) => {
            let randIndex = Math.floor(Math.random() * index.length)
            let opacity = Math.floor(Math.random() * 4 + 1)

            param.tween.tsl.start[i] = {x: e.position.x, y: e.position.y, z: e.position.z, box: e.children[0].material.opacity, helper: e.children[1].material.opacity}
            param.tween.tsl.end[i] = {
                x: pos[random[i]].x, 
                y: pos[random[i]].y, 
                z: pos[random[i]].z,
                box: e.param.box / opacity,
                helper: e.param.helper / opacity
            }
            /* param.tween.end[i] = {
                x: [e.position.x, 0, 0, pos[random[i]].x], 
                y: [e.position.y, 0, 0, pos[random[i]].y], 
                z: [e.position.z, 0, 0, pos[random[i]].z]
            } */
            /* param.tween.end[i] = {
                x: pos[randIndex].x, 
                y: pos[randIndex].y, 
                z: pos[randIndex].z
            } */ 
            let tw = new TWEEN.Tween(param.tween.tsl.start[i])
                .to(param.tween.tsl.end[i], param.tween.tsl.time)
                .onUpdate(() => {move.onUpdateCubeTranslateTween(e, param.tween.tsl.start[i], pos)})
                // .onRepeat(() => {if(i === group.cube.children.length - 1) move.onRepeatCubeTween(group, param, index, pos)})
                .onComplete(() => {if(i === group.cube.children.length - 1) move.onRepeatCubeTween(group, param, index, pos)})
                // .repeat(Infinity)
                .easing(TWEEN.Easing.Quadratic.Out)
                // .repeatDelay(param.tween.delay)
                .delay(param.tween.tsl.delay)
                .start()
        })
    },
    addCubeRotateTween(group, param, index, pos){
        let out = util.getCenterPosition(group, param)
        let arr = util.createCenterElementArray(group, out)

        let s = (out.dir === 0 ? group.rot.x.rotation.x : out.dir === 1 ? group.rot.y.rotation.y : group.rot.z.rotation.z) * degree
        let e = (s + 90) % 360
        let start = {deg: s * radian}
        let end = {deg: e * radian}

        let tw = new TWEEN.Tween(start)
            .to(end, param.tween.rot.time)
            .onUpdate(() => {move.onUpdateCubeRotateTween(group, start, out.dir)})
            .onRepeat(() => {move.onRepeatCubeTween(group, param, index, pos)})
            .repeat(Infinity)
            .easing(TWEEN.Easing.Quadratic.Out)
            .delay(param.tween.rot.delay)
            .start()

        /* arr.forEach((e, i) => {
            let start = out.dir === 0 ? e.rotation.x : out.dir === 1 ? e.rotation.y : e.rotation.z
            let end = (start + 90) % 360

            param.tween.rot.start[i] = {deg: start * radian}
            param.tween.rot.end[i] = {deg: end * radian}

            let tw = new TWEEN.Tween(param.tween.rot.start[i])
                .to(param.tween.rot.end[i], param.tween.rot.time)
                .onUpdate(() => {move.onUpdateCubeRotateTween(e, param.tween.rot.start[i], out.dir)})
                .onRepeat(() => {if(i === arr.length - 1) move.onRepeatCubeTween(group, param, index, pos)})
                .repeat(Infinity)
                .easing(TWEEN.Easing.Quadratic.Out)
                .delay(param.tween.rot.delay)
                .start()
        }) */
    },
    addCubeOpacityTween(group, param, index, pos){
        let random = util.shuffle(index)
        for(let i = 0; i < group.cube.children.length; i++){
            let opacity = Math.floor(Math.random() * 4 + 1)
            let start = {box: 0, helper: 0}
            let end = {box: param.tween.opa.box / opacity, helper: param.tween.opa.helper / opacity}

            let tw = new TWEEN.Tween(start)
                .to(end, param.tween.opa.time)
                .onUpdate(() => {move.onUpdateCubeOpacityTween(group.cube.children[random[i]], start)})
                .onComplete(() => {if(i === group.cube.children.length - 1) move.onCompleteCubeOpacityTween(group, param, index, pos)})
                .easing(TWEEN.Easing.Quadratic.Out)
                .delay(param.tween.opa.delay * i)
                .start()
        }
    }
}
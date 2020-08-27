const tween = {
    createCubeTween(element, tween, delay){
        let index = []
        for(let i = 0; i < three.cube.row ** 3; i++) index[i] = i
        this.addCubeOpacityTween(element.group, tween, index, element.pos, delay)
    },
    addCubeOpacityTween(group, param, index, pos, delay){
        let random = util.shuffle(index)
        for(let i = 0; i < group.cube.children.length; i++){
            let opacity = Math.floor(Math.random() * param.opa.max + param.opa.min)
            let start = {box: 0, helper: 0}
            let end = {box: param.opa.box / opacity, helper: param.opa.helper / opacity}

            let tw = new TWEEN.Tween(start)
                .to(end, param.opa.time)
                .onUpdate(() => {move.onUpdateCubeOpacityTween(group.cube.children[random[i]], start)})
                .onComplete(() => {if(i === group.cube.children.length - 1) move.onCompleteCubeOpacityTween(group, param, index, pos)})
                .easing(TWEEN.Easing.Quadratic.Out)
                .delay(delay + param.opa.delay * i)
                .start()
        }
    },
    addCubeTranslateTween(group, param, index, pos){
        let random = util.shuffle(index),
            chance = param.tsl.chanceArray[Math.floor(Math.random() * param.tsl.chanceArray.length)]

        group.cube.children.forEach((e, i) => {
            let opacity = Math.floor(Math.random() * param.opa.max + param.opa.min)

            param.tsl.start[i] = {x: e.position.x, y: e.position.y, z: e.position.z, box: e.children[0].material.opacity, helper: e.children[1].material.opacity, scale: e.scale.x}
            param.tsl.end[i] = util.createTslArray(chance, random, i, pos, opacity)

            let tw = new TWEEN.Tween(param.tsl.start[i])
                .to(param.tsl.end[i], param.tsl.time)
                .onUpdate(() => {move.onUpdateCubeTranslateTween(e, param.tsl.start[i], pos)})
                .onComplete(() => {if(i === group.cube.children.length - 1) move.onCompleteCubeTranslateTween(group, param, index, pos)})
                .easing(TWEEN.Easing.Quadratic.Out)
                .delay(param.tsl.delay)
                .start()
        })
    }
}
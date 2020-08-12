const move = {
    moveCube(group, param, mixer, delta){
        group.wrap.rotation.x += param.rotation
        group.wrap.rotation.y += param.rotation

        /* mixer.mix.forEach(e => {
            e.update(delta)
        }) */
    },
    onUpdateCubeTranslateTween(child, param, pos){
        child.position.set(param.x, param.y, param.z)
        pos.forEach((e, i) => {
            if(e.x === child.position.x && e.y === child.position.y && e.z === child.position.z){
                child.index = i
                return
            }
        })
        child.children.forEach((e, i) => {
            if(i === 0) e.material.opacity = param.box
            else e.material.opacity = param.helper
        })
        child.param.opacity = param.opacity
    },
    onUpdateCubeRotateTween(group, param, dir){
        if(dir === 0) group.rot.x.rotation.x = param.deg
        else if(dir === 1) group.rot.y.rotation.y = param.deg
        else group.rot.z.rotation.z = param.deg
    },
    onRepeatCubeTween(group, param, index, pos){
        TWEEN.removeAll()

        // util.detachElementFromRotation(group)
        
        /* if(Math.random() > 0.5) tween.addCubeTranslateTween(group, param, index, pos)
        else tween.addCubeRotateTween(group, param, index, pos) */
        tween.addCubeTranslateTween(group, param, index, pos)
    },
    onUpdateCubeOpacityTween(group, param){
        group.children[0].material.opacity = param.box
        group.children[1].material.opacity = param.helper
    },
    onCompleteCubeOpacityTween(group, param, index, pos){
        tween.addCubeTranslateTween(group, param, index, pos)
        console.log('work')
    }
}
const move = {
    moveCube(group, param, mixer, delta){
        group.rotation.x += param.rotation
        group.rotation.y += param.rotation
        
        /* mixer.mix.forEach(e => {
            e.update(delta)
        }) */
    },
    onUpdateCubeTween(child, param){
        child.position.set(param.x, param.y, param.z)
        child.children.forEach((e, i) => {
            if(i === 0) e.material.opacity = child.param.box / param.opacity
            else e.material.opacity = child.param.helper / param.opacity
        })
        child.param.opacity = param.opacity
    },
    onRepeatCubeTween(group, param, index, pos){
        TWEEN.removeAll()

        tween.addCubeTween(group, param, index, pos)
    }
}
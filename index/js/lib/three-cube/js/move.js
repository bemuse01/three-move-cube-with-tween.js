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
    },
    onRepeatCubeTween(group, param, index, pos){
        TWEEN.removeAll()

        tween.addCubeTween(group, param, index, pos)
    }
}
const move = {
    moveCube(group, param){
        group.rotation.x += param.rotation
        group.rotation.y += param.rotation
    },
    onUpdateCubeOpacityTween(e, param){
        e.children[0].material.opacity = param.box
        e.children[1].material.opacity = param.helper
    },
    onCompleteCubeOpacityTween(group, param, index, pos){
        TWEEN.removeAll()

        tween.addCubeTranslateTween(group, param, index, pos)
    },
    onUpdateCubeTranslateTween(group, param){
        group.position.set(param.x, param.y, param.z)
        group.scale.set(param.scale, param.scale, param.scale)
        group.children.forEach((e, i) => {
            if(i === 0) e.material.opacity = param.box
            else e.material.opacity = param.helper
        })
    },
    onCompleteCubeTranslateTween(group, param, index, pos){
        TWEEN.removeAll()

        tween.addCubeTranslateTween(group, param, index, pos)
    }
}
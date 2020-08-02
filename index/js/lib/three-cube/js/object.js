const object = {
    createPosition(length){
        let arr = []
        let x = [-1, 0, 1], y = [1, 0, -1], z = [1, 0, -1]
        for(let i = 0; i < length; i++) arr[i] = {x: x[i % 3], y: y[Math.floor(i / 9)], z: z[Math.floor((i % 9) / 3)]}
        return arr
    },
    createCube(scene, group, param){
        let pos = this.createPosition(param.row ** param.row)

        for(let i = 0; i < param.row ** param.row; i++){
            let local = new THREE.Group()

            let geometry = new THREE.BoxGeometry(param.size, param.size, param.size)
            let material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0xffffff : 0xffff00,
                transparent: true,
                opacity: 0.05,
                depthTest: false
            })
           
            let mesh = new THREE.Mesh(geometry, material)
            
            let helper = new THREE.BoxHelper(mesh, i % 2 === 0 ? 0xffffff : 0xffff00)
            helper.material.transparent = true
            helper.material.opacity = 0.25

            local.add(mesh)
            local.add(helper)
            local.position.set(
                pos[i].x * param.size + pos[i].x * param.gap, 
                pos[i].y * param.size + pos[i].y * param.gap, 
                pos[i].z * param.size + pos[i].z * param.gap
            )

            group.add(local)
        }
        scene.add(group)
    },
    createCubeMixer(group, mixer, param){
        let normal = this.createPosition(param.row ** param.row)
        let index = [], pos = [], random = [], ext = [], order = []

        for(let i = 0; i < param.row ** param.row; i++) {
            index[i] = i
            pos[i] = {
                x: normal[i].x * param.size + normal[i].x * param.gap,
                y: normal[i].y * param.size + normal[i].y * param.gap,
                z: normal[i].z * param.size + normal[i].z * param.gap
            }
        }
        for(let i = 0; i < param.row ** param.row; i++) {
            random[i] = util.shuffle(index)
            for(let j = 0; j < 3; j++) {
                ext.push(random[i])
                order.push(i * 3 + j)
            }
        }
        console.log(ext, order)
        

        group.children.forEach((e, i) => {
            let position = []
            for(let j = 0; j < ext.length; j++){
                position[j * 3] = pos[ext[j][i]].x
                position[j * 3 + 1] = pos[ext[j][i]].y
                position[j * 3 + 2] = pos[ext[j][i]].z
            }

            let positionTrack = new THREE.VectorKeyframeTrack('.position', order, position)
            let clip = new THREE.AnimationClip('cube', 4, [positionTrack])

            mixer.mix[i] = new THREE.AnimationMixer(e)
            mixer.clip[i] = mixer.mix[i].clipAction(clip)
            mixer.clip[i].play()
        })
    }
}
const object = {
    createPosition(length, row){
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
    createCube(scene, group, param){
        let pos = this.createPosition(param.row ** 3, param.row)

        for(let i = 0; i < param.row ** 3; i++){
            let local = new THREE.Group()
            local.param = {
                opacity: 1,
                box: 0.125,
                helper: 0.6
            }

            let geometry = new THREE.BoxGeometry(param.size, param.size, param.size)
            let material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0xffffff : 0xffffff,
                transparent: true,
                opacity: 0.125,
                depthTest: false
            })
           
            let mesh = new THREE.Mesh(geometry, material)
            
            let helper = new THREE.BoxHelper(mesh, i % 2 === 0 ? 0xffffff : 0xffffff)
            helper.material.transparent = true
            helper.material.opacity = 0.6

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
        let normal = this.createPosition(param.row ** 3, param.row)
        let index = [], pos = [], random = [], ext = [], order = []

        for(let i = 0; i < param.row ** 3; i++) {
            index[i] = i
            pos[i] = {
                x: normal[i].x * param.size + normal[i].x * param.gap,
                y: normal[i].y * param.size + normal[i].y * param.gap,
                z: normal[i].z * param.size + normal[i].z * param.gap
            }
        }
        for(let i = 0; i < param.row ** 3; i++) {
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
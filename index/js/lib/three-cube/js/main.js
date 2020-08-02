const clock = new THREE.Clock()
const radian = Math.PI / 180

const group = {
    cube: new THREE.Group()
}

const param = {
    cube: {
        size: 2,
        row: 3,
        gap: 6,
        rotation: 0.005,
        boost: 0.25
    }
}

const mixer = {
    cube: {
        mix: [],
        clip: []
    }
}

const tweens = {
    cube: {
        start: [],
        end: [],
        time: 1500,
        delay: 500
    }
}

let width, height, renderer, scene, camera

width = window.innerWidth
height = window.innerHeight

init()
function init(){
    scene = new THREE.Scene()
    
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000)
    renderer.setClearAlpha(0.0)

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
    camera.position.z = 50
    scene.add(camera)
    
    objects()

    initTweens()

    animate()

    window.addEventListener('resize', onWindowResize, false)
}

function initTweens(){
    tween.createCubeTween(group.cube, {tween: tweens.cube, obj: param.cube})
}

function objects(){
    object.createCube(scene, group.cube, param.cube)
    // object.createCubeMixer(group.cube, mixer.cube, param.cube)
}

function moves(){
    let delta = clock.getDelta()

    move.moveCube(group.cube, param.cube, mixer.cube, delta)
    TWEEN.update()
}

function getVisibleHeight(depth){
    let cameraOffset = camera.position.z
    if(depth < cameraOffset) depth -= cameraOffset
    else depth += cameraOffset
    let vFov = camera.fov * radian
    return 2 * Math.tan(vFov / 2) * Math.abs(depth)
}

function getVisibleWidth(depth){
    let height = getVisibleHeight(depth)
    return height * camera.aspect
}

function onWindowResize(){
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
}

function render(){
    moves()

    camera.lookAt(scene.position)
    renderer.render(scene, camera)
}

function animate(){
    render()
    requestAnimationFrame(animate)
}
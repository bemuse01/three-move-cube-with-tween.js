const clock = new THREE.Clock()
const radian = Math.PI / 180
const degree = 180 / Math.PI

const group = {
    cube: new THREE.Group(),
    rot: {
        x: new THREE.Group(),
        y: new THREE.Group(),
        z: new THREE.Group()
    },
    wrap: new THREE.Group()
}

const param = {
    cube: {
        size: 1,
        row: 4,
        gap: 3,
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
        tsl: {
            start: [],
            end: [],
            time: 1500,
            delay: 1000
        },
        rot: {
            start: [],
            end: [],
            time: 1500,
            delay: 1000
        },
        opa: {
            box: 0.125,
            helper: 0.6,
            time: 500,
            delay: 16
        }
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
    tween.createCubeTween(group, {tween: tweens.cube, obj: param.cube})
}

function objects(){
    object.createCube(group.wrap, group.cube, param.cube)
    object.addRotationGroup(group)
    object.wrapGroups(scene, group)
    // object.createCubeMixer(group.cube, mixer.cube, param.cube)
}

function moves(){
    let delta = clock.getDelta()

    move.moveCube(group, param.cube, mixer.cube, delta)
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
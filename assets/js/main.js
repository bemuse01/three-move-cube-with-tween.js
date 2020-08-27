new Vue({
    el: '#wrap',
    data(){
        return{
            delay: {
                main: {
                    canvas: {
                        line: 0,
                        cube: 0
                    }
                }
            },
            three: {
                renderer: null,
                scene: null,
                camera: null,
                group: {
                    cube: null,
                    line: null
                },
                pos: {
                    cube: util.setCubePositionByParam(three.cube),
                    sphere: null,
                    circle: null,
                    cone: null,
                    icosahedron: null,
                    box: null,
                    cylinder: null
                }
            },
            util: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },




        /* main canvas */
        initThree(){
            let canvas = document.getElementById('main-canvas')
            object.init(canvas, this.three)

            this.createObjects()
            this.transformGroup()
            this.createTweens()
        },
        renderThree(){
            this.playMoves()

            this.three.camera.lookAt(this.three.scene.position)
            this.three.renderer.render(this.three.scene, this.three.camera)
        },
        resizeThree(){
            this.three.camera.aspect = param.util.width / param.util.height
            this.three.camera.updateProjectionMatrix()

            this.three.renderer.setSize(param.util.width, param.util.height)
        },
        transformGroup(){
            let x = 18, y = 14, z = 0
            this.three.group.line.rotation.set(x * param.util.radian, y * param.util.radian, z * param.util.radian)
        },
        createObjects(){
            util.setObjectPositionByParam(this.three, three.cube)
            object.createCube(this.three, three.cube)
        },
        playMoves(){
            move.moveCube(this.three.group.cube, three.cube)
        },
        createTweens(){
            tween.createCubeTween(this.three, tweens.cube, this.delay.main.canvas.cube)
        },
        



        onWindowResize(){
            param.util.width = window.innerWidth
            param.util.height = window.innerHeight
            this.util.width = window.innerWidth
            this.util.height = window.innerHeight

            this.resizeThree()
        },




        render(){
            this.renderThree()
            TWEEN.update()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})
const param = {
    util: {
        width: window.innerWidth,
        height: window.innerHeight,
        radian: Math.PI / 180
    }
}

const three = {
    cube: {
        size: 1,
        row: 4,
        gap: 4,
        rotation: 0.005,
        scale: 1,
        geo: {
            sphere: new THREE.SphereGeometry(12, 8, 8),
            circle: new THREE.CircleGeometry(12, 63),
            /* cone: new THREE.ConeGeometry(9, 16, 15, 4), */
            icosahedron: new THREE.IcosahedronGeometry(12, 1),
            box: new THREE.BoxGeometry(16, 16, 16, 3, 3, 3),
            cylinder: new THREE.CylinderGeometry(8, 8, 18, 10, 5)
        }
    },
    line: {
        size: 2,
        seg: 36
    }
}

const tweens = {
    cube: {
        tsl: {
            start: [],
            end: [],
            time: 1500,
            delay: 1000,
            chanceArray: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, /*  3, 3, */ 4, 4, 5, 5, 6, 6].map(x => {
                if(x === 0) return 'cube'
                else if(x === 1) return 'sphere'
                else if(x === 2) return 'circle'
                /* else if(x === 3) return 'cone' */
                else if(x === 4) return 'icosahedron'
                else if(x === 5) return 'box'
                else return 'cylinder'
            })
        },
        opa: {
            box: 0.15,
            helper: 0.75,
            time: 600,
            delay: 15,
            min: 1,
            max: 3
        }
    },
    line: {
        time: 1200,
        delay: 40,
        opacity: [0, 0.3, 0.6, 0.3, 0.15]
    }
}
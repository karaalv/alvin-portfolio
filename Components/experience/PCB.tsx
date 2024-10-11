/*** Three.js PCB Component ***/

/* Imports */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { useEffect, useRef } from 'react'

import { useResponsiveContext } from '../ResponsiveContext';

// STOP INSPECTING MY WEBSITE !

// jk, jk its all public on GitHub if you are curious.

// This is just a Three.js environment mounted onto a div ref.

/**
 * @returns PCB Component
 */
export default function PCB(){

    // Define 3D properties based on viewport.

    /* SCALE */
    const {isMobile} = useResponsiveContext()
    const baseScale = 0.035
    const scale = isMobile? (baseScale): baseScale

    /* SIZE */
    const inHeight = window.innerHeight
    const renderHeight = isMobile? (inHeight/2): inHeight

    /* CAMERA */
    const pos_z = isMobile? 1:0


    // Mounting reference.
    const mount = useRef<HTMLDivElement | null>(null)
    const objectRef = useRef<THREE.Object3D | null>(null);

    useEffect(() => {

        /** SCENE SETUP **/

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        )
        const renderer = new THREE.WebGLRenderer({alpha: true, antialias: false})
        renderer.setSize(window.innerWidth, renderHeight)

        // Set render to DOM mount.
        if(mount.current){
            mount.current.appendChild(renderer.domElement)
        }

        /* PAINT SCENE */

        const mtlLoader = new MTLLoader();
        mtlLoader.load('/assets/PCB.mtl', (materials) => {
            // Load materials.
            materials.preload()
    
            // Load the .obj file.
            const objLoader = new OBJLoader()
            const pos_x = -2.5
            const pos_y = -2

            // Set loaded materials.
            objLoader.setMaterials(materials)
            objLoader.load('/assets/PCB.obj', (object) => {
                // Add object to scene.
                scene.add(object)
                objectRef.current = object

                // Set object position.
                object.position.set(pos_x, pos_y, pos_z)
                object.rotation.z = Math.PI / 2

                // Set object scale.
                object.scale.set(scale, scale, scale)
            }, undefined, (error) => {
                console.error('An error happened while loading the .obj file:', error)
          })
        }, undefined, (error) => {
            console.error('An error happened while loading the .mtl file:', error)
        })

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        scene.add(ambientLight)
        
        camera.position.z = 7
        camera.position.y = 0

        // Set renderer size to div.
        const updateRendererSize = () => {
            if (mount.current) {
                const rect = mount.current.getBoundingClientRect()
                renderer.setSize(rect.width, rect.height)
                camera.aspect = rect.width / rect.height
                camera.updateProjectionMatrix()
            }
        }

        // Initial size setup.
        updateRendererSize();

        // Orbit controls.
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableZoom = false

        /** ANIMATION LOOP **/
        
        const animate = () => {
            requestAnimationFrame(animate)

            // Orbit controls.
            controls.update()
            renderer.render(scene, camera)
        };

        animate();

        /** CLEAN UP **/
        return () => {
            if (mount.current) {
                mount.current.removeChild(renderer.domElement)
            }
            renderer.dispose()
        }

    }, [])

    return <div ref={mount} style={{width: '100%', height: 'auto'}}/>
}
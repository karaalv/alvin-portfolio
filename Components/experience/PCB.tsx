/*** Three.js PCB Component ***/

/* Imports */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { useEffect, useRef, useState } from 'react'

export default function PCB(){
    
    // Mounting reference.
    const mount = useRef<HTMLDivElement | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const objectRef = useRef<THREE.Object3D | null>(null);

    useEffect(() => {
        // Set up scene.
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        )
        const renderer = new THREE.WebGLRenderer({alpha: true})
        renderer.setSize(window.innerWidth, window.innerHeight)

        // Set render to DOM mount.
        if(mount.current){
            mount.current.appendChild(renderer.domElement)
        }

        /* Paint scene */
        const mtlLoader = new MTLLoader();
        mtlLoader.load('/assets/PCB.mtl', (materials) => {
            // Load materials.
            materials.preload()
    
            // Load the .obj file.
            const objLoader = new OBJLoader()
            const scale = 0.04
            const pos_x = 0
            const pos_y = -4
            const pos_z = -3

            // Set loaded materials.
            objLoader.setMaterials(materials)
            objLoader.load('/assets/PCB.obj', (object) => {
                scene.add(object)
                objectRef.current = object
                object.position.set(pos_x, pos_y, pos_z)
                object.rotation.z = Math.PI / 2
                object.scale.set(scale, scale, scale)
            }, undefined, (error) => {
                console.error('An error happened while loading the .obj file:', error)
          })
        }, undefined, (error) => {
            console.error('An error happened while loading the .mtl file:', error)
        })

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // White light with intensity 0.5
        scene.add(ambientLight);
        
        camera.position.z = 7
        // camera.position.x = -1
        // camera.position.y = 0
        // camera.rotation.y = -Math.PI

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
        const controls = new OrbitControls( camera, renderer.domElement );

        // Animation loop.
        const animate = () => {
            requestAnimationFrame(animate)
            controls.update();
            if(objectRef.current){
                objectRef.current.rotation.y += 0.005
            }
            renderer.render(scene, camera)
        };

        animate();

        // Clean up.
        return () => {
            if (mount.current) {
                mount.current.removeChild(renderer.domElement)
            }
            renderer.dispose()
        }

    }, [])

    return <div ref={mount} style={{width: '100%', height: 'auto'}}/>
}
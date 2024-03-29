import {CameraPoints} from "./cinematic";
import {dxDrawLine3D} from "mtasa-lua-types/types/mtasa/client/function/drawing";
import {addEventHandler, removeEventHandler} from "mtasa-lua-types/types/mtasa/client/function/event";
import {outputChatBox} from "mtasa-lua-types/types/mtasa/client/function/output";
import {bindKey} from "mtasa-lua-types/types/mtasa/client/function/input";
import {getCameraMatrix} from "mtasa-lua-types/types/mtasa/client/function/camera";
import { Vector3 } from "mtasa-lua-types/types/mtasa/shared/vector";
import { root } from "mtasa-lua-types/types/mtasa/client/mtasa";

const cameraPoints = new CameraPoints();

// Print into console
bindKey('4', 'down', function () {
        for (const point of cameraPoints.points) {
            const camera = point.camera
            outputChatBox(`{ camera: Vector3(${camera.x}, ${camera.y}, ${camera.z}),`)
            const target = point.target
            outputChatBox(` target: Vector3(${target.x}, ${target.y}, ${target.z}) },`)
        }
    },
    null)

// Add new point
bindKey('5', 'down', function () {
        const values = getCameraMatrix()
        cameraPoints.points.push({
            camera: new Vector3(values[0], values[1], values[2]),
            target: new Vector3(values[3], values[4], values[5])
        })
    },
    null)

addEventHandler('onClientRender', root, function () {
    renderPoints()
})

function renderPoints() {
    for (const position of cameraPoints.points) {
        dxDrawLine3D(
            position.camera.x,
            position.camera.y,
            position.camera.z,
            position.camera.x,
            position.camera.y,
            position.camera.z + 1,
            0xFFFFFFFF as unknown as 0,
        )
        dxDrawLine3D(
            position.target.x,
            position.target.y,
            position.target.z,
            position.target.x,
            position.target.y,
            position.target.z + 1,
            0xFF00FFFF as unknown as 0,
        )
    }
}

bindKey('6', 'down', function () {
    cameraPoints.reset();
    addEventHandler('onClientPreRender', root, cameraFlow)
}, null)

function cameraFlow(ms: number) {
    cameraPoints.iterate(ms)

    if (cameraPoints.isStop()) {
        removeEventHandler('onClientPreRender', root, cameraFlow)
    }
}
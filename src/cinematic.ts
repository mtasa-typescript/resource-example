import {getEasingValue} from "mtasa-lua-types/types/mtasa/client/function/utility";
import {EasingFunction, interpolateBetween, setCameraMatrix, Vector3, Vector3Type} from "../types/additional";

interface CameraPoint {
    camera: Vector3Type,
    target: Vector3Type,
    roll?: number,
    fov?: number,
}

export class CameraPoints {
    CAMERA_VELOCITY = 10 // units per second
    CAMERA_FUNCTION: EasingFunction = 'Linear'

    points: CameraPoint[] = [
        {
            camera: Vector3(2026.9888916016, 1133.0155029297, 54.381034851074),
            target: Vector3(2047.4985351563, 1226.5667724609, 25.614406585693)
        },
        {
            camera: Vector3(2034.0051269531, 1267.76953125, 59.162208557129),
            target: Vector3(2044.7204589844, 1363.8028564453, 33.417507171631),
            fov: 120
        },
        {
            camera: Vector3(2043.6364746094, 1477.4366455078, 48.616836547852),
            target: Vector3(2044.7252197266, 1570.83984375, 12.914506912231),
            roll: 30,
        },
    ]

    private time = 0;
    private pointId = 0;

    getDistance(): number {
        return this.CAMERA_VELOCITY * this.time / 1000;
    }

    /**
     * @return Part of passed distance (0 - not passed, 1 - full passed)
     */
    getPassedDistancePart(): number {
        const expectedDistance = this.points[this.pointId + 1].camera
            .sub(this.points[this.pointId].camera)
            .getLength()

        return this.getDistance() / expectedDistance
    }

    getCameraPosition(): Vector3Type {
        return Vector3(...interpolateBetween(
            this.points[this.pointId].camera,
            this.points[this.pointId + 1].camera,
            this.getPassedDistancePart(),
            this.CAMERA_FUNCTION
        ) as [number, number, number])
    }

    getCameraLookAtPosition(): Vector3Type {
        return Vector3(...interpolateBetween(
            this.points[this.pointId].target,
            this.points[this.pointId + 1].target,
            this.getPassedDistancePart(),
            this.CAMERA_FUNCTION
        ) as [number, number, number])
    }

    getCameraFieldOfView(): number {
        const [from, to] = [
            this.points[this.pointId].fov || 70,
            this.points[this.pointId + 1].fov || 70,
        ]
        const coeff = getEasingValue(this.getPassedDistancePart(), this.CAMERA_FUNCTION);
        return from + (to - from) * coeff
    }

    getCameraRoll(): number {
        const [from, to] = [
            this.points[this.pointId].roll || 0,
            this.points[this.pointId + 1].roll || 0,
        ]
        const coeff = getEasingValue(this.getPassedDistancePart(), this.CAMERA_FUNCTION);
        return from + (to - from) * coeff
    }

    iterate(ms: number): void {
        setCameraMatrix(
            this.getCameraPosition(),
            this.getCameraLookAtPosition(),
            this.getCameraRoll(),
            this.getCameraFieldOfView(),
        )

        this.increaseTime(ms);
    }

    isStop(): boolean {
        return this.pointId >= this.points.length - 1;
    }

    reset(): void {
        this.time = 0;
        this.pointId = 0;
    }

    private increaseTime(ms: number): void {
        const expectedDistance = this.points[this.pointId + 1].camera
            .sub(this.points[this.pointId].camera)
            .getLength()

        if (expectedDistance <= this.getDistance()) {
            this.time = 0;
            ++this.pointId;
        }

        this.time += ms;
    }
}
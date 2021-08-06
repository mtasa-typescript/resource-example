/** You can insert any not declared definitions here (or in another file in this folder)
 * If you have any requests, you can easily submit them here:
 * https://github.com/mtasa-typescript/mtasa-lua-types/issues
 **/

import { Vector3 } from "mtasa-lua-types/types/mtasa/shared/vector";

export interface Vector3Type {
    x: number;
    y: number;
    z: number;
    add: LuaAdditionMethod<Vector3Type|Vector3, Vector3Type>;
    sub: LuaSubtractionMethod<Vector3Type|Vector3, Vector3Type>;

    getLength(): number;
}

export function setCameraMatrix(from: Vector3Type|Vector3 , to: Vector3Type|Vector3, roll?: number, fov?: number): boolean

export type EasingFunction =
    | "Linear"
    | "InQuad"
    | "OutQuad"
    | "InOutQuad"
    | "OutInQuad"
    | "InElastic"
    | "OutElastic"
    | "InOutElastic"
    | "OutInElastic"
    | "InBack"
    | "OutBack"
    | "InOutBack"
    | "OutInBack"
    | "InBounce"
    | "OutBounce"
    | "InOutBounce"
    | "OutInBounce"
    | "SineCurve"
    | "CosineCurve";

export function interpolateBetween(v1: Vector3Type|Vector3, v2: Vector3Type|Vector3, progress: number, easing: EasingFunction): LuaMultiReturn<[number, number, number]>;

export class debug {
    /** @noSelf */
    static traceback(): any;
}

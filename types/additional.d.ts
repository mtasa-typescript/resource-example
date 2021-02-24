export const root: any;

export interface Vector3Type {
    x: number;
    y: number;
    z: number;
    add: LuaAdditionMethod<Vector3Type, Vector3Type>;
    sub: LuaSubtractionMethod<Vector3Type, Vector3Type>;

    getLength(): number;
}

export function Vector3(x: number, y: number, z: number): Vector3Type;

export function setCameraMatrix(from: Vector3Type, to: Vector3Type, roll?: number, fov?: number): boolean

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

export function interpolateBetween(v1: Vector3Type, v2: Vector3Type, progress: number, easing: EasingFunction): LuaMultiReturn<[number, number, number]>;

export class debug {
    /** @noSelf */
    static traceback(): any;
}
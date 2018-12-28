// Type definitions for Leaflet.js 1.2
// Project: https://github.com/Leaflet/Leaflet
// Definitions by: Alejandro Sánchez <https://github.com/alejo90>
//                 Arne Schubert <https://github.com/atd-schubert>
//                 Michael Auer <https://github.com/mcauer>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3



export as namespace GeoJSON;

type NativeMouseEvent = MouseEvent;
type NativeKeyboardEvent = KeyboardEvent;

export type GeoJsonGeometryTypes = "Point" | "LineString" | "MultiPoint" | "Polygon" | "MultiLineString" |
    "MultiPolygon" | "GeometryCollection";

export type GeoJsonTypes = "FeatureCollection" | "Feature" | GeoJsonGeometryTypes;
export type BBox = [number, number, number, number] | [number, number, number, number, number, number];
export type Position = number[];
export interface GeoJsonObject {
    type: GeoJsonTypes;
    bbox?: BBox;
}

export type GeoJSON = Geometry | Feature | FeatureCollection;

export interface GeometryObject extends GeoJsonObject {
    type: GeoJsonGeometryTypes;
}

export type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection;

export interface Point extends GeometryObject {
    type: "Point";
    coordinates: Position;
}

export interface MultiPoint extends GeometryObject {
    type: "MultiPoint";
    coordinates: Position[];
}

export interface LineString extends GeometryObject {
    type: "LineString";
    coordinates: Position[];
}

export interface MultiLineString extends GeometryObject {
    type: "MultiLineString";
    coordinates: Position[][];
}

export interface Polygon extends GeometryObject {
    type: "Polygon";
    coordinates: Position[][];
}
export interface MultiPolygon extends GeometryObject {
    type: "MultiPolygon";
    coordinates: Position[][][];
}

export interface GeometryCollection extends GeometryObject {
    type: "GeometryCollection";
    geometries: Geometry[];
}

export type GeoJsonProperties = { [name: string]: any; } | null;

export interface Feature<G extends GeometryObject | null = Geometry, P = GeoJsonProperties> extends GeoJsonObject {
    type: "Feature";
    geometry: G;
    id?: string | number;
    properties: P;
}

export interface FeatureCollection<G extends GeometryObject | null = Geometry, P = GeoJsonProperties> extends GeoJsonObject {
    type: "FeatureCollection";
    features: Array<Feature<G, P>>;
}

import GeoJSONFeature = GeoJSON.Feature;
import GeoJSONLineString = GeoJSON.LineString;
import GeoJSONMultiLineString = GeoJSON.MultiLineString;
import GeoJSONPolygon = GeoJSON.Polygon;
import GeoJSONMultiPolygon = GeoJSON.MultiPolygon;
import GeoJSONFeatureCollection = GeoJSON.FeatureCollection;
import GeoJSONGeometryObject = GeoJSON.GeometryObject;
import GeoJSONGeometryCollection = GeoJSON.GeometryCollection;
import GeoJSONPoint = GeoJSON.Point;
import GeoJSONMultiPoint = GeoJSON.MultiPoint;
import GeoJSONGeoJsonObject = GeoJSON.GeoJsonObject;

declare namespace L {

    export class Class {
        static extend(props: any): { new(...args: any[]): any } & typeof Class;
        static include(props: any): any & typeof Class;
        static mergeOptions(props: any): any & typeof Class;

        static addInitHook(initHookFn: () => void): any & typeof Class;
        static addInitHook(methodName: string, ...args: any[]): any & typeof Class;
    }

    export class Transformation {
        constructor(a: number, b: number, c: number, d: number);
        transform(point: Point, scale?: number): Point;
        untransform(point: Point, scale?: number): Point;
    }

    export namespace LineUtil {
        function simplify(points: Point[], tolerance: number): Point[];
        function pointToSegmentDistance(p: Point, p1: Point, p2: Point): number;
        function closestPointOnSegment(p: Point, p1: Point, p2: Point): Point;
        function isFlat(latlngs: LatLngExpression[]): boolean;
    }

    export namespace PolyUtil {
        function clipPolygon(points: Point[], bounds: BoundsExpression, round?: boolean): Point[];
    }

    export namespace DomUtil {

        function get(element: string | HTMLElement): HTMLElement | null;
        function getStyle(el: HTMLElement, styleAttrib: string): string | null;
        function create(tagName: string, className?: string, container?: HTMLElement): HTMLElement;
        function remove(el: HTMLElement): void;
        function empty(el: HTMLElement): void;
        function toFront(el: HTMLElement): void;
        function toBack(el: HTMLElement): void;
        function hasClass(el: HTMLElement, name: string): boolean;
        function addClass(el: HTMLElement, name: string): void;
        function removeClass(el: HTMLElement, name: string): void;
        function setClass(el: HTMLElement, name: string): void;
        function getClass(el: HTMLElement): string;
        function setOpacity(el: HTMLElement, opacity: number): void;
        function testProp(props: string[]): string | false;
        function setTransform(el: HTMLElement, offset: Point, scale?: number): void;
        function setPosition(el: HTMLElement, position: Point): void;
        function getPosition(el: HTMLElement): Point;
        function disableTextSelection(): void;
        function enableTextSelection(): void;
        function disableImageDrag(): void;
        function enableImageDrag(): void;
        function preventOutline(el: HTMLElement): void;
        function restoreOutline(): void;

        let TRANSFORM: string;
        let TRANSITION: string;
        let TRANSITION_END: string;
    }

    export interface CRS {
        latLngToPoint(latlng: LatLngExpression, zoom: number): Point;
        pointToLatLng(point: PointExpression, zoom: number): LatLng;
        project(latlng: LatLng | LatLngLiteral): Point;
        unproject(point: PointExpression): LatLng;
        scale(zoom: number): number;
        zoom(scale: number): number;
        getProjectedBounds(zoom: number): Bounds;
        distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
        wrapLatLng(latlng: LatLng | LatLngLiteral): LatLng;

        code?: string;
        wrapLng?: [number, number];
        wrapLat?: [number, number];
        infinite: boolean;
    }

    export namespace CRS {
        const EPSG3395: CRS;
        const EPSG3857: CRS;
        const EPSG4326: CRS;
        const Earth: CRS;
        const Simple: CRS;
    }

    export interface Projection {
        project(latlng: LatLng | LatLngLiteral): Point;
        unproject(point: PointExpression): LatLng;

        bounds: Bounds;
    }

    export namespace Projection {
        const LonLat: Projection;
        const Mercator: Projection;
        const SphericalMercator: Projection;
    }

    export class LatLng {
        constructor(latitude: number, longitude: number, altitude?: number);
        equals(otherLatLng: LatLngExpression, maxMargin?: number): boolean;
        toString(): string;
        distanceTo(otherLatLng: LatLngExpression): number;
        wrap(): LatLng;
        toBounds(sizeInMeters: number): LatLngBounds;

        lat: number;
        lng: number;
        alt?: number;
    }

    export interface LatLngLiteral {
        lat: number;
        lng: number;
    }

    export type LatLngTuple = [number, number];

    export type LatLngExpression = LatLng | LatLngLiteral | LatLngTuple;

    export function latLng(latitude: number, longitude: number, altitude?: number): LatLng;

    export function latLng(coords: LatLngTuple | [number, number, number] | LatLngLiteral | { lat: number, lng: number, alt?: number }): LatLng;

    export class LatLngBounds {
        constructor(southWest: LatLngExpression, northEast: LatLngExpression);
        constructor(latlngs: LatLngBoundsLiteral);
        extend(latlngOrBounds: LatLngExpression | LatLngBoundsExpression): this;
        pad(bufferRatio: number): LatLngBounds;
        getCenter(): LatLng;
        getSouthWest(): LatLng;
        getNorthEast(): LatLng;
        getNorthWest(): LatLng;
        getSouthEast(): LatLng;
        getWest(): number;
        getSouth(): number;
        getEast(): number;
        getNorth(): number;
        contains(otherBoundsOrLatLng: LatLngBoundsExpression | LatLngExpression): boolean;
        intersects(otherBounds: LatLngBoundsExpression): boolean;
        overlaps(otherBounds: BoundsExpression): boolean;
        toBBoxString(): string;
        equals(otherBounds: LatLngBoundsExpression): boolean;
        isValid(): boolean;
    }

    export type LatLngBoundsLiteral = LatLngTuple[];

    export type LatLngBoundsExpression = LatLngBounds | LatLngBoundsLiteral;

    export function latLngBounds(southWest: LatLngExpression, northEast: LatLngExpression): LatLngBounds;

    export function latLngBounds(latlngs: LatLngExpression[]): LatLngBounds;

    export type PointTuple = [number, number];

    export class Point {
        constructor(x: number, y: number, round?: boolean);
        clone(): Point;
        add(otherPoint: PointExpression): Point;
        subtract(otherPoint: PointExpression): Point;
        divideBy(num: number): Point;
        multiplyBy(num: number): Point;
        scaleBy(scale: PointExpression): Point;
        unscaleBy(scale: PointExpression): Point;
        round(): Point;
        floor(): Point;
        ceil(): Point;
        distanceTo(otherPoint: PointExpression): number;
        equals(otherPoint: PointExpression): boolean;
        contains(otherPoint: PointExpression): boolean;
        toString(): string;
        x: number;
        y: number;
    }

    export interface Coords extends Point {
        z: number;
    }

    export type PointExpression = Point | PointTuple;

    export function point(x: number, y: number, round?: boolean): Point;

    export function point(coords: PointTuple | { x: number, y: number }): Point;

    export type BoundsLiteral = [PointTuple, PointTuple];

    export class Bounds {
        constructor(topLeft: PointExpression, bottomRight: PointExpression);
        constructor(points: Point[] | BoundsLiteral);
        extend(point: PointExpression): this;
        getCenter(round?: boolean): Point;
        getBottomLeft(): Point;
        getTopRight(): Point;
        getSize(): Point;
        contains(pointOrBounds: BoundsExpression | PointExpression): boolean;
        intersects(otherBounds: BoundsExpression): boolean;
        overlaps(otherBounds: BoundsExpression): boolean;

        min?: Point;
        max?: Point;
    }

    export type BoundsExpression = Bounds | BoundsLiteral;

    export function bounds(topLeft: PointExpression, bottomRight: PointExpression): Bounds;

    export function bounds(points: Point[] | BoundsLiteral): Bounds;

    export type LeafletEventHandlerFn = (event: LeafletEvent) => void;

    export interface LeafletEventHandlerFnMap {
        [type: string]: LeafletEventHandlerFn;
    }

    export abstract class Evented extends Class {
        on(type: string, fn: LeafletEventHandlerFn, context?: any): this;
        on(eventMap: LeafletEventHandlerFnMap): this;
        off(type: string, fn?: LeafletEventHandlerFn, context?: any): this;
        off(eventMap: LeafletEventHandlerFnMap): this;
        off(): this;
        fire(type: string, data?: any, propagate?: boolean): this;
        listens(type: string): boolean;
        once(type: string, fn: LeafletEventHandlerFn, context?: any): this;
        once(eventMap: LeafletEventHandlerFnMap): this;
        addEventParent(obj: Evented): this;
        removeEventParent(obj: Evented): this;
        addEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;
        addEventListener(eventMap: LeafletEventHandlerFnMap): this;
        removeEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;
        removeEventListener(eventMap: LeafletEventHandlerFnMap): this;
        clearAllEventListeners(): this;
        addOneTimeEventListener(type: string, fn: LeafletEventHandlerFn, context?: any): this;
        addOneTimeEventListener(eventMap: LeafletEventHandlerFnMap): this;
        fireEvent(type: string, data?: any, propagate?: boolean): this;
        hasEventListeners(type: string): boolean;
    }

    export class Draggable extends Evented {
        constructor(element: HTMLElement, dragStartTarget?: HTMLElement, preventOutline?: boolean);

        enable(): void;
        disable(): void;
        finishDrag(): void;
    }

    export interface LayerOptions {
        pane?: string;
        attribution?: string;
    }

    export interface InteractiveLayerOptions extends LayerOptions {
        interactive?: boolean;
        bubblingMouseEvents?: boolean;
    }

    export class Layer extends Evented {
        constructor(options?: LayerOptions);
        addTo(map: Map | LayerGroup): this;
        remove(): this;
        removeFrom(map: Map): this;
        getPane(name?: string): HTMLElement | undefined;
        bindPopup(content: ((layer: Layer) => Content) | Content | Popup, options?: PopupOptions): this;
        unbindPopup(): this;
        openPopup(latlng?: LatLngExpression): this;
        closePopup(): this;
        togglePopup(): this;
        isPopupOpen(): boolean;
        setPopupContent(content: Content | Popup): this;
        getPopup(): Popup | undefined;
        bindTooltip(content: ((layer: Layer) => Content) | Tooltip | Content, options?: TooltipOptions): this;
        unbindTooltip(): this;
        openTooltip(latlng?: LatLngExpression): this;
        closeTooltip(): this;
        toggleTooltip(): this;
        isTooltipOpen(): boolean;
        setTooltipContent(content: Content | Tooltip): this;
        getTooltip(): Tooltip | undefined;
        onAdd(map: Map): this;
        onRemove(map: Map): this;
        getEvents?(): { [name: string]: (event: LeafletEvent) => void };
        getAttribution?(): string | null;
        beforeAdd?(map: Map): this;
        protected _map: Map;
    }

    export interface GridLayerOptions {
        tileSize?: number | Point;
        opacity?: number;
        updateWhenIdle?: boolean;
        updateWhenZooming?: boolean;
        updateInterval?: number;
        attribution?: string;
        zIndex?: number;
        bounds?: LatLngBoundsExpression;
        minZoom?: number;
        maxZoom?: number;
        noWrap?: boolean;
        pane?: string;
        className?: string;
        keepBuffer?: number;
    }

    export type DoneCallback = (error?: Error, tile?: HTMLElement) => void;

    export interface InternalTiles {
        [key: string]: {
            active?: boolean,
            coords: Coords,
            current: boolean,
            el: HTMLElement,
            loaded?: Date,
            retain?: boolean,
        };
    }

    export class GridLayer extends Layer {
        constructor(options?: GridLayerOptions);
        bringToFront(): this;
        bringToBack(): this;
        getContainer(): HTMLElement | null;
        setOpacity(opacity: number): this;
        setZIndex(zIndex: number): this;
        isLoading(): boolean;
        redraw(): this;
        getTileSize(): Point;

        protected createTile(coords: Coords, done: DoneCallback): HTMLElement;
        protected _tileCoordsToKey(coords: Coords): string;

        protected _tiles: InternalTiles;
        protected _tileZoom?: number;
    }

    export function gridLayer(options?: GridLayerOptions): GridLayer;

    export interface TileLayerOptions extends GridLayerOptions {
        minZoom?: number;
        maxZoom?: number;
        maxNativeZoom?: number;
        minNativeZoom?: number;
        subdomains?: string | string[];
        errorTileUrl?: string;
        zoomOffset?: number;
        tms?: boolean;
        zoomReverse?: boolean;
        detectRetina?: boolean;
        crossOrigin?: boolean;
    }

    export class TileLayer extends GridLayer {
        constructor(urlTemplate: string, options?: TileLayerOptions);
        setUrl(url: string, noRedraw?: boolean): this;

        protected _abortLoading(): void;
        protected _getZoomForUrl(): number;

        options: TileLayerOptions;
    }

    export function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;

    export namespace TileLayer {
        class WMS extends TileLayer {
            constructor(baseUrl: string, options: WMSOptions);
            setParams(params: WMSParams, noRedraw?: boolean): this;

            wmsParams: WMSParams;
            options: WMSOptions;
        }
    }

    export interface WMSOptions extends TileLayerOptions {
        layers?: string;
        styles?: string;
        format?: string;
        transparent?: boolean;
        version?: string;
        crs?: CRS;
        uppercase?: boolean;
    }

    export interface WMSParams {
        format?: string;
        layers: string;
        request?: string;
        service?: string;
        styles?: string;
        version?: string;
        transparent?: boolean;
        width?: number;
        height?: number;
    }

    export namespace tileLayer {
        function wms(baseUrl: string, options?: WMSOptions): TileLayer.WMS;
    }

    export interface ImageOverlayOptions extends InteractiveLayerOptions {
        opacity?: number;
        alt?: string;
        interactive?: boolean;
        attribution?: string;
        crossOrigin?: boolean;
        className?: string;
    }

    export class ImageOverlay extends Layer {
        constructor(imageUrl: string, bounds: LatLngBoundsExpression, options?: ImageOverlayOptions);
        setOpacity(opacity: number): this;
        bringToFront(): this;
        bringToBack(): this;
        setUrl(url: string): this;
        setBounds(bounds: LatLngBounds): this;
        getBounds(): LatLngBounds;
        getElement(): HTMLImageElement | undefined;

        options: ImageOverlayOptions;
    }

    export function imageOverlay(imageUrl: string, bounds: LatLngBoundsExpression, options?: ImageOverlayOptions): ImageOverlay;

    export type LineCapShape = 'butt' | 'round' | 'square' | 'inherit';

    export type LineJoinShape = 'miter' | 'round' | 'bevel' | 'inherit';

    export type FillRule = 'nonzero' | 'evenodd' | 'inherit';

    export interface PathOptions extends InteractiveLayerOptions {
        stroke?: boolean;
        color?: string;
        weight?: number;
        opacity?: number;
        lineCap?: LineCapShape;
        lineJoin?: LineJoinShape;
        dashArray?: string;
        dashOffset?: string;
        fill?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        fillRule?: FillRule;
        renderer?: Renderer;
        className?: string;
    }

    export abstract class Path extends Layer {
        redraw(): this;
        setStyle(style: PathOptions): this;
        bringToFront(): this;
        bringToBack(): this;
        getElement(): Element | undefined;

        options: PathOptions;
    }

    export interface PolylineOptions extends PathOptions {
        smoothFactor?: number;
        noClip?: boolean;
    }

    export class Polyline<T extends GeoJSON.GeometryObject = GeoJSON.LineString | GeoJSON.MultiLineString, P = any> extends Path {
        constructor(latlngs: LatLngExpression[] | LatLngExpression[][], options?: PolylineOptions);
        toGeoJSON(): GeoJSON.Feature<T, P>;
        getLatLngs(): LatLng[] | LatLng[][] | LatLng[][][];
        setLatLngs(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]): this;
        isEmpty(): boolean;
        getCenter(): LatLng;
        getBounds(): LatLngBounds;
        addLatLng(latlng: LatLngExpression | LatLngExpression[]): this;

        feature?: GeoJSON.Feature<T, P>;
        options: PolylineOptions;
    }

    export function polyline(latlngs: LatLngExpression[] | LatLngExpression[][], options?: PolylineOptions): Polyline;

    export class Polygon<P = any> extends Polyline<GeoJSON.Polygon | GeoJSON.MultiPolygon, P> {
        constructor(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], options?: PolylineOptions);
    }

    export function polygon(latlngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], options?: PolylineOptions): Polygon;

    export class Rectangle<P = any> extends Polygon<P> {
        constructor(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions);
        setBounds(latLngBounds: LatLngBoundsExpression): this;
    }

    export function rectangle(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions): Rectangle;

    export interface CircleMarkerOptions extends PathOptions {
        radius?: number;
    }

    export class CircleMarker<P = any> extends Path {
        constructor(latlng: LatLngExpression, options?: CircleMarkerOptions);
        toGeoJSON(): GeoJSON.Feature<GeoJSON.Point, P>;
        setLatLng(latLng: LatLngExpression): this;
        getLatLng(): LatLng;
        setRadius(radius: number): this;
        getRadius(): number;

        options: CircleMarkerOptions;
        feature?: GeoJSON.Feature<GeoJSON.Point, P>;
    }

    export function circleMarker(latlng: LatLngExpression, options?: CircleMarkerOptions): CircleMarker;

    export class Circle<P = any> extends CircleMarker<P> {
        constructor(latlng: LatLngExpression, options?: CircleMarkerOptions);
        constructor(latlng: LatLngExpression, radius: number, options?: CircleMarkerOptions);
        getBounds(): LatLngBounds;
    }

    export function circle(latlng: LatLngExpression, options?: CircleMarkerOptions): Circle;
    export function circle(latlng: LatLngExpression, radius: number, options?: CircleMarkerOptions): Circle;

    export interface RendererOptions extends LayerOptions {
        padding?: number;
    }

    export class Renderer extends Layer {
        constructor(options?: RendererOptions);

        options: RendererOptions;
    }

    export class SVG extends Renderer { }

    export namespace SVG {
        function create(name: string): SVGElement;

        function pointsToPath(rings: PointExpression[], close: boolean): string;
    }

    export function svg(options?: RendererOptions): SVG;

    export class Canvas extends Renderer { }

    export function canvas(options?: RendererOptions): Canvas;

    export class LayerGroup<P = any> extends Layer {
        constructor(layers?: Layer[], options?: LayerOptions);
        toGeoJSON(): GeoJSON.FeatureCollection<GeoJSON.GeometryObject, P> | GeoJSON.Feature<GeoJSON.MultiPoint, P> | GeoJSON.GeometryCollection;
        addLayer(layer: Layer): this;
        removeLayer(layer: number | Layer): this;
        hasLayer(layer: Layer): boolean;
        clearLayers(): this;
        invoke(methodName: string, ...params: any[]): this;
        eachLayer(fn: (layer: Layer) => void, context?: any): this;
        getLayer(id: number): Layer | undefined;
        getLayers(): Layer[];
        setZIndex(zIndex: number): this;
        getLayerId(layer: Layer): number;

        feature?: GeoJSON.FeatureCollection<GeoJSON.GeometryObject, P> | GeoJSON.Feature<GeoJSON.MultiPoint, P> | GeoJSON.GeometryCollection;
    }

    export function layerGroup(layers?: Layer[], options?: LayerOptions): LayerGroup;

    export class FeatureGroup<P = any> extends LayerGroup<P> {
        setStyle(style: PathOptions): this;
        bringToFront(): this;
        bringToBack(): this;
        getBounds(): LatLngBounds;
    }

    export function featureGroup(layers?: Layer[]): FeatureGroup;

    export type StyleFunction<P = any> = (feature?: GeoJSON.Feature<GeoJSON.GeometryObject, P>) => PathOptions;

    export interface GeoJSONOptions<P = any> extends LayerOptions {

        pointToLayer?(geoJsonPoint: GeoJSON.Feature<GeoJSON.Point, P>, latlng: LatLng): Layer; // should import GeoJSON typings

        style?: PathOptions | StyleFunction<P>;
        onEachFeature?(feature: GeoJSON.Feature<GeoJSON.GeometryObject, P>, layer: Layer): void;
        filter?(geoJsonFeature: GeoJSON.Feature<GeoJSON.GeometryObject, P>): boolean;
        coordsToLatLng?(coords: [number, number] | [number, number, number]): LatLng; // check if LatLng has an altitude property
    }

    export class GeoJSON<P = any> extends FeatureGroup<P> {

        static geometryToLayer<P = any>(featureData: GeoJSON.Feature<GeoJSON.GeometryObject, P>, options?: GeoJSONOptions<P>): Layer;
        static coordsToLatLng(coords: [number, number] | [number, number, number]): LatLng;
        static coordsToLatLngs(
            coords: any[],
            levelsDeep?: number,
            coordsToLatLng?: (coords: [number, number] | [number, number, number]) => LatLng): any[]; // Using any[] to avoid artificially limiting valid calls
        static latLngToCoords(latlng: LatLng): [number, number] | [number, number, number];
        static latLngsToCoords(latlngs: any[], levelsDeep?: number, closed?: boolean): any[];  // Using any[] to avoid artificially limiting valid calls
        static asFeature<P = any>(geojson: GeoJSON.Feature<GeoJSON.GeometryObject, P> | GeoJSON.GeometryObject): GeoJSON.Feature<GeoJSON.GeometryObject, P>;
        constructor(geojson?: GeoJSON.GeoJsonObject, options?: GeoJSONOptions<P>)

        addData(data: GeoJSON.GeoJsonObject): Layer;
        resetStyle(layer: Layer): Layer;
        setStyle(style: PathOptions | StyleFunction<P>): this;

        options: GeoJSONOptions<P>;
    }


    export function geoJSON<P = any>(geojson?: GeoJSON.GeoJsonObject, options?: GeoJSONOptions<P>): GeoJSON<P>;
    export type Zoom = boolean | 'center';
    export interface MapOptions {
        preferCanvas?: boolean;
        attributionControl?: boolean;
        zoomControl?: boolean;
        closePopupOnClick?: boolean;
        zoomSnap?: number;
        zoomDelta?: number;
        trackResize?: boolean;
        boxZoom?: boolean;
        doubleClickZoom?: Zoom;
        dragging?: boolean;
        crs?: CRS;
        center?: LatLngExpression;
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        layers?: Layer[];
        maxBounds?: LatLngBoundsExpression;
        renderer?: Renderer;
        fadeAnimation?: boolean;
        markerZoomAnimation?: boolean;
        transform3DLimit?: number;
        zoomAnimation?: boolean;
        zoomAnimationThreshold?: number;
        inertia?: boolean;
        inertiaDeceleration?: number;
        inertiaMaxSpeed?: number;
        easeLinearity?: number;
        worldCopyJump?: boolean;
        maxBoundsViscosity?: number;
        keyboard?: boolean;
        keyboardPanDelta?: number;
        scrollWheelZoom?: Zoom;
        wheelDebounceTime?: number;
        wheelPxPerZoomLevel?: number;
        tap?: boolean;
        tapTolerance?: number;
        touchZoom?: Zoom;
        bounceAtZoomLimits?: boolean;
    }

    export type ControlPosition = 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

    export interface ControlOptions {
        position?: ControlPosition;
    }

    export class Control extends Class {
        constructor(options?: ControlOptions);
        getPosition(): ControlPosition;
        setPosition(position: ControlPosition): this;
        getContainer(): HTMLElement | undefined;
        addTo(map: Map): this;
        remove(): this;
        onAdd?(map: Map): HTMLElement;
        onRemove?(map: Map): void;

        options: ControlOptions;
    }

    export namespace Control {
        interface ZoomOptions extends ControlOptions {
            zoomInText?: string;
            zoomInTitle?: string;
            zoomOutText?: string;
            zoomOutTitle?: string;
        }

        class Zoom extends Control {
            constructor(options?: ZoomOptions);
            options: ZoomOptions;
        }

        interface AttributionOptions extends ControlOptions {
            prefix?: string | boolean;
        }

        class Attribution extends Control {
            constructor(options?: AttributionOptions);
            setPrefix(prefix: string): this;
            addAttribution(text: string): this;
            removeAttribution(text: string): this;
            options: AttributionOptions;
        }

        interface LayersOptions extends ControlOptions {
            collapsed?: boolean;
            autoZIndex?: boolean;
            hideSingleBase?: boolean;
        }

        interface LayersObject {
            [name: string]: Layer;
        }

        class Layers extends Control {
            constructor(baseLayers?: LayersObject, overlays?: LayersObject, options?: LayersOptions);
            addBaseLayer(layer: Layer, name: string): this;
            addOverlay(layer: Layer, name: string): this;
            removeLayer(layer: Layer): this;
            expand(): this;
            collapse(): this;
            options: LayersOptions;
        }

        interface ScaleOptions extends ControlOptions {
            maxWidth?: number;
            metric?: boolean;
            imperial?: boolean;
            updateWhenIdle?: boolean;
        }

        class Scale extends Control {
            constructor(options?: ScaleOptions);
            options: ScaleOptions;
        }
    }

    export namespace control {
        function zoom(options?: Control.ZoomOptions): Control.Zoom;
        function attribution(options?: Control.AttributionOptions): Control.Attribution;
        function layers(baseLayers?: Control.LayersObject, overlays?: Control.LayersObject, options?: Control.LayersOptions): Control.Layers;
        function scale(options?: Control.ScaleOptions): Control.Scale;
    }

    export interface DivOverlayOptions {
        offset?: PointExpression;
        zoomAnimation?: boolean;
        className?: string;
        pane?: string;
    }

    export interface PopupOptions extends DivOverlayOptions {
        maxWidth?: number;
        minWidth?: number;
        maxHeight?: number;
        autoPan?: boolean;
        autoPanPaddingTopLeft?: PointExpression;
        autoPanPaddingBottomRight?: PointExpression;
        autoPanPadding?: PointExpression;
        keepInView?: boolean;
        closeButton?: boolean;
        autoClose?: boolean;
        closeOnClick?: boolean;
    }

    export type Content = string | HTMLElement;

    export class Popup extends Layer {
        constructor(options?: PopupOptions, source?: Layer);
        getLatLng(): LatLng | undefined;
        setLatLng(latlng: LatLngExpression): this;
        getContent(): Content | ((source: Layer) => Content) | undefined;
        setContent(htmlContent: ((source: Layer) => Content) | Content): this;
        getElement(): HTMLElement | undefined;
        update(): void;
        isOpen(): boolean;
        bringToFront(): this;
        bringToBack(): this;
        openOn(map: Map): this;
        options: PopupOptions;
    }

    export function popup(options?: PopupOptions, source?: Layer): Popup;

    export type Direction = 'right' | 'left' | 'top' | 'bottom' | 'center' | 'auto';

    export interface TooltipOptions extends DivOverlayOptions {
        pane?: string;
        offset?: PointExpression;
        direction?: Direction;
        permanent?: boolean;
        sticky?: boolean;
        interactive?: boolean;
        opacity?: number;
    }

    export class Tooltip extends Layer {
        constructor(options?: TooltipOptions, source?: Layer);
        setOpacity(val: number): void;
        getLatLng(): LatLng | undefined;
        setLatLng(latlng: LatLngExpression): this;
        getContent(): Content | undefined;
        setContent(htmlContent: ((source: Layer) => Content) | Content): this;
        getElement(): HTMLElement | undefined;
        update(): void;
        isOpen(): boolean;
        bringToFront(): this;
        bringToBack(): this;
        options: TooltipOptions;
    }

    export function tooltip(options?: TooltipOptions, source?: Layer): Tooltip;

    export interface ZoomOptions {
        animate?: boolean;
    }

    export interface PanOptions {
        animate?: boolean;
        duration?: number;
        easeLinearity?: number;
        noMoveStart?: boolean;
    }

    export interface ZoomPanOptions extends ZoomOptions, PanOptions { }

    export interface FitBoundsOptions extends ZoomOptions, PanOptions {
        paddingTopLeft?: PointExpression;
        paddingBottomRight?: PointExpression;
        padding?: PointExpression;
        maxZoom?: number;
    }

    export interface LocateOptions {
        watch?: boolean;
        setView?: boolean;
        maxZoom?: number;
        timeout?: number;
        maximumAge?: number;
        enableHighAccuracy?: boolean;
    }

    export class Handler extends Class {
        constructor(map: Map);
        enable(): this;
        disable(): this;
        enabled(): boolean;
        addHooks?(): void;
        removeHooks?(): void;
    }

    export interface LeafletEvent {
        type: string;
        target: any;
    }

    export interface LeafletMouseEvent extends LeafletEvent {
        latlng: LatLng;
        layerPoint: Point;
        containerPoint: Point;
        originalEvent: MouseEvent;
    }

    export interface LeafletKeyboardEvent extends LeafletEvent {
        originalEvent: KeyboardEvent;
    }

    export interface LocationEvent extends LeafletEvent {
        latlng: LatLng;
        bounds: LatLngBounds;
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number;
        speed: number;
        timestamp: number;
    }

    export interface ErrorEvent extends LeafletEvent {
        message: string;
        code: number;
    }

    export interface LayerEvent extends LeafletEvent {
        layer: Layer;
    }

    export interface LayersControlEvent extends LayerEvent {
        name: string;
    }

    export interface TileEvent extends LeafletEvent {
        tile: HTMLImageElement;
        coords: Point;
    }

    export interface TileErrorEvent extends TileEvent {
        error: Error;
    }

    export interface ResizeEvent extends LeafletEvent {
        oldSize: Point;
        newSize: Point;
    }

    export interface GeoJSONEvent extends LeafletEvent {
        layer: Layer;
        properties: any;
        geometryType: string;
        id: string;
    }

    export interface PopupEvent extends LeafletEvent {
        popup: Popup;
    }

    export interface TooltipEvent extends LeafletEvent {
        tooltip: Tooltip;
    }

    export interface DragEndEvent extends LeafletEvent {
        distance: number;
    }

    export interface ZoomAnimEvent extends LeafletEvent {
        center: LatLng;
        zoom: number;
        noUpdate: boolean;
    }

    export namespace DomEvent {
        type EventHandlerFn = (event: Event) => void;
        function on(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        function on(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
        function off(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        function off(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
        function stopPropagation(ev: Event): typeof DomEvent;
        function disableScrollPropagation(el: HTMLElement): typeof DomEvent;
        function disableClickPropagation(el: HTMLElement): typeof DomEvent;
        function preventDefault(ev: Event): typeof DomEvent;
        function stop(ev: Event): typeof DomEvent;
        function getMousePosition(ev: MouseEvent, container?: HTMLElement): Point;
        function getWheelDelta(ev: Event): number;
        function addListener(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        function addListener(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
        function removeListener(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        function removeListener(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
    }

    export interface DefaultMapPanes {
        mapPane: HTMLElement;
        tilePane: HTMLElement;
        overlayPane: HTMLElement;
        shadowPane: HTMLElement;
        markerPane: HTMLElement;
        tooltipPane: HTMLElement;
        popupPane: HTMLElement;
    }

    export class Map extends Evented {
        constructor(element: string | HTMLElement, options?: MapOptions);
        getRenderer(layer: Path): Renderer;
        addControl(control: Control): this;
        removeControl(control: Control): this;
        addLayer(layer: Layer): this;
        removeLayer(layer: Layer): this;
        hasLayer(layer: Layer): boolean;
        eachLayer(fn: (layer: Layer) => void, context?: any): this;
        openPopup(popup: Popup): this;
        openPopup(content: Content, latlng: LatLngExpression, options?: PopupOptions): this;
        closePopup(popup?: Popup): this;
        openTooltip(tooltip: Tooltip): this;
        openTooltip(content: Content, latlng: LatLngExpression, options?: TooltipOptions): this;
        closeTooltip(tooltip?: Tooltip): this;
        setView(center: LatLngExpression, zoom: number, options?: ZoomPanOptions): this;
        setZoom(zoom: number, options?: ZoomPanOptions): this;
        zoomIn(delta?: number, options?: ZoomOptions): this;
        zoomOut(delta?: number, options?: ZoomOptions): this;
        setZoomAround(position: Point | LatLngExpression, zoom: number, options?: ZoomOptions): this;
        fitBounds(bounds: LatLngBoundsExpression, options?: FitBoundsOptions): this;
        fitWorld(options?: FitBoundsOptions): this;
        panTo(latlng: LatLngExpression, options?: PanOptions): this;
        panBy(offset: PointExpression): this;
        setMaxBounds(bounds: LatLngBoundsExpression): this;
        setMinZoom(zoom: number): this;
        setMaxZoom(zoom: number): this;
        panInsideBounds(bounds: LatLngBoundsExpression, options?: PanOptions): this;
        invalidateSize(options?: boolean | ZoomPanOptions): this;
        stop(): this;
        flyTo(latlng: LatLngExpression, zoom?: number, options?: ZoomPanOptions): this;
        flyToBounds(bounds: LatLngBoundsExpression, options?: FitBoundsOptions): this;
        addHandler(name: string, HandlerClass: typeof Handler): this;
        remove(): this;
        createPane(name: string, container?: HTMLElement): HTMLElement;
        getPane(pane: string | HTMLElement): HTMLElement | undefined;
        getPanes(): { [name: string]: HTMLElement } & DefaultMapPanes;
        getContainer(): HTMLElement;
        whenReady(fn: () => void, context?: any): this;
        getCenter(): LatLng;
        getZoom(): number;
        getBounds(): LatLngBounds;
        getMinZoom(): number;
        getMaxZoom(): number;
        getBoundsZoom(bounds: LatLngBoundsExpression, inside?: boolean): number;
        getSize(): Point;
        getPixelBounds(): Bounds;
        getPixelOrigin(): Point;
        getPixelWorldBounds(zoom?: number): Bounds;
        getZoomScale(toZoom: number, fromZoom: number): number;
        getScaleZoom(scale: number, fromZoom: number): number;
        project(latlng: LatLngExpression, zoom: number): Point;
        unproject(point: PointExpression, zoom: number): LatLng;
        layerPointToLatLng(point: PointExpression): LatLng;
        latLngToLayerPoint(latlng: LatLngExpression): Point;
        wrapLatLng(latlng: LatLngExpression): LatLng;
        wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds;
        distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
        containerPointToLayerPoint(point: PointExpression): Point;
        containerPointToLatLng(point: PointExpression): LatLng;
        layerPointToContainerPoint(point: PointExpression): Point;
        latLngToContainerPoint(latlng: LatLngExpression): Point;
        mouseEventToContainerPoint(ev: MouseEvent): Point;
        mouseEventToLayerPoint(ev: MouseEvent): Point;
        mouseEventToLatLng(ev: MouseEvent): LatLng;
        locate(options?: LocateOptions): this;
        stopLocate(): this;
        boxZoom: Handler;
        doubleClickZoom: Handler;
        dragging: Handler;
        keyboard: Handler;
        scrollWheelZoom: Handler;
        tap?: Handler;
        touchZoom: Handler;
        zoomControl: Control.Zoom;
        options: MapOptions;
    }

    export function map(element: string | HTMLElement, options?: MapOptions): Map;

    export interface BaseIconOptions extends LayerOptions {
        iconUrl?: string;
        iconRetinaUrl?: string;
        iconSize?: PointExpression;
        iconAnchor?: PointExpression;
        popupAnchor?: PointExpression;
        tooltipAnchor?: PointExpression;
        shadowUrl?: string;
        shadowRetinaUrl?: string;
        shadowSize?: PointExpression;
        shadowAnchor?: PointExpression;
        className?: string;
    }

    export interface IconOptions extends BaseIconOptions {
        iconUrl: string;
    }

    export class Icon<T extends BaseIconOptions = IconOptions> extends Layer {
        constructor(options: T);
        createIcon(oldIcon?: HTMLElement): HTMLElement;
        createShadow(oldIcon?: HTMLElement): HTMLElement;

        options: T;
    }

    export namespace Icon {
        interface DefaultIconOptions extends BaseIconOptions {
            imagePath?: string;
        }

        class Default extends Icon<DefaultIconOptions> {
            static imagePath?: string;
            constructor(options?: DefaultIconOptions);
        }
    }

    export function icon(options: IconOptions): Icon;

    export interface DivIconOptions extends BaseIconOptions {
        html?: string | false;
        bgPos?: PointExpression;
        iconSize?: PointExpression;
        iconAnchor?: PointExpression;
        popupAnchor?: PointExpression;
        className?: string;
    }

    export class DivIcon extends Icon<DivIconOptions> {
        constructor(options?: DivIconOptions);
    }

    export function divIcon(options?: DivIconOptions): DivIcon;

    export interface MarkerOptions extends InteractiveLayerOptions {
        icon?: Icon | DivIcon;
        clickable?: boolean;
        draggable?: boolean;
        keyboard?: boolean;
        title?: string;
        alt?: string;
        zIndexOffset?: number;
        opacity?: number;
        riseOnHover?: boolean;
        riseOffset?: number;
    }

    export class Marker<P = any> extends Layer {
        constructor(latlng: LatLngExpression, options?: MarkerOptions);
        toGeoJSON(): GeoJSON.Feature<GeoJSON.Point, P>;
        getLatLng(): LatLng;
        setLatLng(latlng: LatLngExpression): this;
        setZIndexOffset(offset: number): this;
        setIcon(icon: Icon | DivIcon): this;
        setOpacity(opacity: number): this;
        getElement(): HTMLElement | undefined;
        options: MarkerOptions;
        dragging?: Handler;
        feature?: GeoJSON.Feature<GeoJSON.Point, P>;
    }

    export function marker(latlng: LatLngExpression, options?: MarkerOptions): Marker;

    export namespace Browser {
        const ie: boolean;
        const ielt9: boolean;
        const edge: boolean;
        const webkit: boolean;
        const gecko: boolean;
        const android: boolean;
        const android23: boolean;
        const chrome: boolean;
        const safari: boolean;
        const win: boolean;
        const ie3d: boolean;
        const webkit3d: boolean;
        const gecko3d: boolean;
        const opera12: boolean;
        const any3d: boolean;
        const mobile: boolean;
        const mobileWebkit: boolean;
        const mobileWebkit3d: boolean;
        const mobileOpera: boolean;
        const mobileGecko: boolean;
        const touch: boolean;
        const msPointer: boolean;
        const pointer: boolean;
        const retina: boolean;
        const canvas: boolean;
        const vml: boolean;
        const svg: boolean;
    }

    export namespace Util {
        function extend<D extends object, S1 extends object = {}>(dest: D, src?: S1): D & S1;
        function extend<D extends object, S1 extends object, S2 extends object>(dest: D, src1: S1, src2: S2): D & S1 & S2;
        function extend<D extends object, S1 extends object, S2 extends object, S3 extends object>(dest: D, src1: S1, src2: S2, src3: S3): D & S1 & S2 & S3;
        function extend(dest: any, ...src: any[]): any;
        function create(proto: object | null, properties?: PropertyDescriptorMap): any;
        function bind(fn: () => void, ...obj: any[]): () => void;
        function stamp(obj: any): number;
        function throttle(fn: () => void, time: number, context: any): () => void;
        function wrapNum(num: number, range: number[], includeMax?: boolean): number;
        function falseFn(): false;
        function formatNum(num: number, digits?: number): number;
        function trim(str: string): string;
        function splitWords(str: string): string[];
        function setOptions(obj: any, options: any): any;
        function getParamString(obj: any, existingUrl?: string, uppercase?: boolean): string;
        function template(str: string, data: any): string;
        function isArray(obj: any): boolean;
        function indexOf(array: any[], el: any): number;
        function requestAnimFrame(fn: (timestamp: number) => void, context?: any, immediate?: boolean): number;
        function cancelAnimFrame(id: number): void;
        let lastId: number;
        let emptyImageUrl: string;

    }
}


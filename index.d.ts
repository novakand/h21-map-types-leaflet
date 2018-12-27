// Type definitions for Leaflet.js 1.0
// Project: https://github.com/Leaflet/Leaflet
// Definitions by: Alejandro Sánchez <https://github.com/alejo90>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


type NativeMouseEvent = MouseEvent;
type NativeKeyboardEvent = KeyboardEvent;

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
        static extend(props: any): any;
        static include(props: any): any;
        static mergeOptions(props: any): any;
        static addInitHook(initHookFn: () => void): any;
    }

    export class Transformation {
        constructor(a: number, b: number, c: number, d: number);
        transform(point: Point, scale?: number): Point;
        untransform(point: Point, scale?: number): Point;
    }

    export namespace LineUtil {
        export function simplify(points: PointExpression[], tolerance: number): Point[];
        export function pointToSegmentDistance(p: PointExpression, p1: PointExpression, p2: PointExpression): number;
        export function closestPointOnSegment(p: PointExpression, p1: PointExpression, p2: PointExpression): Point;
    }

    export namespace PolyUtil {
        export function clipPolygon(points: PointExpression[], bounds: BoundsExpression, round?: boolean): Point[];
    }

    export class DomUtil {
        static get(element: string | HTMLElement): HTMLElement;
        static getStyle(el: HTMLElement, styleAttrib: string): string;
        static create(tagName: string, className?: string, container?: HTMLElement): HTMLElement;
        static remove(el: HTMLElement): void;
        static empty(el: HTMLElement): void;
        static toFront(el: HTMLElement): void;
        static toBack(el: HTMLElement): void;
        static hasClass(el: HTMLElement, name: string): boolean;
        static addClass(el: HTMLElement, name: string): void;
        static removeClass(el: HTMLElement, name: string): void;
        static setClass(el: HTMLElement, name: string): void;
        static getClass(el: HTMLElement): string;
        static setOpacity(el: HTMLElement, opacity: number): void;
        static testProp(props: string[]): string | boolean;
        static setTransform(el: HTMLElement, offset: Point, scale?: number): void;
        static setPosition(el: HTMLElement, position: Point): void;
        static getPosition(el: HTMLElement): Point;
        static disableTextSelection(): void;
        static enableTextSelection(): void;
        static disableImageDrag(): void;
        static enableImageDrag(): void;
        static preventOutline(el: HTMLElement): void;
        static restoreOutline(): void;
    }

    export abstract class CRS {
        latLngToPoint(latlng: LatLngExpression, zoom: number): Point;
        pointToLatLng(point: PointExpression, zoom: number): LatLng;
        project(latlng: LatLngExpression): Point;
        unproject(point: PointExpression): LatLng;
        scale(zoom: number): number;
        zoom(scale: number): number;
        getProjectedBounds(zoom: number): Bounds;
        distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
        wrapLatLng(latlng: LatLngExpression): LatLng;
        code: string;
        wrapLng: [number, number];
        wrapLat: [number, number];
        infinite: boolean;
    }

    export namespace CRS {
        export const EPSG3395: CRS;
        export const EPSG3857: CRS;
        export const EPSG4326: CRS;
        export const Earth: CRS;
        export const Simple: CRS;
    }

    export interface Projection {
        project(latlng: LatLngExpression): Point;
        unproject(point: PointExpression): LatLng;
        bounds: LatLngBounds;
    }

    export namespace Projection {
        export const LonLat: Projection;
        export const Mercator: Projection;
        export const SphericalMercator: Projection;
    }

    export class LatLng {
        constructor(latitude: number, longitude: number, altitude?: number);
        constructor(coords: LatLngTuple | [number, number, number] | LatLngLiteral | { lat: number, lng: number, alt?: number });
        equals(otherLatLng: LatLngExpression, maxMargin?: number): boolean;
        toString(): string;
        distanceTo(otherLatLng: LatLngExpression): number;
        wrap(): LatLng;
        toBounds(sizeInMeters: number): LatLngBounds;
        lat: number;
        lng: number;
        alt: number;
    }

    export interface LatLngLiteral {
        lat: number;
        lng: number;
    }

    export type LatLngTuple = [number, number];

    type LatLngExpression = LatLng | LatLngLiteral | LatLngTuple;

    export function latLng(latitude: number, longitude: number, altitude?: number): LatLng;

    export function latLng(coords: LatLngTuple | [number, number, number] | LatLngLiteral | { lat: number, lng: number, alt?: number }): LatLng;

    export class LatLngBounds {
        constructor(southWest: LatLngExpression, northEast: LatLngExpression);
        constructor(latlngs: LatLngBoundsLiteral);
        extend(latlngOrBounds: LatLngExpression | LatLngBoundsExpression): this;
        pad(bufferRatio: number): LatLngBounds; // does this modify the current instance or does it return a new one?
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

    type LatLngBoundsExpression = LatLngBounds | LatLngBoundsLiteral;

    export function latLngBounds(southWest: LatLngExpression, northEast: LatLngExpression): LatLngBounds;

    export function latLngBounds(latlngs: LatLngBoundsLiteral): LatLngBounds;

    export type PointTuple = [number, number];

    export class Point {
        constructor(x: number, y: number, round?: boolean);
        constructor(coords: PointTuple | { x: number, y: number });
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

    type PointExpression = Point | PointTuple;

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
        min: Point;
        max: Point;
    }

    type BoundsExpression = Bounds | BoundsLiteral;

    export function bounds(topLeft: PointExpression, bottomRight: PointExpression): Bounds;

    export function bounds(points: Point[] | BoundsLiteral): Bounds;

    export type EventHandlerFn = (event: Event) => void;

    export interface EventHandlerFnMap {
        [type: string]: EventHandlerFn;
    }

    export abstract class Evented extends Class {
        on(type: string, fn: EventHandlerFn, context?: any): this;
        on(eventMap: EventHandlerFnMap): this;
        off(type: string, fn?: EventHandlerFn, context?: any): this;
        off(eventMap: EventHandlerFnMap): this;
        off(): this;
        fire(type: string, data?: any, propagate?: boolean): this;
        listens(type: string): boolean;
        once(type: string, fn: EventHandlerFn, context?: any): this;
        once(eventMap: EventHandlerFnMap): this;
        addEventParent(obj: Evented): this;
        removeEventParent(obj: Evented): this;
        addEventListener(type: string, fn: EventHandlerFn, context?: any): this;
        addEventListener(eventMap: EventHandlerFnMap): this;
        removeEventListener(type: string, fn: EventHandlerFn, context?: any): this;
        removeEventListener(eventMap: EventHandlerFnMap): this;
        clearAllEventListeners(): this;
        addOneTimeEventListener(type: string, fn: EventHandlerFn, context?: any): this;
        addOneTimeEventListener(eventMap: EventHandlerFnMap): this;
        fireEvent(type: string, data?: any, propagate?: boolean): this;
        hasEventListeners(type: string): boolean;
    }

    export class Draggable extends Evented {
        constructor(element: HTMLElement, dragStartTarget?: HTMLElement, preventOutline?: boolean);
        enable(): void;
        disable(): void;
        finishDrag(): void;
    }

    interface LayerOptions {
        pane?: string;
    }

    interface InteractiveLayerOptions extends LayerOptions {
        interactive?: boolean;
    }

    export class Layer extends Evented {
        constructor(options?: LayerOptions);
        addTo(map: Map): this;
        remove(): this;
        removeFrom(map: Map): this;
        getPane(name?: string): HTMLElement;

        /***** Popup methods *****/
        bindPopup(content: ((layer: Layer) => Content) | Content | Popup, options?: PopupOptions): this;
        unbindPopup(): this;
        openPopup(latlng?: LatLngExpression): this;
        closePopup(): this;
        togglePopup(): this;
        isPopupOpen(): boolean;
        setPopupContent(content: Content | Popup): this;
        getPopup(): Popup;

        /******Tooltip methods ******/
        bindTooltip(content: ((layer: Layer) => Content) | Tooltip | Content, options?: TooltipOptions): this;
        unbindTooltip(): this;
        openTooltip(latlng?: LatLngExpression): this;
        closeTooltip(): this;
        toggleTooltip(): this;
        isTooltipOpen(): boolean;
        setTooltipContent(content: Content | Tooltip): this;
        getTooltip(): Tooltip;

        /***** Extension methods *****/
        onAdd(map: Map): this;
        onRemove(map: Map): this;
        getEvents(): { [name: string]: (event: Event) => void };
        getAttribution(): string;
        beforeAdd(map: Map): this;
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

    export class GridLayer extends Layer {
        constructor(options?: GridLayerOptions);
        bringToFront(): this;
        bringToBack(): this;
        getAttribution(): string;
        getContainer(): HTMLElement;
        setOpacity(opacity: number): this;
        setZIndex(zIndex: number): this;
        isLoading(): boolean;
        redraw(): this;
        getTileSize(): Point;
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
        [name: string]: any;
    }

    export class TileLayer extends GridLayer {
        constructor(urlTemplate: string, options?: TileLayerOptions);
        setUrl(url: string, noRedraw?: boolean): this;
        options: TileLayerOptions;
    }

    export function tileLayer(urlTemplate: string, options?: TileLayerOptions): TileLayer;

    export namespace TileLayer {
        export class WMS extends TileLayer {
            constructor(baseUrl: string, options: WMSOptions);
            setParams(params: WMSParams, noRedraw?: boolean): this;
            wmsParams: WMSParams;
            options: WMSOptions;
        }
    }

    export interface WMSOptions extends TileLayerOptions {
        layers: string;
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
        export function wms(baseUrl: string, options?: WMSOptions): TileLayer.WMS;
    }

    export interface ImageOverlayOptions extends LayerOptions {
        opacity?: number;
        alt?: string;
        interactive?: boolean;
        attribution?: string;
        crossOrigin?: boolean;
    }

    export class ImageOverlay extends Layer {
        constructor(imageUrl: string, bounds: LatLngBoundsExpression, options?: ImageOverlayOptions);
        setOpacity(opacity: number): this;
        bringToFront(): this;
        bringToBack(): this;
        setUrl(url: string): this;
        setBounds(bounds: LatLngBounds): this;
        getBounds(): LatLngBounds;
        getElement(): HTMLImageElement;
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
        getElement(): HTMLElement;
        options: PathOptions;
    }

    export interface PolylineOptions extends PathOptions {
        smoothFactor?: number;
        noClip?: boolean;
    }

    class InternalPolyline extends Path {
        getLatLngs(): LatLng[];
        setLatLngs(latlngs: LatLngExpression[]): this;
        isEmpty(): boolean;
        getCenter(): LatLng;
        getBounds(): LatLngBounds;
        addLatLng(latlng: LatLngExpression | LatLngExpression[]): this;
        options: PolylineOptions;
    }

    export class Polyline extends InternalPolyline {
        constructor(latlngs: LatLngExpression[], options?: PolylineOptions);
        toGeoJSON(): GeoJSONFeature<GeoJSONLineString | GeoJSONMultiLineString>;
        feature: GeoJSONFeature<GeoJSONLineString | GeoJSONMultiLineString>;
    }

    export function polyline(latlngs: LatLngExpression[], options?: PolylineOptions): Polyline;

    export class Polygon extends InternalPolyline {
        constructor(latlngs: LatLngExpression[], options?: PolylineOptions);
        toGeoJSON(): GeoJSONFeature<GeoJSONPolygon | GeoJSONMultiPolygon>;
        feature: GeoJSONFeature<GeoJSONPolygon | GeoJSONMultiPolygon>;
    }

    export function polygon(latlngs: LatLngExpression[], options?: PolylineOptions): Polygon;

    export class Rectangle extends Polygon {
        constructor(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions);
        setBounds(latLngBounds: LatLngBoundsExpression): this;
    }

    export function rectangle(latLngBounds: LatLngBoundsExpression, options?: PolylineOptions): Rectangle;

    export interface CircleMarkerOptions extends PathOptions {
        radius?: number;
    }

    export class CircleMarker extends Path {
        constructor(latlng: LatLngExpression, options?: CircleMarkerOptions);
        toGeoJSON(): GeoJSONFeature<GeoJSONPoint>;
        setLatLng(latLng: LatLngExpression): this;
        getLatLng(): LatLng;
        setRadius(radius: number): this;
        getRadius(): number;
        options: CircleMarkerOptions;
        feature: GeoJSONFeature<GeoJSONPoint>;
    }

    export function circleMarker(latlng: LatLngExpression, options?: CircleMarkerOptions): CircleMarker;

    export class Circle extends CircleMarker {
        constructor(latlng: LatLngExpression, options?: CircleMarkerOptions);
        constructor(latlng: LatLngExpression, radius: number, options?: CircleMarkerOptions); // deprecated!
        getBounds(): LatLngBounds;
    }

    export function circle(latlng: LatLngExpression, options?: CircleMarkerOptions): Circle;
    export function circle(latlng: LatLngExpression, radius: number, options?: CircleMarkerOptions): Circle; // deprecated!

    export interface RendererOptions extends LayerOptions {
        padding?: number;
    }

    export class Renderer extends Layer {
        constructor(options?: RendererOptions);

        options: RendererOptions;
    }

    export class SVG extends Renderer { }

    export namespace SVG {
        export function create(name: string): SVGElement;

        export function pointsToPath(rings: PointExpression[], close: boolean): string;
    }

    export function svg(options?: RendererOptions): SVG;

    export class Canvas extends Renderer { }

    export function canvas(options?: RendererOptions): Canvas;

    export class LayerGroup extends Layer {
        constructor(layers: Layer[]);
        toGeoJSON(): GeoJSONFeatureCollection<GeoJSONGeometryObject> | GeoJSONFeature<GeoJSONMultiPoint> | GeoJSONGeometryCollection;
        addLayer(layer: Layer): this;
        removeLayer(layer: number | Layer): this;
        hasLayer(layer: Layer): boolean;
        clearLayers(): this;
        invoke(methodName: string, ...params: any[]): this;
        eachLayer(fn: (layer: Layer) => void, context?: any): this;
        getLayer(id: number): Layer;
        getLayers(): Layer[];
        setZIndex(zIndex: number): this;
        getLayerId(layer: Layer): number;

        feature: GeoJSONFeatureCollection<GeoJSONGeometryObject> | GeoJSONFeature<GeoJSONMultiPoint> | GeoJSONGeometryCollection;
    }

    export function layerGroup(layers: Layer[]): LayerGroup;

    export class FeatureGroup extends LayerGroup {
        setStyle(style: PathOptions): this;

        bringToFront(): this;
        bringToBack(): this;
        getBounds(): LatLngBounds;
    }

    export function featureGroup(layers?: Layer[]): FeatureGroup;

    type StyleFunction = (feature: GeoJSONFeature<GeoJSONGeometryObject>) => PathOptions;

    export interface GeoJSONOptions extends LayerOptions {
        pointToLayer?: (geoJsonPoint: GeoJSONFeature<GeoJSONPoint>, latlng: LatLng) => Layer;
        style?: StyleFunction;
        onEachFeature?: (feature: GeoJSONFeature<GeoJSONGeometryObject>, layer: Layer) => void;
        filter?: (geoJsonFeature: GeoJSONFeature<GeoJSONGeometryObject>) => boolean;
        coordsToLatLng?: (coords: [number, number] | [number, number, number]) => LatLng;
    }

    export class GeoJSON extends FeatureGroup {
        static geometryToLayer(featureData: GeoJSONFeature<GeoJSONGeometryObject>, options?: GeoJSONOptions): Layer;
        static coordsToLatLng(coords: [number, number] | [number, number, number]): LatLng;
        static coordsToLatLngs(
            coords: any[],
            levelsDeep?: number,
            coordsToLatLng?: (coords: [number, number] | [number, number, number]) => LatLng): any[];
        static latLngToCoords(latlng: LatLng): [number, number, number];

        static latLngsToCoords(latlngs: any[], levelsDeep?: number, closed?: boolean): any[];
        static asFeature(geojson: GeoJSONFeature<GeoJSONGeometryObject> | GeoJSONGeometryObject): GeoJSONFeature<GeoJSONGeometryObject>;

        constructor(geojson?: GeoJSONGeoJsonObject, options?: GeoJSONOptions)

        addData(data: GeoJSONGeoJsonObject): Layer;

        resetStyle(layer: Layer): Layer;
        setStyle(style: StyleFunction): this;
        options: GeoJSONOptions;

    }

    export function geoJSON(geojson?: GeoJSONGeoJsonObject, options?: GeoJSONOptions): GeoJSON;

    type Zoom = boolean | 'center';

    export interface MapOptions {
        preferCanvas?: boolean;

        /***** Control options *****/
        attributionControl?: boolean;
        zoomControl?: boolean;

        /***** Interaction options *****/
        closePopupOnClick?: boolean;
        zoomSnap?: number;
        zoomDelta?: number;
        trackResize?: boolean;
        boxZoom?: boolean;
        doubleClickZoom?: Zoom;
        dragging?: boolean;

        /***** Map state options *****/
        crs?: CRS;
        center?: LatLngExpression;
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        layers?: Layer[];
        maxBounds?: LatLngBoundsExpression;
        renderer?: Renderer;

        /***** Animation options *****/
        fadeAnimation?: boolean;
        markerZoomAnimation?: boolean;
        transform3DLimit?: number;
        zoomAnimation?: boolean;
        zoomAnimationThreshold?: number;

        /***** Panning inertia options *****/
        inertia?: boolean;
        inertiaDeceleration?: number;
        inertiaMaxSpeed?: number;
        easeLinearity?: number;
        worldCopyJump?: boolean;
        maxBoundsViscosity?: number;

        /***** Keyboard navigation options *****/
        keyboard?: boolean;
        keyboardPanDelta?: number;

        /***** Mousewheel options *****/
        scrollWheelZoom?: Zoom;
        wheelDebounceTime?: number;
        wheelPxPerZoomLevel?: number;

        /***** Touch interaction options*****/
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
        getContainer(): HTMLElement;
        addTo(map: Map): this;
        remove(): this;

        /***** Extension methods *****/
        onAdd(map: Map): HTMLElement;
        onRemove(map: Map): void;

        options: ControlOptions;
    }

    export namespace Control {
        export interface ZoomOptions extends ControlOptions {
            zoomInText?: string;
            zoomInTitle?: string;
            zoomOutText?: string;
            zoomOutTitle?: string;
        }

        export class Zoom extends Control {
            constructor(options?: ZoomOptions);
            options: ZoomOptions;
        }

        export interface AttributionOptions extends ControlOptions {
            prefix?: string | boolean;
        }

        export class Attribution extends Control {
            constructor(options?: AttributionOptions);
            setPrefix(prefix: string): this;
            addAttribution(text: string): this;
            removeAttribution(text: string): this;
            options: AttributionOptions;
        }

        export interface LayersOptions extends ControlOptions {
            collapsed?: boolean;
            autoZIndex?: boolean;
            hideSingleBase?: boolean;
        }

        interface LayersObject {
            [name: string]: Layer;
        }

        export class Layers extends Control {
            constructor(baseLayers?: LayersObject, overlays?: LayersObject, options?: Control.LayersOptions);
            addBaseLayer(layer: Layer, name: string): this;
            addOverlay(layer: Layer, name: string): this;
            removeLayer(layer: Layer): this;
            expand(): this;
            collapse(): this;
            options: LayersOptions;
        }

        export interface ScaleOptions extends ControlOptions {
            maxWidth?: number;
            metric?: boolean;
            imperial?: boolean;
            updateWhenIdle?: boolean;
        }

        export class Scale extends Control {
            constructor(options?: Control.ScaleOptions);
            options: ScaleOptions;
        }
    }

    export namespace control {
        export function zoom(options?: Control.ZoomOptions): Control.Zoom;
        export function attribution(options?: Control.AttributionOptions): Control.Attribution;
        export function layers(baseLayers?: Control.LayersObject, overlays?: Control.LayersObject, options?: Control.LayersOptions): Control.Layers;
        export function scale(options?: Control.ScaleOptions): Control.Scale;
    }

    interface DivOverlayOptions {
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

    type Content = string | HTMLElement;

    export class Popup extends Layer {
        constructor(options?: PopupOptions, source?: Layer);
        getLatLng(): LatLng;
        setLatLng(latlng: LatLngExpression): this;
        getContent(): Content;
        setContent(htmlContent: ((source: Layer) => Content) | Content): this;
        getElement(): HTMLElement;
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
        getLatLng(): LatLng;
        setLatLng(latlng: LatLngExpression): this;
        getContent(): Content;
        setContent(htmlContent: ((source: Layer) => Content) | Content): this;
        getElement(): HTMLElement;
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

        /***** Extension methods *****/
        addHooks(): void;
        removeHooks(): void;
    }

    export interface Event {
        type: string;
        target: any;
    }

    export interface MouseEvent extends Event {
        latlng: LatLng;
        layerPoint: Point;
        containerPoint: Point;
        originalEvent: NativeMouseEvent;
    }

    export interface KeyboardEvent extends Event {
        originalEvent: NativeKeyboardEvent;
    }

    export interface LocationEvent extends Event {
        latlng: LatLng;
        bounds: LatLngBounds;
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number;
        speed: number;
        timestamp: number;
    }

    export interface ErrorEvent extends Event {
        message: string;
        code: number;
    }

    export interface LayerEvent extends Event {
        layer: Layer;
    }

    export interface LayersControlEvent extends LayerEvent {
        name: string;
    }

    export interface TileEvent extends Event {
        tile: HTMLImageElement;
        coords: Point; 
    }

    export interface TileErrorEvent extends TileEvent {
        error: Error;
    }

    export interface ResizeEvent extends Event {
        oldSize: Point;
        newSize: Point;
    }

    export interface GeoJSONEvent extends Event {
        layer: Layer;
        properties: any;
        geometryType: string;
        id: string;
    }

    export interface PopupEvent extends Event {
        popup: Popup;
    }

    export interface TooltipEvent extends Event {
        tooltip: Tooltip;
    }

    export interface DragEndEvent extends Event {
        distance: number;
    }

    export interface ZoomAnimEvent extends Event {
        center: LatLng;
        zoom: number;
        noUpdate: boolean;
    }

    export namespace DomEvent {
        export function on(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        export function on(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
        export function off(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        export function off(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
        export function stopPropagation(ev: Event): typeof DomEvent;
        export function disableScrollPropagation(el: HTMLElement): typeof DomEvent;
        export function disableClickPropagation(el: HTMLElement): typeof DomEvent;
        export function preventDefault(ev: Event): typeof DomEvent;
        export function stop(ev: Event): typeof DomEvent;
        export function getMousePosition(ev: Event, container?: HTMLElement): Point;
        export function getWheelDelta(ev: Event): number;
        export function addListener(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        export function addListener(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
        export function removeListener(el: HTMLElement, types: string, fn: EventHandlerFn, context?: any): typeof DomEvent;
        export function removeListener(el: HTMLElement, eventMap: { [eventName: string]: EventHandlerFn }, context?: any): typeof DomEvent;
    }

    interface DefaultMapPanes {
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

        /***** Extension methods *****/
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

        /***** Methods for modifying map state *****/ 
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
        addHandler(name: string, HandlerClass: () => Handler): this; // HandlerClass is actually a constructor function, is this the right way?
        remove(): this;
        createPane(name: string, container?: HTMLElement): HTMLElement;
        getPane(pane: string | HTMLElement): HTMLElement;
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
        distance(latlng1: LatLngExpression, latlng2: LatLngExpression): number;
        containerPointToLayerPoint(point: PointExpression): Point;
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
        tap: Handler;
        touchZoom: Handler;
        options: MapOptions;
    }

    export function map(element: string | HTMLElement, options?: MapOptions): Map;
    interface BaseIconOptions extends LayerOptions {
        iconUrl?: string;
        iconRetinaUrl?: string;
        iconSize?: PointExpression;
        iconAnchor?: PointExpression;
        popupAnchor?: PointExpression;
        shadowUrl?: string;
        shadowRetinaUrl?: string;
        shadowSize?: PointExpression;
        shadowAnchor?: PointExpression;
        className?: string;
    }

    export interface IconOptions extends BaseIconOptions {
        iconUrl: string;
    }

    class BaseIcon extends Layer {
        createIcon(oldIcon?: HTMLElement): HTMLElement;
        createShadow(oldIcon?: HTMLElement): HTMLElement;
        options: BaseIconOptions;
    }

    export class Icon extends BaseIcon {
        constructor(options: IconOptions);
        options: IconOptions;
    }

    export namespace Icon {
        export interface DefaultIconOptions extends BaseIconOptions {
            imagePath?: string;
        }

        export class Default extends BaseIcon {
            static imagePath?: string;
            constructor(options?: DefaultIconOptions);
            options: DefaultIconOptions;
        }
    }

    export function icon(options: IconOptions): Icon;

    export interface DivIconOptions extends BaseIconOptions {
        html?: string;
        bgPos?: PointExpression;
        iconSize?: PointExpression;
        iconAnchor?: PointExpression;
        popupAnchor?: PointExpression;
        className?: string;
    }

    export class DivIcon extends BaseIcon {
        constructor(options?: DivIconOptions);
        options: DivIconOptions;
    }

    export function divIcon(options?: DivIconOptions): DivIcon;

    export interface MarkerOptions extends InteractiveLayerOptions {
        icon?: Icon;
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

    export class Marker extends Layer {
        constructor(latlng: LatLngExpression, options?: MarkerOptions);
        getLatLng(): LatLng;
        setLatLng(latlng: LatLngExpression): this;
        setZIndexOffset(offset: number): this;
        setIcon(icon: Icon): this;
        setOpacity(opacity: number): this;
        getElement(): HTMLElement;
        options: MarkerOptions;
        dragging: Handler;
    }

    export function marker(latlng: LatLngExpression, options?: MarkerOptions): Marker;

    export namespace Browser {
        export const ie: boolean;
        export const ielt9: boolean;
        export const edge: boolean;
        export const webkit: boolean;
        export const gecko: boolean;
        export const android: boolean;
        export const android23: boolean;
        export const chrome: boolean;
        export const safari: boolean;
        export const win: boolean;
        export const ie3d: boolean;
        export const webkit3d: boolean;
        export const gecko3d: boolean;
        export const opera12: boolean;
        export const any3d: boolean;
        export const mobile: boolean;
        export const mobileWebkit: boolean;
        export const mobiWebkit3d: boolean;
        export const mobileOpera: boolean;
        export const mobileGecko: boolean;
        export const touch: boolean;
        export const msPointer: boolean;
        export const pointer: boolean;
        export const retina: boolean;
        export const canvas: boolean;
        export const vml: boolean;
        export const svg: boolean;
    }

    export namespace Util {
        export function extend(dest: any, src?: any): any;
        export function create(proto: any, properties?: any): any;
        export function bind(fn: () => void, ...obj: any[]): () => void;
        export function stamp(obj: any): number;
        export function throttle(fn: () => void, time: number, context: any): () => void;
        export function wrapNum(num: number, range: number[], includeMax?: boolean): number;
        export function falseFn(): () => false;
        export function formatNum(num: number, digits?: number): number;
        export function trim(str: string): string;
        export function splitWords(str: string): string[];
        export function setOptions(obj: any, options: any): any;
        export function getParamString(obj: any, existingUrl?: string, uppercase?: boolean): string;
        export function template(str: string, data: any): string;
        export function isArray(obj: any): boolean;
        export function indexOf(array: any[], el: any): number;
        export function requestAnimFrame(fn: () => void, context?: any, immediate?: boolean): number;
        export function cancelAnimFrame(id: number): void;
        export let lastId: string;
        export let emptyImageUrl: string;
    }
}

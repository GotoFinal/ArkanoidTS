import Resource = PIXI.loaders.Resource;
import Sprite = PIXI.Sprite;
import Box = SAT.Box;
import Rectangle = PIXI.Rectangle;
import Point = PIXI.Point;

abstract class GameObject {
    private _id: number;
    private _game: ArkanoidGame;
    private _resource: Resource;
    private _sprite: Sprite;
    private _position: Vector;
    private _velocity: Vector;
    private _rotationVelocity: number;
    private _rotation: number;
    private _size: Size;
    private _color: number;
    private _body: CollisionBody<any>;
    private _changedRotation = false;
    private _changedSize = false;

    constructor(game: ArkanoidGame, position: Vector, size: Size) {
        this._game = game;
        this._id = game.counter++;
        this._position = position.clone();
        this._velocity = new Vector(0, 0);
        this._size = size.clone();
        this._resource = this.defaultResource();
        this._color = this.defaultColor();
        this._rotation = 0;
        this._rotationVelocity = 0;
        this._sprite = new Sprite(this._resource.texture);
        this._body = this.recreateBody();
    }

    protected positionUpdate(x: number, y: number, deltaX: number, deltaY: number, newX: number, newY: number): Vector {
        var maxX = this.game.size.x - this.size.x;
        var minX = 0;
        var maxY = this.game.size.y - this.size.y;
        var minY = 0;
        if (newX > maxX) {
            newX = maxX;
        }
        if (newX < minX) {
            newX = minX;
        }
        if (newY > maxY) {
            newY = maxY;
        }
        if (newY < minY) {
            newY = minY;
        }
        return new Vector(newX, newY);
    }

    protected positionChanged(x: number, y: number, deltaX: number, deltaY: number, newX: number, newY: number): Vector {
        return null;
    }

    moveByNumber(x: number, y: number): void {
        var posX = this._position.x;
        var posY = this._position.y;
        var newX = x + posX;
        var newY = y + posY;
        var result = this.positionUpdate(posX, posY, x, y, newX, newY);
        if (result == null) {
            result = new Vector(newX, newY);
        }
        this._position.copy(result);
        result = this.positionChanged(posX, posY, x, y, newX, newY);
        if (result != null) {
            this._position.copy(result);
        }
    }


    moveByVector(value: Vector): void {
        if (!isZero(value)) {
            this.moveByNumber(value.x, value.y);
        }
    }

    addRotation(value: number) {
        this.rotation = this._rotation + value;
    }

    recreateBody(): CollisionBody<any> {
        return new PolygonCollisionBody(new Box(this._position, this.sizeX, this.sizeY).toPolygon());
    }

    refreshBody(body: CollisionBody<any>): void {
        body.position = this._position;
        if (this._changedRotation) {
            body.rotation = this._rotation;
        }
        if (this._changedSize) {
            if (body.body instanceof SAT.Polygon) {
                var localPolygon: SAT.Polygon = body.body;
                localPolygon.setPoints(new Box(this._position, this.sizeX, this.sizeY).toPolygon().points)
            } else if (body.body instanceof SAT.Circle) {
                var localCircle: SAT.Circle = body.body;
                localCircle.r = this.sizeX;
            }
        }
        this._changedRotation = false;
        this._changedSize = false;
    }

    // set pivot(value: Vector)
    // {
    //     this._sprite.pivot = new Point(value.x, value.y)
    // }

    get body(): CollisionBody<any> {
        return this._body;
    }

    set position(value: Vector) {
        this._position = value.clone();
        this._body.position = this._position;
    }

    set rotation(value: number) {
        this._rotation = value;
        this._changedRotation = true;
    }

    get rotationVelocity(): number {
        return this._rotationVelocity;
    }

    set rotationVelocity(value: number) {
        this._rotationVelocity = value;
    }

    get velocity(): Vector {
        return this._velocity.clone();
    }

    get velX(): number {
        return this._velocity.x;
    }

    get velY(): number {
        return this._velocity.y;
    }

    set velocity(velocity: Vector) {
        this._velocity.copy(velocity);
    }

    set size(value: Size) {
        this._size.copy(value);
        this._changedSize = true;
    }

    set color(value: number) {
        this._color = value;
    }

    get id(): number {
        return this._id;
    }

    get game(): ArkanoidGame {
        return this._game;
    }

    get resource(): Resource {
        return this._resource;
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    protected getRawPosition() {
        return this._position;
    }

    get position(): Vector {
        return this._position.clone();
    }

    get rotation(): number {
        return this._rotation;
    }

    get size(): Size {
        return this._size.clone();
    }

    get color(): number {
        return this._color;
    }

    get x(): number {
        return this._position.x;
    }

    get y(): number {
        return this._position.y;
    }

    get sizeX(): number {
        return this._size.x;
    }

    get sizeY(): number {
        return this._size.y;
    }

    defaultResource(): Resource {
        return PIXI.loader.resources['rectangle'];
    }

    defaultColor(): number {
        return 0x00ff00;
    }

    cleanup() {
        this._position = new Vector(-1, -1);
        this._velocity = new Vector(0, 0);
        this._game.stage.removeChild(this._sprite);
        this._id = -1;
    }

    prepareSprite(): void {
        this._sprite.tint = this._color;
        this._sprite.position.x = this.x;
        this._sprite.position.y = this.y;
        this._sprite.width = this.sizeX;
        this._sprite.height = this.sizeY;
        this._sprite.rotation = this._rotation;
        this._game.stage.addChild(this._sprite);
    }

    render() {
        if (this._id == -1)
            return;
        this._sprite.tint = this._color;
        this._sprite.position.x = this.x;
        this._sprite.position.y = this.y;
        this._sprite.width = this.sizeX;
        this._sprite.height = this.sizeY;
        this._sprite.rotation = this._rotation;

    }

    update(delta: number): void {
        if (this._id == -1)
            return;
        this.addRotation(this._rotationVelocity);
        this.moveByVector(this._velocity.clone().scale(this.game.lastDelta, this.game.lastDelta));
        this.refreshBody(this._body);
    }

    collideTestWith(object: GameObject, fillResponse?: boolean): CollisionResponse {
        return this._body.collideTestWithBody(object._body, fillResponse);
    }

    // from collision body

    collideTestWithCircle(circle: Circle, fillResponse?: boolean): CollisionResponse {
        return this._body.collideTestWithCircle(circle, fillResponse);
    }

    collideTestWithPoint(point: SAT.Vector): boolean {
        return this._body.collideTestWithPoint(point);
    }

    collideTestWithPolygon(polygon: Polygon, fillResponse?: boolean): CollisionResponse {
        return this._body.collideTestWithPolygon(polygon, fillResponse);
    }

    collideTestWithBox(box: Box, fillResponse?: boolean): CollisionResponse {
        return this._body.collideTestWithBox(box, fillResponse);
    }

    collideTestWithCircleBody(circle: CircleCollisionBody, fillResponse?: boolean): CollisionResponse {
        return this._body.collideTestWithCircleBody(circle, fillResponse);
    }

    collideTestWithPolygonBody(polygon: PolygonCollisionBody, fillResponse?: boolean): CollisionResponse {
        return this._body.collideTestWithPolygonBody(polygon, fillResponse);
    }

    collideTestWithBody(body: CollisionBody<any>, fillResponse?: boolean): CollisionResponse {
        return this._body.collideTestWithBody(body);
    }
}
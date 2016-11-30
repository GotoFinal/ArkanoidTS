var Resource = PIXI.loaders.Resource;
var Sprite = PIXI.Sprite;
var Box = SAT.Box;
var Rectangle = PIXI.Rectangle;
var Point = PIXI.Point;
var GameObject = (function () {
    function GameObject(game, position, size) {
        this._changedRotation = false;
        this._changedSize = false;
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
    GameObject.prototype.positionUpdate = function (x, y, deltaX, deltaY, newX, newY) {
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
    };
    GameObject.prototype.positionChanged = function (x, y, deltaX, deltaY, newX, newY) {
        return null;
    };
    GameObject.prototype.moveByNumber = function (x, y) {
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
    };
    GameObject.prototype.moveByVector = function (value) {
        if (!isZero(value)) {
            this.moveByNumber(value.x, value.y);
        }
    };
    GameObject.prototype.addRotation = function (value) {
        this.rotation = this._rotation + value;
    };
    GameObject.prototype.recreateBody = function () {
        return new PolygonCollisionBody(new Box(this._position, this.sizeX, this.sizeY).toPolygon());
    };
    GameObject.prototype.refreshBody = function (body) {
        body.position = this._position;
        if (this._changedRotation) {
            body.rotation = this._rotation;
        }
        if (this._changedSize) {
            if (body.body instanceof SAT.Polygon) {
                var localPolygon = body.body;
                localPolygon.setPoints(new Box(this._position, this.sizeX, this.sizeY).toPolygon().points);
            }
            else if (body.body instanceof SAT.Circle) {
                var localCircle = body.body;
                localCircle.r = this.sizeX;
            }
        }
        this._changedRotation = false;
        this._changedSize = false;
    };
    Object.defineProperty(GameObject.prototype, "body", {
        // set pivot(value: Vector)
        // {
        //     this._sprite.pivot = new Point(value.x, value.y)
        // }
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "position", {
        get: function () {
            return this._position.clone();
        },
        set: function (value) {
            this._position = value.clone();
            this._body.position = this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "rotation", {
        get: function () {
            return this._rotation;
        },
        set: function (value) {
            this._rotation = value;
            this._changedRotation = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "rotationVelocity", {
        get: function () {
            return this._rotationVelocity;
        },
        set: function (value) {
            this._rotationVelocity = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "velocity", {
        get: function () {
            return this._velocity.clone();
        },
        set: function (velocity) {
            this._velocity.copy(velocity);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "velX", {
        get: function () {
            return this._velocity.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "velY", {
        get: function () {
            return this._velocity.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "size", {
        get: function () {
            return this._size.clone();
        },
        set: function (value) {
            this._size.copy(value);
            this._changedSize = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "game", {
        get: function () {
            return this._game;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "resource", {
        get: function () {
            return this._resource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "sprite", {
        get: function () {
            return this._sprite;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.getRawPosition = function () {
        return this._position;
    };
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () {
            return this._position.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () {
            return this._position.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "sizeX", {
        get: function () {
            return this._size.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "sizeY", {
        get: function () {
            return this._size.y;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.defaultResource = function () {
        return PIXI.loader.resources['rectangle'];
    };
    GameObject.prototype.defaultColor = function () {
        return 0x00ff00;
    };
    GameObject.prototype.cleanup = function () {
        this._position = new Vector(-1, -1);
        this._velocity = new Vector(0, 0);
        this._game.stage.removeChild(this._sprite);
        this._id = -1;
    };
    GameObject.prototype.prepareSprite = function () {
        this._sprite.tint = this._color;
        this._sprite.position.x = this.x;
        this._sprite.position.y = this.y;
        this._sprite.width = this.sizeX;
        this._sprite.height = this.sizeY;
        this._sprite.rotation = this._rotation;
        this._game.stage.addChild(this._sprite);
    };
    GameObject.prototype.render = function () {
        if (this._id == -1)
            return;
        this._sprite.tint = this._color;
        this._sprite.position.x = this.x;
        this._sprite.position.y = this.y;
        this._sprite.width = this.sizeX;
        this._sprite.height = this.sizeY;
        this._sprite.rotation = this._rotation;
    };
    GameObject.prototype.update = function (delta) {
        if (this._id == -1)
            return;
        this.addRotation(this._rotationVelocity);
        this.moveByVector(this._velocity.clone().scale(this.game.lastDelta, this.game.lastDelta));
        this.refreshBody(this._body);
    };
    GameObject.prototype.collideTestWith = function (object, fillResponse) {
        return this._body.collideTestWithBody(object._body, fillResponse);
    };
    // from collision body
    GameObject.prototype.collideTestWithCircle = function (circle, fillResponse) {
        return this._body.collideTestWithCircle(circle, fillResponse);
    };
    GameObject.prototype.collideTestWithPoint = function (point) {
        return this._body.collideTestWithPoint(point);
    };
    GameObject.prototype.collideTestWithPolygon = function (polygon, fillResponse) {
        return this._body.collideTestWithPolygon(polygon, fillResponse);
    };
    GameObject.prototype.collideTestWithBox = function (box, fillResponse) {
        return this._body.collideTestWithBox(box, fillResponse);
    };
    GameObject.prototype.collideTestWithCircleBody = function (circle, fillResponse) {
        return this._body.collideTestWithCircleBody(circle, fillResponse);
    };
    GameObject.prototype.collideTestWithPolygonBody = function (polygon, fillResponse) {
        return this._body.collideTestWithPolygonBody(polygon, fillResponse);
    };
    GameObject.prototype.collideTestWithBody = function (body, fillResponse) {
        return this._body.collideTestWithBody(body);
    };
    return GameObject;
}());
//# sourceMappingURL=GameObject.js.map
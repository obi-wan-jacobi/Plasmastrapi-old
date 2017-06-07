﻿define(['handle', 'mesh', 'mesh-display-settings', 'position'],
function (Handle, Mesh, MeshDisplaySettings, Position) {

    MeshHandle.prototype = Object.create(Handle.prototype);
    MeshHandle.prototype.constructor = MeshHandle;
    function MeshHandle(mesh, displaySettings) {
        Handle.call(this, mesh, displaySettings, Mesh, MeshDisplaySettings);
        this.__minX = null;
        this.__minY = null;
        this.__maxX = null;
        this.__maxY = null;
        this.__position = new Position();
        this.__template = this.target.clone();
    };
    MeshComponent.prototype.translate = function (newPosition) {
        this.__validateDataType(newPosition, Position);
        var mesh = this.target;
        this.__minX = this.__minY = Number.MAX_SAFE_INTEGER;
        this.__maxX = this.__maxY = -Number.MAX_SAFE_INTEGER;
        for (var i = 0, L = mesh.vertices.length; i < L; i++) {
            mesh.vertices[i].x += (newPosition.x - this.__position.x);
            mesh.vertices[i].y += (newPosition.y - this.__position.y);
            // get min/max X and min/max Y for collision checking purposes
            if (this.__maxX < mesh.vertices[i].x) {
                this.__maxX = mesh.vertices[i].x;
            }
            if (this.__minX > mesh.vertices[i].x) {
                this.__minX = mesh.vertices[i].x;
            }
            if (this.__maxY < mesh.vertices[i].y) {
                this.__maxY = mesh.vertices[i].y;
            }
            if (this.__minY > mesh.vertices[i].y) {
                this.__minY = mesh.vertices[i].y;
            }
        };
        this.__position = newPosition;
    };
    MeshComponent.prototype.__rotate = function (newAngle) {
        var position = this.__entity.getComponent(PoseComponent).position;
        var mesh = this.target;
        this.__minX = this.__minY = Number.MAX_SAFE_INTEGER;
        this.__maxX = this.__maxY = -Number.MAX_SAFE_INTEGER;
        for (var i = 0, L = mesh.vertices.length; i < L; i++) {
            // find 'natural' vertex position relative to origin
            var templateX = this.__template.vertices[i].x;
            var templateY = this.__template.vertices[i].y;
            // perform new rotation
            var x = templateX * Math.cos(newAngle) - templateY * Math.sin(newAngle);
            var y = templateX * Math.sin(newAngle) + templateY * Math.cos(newAngle);
            // re-translate vertex back to current relative position
            mesh.vertices[i].x = position.x + x;
            mesh.vertices[i].y = position.y + y;
            // get min/max X and min/max Y for collision checking purposes
            if (this.__maxX < mesh.vertices[i].x) {
                this.__maxX = mesh.vertices[i].x;
            }
            if (this.__minX > mesh.vertices[i].x) {
                this.__minX = mesh.vertices[i].x;
            }
            if (this.__maxY < mesh.vertices[i].y) {
                this.__maxY = mesh.vertices[i].y;
            }
            if (this.__minY > mesh.vertices[i].y) {
                this.__minY = mesh.vertices[i].y;
            }
        };
    };
    // public methods
    MeshComponent.prototype.checkMeshCollision = function (mesh) {

    };
    MeshComponent.prototype.checkPointCollision = function (point) {
        // debugging
        this.__lastCollisionPoint = point;
        // find max/min x and y coordinates for a rectangle that bounds the entire mesh
        var mesh = this.target;
        var minX = this.__minX, maxX = this.__maxX, minY = this.__minY, maxY = this.__maxY;
        // check if we're inside bounding rectangle
        if (point.x <= maxX && point.x >= minX && point.y <= maxY && point.y >= minY) {
            // trace ray from point to (minX, minY)
            // if the number of intersections between a ray and the mesh's sides is odd --> collision detected		
            var numberOfIntersections = 0;
            var vertices = [].concat(mesh.vertices, mesh.vertices[0]);
            var m_ray = (point.y - minY) / (point.x - minX);
            var b_ray = point.y - m_ray * point.x;
            for (var i = 0, L = vertices.length - 1; i < L; i++) {
                var m_side = (vertices[i + 1].y - vertices[i].y) / (vertices[i + 1].x - vertices[i].x);
                m_side = isFinite(m_side) ? m_side : Number.MAX_SAFE_INTEGER;
                var b_side = vertices[i].y - m_side * vertices[i].x;
                var intersectX = (b_side - b_ray) / (m_ray - m_side);
                intersectX = isNaN(intersectX) ? Number.MAX_SAFE_INTEGER : intersectX;
                var intersectY = m_ray * intersectX + b_ray;
                intersectX = Math.round(intersectX * 1000) / 1000;
                intersectY = Math.round(intersectY * 1000) / 1000;
                if (intersectX <= point.x && intersectX >= minX && intersectY <= point.y && intersectY >= minY) {
                    // if the point of intersection is on a vertex located at minX, minY --> check that point is located on the interior to avoid tangent-to-vertex case
                    if (Math.round(intersectX) === Math.round(minX) && Math.round(intersectY) === Math.round(minY)) {
                        var m_side_lower = i > 0
                            ? (vertices[i].y - vertices[i - 1].y) / (vertices[i].x - vertices[i - 1].x)
                            : (vertices[i].y - vertices[L - 1].y) / (vertices[i].x - vertices[L - 1].x);
                        if (m_ray < isNaN(m_side_lower) ? Number.MAX_SAFE_INTEGER : m_side_lower && m_ray > m_side) {
                            return true;
                        }
                    } else {
                        numberOfIntersections++;
                    }
                }
            }
            if (numberOfIntersections % 2 == 1) {
                return true;
            }
        }
        return false;
    };
    MeshComponent.prototype.draw = function (ctx) {
        var vertices = this.target.vertices;
        var displaySettings = this.displaySettings;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (var i = 1, L = vertices.length; i < L; i++) {
            var vertex = vertices[i];
            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.strokeStyle = displaySettings.strokeStyle;
        ctx.lineWidth = displaySettings.lineWidth;
        ctx.stroke()
        if (displaySettings.fillStyle) {
            ctx.fillStyle = displaySettings.fillStyle;
            ctx.fill();
        }
        ctx.restore();
    };
    // debugging
    MeshComponent.prototype.drawDebug = function (ctx) {
        var debug = config.debug.MeshComponent;
        var vertices = this.target.vertices;
        ctx.save();
        for (var i = 0, L = vertices.length; i < L; i++) {
            var vertex = vertices[i];
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, 5, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.strokeStyle = debug.vertexStrokeStyle;
            ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(this.__minX, this.__minY, 10, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.strokeStyle = debug.minVertextStrokeStyle;
        ctx.stroke();
        ctx.restore();
        if (this.__lastPoint) {
            ctx.save();
            this.drawPointCollision(ctx);
            ctx.restore();
        }
    };
    MeshComponent.prototype.drawPointCollision = function (ctx) {
        var debug = config.debug.MeshComponent;
        var point = this.__lastCollisionPoint;
        // find max/min x and y coordinates for a rectangle that bounds the entire mesh
        var mesh = this.target;
        var minX = this.__minX, maxX = this.__maxX, minY = this.__minY, maxY = this.__maxY;
        // check if we're inside bounding rectangle
        if (point.x <= maxX && point.x >= minX && point.y <= maxY && point.y >= minY) {
            // trace ray from point to (minX, minY)
            // if the number of intersections between a ray and the mesh's sides is odd --> collision detected		
            var numberOfIntersections = 0;
            var vertices = [].concat(mesh.vertices, mesh.vertices[0]);
            var m_ray = (point.y - minY) / (point.x - minX);
            var b_ray = point.y - m_ray * point.x;
            for (var i = 0, L = vertices.length - 1; i < L; i++) {
                var m_side = (vertices[i + 1].y - vertices[i].y) / (vertices[i + 1].x - vertices[i].x);
                m_side = isFinite(m_side) ? m_side : Number.MAX_SAFE_INTEGER;
                var b_side = vertices[i].y - m_side * vertices[i].x;
                var intersectX = (b_side - b_ray) / (m_ray - m_side);
                intersectX = isNaN(intersectX) ? Number.MAX_SAFE_INTEGER : intersectX;
                var intersectY = m_ray * intersectX + b_ray;
                intersectX = Math.round(intersectX * 1000) / 1000;
                intersectY = Math.round(intersectY * 1000) / 1000;
                ctx.beginPath();
                ctx.arc(intersectX, intersectY, 10, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.strokeStyle = debug.outerCollisionStrokeStyle;
                ctx.stroke();
                if (intersectX <= point.x && intersectX >= minX && intersectY <= point.y && intersectY >= minY) {
                    ctx.beginPath();
                    ctx.arc(intersectX, intersectY, 10, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.strokeStyle = debug.innerCollisionStrokeStyle;
                    ctx.stroke();
                    // if the point of intersection is on a vertex located at minX, minY --> check that point is located on the interior to avoid tangent-to-vertex case
                    if (Math.round(intersectX) === Math.round(minX) && Math.round(intersectY) === Math.round(minY)) {
                        var m_side_lower = i > 0
                            ? (vertices[i].y - vertices[i - 1].y) / (vertices[i].x - vertices[i - 1].x)
                            : (vertices[i].y - vertices[L - 1].y) / (vertices[i].x - vertices[L - 1].x);
                        if (m_ray < isNaN(m_side_lower) ? Number.MAX_SAFE_INTEGER : m_side_lower && m_ray > m_side) {
                            return true;
                        }
                    } else {
                        numberOfIntersections++;
                    }
                }
            }

            if (numberOfIntersections % 2 == 1) {
                return true;
            }
        }
        return false;
    };

    return MeshHandle;
});
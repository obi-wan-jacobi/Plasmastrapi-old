﻿require.config({
    paths: {
        // Constants
        'core-constants': './core/Configuration/constants',
        // Component Mixins
        'drawable': './core/Components/Mixins/Drawable',
        // Components
        'component': './core/Components/Base/Component',

        'curve-component': './core/Components/Geometry/CurveComponent',
        'line-component': './core/Components/Geometry/LineComponent',
        'mesh-component': './core/Components/Geometry/MeshComponent',
        'pose-component': './core/Components/Geometry/PoseComponent',

        'image-component': './core/Components/Graphics/ImageComponent',
        'sprite-component': './core/Components/Graphics/SpriteComponent',
        'text-label-component': './core/Components/Graphics/TextComponent',

        'keyboard-component': './core/Components/Inputs/KeyboardComponent',
        'mouse-component': './core/Components/Inputs/MouseComponent',
        'pick-component': './core/Components/Inputs/PickComponent',
        // Data
        'display-settings': './core/Data/Base/DisplaySettings',
        'primitive': './core/Data/Base/Primitive',
        'curve': './core/Data/Geometry/Curve',
        'line': './core/Data/Geometry/Line',
        'mesh': './core/Data/Geometry/Mesh',
        'pose': './core/Data/Geometry/Pose',
        'position': './core/Data/Geometry/Position',
        'rectangle': './core/Data/Geometry/Rectangle',
        'vertex': './core/Data/Geometry/Vertex',
        'image-display-settings': './core/Data/Graphics/DisplaySettings/ImageDisplaySettings',
        'line-display-settings': './core/Data/Graphics/DisplaySettings/LineDisplaySettings',
        'mesh-display-settings': './core/Data/Graphics/DisplaySettings/MeshDisplaySettings',
        'text-display-settings': './core/Data/Graphics/DisplaySettings/TextDisplaySettings',
        'text': './core/Data/Graphics/Text',
        'acceleration': './core/Data/Physics/Acceleration',
        'velocity': './core/Data/Physics/Velocity',
        // Data Handles
        // Data Structures
        'link': './core/DataStructures/Base/Link',
        'dictionary': './core/DataStructures/Dictionary',
        'linked-list': './core/DataStructures/LinkedList',
        // Entity
        'entity': './core/Entity/Entity',
        // Events
        'emitter': './core/Events/Emitter',
        //Event Mixins
        'destructible': './core/Events/Mixins/Destructible',
        'enableable': './core/Events/Mixins/Enableable',
        'loadable': './core/Events/Mixins/Loadable',
    }
});
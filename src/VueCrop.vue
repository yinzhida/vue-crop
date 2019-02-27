<template>
    <div class="draw-panel unselect" ref="drawPanel" @mousedown="startDrawNewCrop">
        <div :class="{'crop-container': true, unselect: true, 'cursor-crosshair': !isChanging}" v-show="show">
            <div class="unselect bg-rect" :style="bgLeftStyle"></div>
            <div class="unselect bg-rect" :style="bgRightStyle"></div>
            <div class="unselect bg-rect" :style="bgTopStyle"></div>
            <div class="unselect bg-rect" :style="bgBottomStyle"></div>
            <div class="rect unselect" @mousedown.stop="readyForDrag(['x1', 'y1', 'x2', 'y2'])" :style="rectStyle"></div>
            <div class="anchor unselect anchor-start" @mousedown.stop="readyForDrag(['x1', 'y1'])" v-show="resizeAble" :style="startStyle"></div>
            <div class="anchor unselect anchor-hv1" @mousedown.stop="readyForDrag(['y1'])" v-show="resizeAble" :style="hv1Style"></div>
            <div class="anchor unselect anchor-hv2" @mousedown.stop="readyForDrag(['y1', 'x2'])" v-show="resizeAble" :style="hv2Style"></div>
            <div class="anchor unselect anchor-hv3" @mousedown.stop="readyForDrag(['x2'])" v-show="resizeAble" :style="hv3Style"></div>
            <div class="anchor unselect anchor-vh1" @mousedown.stop="readyForDrag(['x1'])" v-show="resizeAble" :style="vh1Style"></div>
            <div class="anchor unselect anchor-vh2" @mousedown.stop="readyForDrag(['x1', 'y2'])" v-show="resizeAble" :style="vh2Style"></div>
            <div class="anchor unselect anchor-vh3" @mousedown.stop="readyForDrag(['y2'])" v-show="resizeAble" :style="vh3Style"></div>
            <div class="anchor unselect anchor-end" @mousedown.stop="readyForDrag(['x2', 'y2'])" v-show="resizeAble" :style="endStyle"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VueCrop',

    props: {
        initRect: {
            type: Object,
            default: () => {
                return {
                    x1: -1,
                    y1: -1,
                    x2: -1,
                    y2: -1
                };
            }
        },

        showRect: {
            type: Boolean,
            default: true
        },

        resizeAble: {
            type: Boolean,
            default: true
        },

        aspectRatio: {
            type: Number,
            default: undefined
        },

        allowStartNewCrop: {
            type: Boolean,
            default: true
        },

        minWidth: {
            type: Number,
            default: undefined
        },

        maxWidth: {
            type: Number,
            default: undefined
        },

        minHeight: {
            type: Number,
            default: undefined
        },

        maxHeight: {
            type: Number,
            default: undefined
        }
    },

    // horizontal 简写h 代表横向， vertical 简写v 代表纵向
    // 分成两路，一路先横着走，然后竖着走，另外一路先竖着走，再横着走，
    // 最后都从start到达end
    // x1,y1  hv1    hv2
    // 口-----口-----口
    // |start        |
    // |             |
    // 口vh1         口 hv3
    // |             |
    // |             |
    // 口-----口-----口 end
    // vh2    vh3    x2,y2

    data () {
        return {
            x1: this.initRect.x1,
            y1: this.initRect.y1,
            x2: this.initRect.x2,
            y2: this.initRect.y2,
            modifyCoordinates: []
        };
    },

    watch: {
        initRect: {
            handler (value) {
                this.x1 = value.x1;
                this.y1 = value.y1;
                this.x2 = value.x2;
                this.y2 = value.y2;
            },
            deep: true
        },

        showRect (value) {
            if (value === false) {
                this.x1 = -1;
                this.x2 = -1;
                this.y1 = -1;
                this.y2 = -1;
            } else {
                this.x1 = this.initRect.x1;
                this.y1 = this.initRect.y1;
                this.x2 = this.initRect.x2;
                this.y2 = this.initRect.y2;
            }
        }
    },

    computed: {
        start () {
            return { x: this.x1, y: this.y1 };
        },

        end () {
            return { x: this.x2, y: this.y2 };
        },

        hv1 () {
            let point = {
                x: (this.x1 + this.x2) / 2,
                y: this.y1
            };
            return point;
        },

        hv2 () {
            let point = {
                x: this.x2,
                y: this.y1
            };
            return point;
        },

        hv3 () {
            let point = {
                x: this.x2,
                y: (this.y1 + this.y2) / 2
            };
            return point;
        },

        vh1 () {
            let point = {
                x: this.x1,
                y: (this.y1 + this.y2) / 2
            };
            return point;
        },

        vh2 () {
            let point = {
                x: this.x1,
                y: this.y2
            };
            return point;
        },

        vh3 () {
            let point = {
                x: (this.x1 + this.x2) / 2,
                y: this.y2
            };
            return point;
        },

        width () {
            return Math.abs(this.x2 - this.x1);
        },

        height () {
            return Math.abs(this.y2 - this.y1);
        },

        leftTopCorner () {
            let leftTopCornerX = this.x1 > this.x2 ? this.x2 : this.x1;
            let leftTopCornerY = this.y1 > this.y2 ? this.y2 : this.y1;
            return { x: leftTopCornerX, y: leftTopCornerY };
        },

        rightBottomCorner () {
            let rightBottomCornerX = this.x1 > this.x2 ? this.x1 : this.x2;
            let rightBottomCornerY = this.y1 > this.y2 ? this.y1 : this.y2;
            return { x: rightBottomCornerX, y: rightBottomCornerY };
        },

        leftBottomCorner () {
            let leftBottomCornerX = this.x1 > this.x2 ? this.x2 : this.x1;
            let leftBottomCornerY = this.y1 > this.y2 ? this.y1 : this.y2;
            return { x: leftBottomCornerX, y: leftBottomCornerY };
        },

        rightTopCorner () {
            let rightTopCornerX = this.x1 > this.x2 ? this.x1 : this.x2;
            let rightTopCornerY = this.y1 > this.y2 ? this.y2 : this.y1;
            return { x: rightTopCornerX, y: rightTopCornerY };
        },

        cursorMode () {
            if ((this.x2 - this.x1) * (this.y2 - this.y1) > 0) {
                return 'mode1';
            } else {
                return 'mode2';
            }
        },

        show () {
            return this.showRect && this.x1 >= 0 && this.y1 >= 0 && this.x2 >= 0 && this.y2 >= 0;
        },

        rectStyle () {
            let style = {
                left: this.leftTopCorner.x + 'px',
                top: this.leftTopCorner.y + 'px',
                width: this.width + 'px',
                height: this.height + 'px',
                cursor: 'move'
            };
            return style;
        },

        startStyle () {
            let style = {
                left: this.start.x + 'px',
                top: this.start.y + 'px',
                cursor: this.cursorMode === 'mode1' ? 'nw-resize' : 'ne-resize'
            };
            return style;
        },

        hv1Style () {
            let style = {
                left: this.hv1.x + 'px',
                top: this.hv1.y + 'px',
                cursor: 'n-resize'
            };
            return style;
        },

        hv2Style () {
            let style = {
                left: this.hv2.x + 'px',
                top: this.hv2.y + 'px',
                cursor: this.cursorMode === 'mode1' ? 'ne-resize' : 'nw-resize'
            };
            return style;
        },

        hv3Style () {
            let style = {
                left: this.hv3.x + 'px',
                top: this.hv3.y + 'px',
                cursor: 'e-resize'
            };
            return style;
        },

        vh1Style () {
            let style = {
                left: this.vh1.x + 'px',
                top: this.vh1.y + 'px',
                cursor: 'e-resize'
            };
            return style;
        },

        vh2Style () {
            let style = {
                left: this.vh2.x + 'px',
                top: this.vh2.y + 'px',
                cursor: this.cursorMode === 'mode1' ? 'ne-resize' : 'nw-resize'
            };
            return style;
        },

        vh3Style () {
            let style = {
                left: this.vh3.x + 'px',
                top: this.vh3.y + 'px',
                cursor: 'n-resize'
            };
            return style;
        },

        endStyle () {
            let style = {
                left: this.end.x + 'px',
                top: this.end.y + 'px',
                cursor: this.cursorMode === 'mode1' ? 'nw-resize' : 'ne-resize'
            };
            return style;
        },

        bgLeftStyle () {
            let style = {
                left: '0',
                top: '0',
                bottom: '0',
                width: this.outX1 + 'px'
            };
            return style;
        },

        bgRightStyle () {
            let style = {
                right: '0',
                top: '0',
                bottom: '0',
                left: this.outX2 + 'px'
            };
            return style;
        },

        bgTopStyle () {
            let style = {
                width: this.width + 'px',
                top: '0',
                height: this.outY1 + 'px',
                left: this.outX1 + 'px'
            };
            return style;
        },

        bgBottomStyle () {
            let style = {
                width: this.width + 'px',
                top: this.outY2 + 'px',
                left: this.outX1 + 'px',
                bottom: 0
            };
            return style;
        },

        isChanging () {
            return this.modifyCoordinates.length > 0;
        },

        outX1 () {
            return this.x1 > this.x2 ? this.x2 : this.x1;
        },

        outX2 () {
            return this.x1 > this.x2 ? this.x1 : this.x2;
        },

        outY1 () {
            return this.y1 > this.y2 ? this.y2 : this.y1;
        },

        outY2 () {
            return this.y1 > this.y2 ? this.y1 : this.y2;
        },

        rightXName () {
            return this.x1 > this.x2 ? 'x1' : 'x2';
        },

        bottomYName () {
            return this.y1 > this.y2 ? 'y1' : 'y2';
        },

        innerMinHeight () {
            if (this.minHeight) {
                return Math.max(this.minHeight, 0);
            }
            return 0;
        },

        innerMaxHeight () {
            if (this.maxHeight) {
                return Math.min(this.maxHeight, this.$refs.drawPanel.offsetHeight);
            }
            return this.$refs.drawPanel.offsetHeight;
        },

        innerMinWidth () {
            if (this.minWidth) {
                return Math.max(this.minWidth, 0);
            } else {
                return 0;
            }
        },

        innerMaxWidth () {
            if (this.maxWidth) {
                return Math.min(this.maxWidth, this.$refs.drawPanel.offsetWidth);
            }
            return this.$refs.drawPanel.offsetWidth;
        }
    },

    methods: {
        readyForDrag (coordinates) {
            let newCoordinate = this.reSort(coordinates);
            this.modifyCoordinates = newCoordinate;
            window.document.addEventListener('mousemove', this.doDrag);
            this.$emit('beforeChange', this.getResult());
        },

        doDrag (e) {
            let targetCoordinates = this.getTargetCoordinates({ movementX: e.movementX, movementY: e.movementY });
            this.x1 = targetCoordinates.x1;
            this.x2 = targetCoordinates.x2;
            this.y1 = targetCoordinates.y1;
            this.y2 = targetCoordinates.y2;
        },

        getTargetCoordinates (movement) {
            let modifyCoordinates = this.modifyCoordinates;
            let targetCoordinates = {};
            let targetWidth, targetHeight;
            let mainDirection;
            if (modifyCoordinates.length === 1) {
                mainDirection = modifyCoordinates[0];
            } else {
                mainDirection = Math.abs(movement.movementX) < Math.abs(movement.movementY) ? 'y2' : 'x2';
            }
            this.modifyAspectRation(mainDirection, movement);

            let setTargetInfo = () => {
                targetCoordinates = { x1: this.x1, x2: this.x2, y1: this.y1, y2: this.y2 };
                for (let coordinate of modifyCoordinates) {
                    targetCoordinates[coordinate] = this[coordinate] + movement['movement' + coordinate[0].toUpperCase()]
                }
                targetWidth = Math.abs(targetCoordinates.x2 - targetCoordinates.x1);
                targetHeight = Math.abs(targetCoordinates.y2 - targetCoordinates.y1);
            };

            setTargetInfo();

            let modifyMovementByDiff = (movement, moveDirction, diff) => {
                let movementDirection = 'movement' + moveDirction.toUpperCase();
                movement[movementDirection] = movement[movementDirection] > 0 ? (movement[movementDirection] - diff) : (movement[movementDirection] + diff);
                this.modifyAspectRation(moveDirction + '2', movement);
                setTargetInfo();
            };

            let validateMax = (target, max, direction) => {
                if (target > max) {
                    let diff = target - max;
                    modifyMovementByDiff(movement, direction, diff);
                }
            };

            let validateMin = (target, min, direction) => {
                if (target < min) {
                    let diff = min - target;
                    modifyMovementByDiff(movement, direction, diff);
                }
            };

            validateMax(targetWidth, this.innerMaxWidth, 'x');
            validateMin(targetWidth, this.innerMinWidth, 'x');
            validateMax(targetHeight, this.innerMaxHeight, 'y');
            validateMin(targetHeight, this.innerMinHeight, 'y');

            let maxX = this.$refs.drawPanel.offsetWidth;
            let minX = 0;
            let maxY = this.$refs.drawPanel.offsetHeight;
            let minY = 0;

            validateMax(targetCoordinates.x2, maxX, 'x');
            validateMin(targetCoordinates.x2, minX, 'x');
            validateMax(targetCoordinates.y2, maxY, 'y');
            validateMin(targetCoordinates.y2, minY, 'y');

            if (modifyCoordinates.length === 4) {
                validateMax(targetCoordinates.x1, maxX, 'x');
                validateMin(targetCoordinates.x1, minX, 'x');
                validateMax(targetCoordinates.y1, maxY, 'y');
                validateMin(targetCoordinates.y1, minY, 'y');
            }

            return targetCoordinates;
        },

        modifyAspectRation (mainDirection, movement) {
            if (this.modifyCoordinates.length !== 4) {
                let subDirection = mainDirection === 'x2' ? 'y2' : 'x2';
                let mainMovementName = 'movement' + mainDirection[0].toUpperCase();
                let subMovementName = 'movement' + subDirection[0].toUpperCase();
                let mark = 1;
                if (
                    (this.x2 === this.rightTopCorner.x && this.y2 === this.rightTopCorner.y)
                    || (this.x2 === this.leftBottomCorner.x && this.y2 === this.leftBottomCorner.y)
                ) {
                    mark = -1;
                }
                if (this.aspectRatio) {
                    if (mainDirection[0] === 'x') {
                        movement[subMovementName] = movement[mainMovementName] / this.aspectRatio * mark;
                    } else {
                        movement[subMovementName] = movement[mainMovementName] * this.aspectRatio * mark;
                    }
                }
            }
        },

        reSort (coordinates) {
            let originCoordinate = {
                x1: this.x1,
                x2: this.x2,
                y1: this.y1,
                y2: this.y2
            }
            let direction, endPointPartner;
            let newCoordinate = [];
            if (coordinates.length === 1) {
                direction = coordinates[0][0];
                endPointPartner = direction === 'x' ? this.bottomYName : this.rightXName;
                newCoordinate = [direction + '2'];
            }

            if (coordinates.length === 2) {
                direction = coordinates[0][0];
                endPointPartner = coordinates[1];
                newCoordinate = [coordinates[0][0] + '2', coordinates[1][0] + '2'];
            }

            if (coordinates.length === 4) {
                newCoordinate = coordinates;
            }

            if (coordinates.length !== 4) {
                this[direction + '2'] = originCoordinate[coordinates[0]];
                this[endPointPartner[0] + '2'] = originCoordinate[endPointPartner];
                this[direction + '1'] = originCoordinate[this.getAgainstCoordinateName(coordinates[0])];
                this[endPointPartner[0] + '1'] = originCoordinate[this.getAgainstCoordinateName(endPointPartner)];
            }

            return newCoordinate;
        },

        getAgainstCoordinateName (coordinateName) {
            return coordinateName[1] === '1' ? (coordinateName[0] + '2') : (coordinateName[0] + '1');
        },

        startDrawNewCrop (e) {
            if (!this.allowStartNewCrop) {
                return;
            }

            let rect = this.$refs.drawPanel.getBoundingClientRect();
            let targetRect = e.target.getBoundingClientRect();
            let pointX = e.offsetX - rect.left + targetRect.left;
            let pointY = e.offsetY - rect.top + targetRect.top;
            this.x1 = pointX;
            this.y1 = pointY;
            this.x2 = pointX;
            this.y2 = pointY;
            this.modifyCoordinates = ['x2', 'y2'];
            window.document.addEventListener('mousemove', this.doDrag);
        },

        getResult () {
            let maxX = this.$refs.drawPanel.offsetWidth;
            let maxY = this.$refs.drawPanel.offsetHeight;
            let x = this.outX1 * 1000 / maxX;
            let y = this.outY1 * 1000 / maxY;
            let result = {
                x1: x,
                y1: y,
                x: x,
                y: y,
                x2: this.outX2 * 1000 / maxX,
                y2: this.outY2 * 1000 / maxY,
                w: this.width * 1000 / maxX,
                h: this.height * 1000 / maxY,
                xpx: this.outX1,
                ypx: this.outY1,
                wpx: this.width,
                hpx: this.height,
                x1px: this.outX1,
                y1px: this.outY1,
                x2px: this.outX2,
                y2px: this.outY2,
                croperWidth: maxX,
                croperHeight: maxY
            };
            return result;
        }
    },

    mounted () {
        const leaveOrUp = () => {
            if (this.modifyCoordinates.length > 0) {
                this.$emit('changed', this.getResult());
            }
            this.modifyCoordinates = [];
            window.document.removeEventListener('mousemove', this.doDrag);
        };
        window.document.addEventListener('mouseup', leaveOrUp);
        window.document.addEventListener('mouseleave', leaveOrUp);
        this.$emit('created', this.getResult());
    }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.draw-panel {
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
}
.crop-container {
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
    position: relative;
}
.cursor-crosshair {
    cursor: crosshair;
}

.rect {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
    position: absolute;
}

.anchor {
    position: absolute;
    width: 8px;
    height: 8px;
    margin-top: -4px;
    margin-left: -4px;
    background-color: #39f;
    border-radius: 50%;
    opacity: 0.75;
    border: none;
}

.unselect {
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
    /* 以下两个属性目前并未支持，写在这里为了减少风险 */
    -o-user-select: none;
    user-select: none;
}

.bg-rect {
    position: absolute;
    background-color: black;
    opacity: 0.3;
    margin: 0;
    padding: 0;
    border: 0;
}
</style>

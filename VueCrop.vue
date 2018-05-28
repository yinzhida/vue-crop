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
import { getElementPageLeft, getElementPageTop } from '@/utils/DomUtils';
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
        leftXName () {
            return this.y1 > this.y2 ? 'x2' : 'x1';
        },
        topYName () {
            return this.y1 > this.y2 ? 'y2' : 'y1';
        },
        innerMinHeight () {
            if (this.aspectRatio) {
                if (this.minWidth === undefined) {
                    return this.minHeight;
                }
                let aspectMinHeight = this.minWidth / this.aspectRatio;
                if (this.minHeight) {
                    return Math.max(this.minHeight, aspectMinHeight);
                } else {
                    return aspectMinHeight;
                }
            } else {
                return this.minHeight;
            }
        },
        innerMaxHeight () {
            if (this.aspectRatio) {
                if (this.maxWidth === undefined) {
                    return this.maxHeight;
                }
                let aspectMaxHeight = this.maxWidth / this.aspectRatio;
                if (this.maxHeight) {
                    return Math.min(this.maxHeight, aspectMaxHeight);
                } else {
                    return aspectMaxHeight;
                }
            } else {
                return this.maxHeight;
            }
        },
        innerMinWidth () {
            if (this.aspectRatio) {
                if (this.minHeight === undefined) {
                    return this.minWidth;
                }
                let aspectMinWidth = this.minHeight * this.aspectRatio;
                if (this.minWidth) {
                    return Math.max(this.minWidth, aspectMinWidth);
                } else {
                    return aspectMinWidth;
                }
            } else {
                return this.minWidth;
            }
        },
        innerMaxWidth () {
            if (this.aspectRatio) {
                if (this.maxHeight === undefined) {
                    return this.maxWidth;
                }
                let aspectMaxWidth = this.maxHeight * this.aspectRatio;
                if (this.maxWidth) {
                    return Math.min(this.maxWidth, aspectMaxWidth);
                } else {
                    return aspectMaxWidth;
                }
            } else {
                return this.maxWidth;
            }
        }
    },

    methods: {
        readyForDrag (coordinates) {
            this.modifyCoordinates = coordinates;
            window.document.addEventListener('mousemove', this.doDrag);
            this.$emit('beforeChange', this.getResult());
        },

        doDrag (e) {
            let realChanges = this.getRealChanges({ movementX: e.movementX, movementY: e.movementY });

            for (let change of realChanges) {
                this[change['coordinate']] = this[change['coordinate']] + change['movement'];
            }
        },

        getRealChanges (movement) {
            let modifyCoordinates = this.modifyCoordinates;
            let len = modifyCoordinates.length;
            let moveInfo;
            let changes;
            switch (len) {
                case 1:
                    moveInfo = this.getSingleMoveInfo(modifyCoordinates[0], movement);
                    changes = this.getChangesFromMoveInfo(moveInfo);
                    return changes;
                case 2:
                    moveInfo = this.getDoubleMoveInfo(modifyCoordinates, movement);
                    changes = this.getChangesFromMoveInfo(moveInfo);
                    return changes;
                case 4:
                    changes = this.getFourChanges(modifyCoordinates, movement);
                    return changes;
            }
        },

        getFourChanges (modifyCoordinates, movement) {
            let rectWidth = this.width;
            let rectHeight = this.height;
            let changes = [];
            for (let coordinate of modifyCoordinates) {
                let minX = 0;
                let minY = 0;
                let maxX = this.$refs.drawPanel.offsetWidth;
                let maxY = this.$refs.drawPanel.offsetHeight;
                let direction = coordinate.split('')[0];
                if (direction === 'x') {
                    if (coordinate === this.rightXName) {
                        minX = rectWidth;
                    } else {
                        maxX = maxX - rectWidth;
                    }
                    changes.push({
                        coordinate: coordinate,
                        movement: this.normalMovement(coordinate, movement.movementX, minX, maxX)
                    });
                } else {
                    if (coordinate === this.bottomYName) {
                        minY = rectHeight;
                    } else {
                        maxY = maxY - rectHeight;
                    }
                    changes.push({
                        coordinate: coordinate,
                        movement: this.normalMovement(coordinate, movement.movementY, minY, maxY)
                    });
                }
            }
            return changes;
        },

        getSingleMoveInfo (modifyCoordinate, movement, xDirection, yDirection) {
            let minX = 0;
            let minY = 0;
            let maxX = this.$refs.drawPanel.offsetWidth;
            let maxY = this.$refs.drawPanel.offsetHeight;
            let coordinateDirection = modifyCoordinate;
            let directionToward = coordinateDirection.split('')[0];
            let coordinateDirectionMovement;
            let relatedDirection;
            let relatedDirectionMovement;

            coordinateDirectionMovement = movement['movement' + directionToward.toUpperCase()];
            let minCoordinate = directionToward === 'x' ? minX : minY;
            let maxCoordinate = directionToward === 'x' ? maxX : maxY;
            let minRelated = directionToward === 'x' ? minY : minX;
            let maxRelated = directionToward === 'x' ? maxY : maxX;
            coordinateDirectionMovement = this.normalMovement(coordinateDirection, coordinateDirectionMovement, minCoordinate, maxCoordinate);
            let validateArray = ['MinWidth', 'MinHeight', 'MaxWidth', 'MaxHeight'];
            for (let validate of validateArray) {
                if (this['inner' + validate]) {
                    coordinateDirectionMovement = this.getValidateMovement(directionToward, coordinateDirection, coordinateDirectionMovement, validate);
                }
            }

            if (!this.aspectRatio) {
                return { coordinateDirection, coordinateDirectionMovement };
            }
            relatedDirection = directionToward === 'x' ? (yDirection || this.bottomYName) : (xDirection || this.rightXName);
            let flag = 1;
            if (([this.rightXName, this.topYName].includes(coordinateDirection) && [this.rightXName, this.topYName].includes(relatedDirection)) ||
                ([this.leftXName, this.bottomYName].includes(coordinateDirection) && [this.leftXName, this.bottomYName].includes(relatedDirection))) {
                flag = -1;
            }
            relatedDirectionMovement = directionToward === 'x' ? coordinateDirectionMovement / this.aspectRatio : coordinateDirectionMovement * this.aspectRatio;
            relatedDirectionMovement *= flag;

            relatedDirectionMovement = this.normalMovement(relatedDirection, relatedDirectionMovement, minRelated, maxRelated);

            coordinateDirectionMovement = directionToward === 'x' ? relatedDirectionMovement * this.aspectRatio : relatedDirectionMovement / this.aspectRatio;
            coordinateDirectionMovement *= flag;
            return { coordinateDirection, coordinateDirectionMovement, relatedDirection, relatedDirectionMovement };
        },

        getValidateMovement (directionToward, coordinateDirection, coordinateDirectionMovement, validate) {
            let validateToward = validate.substring(3) === 'Width' ? 'x' : 'y';
            let validateMinMax = validate.substring(0, 3);
            if (directionToward !== validateToward) {
                return coordinateDirectionMovement;
            }
            function CompareValidate (afterMoveValue, validateValue, validateMinMax) {
                if (validateMinMax === 'Min') {
                    return afterMoveValue < validateValue;
                } else {
                    return afterMoveValue > validateValue;
                }
            }
            let endName = validateToward === 'x' ? this.rightXName : this.bottomYName;
            let directionFlag = coordinateDirection === endName ? 1 : -1;
            let brotherDirection = this.getCoordinateBrotherName(coordinateDirection);
            let afterMoveValue = (this[coordinateDirection] + coordinateDirectionMovement - this[brotherDirection]) * directionFlag;
            if (CompareValidate(afterMoveValue, this['inner' + validate], validateMinMax)) {
                coordinateDirectionMovement = this['inner' + validate] / directionFlag + this[brotherDirection] - this[coordinateDirection];
            }
            return coordinateDirectionMovement;
        },

        getCoordinateBrotherName (coordinate) {
            let direction = coordinate.split('')[0];
            let order = coordinate.split('')[1];
            let brotherOrder = order === '1' ? '2' : '1';
            let coordinateBrotherName = direction + brotherOrder;
            return coordinateBrotherName;
        },

        getDoubleMoveInfo (modifyCoordinates, movement) {
            let modifyCoordinates0 = modifyCoordinates[0];
            let modifyCoordinates1 = modifyCoordinates[1];
            let xDirection = modifyCoordinates0.split('')[0] === 'x' ? modifyCoordinates0 : modifyCoordinates1;
            let yDirection = modifyCoordinates0.split('')[0] === 'y' ? modifyCoordinates0 : modifyCoordinates1;
            let moveInfo0 = this.getSingleMoveInfo(modifyCoordinates0, movement, xDirection, yDirection);
            let moveInfo1 = this.getSingleMoveInfo(modifyCoordinates1, movement, xDirection, yDirection);
            if (!this.aspectRatio) {
                let result = {
                    coordinateDirection: moveInfo0.coordinateDirection,
                    coordinateDirectionMovement: moveInfo0.coordinateDirectionMovement,
                    relatedDirection: moveInfo1.coordinateDirection,
                    relatedDirectionMovement: moveInfo1.coordinateDirectionMovement
                };
                return result;
            }
            if (Math.abs(moveInfo0.coordinateDirectionMovement) >= Math.abs(moveInfo1.relatedDirectionMovement)) {
                return moveInfo0;
            } else {
                return moveInfo1;
            }
        },

        getChangesFromMoveInfo (moveInfo) {
            let changes = [{
                coordinate: moveInfo.coordinateDirection,
                movement: moveInfo.coordinateDirectionMovement
            }];
            if (moveInfo.relatedDirection) {
                changes.push({
                    coordinate: moveInfo.relatedDirection,
                    movement: moveInfo.relatedDirectionMovement
                });
            }
            return changes;
        },

        normalMovement (direction, movement, min, max) {
            if (this[direction] + movement > max) {
                movement = max - this[direction];
            }
            if (this[direction] + movement < min) {
                movement = min - this[direction];
            }
            return movement;
        },

        startDrawNewCrop (e) {
            if (!this.allowStartNewCrop) {
                return;
            }
            let pointX = e.offsetX + getElementPageLeft(e.target) - getElementPageLeft(this.$refs.drawPanel);
            let pointY = e.offsetY + getElementPageTop(e.target) - getElementPageTop(this.$refs.drawPanel);
            this.x1 = pointX;
            this.y1 = pointY;
            this.x2 = pointX;
            this.y2 = pointY;
            this.modifyCoordinates = ['x2', 'y2'];
            window.document.addEventListener('mousemove', this.doDrag);
        },

        getValueAfterLimit (max, min, value) {
            let result = value;
            result = result > max ? max : result;
            result = result < min ? min : result;
            return result;
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
                h: this.height * 1000 / maxY
            };
            return result;
        }
    },

    mounted () {
        const leaveOrUp = (e) => {
            if (this.modifyCoordinates.length > 0) {
                this.$emit('changed', this.getResult());
            }
            this.modifyCoordinates = [];
            window.document.removeEventListener('mousemove', this.doDrag);
        };
        window.document.addEventListener('mouseup', leaveOrUp);
        window.document.addEventListener('mouseleave', leaveOrUp);
        this.$emit('created', this.getResult());
    },

    components: {}

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

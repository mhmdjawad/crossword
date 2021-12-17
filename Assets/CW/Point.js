import {DIRECTION} from './ENUMS.js';
export default class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    is(another){
        let x1 = this.x;
        let y1 = this.y;
        let x2 = another.x;
        let y2 = another.y;
        return (x1 == x2 && y1 == y2);
    }
    distanceTo(another){
        let x1 = this.x;
        let y1 = this.y;
        let x2 = another.x;
        let y2 = another.y;
        if(x1 == x2 && y1 == y2) return 0;
        else if(x1 == x2) return Math.abs(y1-y2);
        else if(y1 == y2) return Math.abs(x1-x2);
        else{
            let distance = 0;
            distance += Math.pow((x1 - x2), 2);
            distance += Math.pow((y1 - y2), 2);
            distance = Math.sqrt(distance);
            return distance;
        }
    }
    getAngleTo(another){
        let x1 = this.x;
        let y1 = this.y;
        let x2 = another.x;
        let y2 = another.y;
        if(x1 == x2 && y1 == y2) return 0;
        else if(x1 == x2 && y1 > y2) return 0;  //moving up
        else if(y1 == y2 && x1 < x2) return 2;  //moving right
        else if(x1 == x2 && y1 < y2) return 4;  //moving down
        else if(y1 == y2 && x1 > x2) return 6;  //moving left             
        else if(x1 < x2  && y1 > y2) return 1;  //moving up right
        else if(x1 < x2  && y1 < y2) return 3;  //moving down right
        else if(x1 > x2  && y1 < y2) return 5;  //moving down left
        else if(x1 > x2  && y1 > y2) return 7;  //moving up left
        return 0;
    }
    move(direction,distance){
        if(direction == DIRECTION.UP){
            this.y -= distance;
        }
        else if(direction == DIRECTION.DOWN){
            this.y += distance;
        }
        else if(direction == DIRECTION.LEFT){
            this.x -= distance;
        }
        else if(direction == DIRECTION.RIGHT){
            this.x += distance;
        }
        else if(direction == DIRECTION.UPLEFT){
            this.y -= distance;
            this.x -= distance;
        }
        else if(direction == DIRECTION.UPRIGHT){
            this.y -= distance;
            this.x += distance;
        }
        else if(direction == DIRECTION.DOWNRIGHT){
            this.y += distance;
            this.x += distance;
        }
        else if(direction == DIRECTION.DOWNLEFT){
            this.y += distance;
            this.x -= distance;
        }
    }
    clone(){
        return new Point(this.x,this.y);
    }
    draw(ctx,color){
        ctx.fillStyle = color;
        ctx.fillRect(this.x - 1,this.y - 1,2,2);
    }
    drawCircle(ctx,radius = 4,color = "green"){
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(
            this.x, 		//center x
            this.y, 		//center y
            radius,							//radius
            0,							//begin angle
            Math.PI * 2);				//end angle
        ctx.fill();
			//ctx.stroke();
    }
}
window.Point = Point;
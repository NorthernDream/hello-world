(function () {
    var position = 'absolute';
    var elements = [];

    function Snake(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.directin = options.direction || 'right';
        this.body = [{
                x: 3,
                y: 2,
                color: 'red'
            },
            {
                x: 2,
                y: 2,
                color: 'green'
            },
            {
                x: 1,
                y: 2,
                color: 'green'
            }
        ];
    }

    Snake.prototype.render = function (map) {
        remove();
        
        for (var i = 0, len = this.body.length; i < len; i++) {
            
            var object = this.body[i];
            var div = document.createElement('div');
            map.appendChild(div);
            elements.push(div);
            div.style.position = position;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
            div.style.backgroundColor = object.color;
        }
    }

    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }

    Snake.prototype.move = function () {
        for (var i = this.body.length - 1; i > 0; i --) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        switch(this.direction) {
            case 'right':this.body[0].x += 1;break;
            case 'left':this.body[0].x -= 1;break;
            case 'top':this.body[0].y += 1;break;
            case 'bottom':this.body[0].y -= 1;break;
        }
                    
    }
    window.Snake = Snake;
})()
//---------------------------------------Tools-----------------------------
;(function(window, undefined){
    var Tools = {
        getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
    window.Tools = Tools;
})(window, undefined)
//---------------------------------------Food--------------------------------
;(function (window, undefined) {
    var position = 'absolute';
    var elements = [];

    function Food(options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;

        this.width = options.width || 20;
        this.height = options.height || 20;
        this.color = options.color || 'green';
    }
    Food.prototype.render = function (map) {
        remove();

        this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
        this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

        var div = document.createElement('div');
        map.appendChild(div);

        elements.push(div);

        div.style.position = position;
        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.backgroundColor = this.color;

    }

    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i, 1);
        }
    }
    window.Food = Food;
})(window, undefined)
//---------------------------------------Snake-------------------------------
;(function (window, undefined) {
    var position = 'absolute';
    var elements = [];

    function Snake(options) {
        options = options || {};
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.direction = options.direction || 'right';
        this.body = [{
                x: 3,
                y: 2,
                color: 'red'
            },
            {
                x: 2,
                y: 2,
                color: 'blue'
            },
            {
                x: 1,
                y: 2,
                color: 'blue'
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

    Snake.prototype.move = function (food, map) {
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        switch (this.direction) {
            case 'right':
                this.body[0].x += 1;
                break;
            case 'left':
                this.body[0] -= 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        }


        if (this.body[0].x * this.width === food.x && this.body[0].y * this.height === food.y) {
            this.body.push({
                x: this.body[this.body.length - 1].x,
                y: this.body[this.body.length - 1].y,
                color: this.body[this.body.length - 1].color,
            })
            food.render(map);
        }
    }
    window.Snake = Snake;
})(window, undefined)
//---------------------------------------Game-------------------------------
;(function () {
    var that;
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }
    Game.prototype.start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);
        runSnake();
        bindKey();
    }

    //addEventListener 和 keydown 不是很了解
    function bindKey() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    tthis.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }
        }.bind(that), false)
    }

    function runSnake() {
        var timeId = setInterval(function () {
            this.snake.move(that.food,that.map);
            this.snake.render(that.map);
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            if (headX < 0 || headX >= maxX) {
                alert('Game Over');
                clearInterval(timeId);
            }
            if (headY < 0 || headY >= maxY) {
                alert('Game Over');
                clearInterval(timeId);
            }
        }.bind(that), 150)
    }
    window.Game = Game;

})();
//---------------------------------------Main------------------------------
;(function(window, undefined) {
    var map = document.getElementById('map');
    var game = new Game(map);
    game.start();
})(window, undefined)
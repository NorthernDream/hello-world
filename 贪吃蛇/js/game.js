(function () {
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
